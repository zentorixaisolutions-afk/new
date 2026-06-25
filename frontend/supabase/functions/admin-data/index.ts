import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-admin-token",
  "Access-Control-Allow-Methods": "GET, POST, PATCH, DELETE, OPTIONS",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
  const serviceKey = Deno.env.get("SUPABASE_SERVICE_KEY")!;
  const supabase = createClient(supabaseUrl, serviceKey);

  // Check for admin token in X-Admin-Token header OR Authorization Bearer
  const adminToken = req.headers.get("X-Admin-Token") || req.headers.get("Authorization")?.replace("Bearer ", "");

  if (!adminToken) {
    return new Response(JSON.stringify({ success: false, message: "Unauthorized" }), {
      status: 401,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  // Verify admin session token
  const { data: session, error: sessionErr } = await supabase
    .from("admin_sessions")
    .select("user_id")
    .eq("token", adminToken)
    .gt("expires_at", new Date().toISOString())
    .maybeSingle();

  if (sessionErr || !session) {
    return new Response(JSON.stringify({ success: false, message: "Invalid or expired session." }), {
      status: 401,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const url = new URL(req.url);
  const resource = url.searchParams.get("resource");

  try {
    // ─── Services ─────────────────────────────────────
    if (resource === "services") {
      if (req.method === "GET") {
        const { data, error } = await supabase.from("services").select("*").order("sort_order");
        if (error) throw error;
        return new Response(JSON.stringify({ success: true, data }), {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      if (req.method === "POST") {
        const body = await req.json();
        const { id, title, slug, description, icon, image_url, features, sort_order, published } = body;

        if (!title) {
          return new Response(JSON.stringify({ success: false, message: "Title is required." }), {
            status: 400,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          });
        }

        const payload: Record<string, unknown> = {
          title,
          slug: slug || title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""),
          description: description || "",
          icon: icon || "",
          image_url: image_url || null,
          features: features || [],
          sort_order: sort_order ?? 0,
          published: published ?? true,
        };

        let result;
        if (id) {
          result = await supabase.from("services").upsert({ id, ...payload } as any).select().single();
        } else {
          result = await supabase.from("services").insert(payload as any).select().single();
        }

        if (result.error) throw result.error;
        return new Response(JSON.stringify({ success: true, data: result.data }), {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      if (req.method === "DELETE") {
        const body = await req.json();
        if (!body.id) {
          return new Response(JSON.stringify({ success: false, message: "ID is required." }), {
            status: 400,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          });
        }
        const { error } = await supabase.from("services").delete().eq("id", body.id);
        if (error) throw error;
        return new Response(JSON.stringify({ success: true, message: "Deleted." }), {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
    }

    // ─── Blog Posts ───────────────────────────────────
    if (resource === "blog-posts") {
      if (req.method === "GET") {
        const { data, error } = await supabase.from("blog_posts").select("*").order("created_at", { ascending: false });
        if (error) throw error;
        return new Response(JSON.stringify({ success: true, data }), {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      if (req.method === "POST") {
        const body = await req.json();
        const { id, title, slug, excerpt, content, category, cover_image_url, author, published, published_at } = body;

        if (!title) {
          return new Response(JSON.stringify({ success: false, message: "Title is required." }), {
            status: 400,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          });
        }

        const payload: Record<string, unknown> = {
          title,
          slug: slug || title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""),
          excerpt: excerpt || "",
          content: content || "",
          category: category || "",
          cover_image_url: cover_image_url || null,
          author: author || "",
          published: published ?? false,
          published_at: published_at || null,
        };

        if (published && !payload.published_at) {
          payload.published_at = new Date().toISOString();
        }

        let result;
        if (id) {
          result = await supabase.from("blog_posts").upsert({ id, ...payload } as any).select().single();
        } else {
          result = await supabase.from("blog_posts").insert(payload as any).select().single();
        }

        if (result.error) throw result.error;
        return new Response(JSON.stringify({ success: true, data: result.data }), {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      if (req.method === "DELETE") {
        const body = await req.json();
        if (!body.id) {
          return new Response(JSON.stringify({ success: false, message: "ID is required." }), {
            status: 400,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          });
        }
        const { error } = await supabase.from("blog_posts").delete().eq("id", body.id);
        if (error) throw error;
        return new Response(JSON.stringify({ success: true, message: "Deleted." }), {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
    }

    // ─── Contacts ─────────────────────────────────────
    if (resource === "contacts") {
      if (req.method === "GET") {
        const { data, error } = await supabase.from("contact_submissions").select("*").order("created_at", { ascending: false });
        if (error) throw error;
        return new Response(JSON.stringify({ success: true, data }), {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      if (req.method === "PATCH") {
        const body = await req.json();
        if (!body.id || !body.status) {
          return new Response(JSON.stringify({ success: false, message: "ID and status are required." }), {
            status: 400,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          });
        }
        const { error } = await supabase.from("contact_submissions").update({ status: body.status }).eq("id", body.id);
        if (error) throw error;
        return new Response(JSON.stringify({ success: true, message: "Updated." }), {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      if (req.method === "DELETE") {
        const body = await req.json();
        if (!body.id) {
          return new Response(JSON.stringify({ success: false, message: "ID is required." }), {
            status: 400,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          });
        }
        const { error } = await supabase.from("contact_submissions").delete().eq("id", body.id);
        if (error) throw error;
        return new Response(JSON.stringify({ success: true, message: "Deleted." }), {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
    }

    // ─── Dashboard Stats ──────────────────────────────
    if (req.method === "GET" && resource === "dashboard") {
      const [servicesRes, postsRes, messagesRes, unreadRes] = await Promise.all([
        supabase.from("services").select("id", { count: "exact", head: true }),
        supabase.from("blog_posts").select("id", { count: "exact", head: true }),
        supabase.from("contact_submissions").select("id", { count: "exact", head: true }),
        supabase.from("contact_submissions").select("id", { count: "exact", head: true }).eq("status", "new"),
      ]);

      return new Response(JSON.stringify({
        success: true,
        data: {
          totalServices: servicesRes.count ?? 0,
          totalPosts: postsRes.count ?? 0,
          totalMessages: messagesRes.count ?? 0,
          unreadMessages: unreadRes.count ?? 0,
        },
      }), {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ success: false, message: "Unknown resource or method" }), {
      status: 404,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("admin-data error:", err);
    return new Response(JSON.stringify({ success: false, message: err.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
