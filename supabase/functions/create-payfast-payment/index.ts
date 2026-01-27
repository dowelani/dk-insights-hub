import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import CryptoJS from "https://esm.sh/crypto-js@4.2.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface PaymentRequest {
  orderId: string;
  totalZAR: number;
  items: {
    title: string;
    quantity: number;
    priceZAR: number;
  }[];
  customerEmail: string;
  customerName: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_ANON_KEY")!,
      { global: { headers: { Authorization: authHeader } } }
    );

    const token = authHeader.replace("Bearer ", "");
    const { data: claimsData, error: claimsError } = await supabase.auth.getClaims(token);
    if (claimsError || !claimsData?.claims) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { orderId, totalZAR, items, customerEmail, customerName }: PaymentRequest = await req.json();

    const merchantId = Deno.env.get("PAYFAST_MERCHANT_ID");
    const merchantKey = Deno.env.get("PAYFAST_MERCHANT_KEY");

    if (!merchantId || !merchantKey) {
      console.error("PayFast credentials not configured");
      return new Response(JSON.stringify({ error: "Payment gateway not configured" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Get the origin for return URLs
    const origin = req.headers.get("origin") || "https://dk-code-insights.lovable.app";
    
    // Create item description
    const itemDescription = items.map(item => `${item.title} x${item.quantity}`).join(", ");

    // PayFast payment data
    const paymentData: Record<string, string> = {
      merchant_id: merchantId,
      merchant_key: merchantKey,
      return_url: `${origin}/order-summary?order_id=${orderId}&status=success`,
      cancel_url: `${origin}/checkout?status=cancelled`,
      notify_url: `${Deno.env.get("SUPABASE_URL")}/functions/v1/payfast-webhook`,
      name_first: customerName.split(" ")[0] || "Customer",
      name_last: customerName.split(" ").slice(1).join(" ") || "",
      email_address: customerEmail,
      m_payment_id: orderId,
      amount: totalZAR.toFixed(2),
      item_name: itemDescription.substring(0, 100), // PayFast has 100 char limit
      item_description: `Order ${orderId}`.substring(0, 255),
    };

    // Generate signature - PayFast requires specific format
    // 1. Sort keys alphabetically
    // 2. Exclude empty values and signature field
    // 3. URL encode values but convert spaces to +
    // 4. Join with &
    const sortedKeys = Object.keys(paymentData).sort();
    const signatureParts: string[] = [];
    
    for (const key of sortedKeys) {
      const value = paymentData[key];
      if (value !== "" && key !== "signature") {
        // PayFast requires spaces as + and specific encoding
        const encodedValue = encodeURIComponent(value.trim())
          .replace(/%20/g, "+");
        signatureParts.push(`${key}=${encodedValue}`);
      }
    }
    
    const signatureString = signatureParts.join("&");
    console.log("Signature string:", signatureString);
    
    // Create MD5 hash for signature using crypto-js
    const signature = CryptoJS.MD5(signatureString).toString();
    console.log("Generated signature:", signature);

    paymentData.signature = signature;

    // Build PayFast URL with form data
    const payfastUrl = "https://www.payfast.co.za/eng/process";

    console.log("PayFast payment created for order:", orderId);

    return new Response(
      JSON.stringify({
        paymentUrl: payfastUrl,
        paymentData: paymentData,
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error: any) {
    console.error("Error creating PayFast payment:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
};

serve(handler);
