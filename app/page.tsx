import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";
import Scene from "@/components/three/Scene";

export default function Home() {
  return (
    <div className="relative min-h-screen w-full bg-[#090D16] text-[#F8FAFC] overflow-x-hidden selection:bg-[#10B981]/30 selection:text-white">
      <div className="fixed inset-0 z-0 h-screen w-screen pointer-events-none opacity-80">
        <Scene />
      </div>

      <div className="relative z-10 w-full flex flex-col items-center">
        <Navbar />
        <main className="w-full flex flex-col items-center">
          <Hero />
          <About />
          <Projects />
          <Skills />
          <Contact />
        </main>
      </div>
    </div>
  );
}