import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

async function main() {
  const { data, error } = await supabase.from('services').select('*').limit(1);
  if (error) {
    console.log("ERROR:", error.message);
  } else {
    console.log("TABLE EXISTS:", data);
  }
}
main();
