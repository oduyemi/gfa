
"use client";

import { useState } from "react";

export type SubmissionStatus = "idle" | "loading" | "success" | "error";

export function useContactSubmission() {
  const [status, setStatus] = useState<SubmissionStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function submit(payload: Record<string, unknown>) {
    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(
          data?.message || "Unable to submit your enquiry."
        );
      }

      setStatus("success");
      return true;
    } catch (error) {
      setStatus("error");

      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );

      return false;
    }
  }

  function reset() {
    setStatus("idle");
    setErrorMessage("");
  }

  return {
    status,
    errorMessage,
    submit,
    reset,
  };
}
