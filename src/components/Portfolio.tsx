import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Briefcase } from "lucide-react";

const Portfolio = () => {
  const projects = [
    // {
    //   title: "E-Commerce Analytics Dashboard",
    //   description: "Built a comprehensive analytics platform for an online retail business, providing real-time insights into sales, customer behavior, and inventory management.",
    //   technologies: ["React", "Python", "PostgreSQL", "Tableau"],
    //   category: "Data Analytics",
    //   image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop",
    //   link: "#",
    // },
    {
      title: "Miss L Tutoring",
      description: "Miss L Tutoring is a clean, responsive website deployed on Netlify that showcases private tutoring services for young learners (reading, phonics, and math). The design highlights the tutor’s personal approach, emphasizes home-based support, and makes it easy for parents to understand the value of tailored, one-on-one academic help.",
      technologies: ["TypeScript", "React"],
      category: "Web Development",
      image: "https://chatgpt.com/s/m_691b1df907d0819191de2179c1dfd734",
      link: "https://missltutoring.netlify.app/",
    }
    //, {
    //   title: "Predictive Maintenance System",
    //   description: "Created a machine learning model to predict equipment failures in manufacturing, reducing downtime by 40% and saving significant operational costs.",
    //   technologies: ["Python", "TensorFlow", "Scikit-learn", "AWS"],
    //   category: "Data Science",
    //   image: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=800&h=500&fit=crop",
    //   link: "#",
    // },
    // {
    //   title: "Financial Trading Platform",
    //   description: "Designed and deployed a high-performance trading platform with real-time market data visualization, automated trading algorithms, and risk management tools.",
    //   technologies: ["React", "Python", "Redis", "WebSocket"],
    //   category: "Web Development",
    //   image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=500&fit=crop",
    //   link: "#",
    // },
  ];

  return (
    <section id="portfolio" className="py-20 px-4 bg-muted/30">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-primary font-medium">
            <Briefcase className="w-4 h-4" />
            Our Work
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Featured Projects
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover how we've helped businesses transform through technology and data-driven solutions
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <Card 
              key={project.title}
              className="overflow-hidden border-2 hover:border-accent/50 transition-all duration-300 hover:shadow-elegant group"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative h-48 overflow-hidden bg-muted">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent"></div>
                <Badge className="absolute top-4 right-4 bg-accent text-accent-foreground">
                  {project.category}
                </Badge>
              </div>
              
              <CardHeader>
                <CardTitle className="text-2xl mb-2">{project.title}</CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  {project.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech) => (
                    <Badge 
                      key={tech} 
                      variant="outline"
                      className="text-xs"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
                
                <Button 
                  variant="outline" 
                  className="w-full group/btn"
                  onClick={() => window.open(project.link, "_blank")}
                >
                  View Case Study
                  <ExternalLink className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            Want to see more of our work?
          </p>
          <Button 
            variant="gradient" 
            size="lg"
            onClick={() => window.open("https://wa.me/27660462575", "_blank")}
          >
            Discuss Your Project
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
