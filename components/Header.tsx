import Link from "next/link"
import { ThemeToggle } from "./ThemeToggle"
import { NavLink } from "./NavLink"
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
          <NavLink href="/blog">블로그</NavLink>
          <NavLink href="/tags">태그</NavLink>
          <NavLink href="/about">소개</NavLink>
          <Link
            href="/search"
            aria-label="검색"
            className="text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
          </Link>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  )
}
