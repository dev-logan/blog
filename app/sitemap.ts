import type { MetadataRoute } from "next"
import { getAllPosts, getAllTags } from "@/lib/posts"
import { getBaseUrl } from "@/lib/config"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getBaseUrl()

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
