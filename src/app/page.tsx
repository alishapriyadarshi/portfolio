
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { Skills } from "@/components/skills";
import { Projects } from "@/components/projects";
import { ContactForm } from "@/components/contact";
import { Footer } from "@/components/footer";
import { Separator } from "@/components/ui/separator";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="container pt-6 md:py-20">
          <Hero />
        </section>
        <Separator />
        <section className="container py-12 md:py-16">
          <Skills />
        </section>
        <Separator />
        <section className="container py-12 md:py-16">
          <Projects />
        </section>
        <Separator />
        <section id="contact" className="container py-12 md:py-16">
           <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
            <h2 className="text-3xl font-bold leading-[1.1] sm:text-3xl md:text-5xl">Contact Me</h2>
            <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
                Have a project in mind or just want to say hi? Fill out the form below.
            </p>
          </div>
          <div className="mx-auto mt-12 max-w-[64rem]">
            <ContactForm />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
