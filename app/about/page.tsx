import type { Metadata } from "next"
import { MDXRemote } from "next-mdx-remote/rsc"
import { getAboutConfig } from "@/lib/config"
import { SocialLinks } from "@/components/SocialLinks"

export const metadata: Metadata = {
  title: "소개",
  description: "이 블로그와 글쓴이에 대해",
}

export default function AboutPage() {
  const { content, links } = getAboutConfig()

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <article className="prose prose-zinc dark:prose-invert max-w-none">
        {content ? (
          <MDXRemote source={content} />
        ) : (
          <p>아직 소개가 작성되지 않았습니다.</p>
        )}
      </article>
      {links.length > 0 && <SocialLinks links={links} className="mt-6" />}
    </div>
  )
}
