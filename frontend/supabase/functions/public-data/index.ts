import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
  const serviceKey = Deno.env.get("SUPABASE_SERVICE_KEY")!;
  const supabase = createClient(supabaseUrl, serviceKey);

  const url = new URL(req.url);
  const resource = url.searchParams.get("resource");

  try {
    // ─── GET Services ─────────────────────────────────
    if (req.method === "GET" && resource === "services") {
      const published = url.searchParams.get("published");
      let query = supabase.from("services").select("*").order("sort_order");
      if (published === "true") query = query.eq("published", true);
      const { data, error } = await query;
      if (error) throw error;
      return new Response(JSON.stringify({ success: true, data }), {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // ─── GET Blog Posts ───────────────────────────────
    if (req.method === "GET" && resource === "blog-posts") {
      const published = url.searchParams.get("published");
      let query = supabase.from("blog_posts").select("*").order("created_at", { ascending: false });
      if (published === "true") query = query.eq("published", true);
      const { data, error } = await query;
      if (error) throw error;
      return new Response(JSON.stringify({ success: true, data }), {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // ─── POST Contact Submit ──────────────────────────
    if (req.method === "POST" && resource === "contact-submit") {
      const body = await req.json();
      const { name, email, phone, company, service_type, message } = body;
      
      if (!name || !email || !message) {
        return new Response(JSON.stringify({ success: false, message: "Name, email and message are required." }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      const { error } = await supabase.from("contact_submissions").insert({
        name,
        email,
        phone: phone || "",
        company: company || "",
        service_type: service_type || "",
        message,
        status: "new",
      });

      if (error) throw error;

      return new Response(JSON.stringify({ success: true, message: "Message sent successfully." }), {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ success: false, message: "Unknown resource or method" }), {
      status: 404,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("public-data error:", err);
    return new Response(JSON.stringify({ success: false, message: err.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
