interface AnchorLinkProps {
  href: string;
  icon: string;
  text: string;
}

export const AnchorLink = ({ href, icon, text }: AnchorLinkProps) => {
  return (
    <a 
      href={href} 
      className="inline-flex items-center gap-2 bg-primary/10 hover:bg-primary/20 border-2 border-primary/30 hover:border-primary px-4 md:px-6 py-2 md:py-3 rounded-xl transition-all hover:scale-105 font-semibold text-sm md:text-base"
    >
      <span>{icon}</span>
      <span>{text}</span>
    </a>
  );
};
