import { getSiteConfig, getAboutConfig } from "@/lib/config"
import { SocialLinks } from "./SocialLinks"

export function Footer() {
  const { name } = getSiteConfig()
  const { links } = getAboutConfig()
  return (
    <footer className="border-t border-zinc-200 dark:border-zinc-800 mt-auto">
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-3 px-4 py-6 text-sm text-zinc-500 dark:text-zinc-500">
        {links.length > 0 && (
          <SocialLinks links={links} className="justify-center" />
        )}
        <div className="flex items-center gap-3">
          <span>© {new Date().getFullYear()} {name}</span>
          <span aria-hidden>·</span>
          <a
            href="/feed.xml"
            className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
          >
            RSS
          </a>
        </div>
      </div>
    </footer>
  )
}
