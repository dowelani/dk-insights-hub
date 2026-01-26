import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { Resend } from "resend";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

interface OrderEmailRequest {
  orderId: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { orderId }: OrderEmailRequest = await req.json();

    if (!orderId) {
      return new Response(JSON.stringify({ error: "Order ID required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    // Fetch order details
    const { data: order, error: orderError } = await supabase
      .from("orders")
      .select("*")
      .eq("id", orderId)
      .single();

    if (orderError || !order) {
      console.error("Order not found:", orderError);
      return new Response(JSON.stringify({ error: "Order not found" }), {
        status: 404,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Fetch order items
    const { data: orderItems, error: itemsError } = await supabase
      .from("order_items")
      .select("*")
      .eq("order_id", orderId);

    if (itemsError) {
      console.error("Error fetching order items:", itemsError);
    }

    // Fetch user profile
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("*")
      .eq("user_id", order.user_id)
      .single();

    if (profileError) {
      console.error("Error fetching profile:", profileError);
    }

    const customerEmail = profile?.email || "";
    const customerName = `${profile?.first_name || ""} ${profile?.last_name || ""}`.trim() || "Customer";
    const customerPhone = profile?.phone || "Not provided";
    const customerAddress = [
      profile?.address,
      profile?.city,
      profile?.postal_code,
      profile?.country
    ].filter(Boolean).join(", ") || "Not provided";

    const businessEmail = Deno.env.get("BUSINESS_EMAIL");
    const orderDate = new Date(order.created_at).toLocaleDateString("en-ZA", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    // Generate items HTML
    const itemsHtml = (orderItems || []).map(item => `
      <tr>
        <td style="padding: 12px; border-bottom: 1px solid #e5e7eb;">${item.product_title}</td>
        <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; text-align: center;">${item.quantity}</td>
        <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; text-align: right;">R${item.price_zar.toFixed(2)}</td>
      </tr>
    `).join("");

    // Customer receipt email
    const customerReceiptHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Order Receipt</title>
      </head>
      <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9fafb;">
        <div style="background: linear-gradient(135deg, #3b82f6, #8b5cf6); padding: 30px; border-radius: 12px 12px 0 0; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 28px;">DK Code & Insights</h1>
          <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0;">Order Confirmation</p>
        </div>
        
        <div style="background: white; padding: 30px; border-radius: 0 0 12px 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
          <p style="color: #374151; font-size: 16px;">Hi ${customerName},</p>
          <p style="color: #6b7280; font-size: 14px;">Thank you for your order! We've received your payment and will begin processing your order shortly.</p>
          
          <div style="background: #f3f4f6; padding: 16px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0; color: #6b7280; font-size: 12px;">ORDER NUMBER</p>
            <p style="margin: 4px 0 0; color: #111827; font-weight: 600; font-size: 14px;">${orderId}</p>
            <p style="margin: 10px 0 0; color: #6b7280; font-size: 12px;">DATE</p>
            <p style="margin: 4px 0 0; color: #111827; font-size: 14px;">${orderDate}</p>
          </div>
          
          <h3 style="color: #111827; margin: 24px 0 12px;">Order Summary</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <thead>
              <tr style="background: #f9fafb;">
                <th style="padding: 12px; text-align: left; color: #6b7280; font-size: 12px; text-transform: uppercase;">Item</th>
                <th style="padding: 12px; text-align: center; color: #6b7280; font-size: 12px; text-transform: uppercase;">Qty</th>
                <th style="padding: 12px; text-align: right; color: #6b7280; font-size: 12px; text-transform: uppercase;">Price</th>
              </tr>
            </thead>
            <tbody>
              ${itemsHtml}
            </tbody>
          </table>
          
          <div style="border-top: 2px solid #e5e7eb; margin-top: 20px; padding-top: 20px;">
            <div style="display: flex; justify-content: space-between; font-size: 18px; font-weight: 600;">
              <span style="color: #111827;">Total:</span>
              <span style="color: #3b82f6;">R${order.total_zar.toFixed(2)}</span>
            </div>
          </div>
          
          <div style="margin-top: 30px; padding: 20px; background: #f0fdf4; border-radius: 8px; border-left: 4px solid #22c55e;">
            <p style="margin: 0; color: #166534; font-weight: 600;">Payment Successful ✓</p>
            <p style="margin: 8px 0 0; color: #15803d; font-size: 14px;">Your payment has been confirmed. We'll be in touch soon with next steps.</p>
          </div>
          
          <div style="margin-top: 30px; text-align: center; padding-top: 20px; border-top: 1px solid #e5e7eb;">
            <p style="color: #6b7280; font-size: 14px; margin: 0;">Questions? Contact us on WhatsApp</p>
            <a href="https://wa.me/27660462575" style="display: inline-block; margin-top: 10px; padding: 10px 20px; background: #25D366; color: white; text-decoration: none; border-radius: 6px; font-weight: 500;">Message on WhatsApp</a>
          </div>
        </div>
        
        <div style="text-align: center; padding: 20px; color: #9ca3af; font-size: 12px;">
          <p>© ${new Date().getFullYear()} DK Code & Insights. All rights reserved.</p>
        </div>
      </body>
      </html>
    `;

    // Business notification email
    const businessNotificationHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>New Order Received</title>
      </head>
      <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9fafb;">
        <div style="background: linear-gradient(135deg, #22c55e, #16a34a); padding: 30px; border-radius: 12px 12px 0 0; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 28px;">🎉 New Order Received!</h1>
          <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0;">Payment Confirmed</p>
        </div>
        
        <div style="background: white; padding: 30px; border-radius: 0 0 12px 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
          <div style="background: #fef3c7; padding: 16px; border-radius: 8px; margin-bottom: 20px; border-left: 4px solid #f59e0b;">
            <p style="margin: 0; color: #92400e; font-weight: 600;">Order Total: R${order.total_zar.toFixed(2)}</p>
          </div>
          
          <h3 style="color: #111827; margin: 0 0 12px;">Order Details</h3>
          <div style="background: #f3f4f6; padding: 16px; border-radius: 8px; margin-bottom: 20px;">
            <p style="margin: 0 0 8px; color: #6b7280; font-size: 12px;">ORDER ID</p>
            <p style="margin: 0 0 16px; color: #111827; font-weight: 600;">${orderId}</p>
            <p style="margin: 0 0 8px; color: #6b7280; font-size: 12px;">DATE</p>
            <p style="margin: 0; color: #111827;">${orderDate}</p>
          </div>
          
          <h3 style="color: #111827; margin: 24px 0 12px;">Customer Information</h3>
          <div style="background: #eff6ff; padding: 16px; border-radius: 8px; margin-bottom: 20px;">
            <p style="margin: 0 0 8px;"><strong>Name:</strong> ${customerName}</p>
            <p style="margin: 0 0 8px;"><strong>Email:</strong> ${customerEmail}</p>
            <p style="margin: 0 0 8px;"><strong>Phone:</strong> ${customerPhone}</p>
            <p style="margin: 0;"><strong>Address:</strong> ${customerAddress}</p>
          </div>
          
          <h3 style="color: #111827; margin: 24px 0 12px;">Items Ordered</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <thead>
              <tr style="background: #f9fafb;">
                <th style="padding: 12px; text-align: left; color: #6b7280; font-size: 12px; text-transform: uppercase;">Item</th>
                <th style="padding: 12px; text-align: center; color: #6b7280; font-size: 12px; text-transform: uppercase;">Qty</th>
                <th style="padding: 12px; text-align: right; color: #6b7280; font-size: 12px; text-transform: uppercase;">Price (ZAR)</th>
              </tr>
            </thead>
            <tbody>
              ${itemsHtml}
            </tbody>
          </table>
          
          <div style="border-top: 2px solid #e5e7eb; margin-top: 20px; padding-top: 20px;">
            <div style="display: flex; justify-content: space-between; font-size: 20px; font-weight: 700;">
              <span style="color: #111827;">Total:</span>
              <span style="color: #22c55e;">R${order.total_zar.toFixed(2)}</span>
            </div>
            <p style="color: #6b7280; font-size: 12px; margin: 4px 0 0;">USD: $${order.total_usd.toFixed(2)}</p>
          </div>
        </div>
      </body>
      </html>
    `;

    const emailPromises = [];

    // Send customer receipt
    if (customerEmail) {
      emailPromises.push(
        resend.emails.send({
          from: "DK Code & Insights <noreply@resend.dev>",
          to: [customerEmail],
          subject: `Order Confirmation - ${orderId}`,
          html: customerReceiptHtml,
        })
      );
    }

    // Send business notification
    if (businessEmail) {
      emailPromises.push(
        resend.emails.send({
          from: "DK Code & Insights Orders <noreply@resend.dev>",
          to: [businessEmail],
          subject: `🎉 New Order - R${order.total_zar.toFixed(2)} - ${customerName}`,
          html: businessNotificationHtml,
        })
      );
    }

    const results = await Promise.allSettled(emailPromises);
    
    results.forEach((result, index) => {
      if (result.status === "fulfilled") {
        console.log(`Email ${index + 1} sent successfully`);
      } else {
        console.error(`Email ${index + 1} failed:`, result.reason);
      }
    });

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error: any) {
    console.error("Error sending order emails:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
};

serve(handler);
