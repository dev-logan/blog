"use client"

import { useEffect, useState } from "react"
import type { TocItem } from "@/lib/toc"

export function TableOfContents({ items }: { items: TocItem[] }) {
  const [activeSlug, setActiveSlug] = useState<string>("")

  useEffect(() => {
    if (items.length === 0) return

    const headings = items
      .map((item) => document.getElementById(item.slug))
      .filter((el): el is HTMLElement => el !== null)

    const observer = new IntersectionObserver(
      (entries) => {
        // 화면 상단 근처에 들어온 헤딩 중 가장 위의 것을 활성화
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible.length > 0) {
          setActiveSlug(visible[0].target.id)
        }
      },
      { rootMargin: "-80px 0px -70% 0px", threshold: 0 }
    )

    headings.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [items])

  if (items.length < 2) return null

  return (
    <aside className="hidden xl:block absolute right-full top-0 h-full mr-10">
      <nav className="sticky top-24 w-52" aria-label="목차">
        <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-zinc-400 dark:text-zinc-500">
          목차
        </p>
        <ul className="space-y-2 border-l border-zinc-200 dark:border-zinc-800">
          {items.map((item) => {
            const isActive = activeSlug === item.slug
            return (
              <li
                key={item.slug}
                style={{ paddingLeft: `${(item.depth - 2) * 0.75 + 0.75}rem` }}
                className="-ml-px"
              >
                <a
                  href={`#${item.slug}`}
                  aria-current={isActive ? "location" : undefined}
                  className={`block border-l-2 -ml-px pl-3 text-sm leading-snug transition-colors ${
                    isActive
                      ? "border-zinc-900 font-medium text-zinc-900 dark:border-zinc-100 dark:text-zinc-100"
                      : "border-transparent text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
                  }`}
                >
                  {item.text}
                </a>
              </li>
            )
          })}
        </ul>
      </nav>
    </aside>
  )
}
