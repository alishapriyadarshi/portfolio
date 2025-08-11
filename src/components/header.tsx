import { Code2 } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 flex h-16 items-center">
        {/* Logo + Title */}
        <div className="mr-4 flex items-center">
          <Code2 className="h-6 w-6 mr-2" />
          <span className="font-bold text-lg">Portfolio</span>
        </div>

        {/* Right-side Nav */}
        <div className="flex flex-1 items-center justify-end space-x-2">
          <nav className="flex items-center">
            <ThemeToggle />
          </nav>
        </div>
      </div>
    </header>
  );
}