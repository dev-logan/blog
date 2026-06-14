import Link from "next/link"
import type { PostMeta } from "@/lib/types"

export function PostNav({
  prev,
  next,
}: {
  prev: PostMeta | null
  next: PostMeta | null
}) {
  if (!prev && !next) return null

  return (
    <nav
      className="mt-12 grid grid-cols-1 gap-3 border-t border-zinc-200 pt-8 sm:grid-cols-2 dark:border-zinc-800"
      aria-label="이전 다음 글"
    >
      {prev ? (
        <Link
          href={`/blog/${prev.slug}`}
          className="group flex flex-col gap-1 rounded-lg border border-zinc-200 p-4 transition-colors hover:border-zinc-400 dark:border-zinc-800 dark:hover:border-zinc-600"
        >
          <span className="text-xs text-zinc-400 dark:text-zinc-500">← 이전 글</span>
          <span className="text-sm font-medium text-zinc-900 group-hover:text-zinc-600 dark:text-zinc-100 dark:group-hover:text-zinc-400">
            {prev.title}
          </span>
        </Link>
      ) : (
        <span className="hidden sm:block" />
      )}
      {next ? (
        <Link
          href={`/blog/${next.slug}`}
          className="group flex flex-col gap-1 rounded-lg border border-zinc-200 p-4 text-right transition-colors hover:border-zinc-400 dark:border-zinc-800 dark:hover:border-zinc-600"
        >
          <span className="text-xs text-zinc-400 dark:text-zinc-500">다음 글 →</span>
          <span className="text-sm font-medium text-zinc-900 group-hover:text-zinc-600 dark:text-zinc-100 dark:group-hover:text-zinc-400">
            {next.title}
          </span>
        </Link>
      ) : (
        <span className="hidden sm:block" />
      )}
    </nav>
  )
}
