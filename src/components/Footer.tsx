import { MessageCircle } from "lucide-react";
import logo from "@/assets/logo.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted/30 border-t border-border py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-background rounded-lg p-1 flex items-center justify-center">
                <img src={logo} alt="DK Code & Insights Logo" className="w-full h-full object-contain" />
              </div>
              <span className="text-xl font-bold text-foreground">DK Code & Insights</span>
            </div>
            <p className="text-muted-foreground mb-4 max-w-md">
              Transforming businesses through innovative web development, data analytics, and data science solutions.
            </p>
            <button
              onClick={() => window.open("https://wa.me/27660462575", "_blank")}
              className="inline-flex items-center gap-2 text-accent hover:text-accent/80 transition-colors font-medium"
            >
              <MessageCircle className="w-5 h-5" />
              Chat on WhatsApp
            </button>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Services</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li className="hover:text-foreground transition-colors cursor-pointer">Web Development</li>
              <li className="hover:text-foreground transition-colors cursor-pointer">Data Analytics</li>
              <li className="hover:text-foreground transition-colors cursor-pointer">Data Science</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Company</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li 
                className="hover:text-foreground transition-colors cursor-pointer"
                onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
              >
                About Us
              </li>
              <li 
                className="hover:text-foreground transition-colors cursor-pointer"
                onClick={() => document.getElementById("services")?.scrollIntoView({ behavior: "smooth" })}
              >
                Our Services
              </li>
              <li 
                className="hover:text-foreground transition-colors cursor-pointer"
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              >
                Contact
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border text-center text-muted-foreground">
          <p>&copy; {currentYear} DK Code & Insights. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
