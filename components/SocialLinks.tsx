import type { SiteLink } from "@/lib/config"

// 라벨에 따라 외부 링크 여부와 표시 텍스트만 정한다. (아이콘 없이 미니멀 텍스트)
export function SocialLinks({
  links,
  className = "",
}: {
  links: SiteLink[]
  className?: string
}) {
  if (links.length === 0) return null

  return (
    <ul className={`flex flex-wrap items-center gap-x-4 gap-y-1 ${className}`}>
      {links.map((link) => {
        const isExternal = link.href.startsWith("http")
        return (
          <li key={link.label}>
            <a
              href={link.href}
              {...(isExternal && { target: "_blank", rel: "noreferrer" })}
              className="text-sm capitalize text-zinc-500 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
            >
              {link.label}
            </a>
          </li>
        )
      })}
    </ul>
  )
}
