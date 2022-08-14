import type { AppProps } from "next/app";

import "backpack.css";

import "@fontsource/lato/300.css";
import "@fontsource/lato/400.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div>
      <style global jsx>
        {`
          html {
            font-family: "Lato", ui-sans-serif, system-ui, -apple-system,
              BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial,
              "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
              "Segoe UI Symbol", "Noto Color Emoji";
          }
        `}
      </style>
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
