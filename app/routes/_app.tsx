import { AppProps } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";

export default function RootLayout({ Component }: AppProps) {
  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Component />
    </>
  );
}
