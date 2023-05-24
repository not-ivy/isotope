import { Head } from "$fresh/runtime.ts";
import IconChartBubbleFilled from "tabler-icons/chart-bubble-filled.tsx";
import IconArrowUpRight from "tabler-icons/arrow-up-right.tsx";

export default function Home() {
  return (
    <>
      <Head>
      </Head>
      <main class="p-8 min-h-screen flex justify-between gap-x-64">
        <div class="w-full flex flex-col justify-between">
          <IconChartBubbleFilled class="text-purple-500 w-8 h-8" />
          <div>
            <h1 class="text-5xl font-extrabold text-purple-900 max-w-md">
              Simple peer-to-peer messaging platform
            </h1>
            <hr class="border-none h-4" />
            <div class="flex items-center">
              <span>Made possible with</span>
              <a
                class="bg-gray-100 hover:bg-gray-200 transition-colors inline-flex items-center rounded-full px-2 py-0.5 mx-2"
                href="https://deno.land"
              >
                <img
                  src="https://raw.githubusercontent.com/denolib/high-res-deno-logo/master/deno_hr_circle.svg"
                  class="w-5 h-5 mr-2"
                />Deno
              </a>{" "}
              and WebCrypto
            </div>
            <hr class="border-none h-8" />
            <a href="/signup" class="w-min block">
              <span class="flex w-min items-center px-5 py-3 rounded-full text-white bg-green-400 gap-x-2 shadow-lg hover:bg-green-300 transition-colors active:bg-green-500">
                <span class="font-bold whitespace-nowrap">Start Chatting</span>
                <IconArrowUpRight class="inline ml-3" />
              </span>
            </a>
          </div>
          <div class="flex items-center w-full gap-x-4 md:gap-x-8">
            <div class="bg-gray-100 rounded-lg p-4 w-full">
              <h5 class="font-bold text-sm">Github Stars</h5>
              <span class="text-xs">25565</span>
            </div>
            <div class="bg-gray-100 rounded-lg p-4 w-full">
              <h5 class="font-bold text-sm">Registered Users</h5>
              <span class="text-xs">25565</span>
            </div>
          </div>
        </div>
        <div class="w-full rounded-3xl bg-purple-300 md:block hidden">
        </div>
      </main>
    </>
  );
}
