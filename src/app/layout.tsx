import type { Metadata } from "next";
import { Sora } from "next/font/google";
import "./globals.css";
import SideBar from "@/components/SideBar";
import Loading from "./loading";
import Navbar from "@/components/Navbar";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Toaster } from "react-hot-toast";
import DisableInspect from "@/components/DisableInspect";
import { Analytics } from "@vercel/analytics/next";

const font = Sora({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sarkhail's Portfolio",
  description:
    "A fully functional, responsive, and aesthetically pleasing modern animated portfolio website created by Sarkhail.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/letter-s.png" />
      </head>
      <body className={`${font.className} dark:bg-black text-white`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <DisableInspect />
          <Toaster position="top-center" />
          <Loading />
          <Navbar />
          <SideBar />
          {children}
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
