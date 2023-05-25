import { PageProps } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";

export default function Greet(props: PageProps) {
  return (
    <>
      <Head>
        <title>Browse Rooms</title>
      </Head>
      <main class="p-8">
        <div>
          <h3>room Name</h3>
        </div>
      </main>
    </>
  );
}
