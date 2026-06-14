import type { Metadata } from "next"
import { getAllPosts } from "@/lib/posts"
import { Search } from "@/components/Search"

export const metadata: Metadata = {
  title: "검색",
  description: "글 검색",
}

export default function SearchPage() {
  const posts = getAllPosts()

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="mb-6 text-2xl font-bold text-zinc-900 dark:text-zinc-100">
        검색
      </h1>
      <Search posts={posts} />
    </div>
  )
}
