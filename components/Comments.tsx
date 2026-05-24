"use client"

import Giscus from "@giscus/react"
import { useTheme } from "next-themes"

export function Comments() {
  const { resolvedTheme } = useTheme()

  return (
    <div className="mt-10 pt-8 border-t border-zinc-200 dark:border-zinc-800">
      <Giscus
        repo="dev-logan/blog"
        repoId="R_kgDOSmNVkg"
        category="Announcements"
        categoryId="DIC_kwDOSmNVks4C9t4W"
        mapping="pathname"
        strict="0"
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="bottom"
        theme={resolvedTheme === "dark" ? "dark" : "light"}
        lang="ko"
        loading="lazy"
      />
    </div>
  )
}
