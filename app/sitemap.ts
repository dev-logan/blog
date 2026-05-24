import type { MetadataRoute } from "next"
import { getAllPosts, getAllTags } from "@/lib/posts"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000"

  const posts = getAllPosts()
  const tags = getAllTags()

  return [
    { url: baseUrl, lastModified: new Date() },
    { url: `${baseUrl}/blog`, lastModified: new Date() },
    { url: `${baseUrl}/tags`, lastModified: new Date() },
    ...posts.map((post) => ({
      url: `${baseUrl}/blog/${encodeURIComponent(post.slug)}`,
      lastModified: post.date ? new Date(post.date) : new Date(),
    })),
    ...tags.map(({ tag }) => ({
      url: `${baseUrl}/tags/${encodeURIComponent(tag)}`,
      lastModified: new Date(),
    })),
  ]
}
