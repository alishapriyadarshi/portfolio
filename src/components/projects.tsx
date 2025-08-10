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
    title: "Component Library",
    description: "A set of reusable and accessible React components for building applications faster.",
    image: "https://placehold.co/600x400.png",
    tags: ["React", "TypeScript", "Storybook"],
    demo: <InteractiveCounter />,
    codeSnippet: `
function Counter() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(c => c + 1)}>+</button>
      <button onClick={() => setCount(c => c - 1)}>-</button>
    </div>
  );
}`
  },
  {
    title: "AI Chatbot",
    description: "An intelligent chatbot integrated with a large language model to assist users.",
    image: "https://placehold.co/600x400.png",
    tags: ["AI", "Next.js", "Tailwind CSS"],
    demo: <div className="flex items-center justify-center text-center text-muted-foreground p-6 rounded-lg border bg-background min-h-[108px]">Live demo coming soon!</div>,
    codeSnippet: `
async function getResponse(prompt) {
  const response = await ai.generateText({ prompt });
  return response;
}`
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

            <div className="mx-auto mt-12 grid gap-8 md:max-w-none md:grid-cols-1 lg:grid-cols-2">
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
                            <CardDescription className="mt-2">{project.description}</CardDescription>
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
