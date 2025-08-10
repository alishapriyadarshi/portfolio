import { Code2 } from "lucide-react"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t">
      <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <Code2 />
          <p className="text-center text-sm leading-loose md:text-left text-muted-foreground">
            Built by a passionate developer. © {currentYear} Portfolio Pro. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
