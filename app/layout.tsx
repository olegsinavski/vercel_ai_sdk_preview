import "./globals.css";
import { GeistSans } from "geist/font/sans";
import { Toaster } from "sonner";
import { cn } from "@/lib/utils";

export const metadata = {
  title: "Simple Hello World App",
  description:
    "A simplified application that displays Hello World greetings from a Python endpoint.",
  openGraph: {
    images: [
      {
        url: "/og?title=Simple Hello World App",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: [
      {
        url: "/og?title=Simple Hello World App",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head></head>
      <body className={cn(GeistSans.className, "antialiased dark")}>
        <Toaster position="top-center" richColors />
        {children}
      </body>
    </html>
  );
}
