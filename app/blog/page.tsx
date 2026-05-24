import type { Metadata } from "next"
import { getAllPosts } from "@/lib/posts"
import { PostCard } from "@/components/PostCard"

export const metadata: Metadata = {
  title: "블로그",
  description: "모든 글 목록",
}

export default function BlogPage() {
  const posts = getAllPosts()

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">
        블로그
      </h1>
      <p className="text-sm text-zinc-400 dark:text-zinc-500 mb-8">
        총 {posts.length}편
      </p>
      <div>
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  )
}
