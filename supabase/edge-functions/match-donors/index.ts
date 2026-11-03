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
    const { bloodGroup, districtId, upazilaId } = await req.json();

    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    let query = supabaseAdmin
      .from("donor_profiles")
      .select(`
        id,
        blood_group,
        availability_status,
        verified_donations_count,
        profiles!inner (
          id,
          full_name,
          district_id,
          upazila_id
        )
      `)
      .eq("availability_status", "AVAILABLE");

    if (districtId) {
      query = query.eq("profiles.district_id", districtId);
    }

    const { data: donors, error } = await query;
    if (error) throw error;

    return new Response(JSON.stringify({ count: donors.length, donors }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
