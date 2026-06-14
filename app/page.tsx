import Link from "next/link"
import { getAllPosts } from "@/lib/posts"
import { PostCard } from "@/components/PostCard"
import { FeaturedPost } from "@/components/FeaturedPost"

export default function Home() {
  const [featured, ...rest] = getAllPosts()
  const recent = rest.slice(0, 4)

  if (!featured) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-12">
        <p className="text-zinc-500 dark:text-zinc-400">아직 작성된 글이 없습니다.</p>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <FeaturedPost post={featured} />

      {recent.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
              이전 글
            </h2>
            <Link
              href="/blog"
              className="text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
            >
              전체 보기 →
            </Link>
          </div>
          <div>
            {recent.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
