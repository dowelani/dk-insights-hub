import { Button } from "@/components/ui/button";
import { ArrowRight, Code, BarChart3, Brain } from "lucide-react";

const Hero = () => {
  const scrollToContact = () => {
    const element = document.getElementById("contact");
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="pt-32 pb-20 px-4 bg-gradient-subtle">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center animate-fade-in">
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-accent/10 border border-accent/20 rounded-full text-accent font-medium">
            <span className="w-2 h-2 bg-accent rounded-full animate-pulse"></span>
            Transforming Data into Decisions
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight">
            Unlock Your Business
            <span className="block bg-gradient-primary bg-clip-text text-transparent">
              Potential with Data
            </span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-10 leading-relaxed">
            Expert web development, data analytics, and data science solutions 
            tailored to drive your business forward in the digital age.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="gradient" 
              size="lg" 
              onClick={scrollToContact}
              className="text-lg px-8 py-6"
            >
              Get Started
              <ArrowRight className="w-5 h-5" />
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => document.getElementById("services")?.scrollIntoView({ behavior: "smooth" })}
              className="text-lg px-8 py-6"
            >
              Our Services
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mt-20">
          {[
            { icon: Code, label: "Web Development", color: "bg-primary/10 text-primary" },
            { icon: BarChart3, label: "Data Analytics", color: "bg-accent/10 text-accent" },
            { icon: Brain, label: "Data Science", color: "bg-primary/10 text-primary" },
          ].map((item, index) => (
            <div 
              key={item.label}
              className="flex items-center gap-4 p-6 bg-card rounded-xl border border-border shadow-soft hover:shadow-elegant transition-all duration-300 hover:-translate-y-1"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className={`p-3 rounded-lg ${item.color}`}>
                <item.icon className="w-6 h-6" />
              </div>
              <span className="font-semibold text-foreground">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
