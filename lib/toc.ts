import GithubSlugger from "github-slugger"

export interface TocItem {
  depth: number
  text: string
  slug: string
}

// 코드 펜스 안의 `#` 주석을 헤딩으로 오인하지 않도록 펜스 블록을 제거한 뒤 파싱한다.
function stripCodeFences(markdown: string): string {
  return markdown.replace(/^```[\s\S]*?^```/gm, "")
}

// 마크다운 본문에서 h2~h3 헤딩을 추출한다.
// slug는 rehype-slug와 동일하게 github-slugger로 생성해 앵커가 일치한다.
export function extractToc(markdown: string, minDepth = 2, maxDepth = 3): TocItem[] {
  const slugger = new GithubSlugger()
  const source = stripCodeFences(markdown)
  const items: TocItem[] = []

  for (const line of source.split("\n")) {
    const match = /^(#{1,6})\s+(.+?)\s*#*\s*$/.exec(line)
    if (!match) continue
    const depth = match[1].length
    if (depth < minDepth || depth > maxDepth) continue
    // 인라인 마크다운(굵게/링크/코드) 기호 제거
    const text = match[2]
      .replace(/\[(.+?)\]\(.+?\)/g, "$1")
      .replace(/[*_`~]/g, "")
      .trim()
    items.push({ depth, text, slug: slugger.slug(text) })
  }

  return items
}
