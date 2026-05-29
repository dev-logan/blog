import { getSiteConfig } from "@/lib/config"

export function Footer() {
  const siteConfig = getSiteConfig()
  return (
    <footer className="border-t border-zinc-200 dark:border-zinc-800 mt-auto">
      <div className="mx-auto flex max-w-3xl items-center justify-center gap-3 px-4 py-6 text-sm text-zinc-500 dark:text-zinc-500">
        <span>© {new Date().getFullYear()} {siteConfig.name}</span>
        <span aria-hidden>·</span>
        <a
          href="/feed.xml"
          className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
        >
          RSS
        </a>
      </div>
    </footer>
  )
}
