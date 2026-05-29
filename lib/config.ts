import fs from "fs"
import path from "path"
import matter from "gray-matter"

export interface SiteConfig {
  name: string
  greeting: string
  description: string
}

function loadSiteConfig(): SiteConfig {
  const filePath = path.join(process.cwd(), "content/site.md")
  const raw = fs.readFileSync(filePath, "utf-8")
  const { data } = matter(raw)

  return {
    name: (data.name as string) ?? "정호의 글상자",
    greeting: (data.greeting as string) ?? "안녕하세요 👋",
    description: (data.description as string) ?? "글을 담는 공간입니다",
  }
}

export function getSiteConfig(): SiteConfig {
  return loadSiteConfig()
}

export function getBaseUrl(): string {
  return process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000"
}
