import Header from "@/components/layout/Header";
import "../scss/main.scss";
import type { Metadata } from "next";
import Footer from "@/components/layout/Footer";
import Head from "next/head";

export const metadata: Metadata = {
  title: "The Newtonian Newspaper",
  description: "Newspaper by The Newton Group's Students",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </Head>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
