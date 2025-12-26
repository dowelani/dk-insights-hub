import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MessageCircle, Mail, MapPin, Phone } from "lucide-react";

const Contact = () => {
  const handleWhatsAppClick = () => {
    window.open("https://wa.me/27660462575", "_blank");
  };

  return (
    <section id="contact" className="py-20 px-4 bg-background">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-accent/10 border border-accent/20 rounded-full text-accent font-medium">
            <MessageCircle className="w-4 h-4" />
            Get In Touch
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Let's Start a Conversation
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Ready to transform your business with technology and data?
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <Card className="bg-gradient-primary text-primary-foreground border-0 shadow-elegant p-8">
            <CardContent className="p-0 text-center lg:text-left">
              <h3 className="text-3xl font-bold mb-6">Contact us via WhatsApp</h3>
              <p className="text-primary-foreground/90 text-lg mb-8 leading-relaxed">
                We're here to answer your questions and discuss how we can help your business grow. 
                Click the button below to start a conversation on WhatsApp.
              </p>
              <div className="flex justify-center lg:justify-start">
                <Button 
                  variant="whatsapp" 
                  size="lg" 
                  onClick={handleWhatsAppClick}
                  className="w-full sm:w-auto text-lg px-8 py-6 gap-3"
                >
                  <MessageCircle className="w-5 h-5" />
                  Message on WhatsApp
                </Button>
              </div>
              
              <div className="mt-12 space-y-4">
                <div className="flex items-center lg:items-start gap-4 justify-center lg:justify-start">
                  <div className="w-10 h-10 bg-primary-foreground/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <div className="font-semibold mb-1">Email</div>
                    <a href="mailto:dowelanikhumbelo@gmail.com" className="text-primary-foreground/80 hover:underline">dowelanikhumbelo@gmail.com</a>
                  </div>
                </div>
                
                <div className="flex items-center lg:items-start gap-4 justify-center lg:justify-start">
                  <div className="w-10 h-10 bg-primary-foreground/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <div className="font-semibold mb-1">Phone</div>
                    <div className="text-primary-foreground/80">Available via WhatsApp</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card className="border-2 border-border hover:border-accent/50 transition-all duration-300 hover:shadow-soft">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-foreground mb-2">Quick Response</h4>
                    <p className="text-muted-foreground">
                      Get answers to your questions within minutes. We're always ready to help.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-border hover:border-accent/50 transition-all duration-300 hover:shadow-soft">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-foreground mb-2">Direct Communication</h4>
                    <p className="text-muted-foreground">
                      Speak directly with our team about your project needs and requirements.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-border hover:border-accent/50 transition-all duration-300 hover:shadow-soft">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-foreground mb-2">Available Worldwide</h4>
                    <p className="text-muted-foreground">
                      Serving clients globally with remote collaboration and delivery.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
