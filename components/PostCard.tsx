import Link from "next/link"
import type { PostMeta } from "@/lib/types"
import { TagBadge } from "./TagBadge"

export function PostCard({ post }: { post: PostMeta }) {
  return (
    <article className="group flex flex-col gap-2 border-b border-zinc-100 py-6 last:border-0 dark:border-zinc-800">
      <div className="flex items-center gap-2 text-xs text-zinc-400 dark:text-zinc-500">
        <time dateTime={post.date}>
          {new Date(post.date).toLocaleDateString("ko-KR", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </time>
        <span>·</span>
        <span>{post.readingTime}</span>
      </div>
      <Link href={`/blog/${post.slug}`}>
        <h2 className="text-lg font-semibold text-zinc-900 group-hover:text-zinc-600 dark:text-zinc-100 dark:group-hover:text-zinc-400 transition-colors">
          {post.title}
        </h2>
      </Link>
      <p className="text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
        {post.description}
      </p>
      {post.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-1">
          {post.tags.map((tag) => (
            <TagBadge key={tag} tag={tag} />
          ))}
        </div>
      )}
    </article>
  )
}
