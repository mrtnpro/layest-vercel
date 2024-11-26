"use client";

import Error from "next/error";

import Header from "@/components/app-header";

export default function AppNotFound() {
  return (
    <>
      <Header title="Not Found" />
      <Error statusCode={404} />
    </>
  );
}
