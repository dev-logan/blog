import Link from "next/link"
import type { PostMeta } from "@/lib/types"

// 홈 최상단에 가장 최근 글 1편을 크게 보여준다. PostCard의 메타 표기를 따르되 타이포를 키웠다.
export function FeaturedPost({ post }: { post: PostMeta }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group mb-12 block border-b border-zinc-100 pb-12 dark:border-zinc-800"
    >
      <div className="flex items-center gap-2 text-xs text-zinc-400 dark:text-zinc-500">
        {post.date && (
          <time dateTime={post.date}>
            {new Date(post.date).toLocaleDateString("ko-KR", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
        )}
        <span>·</span>
        <span>{post.readingTime}</span>
      </div>
      <h2 className="mt-3 text-2xl font-bold tracking-tight text-zinc-900 transition-colors group-hover:text-zinc-600 sm:text-3xl dark:text-zinc-100 dark:group-hover:text-zinc-400">
        {post.title}
      </h2>
      {post.description && (
        <p className="mt-3 max-w-xl text-base leading-relaxed text-zinc-500 dark:text-zinc-400">
          {post.description}
        </p>
      )}
      <span className="mt-4 inline-block text-sm text-zinc-500 transition-colors group-hover:text-zinc-900 dark:text-zinc-400 dark:group-hover:text-zinc-100">
        읽기 →
      </span>
    </Link>
  )
}
