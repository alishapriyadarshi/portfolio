"use client"

import React from "react";
import Image from "next/image"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { Minus, Plus } from "lucide-react"

function InteractiveCounter() {
    const [count, setCount] = React.useState(0);
    return (
        <div className="flex items-center justify-center space-x-4 rounded-lg border bg-background p-6">
            <Button variant="outline" size="icon" onClick={() => setCount(count - 1)}>
                <Minus className="h-4 w-4" />
            </Button>
            <span className="text-2xl font-bold w-12 text-center tabular-nums">{count}</span>
            <Button variant="outline" size="icon" onClick={() => setCount(count + 1)}>
                <Plus className="h-4 w-4" />
            </Button>
        </div>
    )
}

const projects = [
  {
    title: "GoalUp (React)",
    description: "A responsive goal management web app with Google authentication, dynamic goal creation/editing, and progress tracking using React and Next.js.",
    image: "https://placehold.co/600x400.png",
    tags: ["React", "Next.js", "Google Auth"],
    demo: <InteractiveCounter />,
    codeSnippet: `
// Goal Management Component
function Goal() {
  const [goal, setGoal] = useState("");
  // ...
  return (
    <form>
      <input 
        type="text" 
        value={goal}
        onChange={(e) => setGoal(e.target.value)}
      />
      <button type="submit">Set Goal</button>
    </form>
  )
}`
  },
  {
    title: "Personal Portfolio (React)",
    description: "A responsive React portfolio featuring reusable components and GitHub API integration to effectively showcase projects.",
    image: "https://placehold.co/600x400.png",
    tags: ["React", "GitHub API", "Responsive Design"],
    demo: <div className="flex items-center justify-center text-center text-muted-foreground p-6 rounded-lg border bg-background min-h-[108px]">Portfolio Demo</div>,
    codeSnippet: `
// Fetching GitHub Repos
async function getRepos(username) {
  const response = await fetch(\`https://api.github.com/users/\${username}/repos\`);
  const data = await response.json();
  return data;
}`
  },
  {
    title: "Real Time Chat Application",
    description: "Built a message processing pipeline for a real-time chat app, ensuring schema validation and fast querying via MongoDB indexing.",
    image: "https://placehold.co/600x400.png",
    tags: ["Real-Time", "MongoDB", "Schema Validation"],
    demo: <div className="flex items-center justify-center text-center text-muted-foreground p-6 rounded-lg border bg-background min-h-[108px]">Chat Demo</div>,
    codeSnippet: `
// MongoDB Indexing for Chat
db.messages.createIndex({ 
  channelId: 1, 
  timestamp: -1 
});
`
  }
]

export function Projects() {
    return (
        <section id="projects" className="container py-12 md:py-16">
            <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
                <h2 className="text-3xl font-bold leading-[1.1] sm:text-3xl md:text-5xl">Featured Projects</h2>
                <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
                    Here are some of the projects I'm proud of. Each card features an interactive demo.
                </p>
            </div>

            <div className="mx-auto mt-12 grid gap-8 md:max-w-none md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
                {projects.map((project, index) => (
                    <Card key={index} className="flex flex-col overflow-hidden hover:shadow-lg transition-shadow">
                        <Image
                            src={project.image}
                            alt={project.title}
                            width={600}
                            height={400}
                            className="aspect-video object-cover"
                            data-ai-hint="abstract technology"
                        />
                        <div className="p-6 flex flex-col flex-grow">
                            <CardTitle>{project.title}</CardTitle>
                            <CardDescription className="mt-2 h-24">{project.description}</CardDescription>
                            <div className="flex flex-wrap gap-2 my-4">
                                {project.tags.map(tag => <Badge key={tag} variant="secondary">{tag}</Badge>)}
                            </div>
                            <div className="mt-auto">
                                <Tabs defaultValue="demo" className="w-full">
                                    <TabsList className="grid w-full grid-cols-2">
                                        <TabsTrigger value="demo">Interactive Demo</TabsTrigger>
                                        <TabsTrigger value="code">Code</TabsTrigger>
                                    </TabsList>
                                    <TabsContent value="demo" className="mt-4">
                                        {project.demo}
                                    </TabsContent>
                                    <TabsContent value="code" className="mt-4">
                                        <div className="rounded-lg bg-muted p-4">
                                            <pre className="text-sm overflow-x-auto">
                                                <code className="font-code">{project.codeSnippet.trim()}</code>
                                            </pre>
                                        </div>
                                    </TabsContent>
                                </Tabs>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </section>
    );
}
