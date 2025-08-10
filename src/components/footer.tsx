"use client";

import { Code2 } from "lucide-react"
import React from "react";

export function Footer() {
  const [currentYear, setCurrentYear] = React.useState(new Date().getFullYear());

  React.useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);


  return (
    <footer className="border-t">
      <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <Code2 />
          <p className="text-center text-sm leading-loose md:text-left text-muted-foreground">
            Built by Alisha Priyadarshi. © {currentYear} All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
