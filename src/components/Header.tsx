import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { MessageCircle, Store, Menu, User, LogIn, UserPlus } from "lucide-react";
import logo from "@/assets/robot-logo.png";
import CartIcon from "@/components/shop/CartIcon";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        const element = document.getElementById(id);
        element?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      const element = document.getElementById(id);
      element?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navItems = [
    { label: "Services", id: "services" },
    { label: "Portfolio", id: "portfolio" },
    { label: "About", id: "about" },
    { label: "Contact", id: "contact" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-12 h-12 bg-background rounded-lg p-1 flex items-center justify-center">
              <img src={logo} alt="DK Code & Insights Logo" className="w-full h-full object-contain" />
            </div>
            <span className="text-xl font-bold text-foreground hidden sm:block">DK Code & Insights</span>
          </Link>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <button 
              key={item.id}
              onClick={() => scrollToSection(item.id)} 
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              {item.label}
            </button>
          ))}
          <Link 
            to="/shop" 
            className="text-foreground hover:text-foreground/70 transition-colors"
          >
            <Store className="w-5 h-5" />
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          {/* Mobile Menu */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[280px]">
              <div className="flex flex-col gap-6 mt-8">
                <div className="flex items-center gap-3 pb-4 border-b border-border">
                  <img src={logo} alt="Logo" className="w-10 h-10 object-contain" />
                  <span className="font-bold text-foreground">DK Code & Insights</span>
                </div>
                <nav className="flex flex-col gap-4">
                  {navItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className="text-left text-foreground hover:text-primary transition-colors py-2"
                    >
                      {item.label}
                    </button>
                  ))}
                  <Link
                    to="/shop"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-foreground hover:text-primary transition-colors font-medium flex items-center gap-2 py-2"
                  >
                    <Store className="w-4 h-4" />
                    Shop
                  </Link>
                </nav>
                <div className="pt-4 border-t border-border space-y-3">
                  <Button 
                    variant="outline" 
                    className="w-full justify-start gap-2"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      navigate('/auth');
                    }}
                  >
                    <LogIn className="w-4 h-4" />
                    Login
                  </Button>
                  <Button 
                    variant="gradient" 
                    className="w-full justify-start gap-2"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      navigate('/auth');
                    }}
                  >
                    <UserPlus className="w-4 h-4" />
                    Register
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>

          <Link 
            to="/shop" 
            className="md:hidden text-foreground hover:text-foreground/70 transition-colors"
          >
            <Store className="w-5 h-5" />
          </Link>
          
          <CartIcon />
          
          {/* User Menu - Desktop */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild className="hidden sm:flex">
              <Button variant="ghost" size="icon">
                <User className="w-5 h-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => navigate('/auth')}>
                <LogIn className="w-4 h-4 mr-2" />
                Login
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate('/auth')}>
                <UserPlus className="w-4 h-4 mr-2" />
                Register
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button 
            variant="whatsapp" 
            onClick={() => window.open("https://wa.me/27660462575", "_blank")}
            className="gap-2 hidden sm:flex"
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
