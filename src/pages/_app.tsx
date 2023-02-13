import type { AppProps } from "next/app";
import "../styles/globals.css";
import { RecoilRoot } from "recoil";
import { ProSidebarProvider } from "react-pro-sidebar";
export default function App({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <ProSidebarProvider>
        <Component {...pageProps} />
      </ProSidebarProvider>
    </RecoilRoot>
  );
}
