import fs from "fs"
import path from "path"
import matter from "gray-matter"

export interface SiteLink {
  label: string
  href: string
}

export interface SiteConfig {
  name: string
  description: string
}

export interface AboutConfig {
  content: string | null
  links: SiteLink[]
}

// frontmatter의 links 매핑(github/email/twitter 등)을 표시용 배열로 변환한다.
// email은 자동으로 mailto: 스킴을 붙인다.
function parseLinks(raw: unknown): SiteLink[] {
  if (!raw || typeof raw !== "object") return []
  return Object.entries(raw as Record<string, string>)
    .filter(([, value]) => typeof value === "string" && value.length > 0)
    .map(([key, value]) => {
      const isEmail = key.toLowerCase() === "email"
      const href = isEmail && !value.startsWith("mailto:") ? `mailto:${value}` : value
      return { label: key, href }
    })
}

function loadSiteConfig(): SiteConfig {
  const filePath = path.join(process.cwd(), "content/site.md")
  const raw = fs.readFileSync(filePath, "utf-8")
  const { data } = matter(raw)

  return {
    name: (data.name as string) ?? "정호의 글상자",
    description: (data.description as string) ?? "글을 담는 공간입니다",
  }
}

export function getSiteConfig(): SiteConfig {
  return loadSiteConfig()
}

// content/about.md의 본문과 frontmatter의 links(소셜 링크)를 함께 반환. 파일이 없으면 비어있다.
export function getAboutConfig(): AboutConfig {
  const filePath = path.join(process.cwd(), "content/about.md")
  if (!fs.existsSync(filePath)) return { content: null, links: [] }
  const { content, data } = matter(fs.readFileSync(filePath, "utf-8"))
  return {
    content: content.trim() || null,
    links: parseLinks(data.links),
  }
}

export function getBaseUrl(): string {
  return process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000"
}
