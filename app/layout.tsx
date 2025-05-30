import type { Metadata } from "next";
// import { Inter } from "next/font/google";
import { AuthProvider } from "./context/AuthContext";
import "./globals.css";

// const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Writing in Disciplines",
  description: "Dashboard Management System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
