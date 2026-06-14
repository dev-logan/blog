import Link from "next/link"
import type { PostMeta } from "@/lib/types"

export function RelatedPosts({ posts }: { posts: PostMeta[] }) {
  if (posts.length === 0) return null

  return (
    <section className="mt-12 border-t border-zinc-200 pt-8 dark:border-zinc-800">
      <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-zinc-400 dark:text-zinc-500">
        관련 글
      </h2>
      <ul className="flex flex-col gap-3">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link
              href={`/blog/${post.slug}`}
              className="group flex flex-col gap-1"
            >
              <span className="text-sm font-medium text-zinc-900 group-hover:text-zinc-600 dark:text-zinc-100 dark:group-hover:text-zinc-400">
                {post.title}
              </span>
              {post.description && (
                <span className="line-clamp-1 text-sm text-zinc-500 dark:text-zinc-400">
                  {post.description}
                </span>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
