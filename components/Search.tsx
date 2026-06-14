"use client"

import { useMemo, useState } from "react"
import type { PostMeta } from "@/lib/types"
import { PostCard } from "./PostCard"

export function Search({ posts }: { posts: PostMeta[] }) {
  const [query, setQuery] = useState("")

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return posts
    return posts.filter((post) => {
      const haystack = [post.title, post.description, ...post.tags]
        .join(" ")
        .toLowerCase()
      return haystack.includes(q)
    })
  }, [query, posts])

  return (
    <div>
      <div className="relative">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400"
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.3-4.3" />
        </svg>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="제목, 설명, 태그로 검색"
          aria-label="글 검색"
          autoFocus
          className="w-full rounded-lg border border-zinc-200 bg-transparent py-2.5 pl-10 pr-4 text-sm text-zinc-900 outline-none transition-colors placeholder:text-zinc-400 focus:border-zinc-400 dark:border-zinc-800 dark:text-zinc-100 dark:focus:border-zinc-600"
        />
      </div>

      <p className="mt-4 text-xs text-zinc-400 dark:text-zinc-500">
        {query.trim() ? `${results.length}개의 글` : `전체 ${posts.length}개의 글`}
      </p>

      <div className="mt-2">
        {results.length > 0 ? (
          results.map((post) => <PostCard key={post.slug} post={post} />)
        ) : (
          <p className="py-12 text-center text-sm text-zinc-500 dark:text-zinc-400">
            검색 결과가 없습니다.
          </p>
        )}
      </div>
    </div>
  )
}
