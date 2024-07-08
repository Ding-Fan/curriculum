"use client";

import "./globals.css";
import { Provider } from "jotai";

import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween"; // import plugin
import customParseFormat from "dayjs/plugin/customParseFormat"; // import plugin
dayjs.extend(isBetween);
dayjs.extend(customParseFormat);

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
