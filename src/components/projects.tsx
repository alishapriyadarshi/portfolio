

"use client"

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { Edit, Trash2 } from "lucide-react"
import { Input } from "./ui/input";
import { Checkbox } from "./ui/checkbox";
import { LiveThemeSwitcher } from "./live-theme-switcher";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible";
import { ChevronsUpDown } from "lucide-react";
import { ChatDemo } from "./chat-demo";
import { KaratsDemo } from "./karats-demo";


function GoalUpDemo() {
    const [goal, setGoal] = useState<string | null>(null);
    const [inputValue, setInputValue] = useState("");
    const [isCompleted, setIsCompleted] = useState(false);
    const [greeting, setGreeting] = useState("Hello");
    const [currentDate, setCurrentDate] = useState<string | null>(null);

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
            {currentDate ? (
                <>
                    <p className="text-muted-foreground">{greeting}, Alisha.</p>
                    <p className="font-bold text-lg">{currentDate}</p>
                    {goal === null ? (
                        <>
                            <p className="font-semibold text-xl">What is your main focus for today?</p>
                            <form onSubmit={handleSetGoal} className="w-full flex items-center gap-2">
                                <Input 
                                    type="text" 
                                    placeholder="e.g., Finish project proposal"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    className="text-center border bg-card"
                                />
                                <Button type="submit">Set</Button>
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
                </>
            ) : (
                <div className="h-[104px]" />
            )}
        </div>
    )
}

const projects = [
  {
    title: "GoalUp (React)",
    description: <>A responsive and intuitive goal management web application designed to help users track and achieve their daily objectives. Features include seamless Google authentication for secure access, dynamic goal creation and editing capabilities, and a clear visual representation of progress towards completion. Built with React and Next.js, ensuring a fast and performant user experience. See the live demo <a href="https://alishapriyadarshi.github.io/goalUp" target="_blank" rel="noopener noreferrer" className="underline">here</a>.</>,
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
    title: "Personal Portfolio (This Website)",
    description: "This very website serves as a demonstration of a modern, responsive personal portfolio. It's built using Next.js for server-side rendering and routing, and styled with ShadCN UI components for a clean and accessible design. The interactive demo below allows you to directly control and preview different theme options for the website's user interface in real-time.",
    tags: ["React", "Next.js", "ShadCN", "State Management"],
    demo: (
      <div className="flex flex-col items-center justify-center space-y-4 rounded-lg border bg-background p-6 text-center min-h-[200px]">
          <p className="font-semibold text-lg mb-2">Live Theme Controller</p>
          <p className="text-sm text-muted-foreground text-center">
            This entire website is the demo! Use the controller below to change the primary color of the UI in real-time.
          </p>
          <LiveThemeSwitcher />
      </div>
    ),
    codeSnippet: `
// LiveThemeSwitcher Component
export function LiveThemeSwitcher() {
  const handleColorChange = (hslValue) => {
    document.documentElement.style
      .setProperty('--primary', hslValue);
  };

  return (
    <Popover>
      {/* ... Popover Trigger ... */}
      <PopoverContent>
        {/* ... Color Swatches ... */}
        <Button
          onClick={() => handleColorChange('24 96% 53%')}
          style={{ backgroundColor: 'hsl(24 96% 53%)' }}
        />
        {/* ... More Colors ... */}
      </PopoverContent>
    </Popover>
  )
}`
  },
  {
    title: "ChatVerse (Next.js)",
    description: <>Engineered a scalable, real-time messaging system by leveraging Firebase's native capabilities for instant data synchronisation. Featuring a unique anonymous-only authentication system and an integrated Gemini-powered chatbot for interactive conversation. See the live demo <a href="https://chatverse-v8eax.web.app" target="_blank" rel="noopener noreferrer" className="underline">here</a>.</>,
    tags: ["Real-Time", "Firebase", "Next.js", "Anonymous Auth", "Gemini Chat"],
    demo: <ChatDemo />,
    codeSnippet: `
// Message Handling Logic
const [messages, setMessages] = useState([]);
const [input, setInput] = useState('');

const sendMessage = () => {
  if (input.trim()) {
    const newMessage = { 
      text: input, 
      sender: 'user',
      timestamp: new Date(),
    };
    setMessages([...messages, newMessage]);
    setInput('');
  }
};`
  },
  {
    title: "Karats - A Cross-Platform Metals Price Tracker",
    description: <>Developed a React Native (Expo Router) app that fetches live commodity data (Gold, Silver, Platinum, Palladium) from GoldAPI and displays it in an intuitive, gradient-styled interface. Designed a resilient data layer with AsyncStorage caching, daily refresh quota (2 refreshes/day), and error handling so the app continues to function smoothly even when API quota is exceeded or offline. See the live demo <a href="https://karats.vercel.app/" target="_blank" rel="noopener noreferrer" className="underline">here</a>.</>,
    tags: ["React Native", "Expo", "API Integration", "AsyncStorage"],
    demo: <KaratsDemo />,
    codeSnippet: `
// Karats Demo Component
export function KaratsDemo() {
    const [apiData, setApiData] = useState(null);
    const [loading, setLoading] = useState(true);
    // ...
    const fetchData = async (forceRefresh = false) => {
      // ...
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
      // ... JSX for the demo
    );
}
`
  }
]

export function Projects() {
    return (
        <div id="projects">
            <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
                <h2 className="text-3xl font-bold leading-[1.1] sm:text-3xl md:text-5xl">Featured Projects</h2>
                <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
                    Here are some of the projects I'm proud of Each card features an interactive demo.
                </p>
            </div>

            <div className="mx-auto mt-12 grid gap-8 md:max-w-none md:grid-cols-2">
                {projects.map((project, index) => (
                    <Card key={index} className="flex flex-col overflow-hidden hover:shadow-lg transition-shadow">
                        <div className="p-6 flex flex-col flex-grow">
                            <CardTitle className="min-h-[60px]">{project.title}</CardTitle>
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
        </div>
    );
}
