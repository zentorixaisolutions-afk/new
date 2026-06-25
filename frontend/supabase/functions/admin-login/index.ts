import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const SALT = "sins-tech-admin-salt-2024-secure";

function generateToken(): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  const bytes = crypto.getRandomValues(new Uint8Array(64));
  for (let i = 0; i < 64; i++) {
    result += chars[bytes[i] % chars.length];
  }
  return result;
}

async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password + SALT);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_KEY")!;
    const supabase = createClient(supabaseUrl, serviceKey);

    const body = await req.json();
    const { username, password, action, token } = body;

    // --- Setup: Create admin user ---
    if (action === "setup") {
      const { data: existing } = await supabase
        .from("admin_users")
        .select("id")
        .eq("username", "admin")
        .maybeSingle();

      if (!existing) {
        const hashed = await hashPassword("Admin@12345");
        const { error: insertErr } = await supabase
          .from("admin_users")
          .insert({
            username: "admin",
            password_hash: hashed,
            display_name: "SINS Admin",
          });
        if (insertErr) throw insertErr;
      }

      return new Response(
        JSON.stringify({ success: true, message: "Admin user ready" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // --- Reset: Force update password hash ---
    if (action === "reset") {
      const hashed = await hashPassword("Admin@12345");
      await supabase
        .from("admin_users")
        .update({ password_hash: hashed })
        .eq("username", "admin");
      return new Response(
        JSON.stringify({ success: true, message: "Password reset", hash: hashed }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // --- Logout: Delete session ---
    if (action === "logout" && token) {
      await supabase.from("admin_sessions").delete().eq("token", token);
      return new Response(
        JSON.stringify({ success: true, message: "Logged out" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // --- Login ---
    if (!username || !password) {
      return new Response(
        JSON.stringify({ success: false, message: "Username and password required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const { data: user, error: userErr } = await supabase
      .from("admin_users")
      .select("*")
      .eq("username", username)
      .maybeSingle();

    if (userErr || !user) {
      return new Response(
        JSON.stringify({ success: false, message: "Invalid credentials" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const inputHash = await hashPassword(password);
    if (inputHash !== user.password_hash) {
      return new Response(
        JSON.stringify({ success: false, message: "Invalid credentials" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    await supabase
      .from("admin_users")
      .update({ last_login: new Date().toISOString() })
      .eq("id", user.id);

    await supabase
      .from("admin_sessions")
      .delete()
      .lt("expires_at", new Date().toISOString());

    const newToken = generateToken();
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();

    await supabase.from("admin_sessions").insert({
      user_id: user.id,
      token: newToken,
      expires_at: expiresAt,
    });

    return new Response(
      JSON.stringify({
        success: true,
        data: {
          token: newToken,
          user: {
            id: user.id,
            username: user.username,
            display_name: user.display_name,
          },
        },
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err: any) {
    return new Response(
      JSON.stringify({ success: false, message: err.message || "Server error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
