"use client";

import Error from "next/error";

import Document from "@/components/document";

export default function NotFound() {
  return (
    <Document locale="en">
      <body>
        <Error statusCode={404} />
      </body>
    </Document>
  );
}
