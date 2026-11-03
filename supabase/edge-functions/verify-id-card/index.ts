import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { token } = await req.json();

    if (!token) {
      return new Response(JSON.stringify({ error: "Missing verification token" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    // Fetch ID Card with security redaction of private contact data
    const { data: idCard, error } = await supabaseAdmin
      .from("id_cards")
      .select(`
        id,
        user_id,
        role,
        id_number,
        status,
        issue_date,
        expiry_date,
        profiles (
          full_name,
          bn_name,
          avatar_url,
          division_id,
          district_id,
          upazila_id,
          is_verified
        ),
        donor_profiles (
          blood_group,
          verified_donations_count,
          availability_status
        )
      `)
      .eq("verification_token", token)
      .single();

    if (error || !idCard) {
      return new Response(JSON.stringify({ isValid: false, message: "Token not found" }), {
        status: 404,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Log verification event
    await supabaseAdmin.from("id_verification_logs").insert({
      id_card_id: idCard.id,
      verification_token: token,
      is_valid: idCard.status === "ACTIVE",
    });

    return new Response(
      JSON.stringify({
        isValid: idCard.status === "ACTIVE",
        card: idCard,
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
