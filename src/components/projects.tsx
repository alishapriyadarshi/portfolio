
"use client"

import React, { useState, useEffect } from "react";
import Image from "next/image"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { Check, Edit, Plus, Trash2 } from "lucide-react"
import { Input } from "./ui/input";
import { Checkbox } from "./ui/checkbox";

function GoalUpDemo() {
    const [goal, setGoal] = useState<string | null>(null);
    const [inputValue, setInputValue] = useState("");
    const [isCompleted, setIsCompleted] = useState(false);
    const [greeting, setGreeting] = useState("Hello");
    const [currentDate, setCurrentDate] = useState("");

    useEffect(() => {
        const hour = new Date().getHours();
        if (hour < 12) {
            setGreeting("Good morning");
        } else if (hour < 18) {
            setGreeting("Good afternoon");
        } else {
            setGreeting("Good evening");
        }

        setCurrentDate(new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' }));
    }, []);

    const handleSetGoal = (e: React.FormEvent) => {
        e.preventDefault();
        if (inputValue.trim()) {
            setGoal(inputValue);
            setInputValue("");
            setIsCompleted(false);
        }
    };

    const handleEdit = () => {
        if (goal) {
            setInputValue(goal);
            setGoal(null);
        }
    }

    const handleDelete = () => {
        setGoal(null);
        setIsCompleted(false);
    }

    return (
        <div className="flex flex-col items-center justify-center space-y-4 rounded-lg border bg-background p-6 text-center min-h-[200px]">
            <p className="text-muted-foreground">{greeting}, Alisha.</p>
            <p className="font-bold text-lg">{currentDate}</p>
            {goal === null ? (
                <>
                    <p className="font-semibold text-xl">What is your main focus for today?</p>
                    <form onSubmit={handleSetGoal} className="w-full">
                        <Input 
                            type="text" 
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            className="text-center bg-transparent border-0 border-b rounded-none focus:ring-0 focus:border-primary"
                        />
                    </form>
                </>
            ) : (
                <>
                    <p className="text-muted-foreground text-sm">TODAY'S FOCUS</p>
                    <div className="flex items-center gap-2">
                        <Checkbox id="goal" checked={isCompleted} onCheckedChange={() => setIsCompleted(!isCompleted)} />
                        <label htmlFor="goal" className={`text-xl font-bold ${isCompleted ? 'line-through text-muted-foreground' : ''}`}>{goal}</label>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="ghost" size="icon" onClick={handleEdit}><Edit className="w-4 h-4" /></Button>
                        <Button variant="ghost" size="icon" onClick={handleDelete}><Trash2 className="w-4 h-4" /></Button>
                    </div>
                </>
            )}
        </div>
    )
}


const projects = [
  {
    title: "GoalUp (React)",
    description: "A responsive goal management web app with Google authentication, dynamic goal creation/editing, and progress tracking using React and Next.js.",
    tags: ["React", "Next.js", "Google Auth"],
    demo: <GoalUpDemo />,
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
