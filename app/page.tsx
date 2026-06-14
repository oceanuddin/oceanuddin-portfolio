import SiteShell from "@/components/layout/SiteShell";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Experience from "@/components/sections/Experience";
import Projects from "@/components/sections/Projects";
import Skills from "@/components/sections/Skills";
import Education from "@/components/sections/Education";
import Interests from "@/components/sections/Interests";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <SiteShell>
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Skills />
      <Education />
      <Interests />
      <Contact />
    </SiteShell>
  );
}
