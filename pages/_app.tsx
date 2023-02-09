import { SessionProvider } from "next-auth/react";
import NavBar from "../components/navBar";
import "../styles/normalize.css";
import "../styles/main.scss";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: any) {
  return (
    <SessionProvider session={session}>
      <NavBar />
      <Component {...pageProps} />
    </SessionProvider>
  );
}
