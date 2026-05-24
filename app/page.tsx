import Link from "next/link"
import { getAllPosts } from "@/lib/posts"
import { PostCard } from "@/components/PostCard"
import { getSiteConfig } from "@/lib/config"

export default function Home() {
  const siteConfig = getSiteConfig()
  const posts = getAllPosts().slice(0, 5)

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <section className="mb-12">
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
          {siteConfig.greeting}
        </h1>
        <p className="mt-3 text-zinc-500 dark:text-zinc-400 leading-relaxed">
          {siteConfig.description}
        </p>
      </section>

      <section>
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
            최근 글
          </h2>
          <Link
            href="/blog"
            className="text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
          >
            전체 보기 →
          </Link>
        </div>
        <div>
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </section>
    </div>
  )
}
