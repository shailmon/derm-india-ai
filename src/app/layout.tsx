import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DermIndia AI | Skin Condition Analyzer & Medication Finder",
  description: "Advanced dermatological analysis and medication finding specifically for the Indian subcontinent.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <body>
        <main>{children}</main>
        <footer className="footer-disclaimer">
          <div className="container">
            <p>⚕️ This analysis is for informational purposes only and is not a substitute for professional medical diagnosis. Please consult a licensed dermatologist or healthcare provider for proper evaluation and treatment.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
