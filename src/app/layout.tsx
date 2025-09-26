import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Tasks - Google Tasks Clone",
  description: "A beautiful and simple todo list app inspired by Google Tasks",
  keywords: ["todo", "tasks", "productivity", "google tasks"],
  authors: [{ name: "Google Tasks Clone" }],
};

/**
 * The root layout for the application.
 * This component wraps all pages and provides the basic HTML structure.
 * @param {Readonly<{children: React.ReactNode;}>} props - The props for the component.
 * @param {React.ReactNode} props.children - The child components to render within the layout.
 * @returns {JSX.Element} The rendered HTML structure.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} font-sans antialiased bg-gray-50`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}