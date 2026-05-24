import { getSiteConfig } from "@/lib/config"

export function Footer() {
  const siteConfig = getSiteConfig()
  return (
    <footer className="border-t border-zinc-200 dark:border-zinc-800 mt-auto">
      <div className="mx-auto max-w-3xl px-4 py-6 text-center text-sm text-zinc-500 dark:text-zinc-500">
        © {new Date().getFullYear()} {siteConfig.name}
      </div>
    </footer>
  )
}
