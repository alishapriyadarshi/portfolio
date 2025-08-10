import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CodeXml, Database, Server, Palette, Cloud, Bot, type LucideIcon } from "lucide-react"

interface Skill {
  name: string;
  icon: LucideIcon;
  description: string;
}

const skills: Skill[] = [
  { name: "React / Next.js", icon: CodeXml, description: "Building dynamic front-end experiences." },
  { name: "Node.js", icon: Server, description: "Creating fast and scalable back-end services." },
  { name: "Databases", icon: Database, description: "Proficient with SQL and NoSQL databases." },
  { name: "UI/UX Design", icon: Palette, description: "Designing intuitive and beautiful interfaces." },
  { name: "Cloud Services", icon: Cloud, description: "Deploying and managing apps on the cloud." },
  { name: "Generative AI", icon: Bot, description: "Integrating AI for smarter applications." },
]

export function Skills() {
  return (
    <section id="skills" className="container py-12 md:py-16">
      <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
        <h2 className="text-3xl font-bold leading-[1.1] sm:text-3xl md:text-5xl">Skills & Expertise</h2>
        <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
          A collection of technologies and tools I use to bring ideas to life.
        </p>
      </div>
      <div className="mx-auto mt-12 grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
        {skills.map((skill) => (
          <Card key={skill.name} className="hover:border-primary transition-colors hover:shadow-lg">
            <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-2">
              <skill.icon className="h-8 w-8 text-primary" />
              <CardTitle className="text-lg font-semibold">{skill.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                {skill.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
