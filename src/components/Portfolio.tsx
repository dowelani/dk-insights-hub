import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Briefcase } from "lucide-react";
import missLTutoring from '@/assets/missLTutoring.png';
import ScrollAnimateWrapper from "./ScrollAnimateWrapper";

const Portfolio = () => {
  const projects = [
    {
      title: "Miss L Tutoring",
      description: "Miss L Tutoring is a clean, responsive website deployed on Netlify that showcases private tutoring services for young learners (reading, phonics, and math). The design highlights the tutor's personal approach, emphasizes home-based support, and makes it easy for parents to understand the value of tailored, one-on-one academic help.",
      technologies: ["TypeScript", "React"],
      category: "Web Development",
      image: missLTutoring,
      link: "https://ltutoring.netlify.app/",
    }
  ];

  return (
    <section id="portfolio" className="py-20 px-4 bg-muted/30">
      <div className="container mx-auto max-w-6xl">
        <ScrollAnimateWrapper animation="fade-up" className="text-center mb-16">
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
        </ScrollAnimateWrapper>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <ScrollAnimateWrapper 
              key={project.title}
              animation="scale"
              delay={(index + 1) * 100 as 100 | 200 | 300}
            >
              <Card 
                className="h-full overflow-hidden border-2 hover:border-accent/50 transition-all duration-300 hover:shadow-elegant group"
              >
                <div className="relative h-48 overflow-hidden bg-muted">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110"
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
            </ScrollAnimateWrapper>
          ))}
        </div>

        <ScrollAnimateWrapper animation="fade-up" className="text-center mt-12">
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
        </ScrollAnimateWrapper>
      </div>
    </section>
  );
};

export default Portfolio;