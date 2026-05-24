import Link from "next/link"
import { ThemeToggle } from "./ThemeToggle"
import { getSiteConfig } from "@/lib/config"

export function Header() {
  const siteConfig = getSiteConfig()
  return (
    <header className="sticky top-0 z-10 border-b border-zinc-200 bg-white/80 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/80">
      <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-3">
        <Link
          href="/"
          className="text-lg font-semibold text-zinc-900 hover:text-zinc-600 dark:text-zinc-100 dark:hover:text-zinc-400 transition-colors"
        >
          {siteConfig.name}
        </Link>
        <nav className="flex items-center gap-4">
          <Link
            href="/blog"
            className="text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors"
          >
            블로그
          </Link>
          <Link
            href="/tags"
            className="text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors"
          >
            태그
          </Link>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  )
}
