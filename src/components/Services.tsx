import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Code, BarChart3, Brain, Sparkles, TrendingUp, Database } from "lucide-react";
import ScrollAnimateWrapper from "./ScrollAnimateWrapper";

const Services = () => {
  const services = [
    {
      icon: Code,
      title: "Web Development",
      description: "Custom web applications built with modern technologies, responsive design, and optimized performance.",
      features: [
        "Responsive Design",
        "Modern Frameworks",
        "Performance Optimization"
      ],
      color: "text-primary",
      bgColor: "bg-primary/5",
    },
    {
      icon: BarChart3,
      title: "Data Analytics",
      description: "Transform raw data into actionable insights with comprehensive analytics and visualization solutions.",
      features: [
        "Business Intelligence",
        "Data Visualization",
        "KPI Dashboards",
        "Reporting Systems"
      ],
      color: "text-accent",
      bgColor: "bg-accent/5",
    },
    {
      icon: Brain,
      title: "Data Science",
      description: "Advanced machine learning and AI solutions to predict trends and automate complex decision-making.",
      features: [
        "Machine Learning Models",
        "Predictive Analytics",
        "AI Integration",
        "Custom Algorithms"
      ],
      color: "text-primary",
      bgColor: "bg-primary/5",
    },
  ];

  return (
    <section id="services" className="py-20 px-4 bg-background">
      <div className="container mx-auto max-w-6xl">
        <ScrollAnimateWrapper animation="fade-up" className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-accent/10 border border-accent/20 rounded-full text-accent font-medium">
            <Sparkles className="w-4 h-4" />
            Our Expertise
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Services We Offer
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Comprehensive solutions to elevate your business through technology and data-driven strategies
          </p>
        </ScrollAnimateWrapper>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ScrollAnimateWrapper 
              key={service.title}
              animation="fade-up"
              delay={(index + 1) * 100 as 100 | 200 | 300}
            >
              <Card 
                className="h-full border-2 hover:border-accent/50 transition-all duration-300 hover:shadow-elegant hover:-translate-y-2 bg-card"
              >
                <CardHeader>
                  <div className={`w-14 h-14 ${service.bgColor} rounded-xl flex items-center justify-center mb-4`}>
                    <service.icon className={`w-7 h-7 ${service.color}`} />
                  </div>
                  <CardTitle className="text-2xl mb-2">{service.title}</CardTitle>
                  <CardDescription className="text-base">{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </ScrollAnimateWrapper>
          ))}
        </div>

        <div className="mt-16 grid md:grid-cols-2 gap-8">
          <ScrollAnimateWrapper animation="fade-left">
            <Card className="h-full bg-gradient-primary text-primary-foreground border-0 shadow-elegant">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <TrendingUp className="w-8 h-8" />
                  <CardTitle className="text-2xl">Growth Focused</CardTitle>
                </div>
                <CardDescription className="text-primary-foreground/80 text-base">
                  Every solution is designed to scale with your business and drive measurable results.
                </CardDescription>
              </CardHeader>
            </Card>
          </ScrollAnimateWrapper>

          <ScrollAnimateWrapper animation="fade-right">
            <Card className="h-full bg-card border-2 border-accent/20 shadow-soft">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <Database className="w-8 h-8 text-accent" />
                  <CardTitle className="text-2xl">Data-Driven</CardTitle>
                </div>
                <CardDescription className="text-base">
                  Leveraging cutting-edge analytics and AI to turn data into your competitive advantage.
                </CardDescription>
              </CardHeader>
            </Card>
          </ScrollAnimateWrapper>
        </div>
      </div>
    </section>
  );
};

export default Services;