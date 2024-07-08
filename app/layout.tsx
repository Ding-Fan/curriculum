"use client";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween"; // import plugin
import customParseFormat from "dayjs/plugin/customParseFormat"; // import plugin
import { twMerge } from "tailwind-merge";
dayjs.extend(isBetween);
dayjs.extend(customParseFormat);

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
