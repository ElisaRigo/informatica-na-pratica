import { useState, useEffect } from "react";
import { BookOpen, GraduationCap } from "lucide-react";

const navItems = [
  { id: "professora", label: "A Professora", icon: GraduationCap },
  { id: "conteudo", label: "Conteúdo", icon: BookOpen },
];

export const FloatingNav = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"
      }`}
    >
      <div className="flex items-center gap-2 bg-white/90 backdrop-blur-md border border-border/60 shadow-lg rounded-full px-2 py-1.5">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => scrollTo(item.id)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-semibold text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors active:scale-95"
          >
            <item.icon className="w-4 h-4" />
            <span className="hidden sm:inline">{item.label}</span>
          </button>
        ))}
        <button
          onClick={() => (window as any).openCheckout?.()}
          className="flex items-center gap-1.5 bg-success text-white px-4 py-1.5 rounded-full text-sm font-bold hover:bg-success/90 transition-colors active:scale-95"
        >
          Quero me Inscrever
        </button>
      </div>
    </div>
  );
};
