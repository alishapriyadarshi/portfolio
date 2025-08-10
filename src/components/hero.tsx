import { Button } from "@/components/ui/button"
import { ArrowDown } from "lucide-react"
import Image from "next/image"

export function Hero() {
  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-20">
      <div className="flex flex-col items-start gap-4 md:flex-row md:gap-8">
        <Image 
          src="https://storage.googleapis.com/project-ava-dev-public/persistent/1b14a93a-1725-48b4-9844-773a4b64e0d9" 
          alt="Profile Picture" 
          width={120} 
          height={120} 
          className="rounded-full border-4 border-primary shadow-lg object-cover"
          data-ai-hint="profile picture"
        />
        <div className="flex-1">
          <h1 className="text-4xl font-extrabold leading-tight tracking-tighter md:text-5xl lg:text-6xl lg:leading-[1.1]">
            Alisha Priyadarshi
          </h1>
          <p className="text-lg text-primary sm:text-xl font-medium">
            Web Developer
          </p>
          <p className="mt-4 max-w-[700px] text-lg text-muted-foreground sm:text-xl">
            Experienced Web Developer specializing in responsive and optimized web applications. Proficient in HTML, CSS, JavaScript, and React, with foundational skills in Next.js. Eager to contribute innovative solutions and strong problem-solving abilities to drive business success.
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
    </section>
  )
}
