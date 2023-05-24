import { Head } from "$fresh/runtime.ts";
import IconChartBubbleFilled from "tabler-icons/chart-bubble-filled.tsx";
import IconArrowUpRight from "tabler-icons/arrow-up-right.tsx";
import IconLoader2 from "tabler-icons/loader-2.tsx";

export default function Home() {
  return (
    <>
      <Head>
      </Head>
      <main class="p-8 min-h-screen flex justify-between gap-x-32">
        <div class="w-full">
          <IconChartBubbleFilled class="text-purple-500 w-8 h-8" />
          <div class="mt-44">
            <h1 class="text-5xl font-extrabold text-purple-900 max-w-lg">
              Simple peer-to-peer messaging platform
            </h1>
            <hr class="border-none h-8" />
            <div class="flex items-center max-w-md">
              Isotope is a p2p messaging platform built with Deno, WebCrypto,
              and its own protocol.
            </div>
            <hr class="border-none h-8" />
            <div class="flex items-center gap-x-8">
              <a href="/signup" class="w-min block">
                <span class="flex w-min items-center px-5 py-3 rounded-full text-white bg-green-400 gap-x-2 shadow-lg hover:bg-green-300 transition-colors active:bg-green-500">
                  <span class="font-bold whitespace-nowrap">
                    Start Chatting
                  </span>
                  <IconArrowUpRight class="inline ml-3" />
                </span>
              </a>
              <a href="/signup" class="w-min block">
                <span class="flex w-min items-center px-5 py-3 rounded-full text-white bg-purple-500 gap-x-2 shadow-lg hover:bg-purple-400 transition-colors active:bg-purple-600">
                  <span class="font-bold whitespace-nowrap">Learn More</span>
                  <IconArrowUpRight class="inline ml-3" />
                </span>
              </a>
            </div>
          </div>
        </div>
        <div class="w-full rounded-3xl bg-purple-300 flex-col justify-end gap-y-6 md:flex p-8 pb-4 hidden shadow-lg">
          <div class="flex items-end gap-x-3">
            <img
              src="https://avatars.githubusercontent.com/u/47074495"
              class="w-6 h-6 rounded-full"
            />
            <p class="px-4 py-2 mb-2 rounded-bl-none bg-blue-400 text-white rounded-xl font-circ select-none">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            </p>
          </div>
          <div class="flex items-end gap-x-3">
            <img
              src="https://avatars.githubusercontent.com/u/47074495"
              class="w-6 h-6 rounded-full"
            />
            <p class="px-4 py-2 mb-2 rounded-bl-none bg-blue-400 text-white rounded-xl font-circ select-none">
              Loremipsumdolorsitametconsectetur.
            </p>
          </div>
          <div class="flex flex-row-reverse items-end gap-x-3">
            <img
              src="https://avatars.githubusercontent.com/u/43452521"
              class="w-6 h-6 rounded-full"
            />
            <p class="px-4 py-2 mb-2 rounded-br-none bg-white rounded-xl font-circ select-none">
              Loremipsumdolorsitametconsectetur.
            </p>
          </div>
          <div class="flex gap-x-4">
            <IconLoader2 class="w-4 h-4 animate-spin" />
            <span class="text-xs">
              <b>Ivy</b> and 3 others are typing...
            </span>
          </div>
        </div>
      </main>
    </>
  );
}
