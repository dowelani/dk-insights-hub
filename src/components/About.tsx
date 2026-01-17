import { Card, CardContent } from "@/components/ui/card";
import { Award, Users, Target, Zap } from "lucide-react";
import ScrollAnimateWrapper from "./ScrollAnimateWrapper";

const About = () => {
  const stats = [
    { icon: Award, label: "Years Experience", value: "2+", color: "text-primary" },
    { icon: Users, label: "Happy Clients", value: "5+", color: "text-accent" },
    { icon: Target, label: "Projects Completed", value: "10+", color: "text-primary" },
    { icon: Zap, label: "Success Rate", value: "100%", color: "text-accent" },
  ];

  return (
    <section id="about" className="py-20 px-4 bg-muted/30">
      <div className="container mx-auto max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <ScrollAnimateWrapper animation="fade-left">
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-primary font-medium">
              <span className="w-2 h-2 bg-primary rounded-full"></span>
              About Us
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Empowering Businesses Through Technology
            </h2>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              At DK Code & Insights, we believe in the transformative power of technology and data. 
              Our mission is to help businesses harness this power to achieve their goals and stay 
              ahead in an increasingly digital world.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              With expertise spanning web development, data analytics, and data science, we deliver 
              comprehensive solutions that are not just technically sound, but strategically aligned 
              with your business objectives.
            </p>
          </ScrollAnimateWrapper>

          <div className="grid grid-cols-2 gap-6">
            {stats.map((stat, index) => (
              <ScrollAnimateWrapper 
                key={stat.label}
                animation="scale"
                delay={(index + 1) * 100 as 100 | 200 | 300 | 400}
              >
                <Card 
                  className="h-full border-2 hover:border-accent/50 transition-all duration-300 hover:shadow-elegant hover:-translate-y-1"
                >
                  <CardContent className="p-6 text-center">
                    <div className={`w-12 h-12 mx-auto mb-4 bg-gradient-primary rounded-xl flex items-center justify-center`}>
                      <stat.icon className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <div className="text-3xl font-bold text-foreground mb-2">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </CardContent>
                </Card>
              </ScrollAnimateWrapper>
            ))}
          </div>
        </div>

        <div className="mt-16 grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Our Vision",
              description: "To be the trusted technology partner that enables businesses to thrive in the data-driven economy.",
            },
            {
              title: "Our Approach",
              description: "Combining technical excellence with business acumen to deliver solutions that drive real value.",
            },
            {
              title: "Our Commitment",
              description: "Dedicated to your success with transparent communication and unwavering quality standards.",
            },
          ].map((item, index) => (
            <ScrollAnimateWrapper 
              key={item.title}
              animation="fade-up"
              delay={(index + 1) * 100 as 100 | 200 | 300}
            >
              <Card 
                className="h-full bg-card border border-border hover:shadow-soft transition-all duration-300"
              >
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-foreground mb-3">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                </CardContent>
              </Card>
            </ScrollAnimateWrapper>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;