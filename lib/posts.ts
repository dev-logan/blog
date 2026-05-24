import fs from "fs"
import path from "path"
import matter from "gray-matter"
import readingTime from "reading-time"
import type { Post, PostMeta } from "./types"

const POSTS_DIR = path.join(process.cwd(), "content/posts")

export function getAllPosts(): PostMeta[] {
  const files = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith(".mdx") || f.endsWith(".md"))

  return files
    .map((file) => {
      const slug = file.replace(/\.mdx?$/, "")
      const raw = fs.readFileSync(path.join(POSTS_DIR, file), "utf-8")
      const { data, content } = matter(raw)
      const rt = readingTime(content)

      return {
        slug,
        title: (data.title as string) ?? slug,
        date: (data.date as string) ?? "",
        description: (data.description as string) ?? "",
        tags: (data.tags as string[]) ?? [],
        readingTime: rt.text,
      }
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1))
}

export function getPostBySlug(slug: string): Post | null {
  const decodedSlug = decodeURIComponent(slug)
  const files = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith(".mdx") || f.endsWith(".md"))
  const matched = files.find((f) => f.replace(/\.mdx?$/, "").normalize() === decodedSlug.normalize())
  if (!matched) return null
  const filePath = path.join(POSTS_DIR, matched)

  const raw = fs.readFileSync(filePath, "utf-8")
  const { data, content } = matter(raw)
  const rt = readingTime(content)

  return {
    slug: decodedSlug,
    title: (data.title as string) ?? decodedSlug,
    date: (data.date as string) ?? "",
    description: (data.description as string) ?? "",
    tags: (data.tags as string[]) ?? [],
    readingTime: rt.text,
    content,
  }
}

export function getAllTags(): { tag: string; count: number }[] {
  const posts = getAllPosts()
  const tagMap = new Map<string, number>()

  for (const post of posts) {
    for (const tag of post.tags) {
      tagMap.set(tag, (tagMap.get(tag) ?? 0) + 1)
    }
  }

  return Array.from(tagMap.entries())
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count)
}

export function getPostsByTag(tag: string): PostMeta[] {
  return getAllPosts().filter((p) => p.tags.includes(tag))
}
