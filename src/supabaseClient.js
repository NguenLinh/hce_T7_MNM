import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://bjcmczefsxwhkfzallxm.supabase.co";
const SUPABASE_API_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJqY21jemVmc3h3aGtmemFsbHhtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE5Nzg5OTgsImV4cCI6MjA3NzU1NDk5OH0.FLU8TC7BpWxc3_Ik7CEvjXzWU_gtSRqMWsxxpHK_3B4";

export const supabase = createClient(SUPABASE_URL, SUPABASE_API_KEY);
