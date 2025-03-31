import { Geist, Geist_Mono } from "next/font/google";
import ChatbotToggle from "./components/ChatbotToggle";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Centonis Chatbot Demo",
  description: "Centonis AI Chatbot Demo Website",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <ChatbotToggle />
      </body>
    </html>
  );
}
