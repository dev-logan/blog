import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { getAllTags, getPostsByTag } from "@/lib/posts"
import { PostCard } from "@/components/PostCard"

interface Props {
  params: Promise<{ tag: string }>
}

export async function generateStaticParams() {
  return getAllTags().map(({ tag }) => ({
    tag: encodeURIComponent(tag),
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { tag } = await params
  const decoded = decodeURIComponent(tag)

  return {
    title: `#${decoded}`,
    description: `${decoded} 태그의 글 목록`,
  }
}

export default async function TagPage({ params }: Props) {
  const { tag } = await params
  const decoded = decodeURIComponent(tag)
  const posts = getPostsByTag(decoded)

  if (posts.length === 0) notFound()

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <div className="mb-8">
        <p className="text-sm text-zinc-400 dark:text-zinc-500 mb-1">태그</p>
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
          #{decoded}
        </h1>
        <p className="text-sm text-zinc-400 dark:text-zinc-500 mt-1">
          {posts.length}편
        </p>
      </div>
      <div>
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  )
}
