"use client";

import React from "react";

import UncaughtError from "@/components/uncaught-error";

type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function Error({ error, reset }: ErrorProps) {
  React.useEffect(() => {
    // TODO: Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return <UncaughtError onReset={reset} />;
}
