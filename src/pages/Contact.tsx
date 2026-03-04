import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Reveal, RevealFade } from "@/components/ui/Reveal";
import { MapPin, Phone, Mail, Clock, ArrowRight } from "lucide-react";

const ContactInfo = [
    {
        icon: MapPin,
        title: "Our Headquarters",
        details: "123 Business Avenue, Tech Hub, NY 10012, United States",
    },
    {
        icon: Phone,
        title: "Call Us",
        details: "+1 (555) 123-4567\nSupport: +1 (555) 987-6543",
    },
    {
        icon: Mail,
        title: "Email Us",
        details: "hello@mhdigital.com\ncareers@mhdigital.com",
    },
    {
        icon: Clock,
        title: "Working Hours",
        details: "Monday - Friday: 9:00 AM - 6:00 PM EST\nWeekend: Closed",
    },
];

const Contact = () => {
    return (
        <div className="min-h-screen bg-background">
            <Header />

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 overflow-hidden bg-gradient-to-br from-secondary/30 via-background to-primary/10">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <Reveal width="100%">
                        <div className="max-w-3xl">
                            <span className="mb-4 inline-block rounded-full bg-primary/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-foreground">
                                Get in Touch
                            </span>
                            <h1 className="heading-xl mb-6">
                                Let's build something <span className="italic text-primary">great</span>
                            </h1>
                            <p className="text-body text-xl">
                                Whether you have a question about our services, pricing, or just want to explore a potential partnership, our team is ready to answer all your questions.
                            </p>
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* Contact Form & Info Area */}
            <section className="section-padding">
                <div className="mx-auto max-w-7xl">
                    <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">

                        {/* Contact Information */}
                        <RevealFade width="100%" delay={0.2}>
                            <div>
                                <h2 className="heading-md mb-8">Contact Information</h2>
                                <div className="space-y-8">
                                    {ContactInfo.map((info) => (
                                        <div key={info.title} className="flex items-start gap-4">
                                            <div className="h-12 w-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary flex-shrink-0">
                                                <info.icon size={24} />
                                            </div>
                                            <div>
                                                <h4 className="font-display font-bold text-lg mb-1">{info.title}</h4>
                                                <p className="whitespace-pre-line text-muted-foreground text-sm leading-relaxed">{info.details}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Map Placeholder */}
                                <div className="mt-12 w-full h-64 bg-secondary/50 rounded-3xl border border-border overflow-hidden relative group">
                                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2074&auto=format&fit=crop')] bg-cover bg-center transition-transform duration-700 group-hover:scale-110 opacity-50 grayscale group-hover:grayscale-0"></div>
                                    <div className="absolute inset-0 flex items-center justify-center bg-background/20 backdrop-blur-[2px]">
                                        <span className="bg-background font-bold text-sm px-4 py-2 rounded-full shadow-lg text-foreground flex items-center gap-2">
                                            <MapPin size={16} className="text-primary" /> Tech Hub, NY
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </RevealFade>

                        {/* Form */}
                        <Reveal width="100%">
                            <div className="bg-card border border-border rounded-3xl p-8 lg:p-12 shadow-xl shadow-primary/5">
                                <h3 className="font-display text-2xl font-bold mb-6">Send us a message</h3>
                                <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                                    <div className="grid sm:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label htmlFor="firstName" className="text-sm font-semibold text-foreground">First Name</label>
                                            <input
                                                type="text"
                                                id="firstName"
                                                placeholder="John"
                                                className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label htmlFor="lastName" className="text-sm font-semibold text-foreground">Last Name</label>
                                            <input
                                                type="text"
                                                id="lastName"
                                                placeholder="Doe"
                                                className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label htmlFor="email" className="text-sm font-semibold text-foreground">Email Address</label>
                                        <input
                                            type="email"
                                            id="email"
                                            placeholder="john@company.com"
                                            className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label htmlFor="service" className="text-sm font-semibold text-foreground">Interested In</label>
                                        <select
                                            id="service"
                                            className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all appearance-none"
                                        >
                                            <option value="seo">SEO Optimization</option>
                                            <option value="social">Social Media Marketing</option>
                                            <option value="ppc">PPC Advertising</option>
                                            <option value="web">Web Development</option>
                                            <option value="other">Other Services</option>
                                        </select>
                                    </div>

                                    <div className="space-y-2">
                                        <label htmlFor="message" className="text-sm font-semibold text-foreground">Your Message</label>
                                        <textarea
                                            id="message"
                                            rows={5}
                                            placeholder="Tell us about your project goals..."
                                            className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all resize-none"
                                        ></textarea>
                                    </div>

                                    <button type="submit" className="w-full flex items-center justify-center gap-2 rounded-xl bg-primary px-8 py-4 font-bold text-primary-foreground transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-primary/20">
                                        Send Message <ArrowRight size={18} />
                                    </button>
                                    <p className="text-xs text-center text-muted-foreground mt-4">We respect your privacy. No spam, ever.</p>
                                </form>
                            </div>
                        </Reveal>

                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default Contact;
