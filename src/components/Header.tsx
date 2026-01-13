import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { MessageCircle, Store, Menu, User, LogIn, LogOut } from "lucide-react";
import logo from "@/assets/logo.png";
import CartIcon from "@/components/shop/CartIcon";
import { useAuth } from "@/contexts/AuthContext";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, profile, signOut } = useAuth();

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

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
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
            <div className="w-12 h-12 logo-container rounded-lg p-1 flex items-center justify-center">
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
                  <div className="w-10 h-10 logo-container rounded-lg p-0.5 flex items-center justify-center">
                    <img src={logo} alt="Logo" className="w-full h-full object-contain" />
                  </div>
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
                </nav>
                
                {/* Mobile Auth Section */}
                <div className="pt-4 border-t border-border space-y-3">
                  {user ? (
                    <>
                      <div className="text-sm text-muted-foreground px-2">
                        Signed in as {profile?.first_name || user.email}
                      </div>
                      <Button 
                        variant="outline" 
                        className="w-full justify-start gap-2"
                        onClick={() => {
                          setMobileMenuOpen(false);
                          handleSignOut();
                        }}
                      >
                        <LogOut className="w-4 h-4" />
                        Logout
                      </Button>
                    </>
                  ) : (
                    <Button 
                      variant="gradient" 
                      className="w-full justify-start gap-2"
                      onClick={() => {
                        setMobileMenuOpen(false);
                        navigate('/auth');
                      }}
                    >
                      <LogIn className="w-4 h-4" />
                      Login / Register
                    </Button>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>

          <Button
            asChild
            variant="ghost"
            size="icon"
            className="relative"
          >
            <Link to="/shop">
              <Store className="w-5 h-5" />
            </Link>
          </Button>
          
          <CartIcon />
          
          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <User className="w-5 h-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {user ? (
                <>
                  <div className="px-2 py-1.5 text-sm text-muted-foreground">
                    {profile?.first_name ? `${profile.first_name} ${profile.last_name || ''}`.trim() : user.email}
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut}>
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </DropdownMenuItem>
                </>
              ) : (
                <DropdownMenuItem onClick={() => navigate('/auth')}>
                  <LogIn className="w-4 h-4 mr-2" />
                  Login / Register
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>

          <Button 
            variant="whatsapp" 
            onClick={() => window.open("https://wa.me/27660462575", "_blank")}
            className="gap-2 hidden sm:flex"
          >
            <MessageCircle className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
