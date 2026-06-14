import fs from "fs"
import path from "path"
import { cache } from "react"
import matter from "gray-matter"
import readingTime from "reading-time"
import type { Post, PostMeta } from "./types"

const POSTS_DIR = path.join(process.cwd(), "content/posts")

const CONTROL_CHARS = /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g

function sanitize(raw: string): string {
  return raw.replace(CONTROL_CHARS, "")
}

function extractExcerpt(content: string, maxLength = 150): string {
  const plain = content
    .replace(/!\[.*?\]\(.*?\)/g, "")
    .replace(/\[(.+?)\]\(.+?\)/g, "$1")
    .replace(/#{1,6}\s+/g, "")
    .replace(/\*\*(.+?)\*\*/g, "$1")
    .replace(/\*(.+?)\*/g, "$1")
    .replace(/`{1,3}[^`]*`{1,3}/g, "")
    .replace(/>\s+/g, "")
    .replace(/\n+/g, " ")
    .trim()
  return plain.length <= maxLength ? plain : plain.slice(0, maxLength).trimEnd() + "..."
}

function listPostFiles(): string[] {
  return fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith(".mdx") || f.endsWith(".md"))
}

function buildMeta(slug: string, data: { [key: string]: unknown }, content: string): PostMeta {
  return {
    slug,
    title: (data.title as string) ?? slug,
    date: (data.date as string) ?? "",
    description: (data.description as string) ?? extractExcerpt(content),
    tags: (data.tags as string[]) ?? [],
    readingTime: readingTime(content).text,
  }
}

export const getAllPosts = cache((): PostMeta[] => {
  return listPostFiles()
    .map((file): PostMeta | null => {
      try {
        const slug = file.replace(/\.mdx?$/, "")
        const raw = sanitize(fs.readFileSync(path.join(POSTS_DIR, file), "utf-8"))
        const { data, content } = matter(raw)
        return buildMeta(slug, data, content)
      } catch (err) {
        console.error(`[posts] "${file}" 파싱 실패, 건너뜁니다:`, err)
        return null
      }
    })
    .filter((p): p is PostMeta => p !== null)
    .sort((a, b) => (a.date < b.date ? 1 : -1))
})

export function getPostBySlug(slug: string): Post | null {
  const decodedSlug = decodeURIComponent(slug)
  const matched = listPostFiles().find(
    (f) => f.replace(/\.mdx?$/, "").normalize() === decodedSlug.normalize()
  )
  if (!matched) return null

  try {
    const raw = sanitize(fs.readFileSync(path.join(POSTS_DIR, matched), "utf-8"))
    const { data, content } = matter(raw)
    return { ...buildMeta(decodedSlug, data, content), content }
  } catch (err) {
    console.error(`[posts] "${matched}" 파싱 실패:`, err)
    return null
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

// 날짜 desc 정렬 기준 이웃 글. prev = 더 오래된 글, next = 더 최신 글.
export function getAdjacentPosts(slug: string): {
  prev: PostMeta | null
  next: PostMeta | null
} {
  const decoded = decodeURIComponent(slug)
  const posts = getAllPosts()
  const i = posts.findIndex((p) => p.slug === decoded)
  if (i === -1) return { prev: null, next: null }
  return {
    prev: posts[i + 1] ?? null,
    next: posts[i - 1] ?? null,
  }
}

// 태그 겹침 수로 점수를 매겨 관련 글을 추천한다. 자기 자신 제외, 상위 limit개.
export function getRelatedPosts(slug: string, limit = 3): PostMeta[] {
  const decoded = decodeURIComponent(slug)
  const posts = getAllPosts()
  const current = posts.find((p) => p.slug === decoded)
  if (!current) return []

  const currentTags = new Set(current.tags)
  return posts
    .filter((p) => p.slug !== decoded)
    .map((p) => ({
      post: p,
      score: p.tags.filter((t) => currentTags.has(t)).length,
    }))
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score || (a.post.date < b.post.date ? 1 : -1))
    .slice(0, limit)
    .map((x) => x.post)
}
