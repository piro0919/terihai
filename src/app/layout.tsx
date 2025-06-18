// eslint-disable-next-line filenames/match-exported
import { M_PLUS_Rounded_1c } from "next/font/google";
import type { Metadata } from "next";
import "./globals.css";

const notoSansJP = M_PLUS_Rounded_1c({
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  description: "",
  title: "てり杯",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): React.JSX.Element {
  return (
    <html lang="ja">
      <body className={notoSansJP.className}>{children}</body>
    </html>
  );
}
