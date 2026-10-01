export default function Navbar() {
  return (
    <nav className="sticky top-0 z-20 w-full flex items-center justify-between px-8 py-4 bg-[#090D16]/70 backdrop-blur-md border-b border-[#1E293B]">
      <span className="font-bold text-lg text-[#F8FAFC]">Madhulika</span>
      <div className="flex gap-6 text-sm text-[#94A3B8]">
        <a href="#about" className="hover:text-[#10B981] transition-colors">About</a>
        <a href="#projects" className="hover:text-[#10B981] transition-colors">Projects</a>
        <a href="#skills" className="hover:text-[#10B981] transition-colors">Skills</a>
        <a href="#contact" className="hover:text-[#10B981] transition-colors">Contact</a>
      </div>
    </nav>
  );
}