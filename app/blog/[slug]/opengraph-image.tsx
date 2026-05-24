import { ImageResponse } from "next/og"
import { getPostBySlug, getAllPosts } from "@/lib/posts"
import { getSiteConfig } from "@/lib/config"

export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

interface Props {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }))
}

export default async function Image({ params }: Props) {
  const { slug } = await params
  const post = getPostBySlug(decodeURIComponent(slug))
  const siteConfig = getSiteConfig()

  return new ImageResponse(
    (
      <div
        style={{
          background: "#09090b",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
        }}
      >
        <div
          style={{
            color: "#f4f4f5",
            fontSize: 56,
            fontWeight: 700,
            lineHeight: 1.3,
            maxWidth: 900,
          }}
        >
          {post?.title ?? siteConfig.name}
        </div>
        <div style={{ color: "#71717a", fontSize: 28 }}>
          {siteConfig.name}
        </div>
      </div>
    ),
    { ...size }
  )
}
