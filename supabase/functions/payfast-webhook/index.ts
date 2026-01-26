import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // PayFast sends data as application/x-www-form-urlencoded
    const formData = await req.formData();
    const paymentData: Record<string, string> = {};
    
    formData.forEach((value, key) => {
      paymentData[key] = value.toString();
    });

    console.log("PayFast webhook received:", JSON.stringify(paymentData));

    const orderId = paymentData.m_payment_id;
    const paymentStatus = paymentData.payment_status;
    const pfPaymentId = paymentData.pf_payment_id;

    if (!orderId) {
      console.error("No order ID in PayFast webhook");
      return new Response("OK", { status: 200 });
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    // Update order status based on payment result
    const newStatus = paymentStatus === "COMPLETE" ? "paid" : "payment_failed";

    const { error: updateError } = await supabase
      .from("orders")
      .update({ 
        status: newStatus,
        payment_method: "payfast",
        updated_at: new Date().toISOString()
      })
      .eq("id", orderId);

    if (updateError) {
      console.error("Error updating order:", updateError);
    } else {
      console.log(`Order ${orderId} updated to status: ${newStatus}`);
    }

    // If payment successful, trigger email notifications
    if (paymentStatus === "COMPLETE") {
      try {
        const response = await fetch(`${Deno.env.get("SUPABASE_URL")}/functions/v1/send-order-emails`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")}`,
          },
          body: JSON.stringify({ orderId }),
        });
        
        if (!response.ok) {
          console.error("Failed to send order emails:", await response.text());
        } else {
          console.log("Order emails triggered for order:", orderId);
        }
      } catch (emailError) {
        console.error("Error triggering order emails:", emailError);
      }
    }

    // PayFast expects a 200 OK response
    return new Response("OK", { status: 200 });
  } catch (error: any) {
    console.error("PayFast webhook error:", error);
    return new Response("OK", { status: 200 });
  }
};

serve(handler);
