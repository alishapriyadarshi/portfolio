import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CodeXml, Database, Server, Palette, Cloud, Bot, type LucideIcon, GitBranch, Terminal, Code } from "lucide-react"

interface Skill {
  name: string;
  icon: LucideIcon;
  description: string;
}

const skills: Skill[] = [
  { name: "HTML", icon: CodeXml, description: "Structuring web content." },
  { name: "CSS", icon: Palette, description: "Styling web applications." },
  { name: "JavaScript", icon: Code, description: "Building interactive experiences." },
  { name: "Core Java", icon: Code, description: "Building robust applications." },
  { name: "C", icon: Code, description: "Foundational programming language." },
  { name: "MySQL", icon: Database, description: "Managing relational databases." },
  { name: "React.js", icon: CodeXml, description: "Building dynamic front-end experiences." },
  { name: "Node.js", icon: Server, description: "Creating fast and scalable back-end services." },
  { name: "Git", icon: GitBranch, description: "Version control for projects." },
  { name: "VS Code", icon: Terminal, description: "My code editor of choice." },
  { name: "MongoDB", icon: Database, description: "Working with NoSQL databases." },
]

export function Skills() {
  return (
    <div id="skills" className="py-12 md:py-16">
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
    </div>
  )
}
