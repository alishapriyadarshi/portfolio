import { Button } from "@/components/ui/button"
import { ArrowDown } from "lucide-react"

export function Hero() {
  return (
    <div className="grid items-center gap-6">
      <div className="flex flex-col items-start gap-4">
        <div className="flex-1">
          <h1 className="text-4xl font-extrabold leading-tight tracking-tighter md:text-5xl lg:text-6xl lg:leading-[1.1]">
            Alisha Priyadarshi
          </h1>
          <p className="text-lg text-primary sm:text-xl font-medium italic">
            Technology Enthusiast
          </p>
          <p className="mt-4 max-w-[700px] text-lg text-muted-foreground sm:text-xl">
            A passionate and driven technology enthusiast with a strong foundation in various tech stacks. Eager to learn, adapt, and contribute innovative solutions to challenging projects. Possessing strong problem-solving skills and a collaborative spirit.
          </p>
        </div>
      </div>
      <div className="flex gap-4 mt-4">
        <a href="#projects">
          <Button size="lg">
            View My Work <ArrowDown className="ml-2 h-4 w-4" />
          </Button>
        </a>
        <a href="#contact">
          <Button variant="outline" size="lg">
            Get in Touch
          </Button>
        </a>
      </div>
    </div>
  )
}
