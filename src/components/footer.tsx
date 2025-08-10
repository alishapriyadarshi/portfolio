import { Code2 } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t">
      <div className="container mx-auto px-4 flex flex-col items-center justify-center gap-4 py-10 md:h-24 md:flex-row md:py-0">
        
        {/* Icon + Text */}
        <div className="flex flex-col items-center gap-4 md:flex-row md:gap-2">
          <Code2 className="h-6 w-6" />
          <p className="text-center text-sm leading-loose md:text-left text-muted-foreground">
            Built by Alisha Priyadarshi. © 2025 All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
}
