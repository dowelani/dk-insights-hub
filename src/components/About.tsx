import { Card, CardContent } from "@/components/ui/card";
import { Award, Users, Target, Zap } from "lucide-react";

const About = () => {
  const stats = [
    { icon: Award, label: "Years Experience", value: "5+", color: "text-primary" },
    { icon: Users, label: "Happy Clients", value: "50+", color: "text-accent" },
    { icon: Target, label: "Projects Completed", value: "100+", color: "text-primary" },
    { icon: Zap, label: "Success Rate", value: "98%", color: "text-accent" },
  ];

  return (
    <section id="about" className="py-20 px-4 bg-muted/30">
      <div className="container mx-auto max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in">
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
          </div>

          <div className="grid grid-cols-2 gap-6">
            {stats.map((stat, index) => (
              <Card 
                key={stat.label}
                className="border-2 hover:border-accent/50 transition-all duration-300 hover:shadow-elegant hover:-translate-y-1"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-6 text-center">
                  <div className={`w-12 h-12 mx-auto mb-4 bg-gradient-primary rounded-xl flex items-center justify-center`}>
                    <stat.icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div className="text-3xl font-bold text-foreground mb-2">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
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
            <Card 
              key={item.title}
              className="bg-card border border-border hover:shadow-soft transition-all duration-300"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-foreground mb-3">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
