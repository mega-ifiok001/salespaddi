import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://vejgjfjnmpfayrhenakt.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZlamdqZmpubXBmYXlyaGVuYWt0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI4MDU2MDcsImV4cCI6MjA4ODM4MTYwN30.YnC0Nnt2cj0ctSFvBM8Iix_rO9WlHSaRnGOA-I1Y9Pc";

export const supabase = createClient(supabaseUrl, supabaseKey);