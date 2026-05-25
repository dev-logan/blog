"use client"

import { useState } from "react"

export function DevToolbar() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [message, setMessage] = useState("")

  async function handlePublish() {
    setStatus("loading")
    setMessage("")

    try {
      const res = await fetch("/api/publish", { method: "POST" })
      const data = await res.json()

      if (data.success) {
        setStatus("success")
        setMessage(data.message)
      } else {
        setStatus("error")
        setMessage(data.message)
      }
    } catch {
      setStatus("error")
      setMessage("요청 실패")
    }

    setTimeout(() => setStatus("idle"), 4000)
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
      {message && (
        <div
          className={`max-w-xs rounded-lg px-4 py-2 text-sm whitespace-pre-wrap ${
            status === "success"
              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
              : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
          }`}
        >
          {message}
        </div>
      )}
      <button
        onClick={handlePublish}
        disabled={status === "loading"}
        className="cursor-pointer rounded-full bg-zinc-900 px-5 py-2.5 text-sm font-medium text-white shadow-lg hover:bg-zinc-700 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300 transition-colors"
      >
        {status === "loading" ? "배포 중..." : "🚀 배포"}
      </button>
    </div>
  )
}
