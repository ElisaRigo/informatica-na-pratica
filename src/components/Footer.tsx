export const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="py-12 bg-panel border-t border-line">
      <div className="container mx-auto px-4 text-center text-muted-foreground">
        <p>© {currentYear} Informática na Prática. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
};
