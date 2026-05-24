import type { Metadata } from "next"
import { getAllTags } from "@/lib/posts"
import { TagBadge } from "@/components/TagBadge"

export const metadata: Metadata = {
  title: "태그",
  description: "태그별 글 목록",
}

export default function TagsPage() {
  const tags = getAllTags()

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-8">
        태그
      </h1>
      <div className="flex flex-wrap gap-2">
        {tags.map(({ tag, count }) => (
          <TagBadge key={tag} tag={tag} count={count} />
        ))}
      </div>
    </div>
  )
}
