"use client"

import * as React from "react"
import { Paintbrush } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

const colors = [
  { name: 'Electric Blue', hsl: '181 100% 28%' },
  { name: 'Sunset Orange', hsl: '24 96% 53%' },
  { name: 'Emerald Green', hsl: '145 63% 42%' },
  { name: 'Royal Purple', hsl: '262 80% 58%' },
  { name: 'Crimson Red', hsl: '347 89% 48%' },
];

const darkColors = [
  { name: 'Electric Blue', hsl: '181 100% 74.3%' },
  { name: 'Sunset Orange', hsl: '24 96% 73%' },
  { name: 'Emerald Green', hsl: '145 63% 62%' },
  { name: 'Royal Purple', hsl: '262 80% 78%' },
  { name: 'Crimson Red', hsl: '347 89% 68%' },
];


export function LiveThemeSwitcher() {
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const handleColorChange = (lightHsl: string, darkHsl: string) => {
    document.documentElement.style.setProperty('--primary', lightHsl);
    const darkStyle = document.createElement('style');
    darkStyle.innerHTML = `.dark { --primary: ${darkHsl}; }`;
    document.head.appendChild(darkStyle);

    // This is a bit of a hack to ensure re-render with new variable.
    // In a real app, a proper theme context would be better.
    setTimeout(() => {
        if(document.head.contains(darkStyle)) {
            document.head.removeChild(darkStyle);
        }
    }, 10);
     document.documentElement.style.setProperty('--primary', lightHsl);
     document.documentElement.style.setProperty('--ring', lightHsl);

     const darkRoot = document.querySelector('.dark');
     if (darkRoot) {
       (darkRoot as HTMLElement).style.setProperty('--primary', darkHsl);
       (darkRoot as HTMLElement).style.setProperty('--ring', darkHsl);
     }
  };

  if (!mounted) {
    return null
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">
          <Paintbrush className="mr-2 h-4 w-4" />
          Customize Theme
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto">
        <div className="flex flex-col gap-4">
            <p className="font-semibold text-sm">Primary Color</p>
            <div className="flex flex-wrap justify-center gap-2">
                {colors.map((color, index) => {
                    const darkColor = darkColors[index];
                    return (
                        <Button
                            key={color.name}
                            variant="outline"
                            size="icon"
                            onClick={() => handleColorChange(color.hsl, darkColor.hsl)}
                            className="w-8 h-8 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ring transition-transform hover:scale-110"
                            style={{ backgroundColor: `hsl(${color.hsl})` }}
                            aria-label={`Set color to ${color.name}`}
                        />
                    )
                })}
            </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
