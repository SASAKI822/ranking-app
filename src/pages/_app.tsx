import type { AppProps } from "next/app";
import "../styles/globals.css";
import { RecoilRoot } from "recoil";
import { ProSidebarProvider } from "react-pro-sidebar";
import AuthProvider from "@/lib/AuthProvider";
export default function App({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <AuthProvider>
        <ProSidebarProvider>
          <Component {...pageProps} />
        </ProSidebarProvider>
      </AuthProvider>
    </RecoilRoot>
  );
}
