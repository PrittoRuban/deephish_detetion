import { createClient } from "@/utils/supabase/server";
export default async function Home() {
  const supabase = await createClient();
  const { data: instruments } = await supabase.from("instruments").select();

  return (
    <div>
      <h1>Secure One</h1>
      <p>
        Secure One is a secure platform which provides various security services
        such as phishing detection, deepfake detection, and more.
      </p>

      {/* Below is the basic server setup for the Secure One platform: */}
      <pre>{JSON.stringify(instruments, null, 2)}</pre>

    </div>
  );
}
