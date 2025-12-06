import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MessageCircle, Store } from "lucide-react";
import logo from "@/assets/logo.png";
import CartIcon from "@/components/shop/CartIcon";

const Header = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-12 h-12 bg-background rounded-lg p-1 flex items-center justify-center">
              <img src={logo} alt="DK Code & Insights Logo" className="w-full h-full object-contain" />
            </div>
            <span className="text-xl font-bold text-foreground">DK Code & Insights</span>
          </Link>
        </div>
        
        <nav className="hidden md:flex items-center gap-8">
          <button 
            onClick={() => scrollToSection("services")} 
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            Services
          </button>
          <button 
            onClick={() => scrollToSection("portfolio")} 
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            Portfolio
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
          <Link 
            to="/shop" 
            className="text-primary hover:text-primary/80 transition-colors font-medium flex items-center gap-1"
          >
            <Store className="w-4 h-4" />
            Shop
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <CartIcon />
          <Button 
            variant="whatsapp" 
            onClick={() => window.open("https://wa.me/27660462575", "_blank")}
            className="gap-2"
          >
            <MessageCircle className="w-4 h-4" />
            <span className="hidden sm:inline">WhatsApp</span>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
