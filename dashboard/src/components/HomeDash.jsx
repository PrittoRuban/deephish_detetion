import { createClient } from "@/utils/supabase/server";

export default async function HomeDash() {
  const supabase = await createClient();
  const { data: instruments } = await supabase.from("instruments").select();

  return (
    <div className="bg-white dark:bg-gray-900 text-black dark:text-white min-h-screen p-4 pt-8">
      <div className="">
        <h1 className="text-2xl font-bold mb-4">Secure One</h1>
        <p className="mb-4">
          Secure One is a secure platform which provides various security
          services such as phishing detection, deepfake detection, and more.
        </p>

        {/* Below is the basic server setup for the Secure One platform: */}
        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded">
          {JSON.stringify(instruments, null, 2)}
        </pre>
      </div>
    </div>
  );
}
