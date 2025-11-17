import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";

const Header = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center text-primary-foreground font-bold text-lg">
            DK
          </div>
          <span className="text-xl font-bold text-foreground">DK Code & Insights</span>
        </div>
        
        <nav className="hidden md:flex items-center gap-8">
          <button 
            onClick={() => scrollToSection("services")} 
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            Services
          </button>
          <button 
            onClick={() => scrollToSection("about")} 
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            About
          </button>
          <button 
            onClick={() => scrollToSection("contact")} 
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            Contact
          </button>
        </nav>

        <Button 
          variant="whatsapp" 
          onClick={() => window.open("https://wa.me/", "_blank")}
          className="gap-2"
        >
          <MessageCircle className="w-4 h-4" />
          WhatsApp
        </Button>
      </div>
    </header>
  );
};

export default Header;
