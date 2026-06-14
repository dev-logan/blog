"use client"

import { useRef, useState, type ComponentPropsWithoutRef } from "react"

export function Pre(props: ComponentPropsWithoutRef<"pre">) {
  const ref = useRef<HTMLPreElement>(null)
  const [copied, setCopied] = useState(false)

  async function copy() {
    const text = ref.current?.textContent ?? ""
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      // 클립보드 접근 실패 시 조용히 무시
    }
  }

  return (
    <div className="group/pre relative">
      <button
        type="button"
        onClick={copy}
        aria-label={copied ? "복사됨" : "코드 복사"}
        className="absolute right-2 top-2 z-10 rounded-md border border-zinc-200 bg-white/80 px-2 py-1 text-xs text-zinc-500 opacity-0 backdrop-blur transition-opacity hover:text-zinc-900 focus-visible:opacity-100 group-hover/pre:opacity-100 dark:border-zinc-700 dark:bg-zinc-800/80 dark:text-zinc-400 dark:hover:text-zinc-100"
      >
        {copied ? "복사됨" : "복사"}
      </button>
      <pre ref={ref} {...props} />
    </div>
  )
}
