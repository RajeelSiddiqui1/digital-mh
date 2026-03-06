import { useRef } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { MapPin, Phone, Mail, Clock, ArrowRight } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";

const ContactInfo = [
    {
        icon: MapPin,
        title: "Our Headquarters",
        details: "#410, 4th Floor, Noor Trade Center,Bloack 13-A,Gulshan-e-Iqbal,Karachi,Pakistan",
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
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

    return (
        <div className="min-h-screen bg-background">
            <Header />

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 overflow-hidden bg-gradient-to-br from-secondary/30 via-background to-primary/10">
                {/* Animated background */}
                <motion.div 
                    className="absolute top-0 left-0 -mt-20 -ml-20 h-[400px] w-[400px] rounded-full bg-primary/20 blur-3xl"
                    style={{ y: useTransform(scrollYProgress, [0, 1], [0, 50]) }}
                />
                <motion.div 
                    className="absolute bottom-0 right-0 -mb-20 -mr-20 h-[400px] w-[400px] rounded-full bg-secondary/30 blur-3xl"
                    style={{ y: useTransform(scrollYProgress, [0, 1], [0, -50]) }}
                />

                {/* Floating elements */}
                <motion.div 
                    className="absolute top-40 right-[20%] h-3 w-3 rounded-full bg-primary/50"
                    animate={{ y: [0, -15, 0], x: [0, 5, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                />
                <motion.div 
                    className="absolute top-[60%] left-[15%] h-4 w-4 rotate-45 bg-secondary/40 blur-sm"
                    animate={{ rotate: [45, 90, 45], scale: [1, 1.2, 1] }}
                    transition={{ duration: 4, repeat: Infinity }}
                />

                <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
                    <motion.div
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="max-w-3xl"
                    >
                        <span className="mb-4 inline-block rounded-full bg-primary/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-foreground">
                            Get in Touch
                        </span>
                        <h1 className="heading-xl mb-6">
                            Let's build something <span className="italic text-primary">great</span>
                        </h1>
                        <p className="text-body text-xl">
                            Whether you have a question about our services, pricing, or just want to explore a potential partnership, our team is ready to answer all your questions.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Contact Form & Info Area */}
            <section className="section-padding relative">
                {/* Background decoration */}
                <motion.div 
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-primary/5 blur-3xl pointer-events-none"
                    style={{ y }}
                />

                <div className="mx-auto max-w-7xl relative z-10">
                    <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">

                        {/* Contact Information */}
                        <motion.div
                            initial={{ x: -50, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.6 }}
                        >
                            <h2 className="heading-md mb-8">Contact Information</h2>
                            <div className="space-y-8">
                                {ContactInfo.map((info, index) => (
                                    <motion.div 
                                        key={info.title} 
                                        className="flex items-start gap-4 group"
                                        initial={{ y: 20, opacity: 0 }}
                                        whileInView={{ y: 0, opacity: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.1 }}
                                        whileHover={{ x: 5 }}
                                    >
                                        <motion.div 
                                            className="h-12 w-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary flex-shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                                            whileHover={{ rotate: 360 }}
                                            transition={{ duration: 0.5 }}
                                        >
                                            <info.icon size={24} />
                                        </motion.div>
                                        <div>
                                            <h4 className="font-display font-bold text-lg mb-1 group-hover:text-primary transition-colors">{info.title}</h4>
                                            <p className="whitespace-pre-line text-muted-foreground text-sm leading-relaxed">{info.details}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Map Placeholder */}
                            <motion.div 
                                className="mt-12 w-full h-64 bg-secondary/50 rounded-3xl border border-border overflow-hidden relative group cursor-pointer"
                                initial={{ y: 30, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.4 }}
                            >
                                <motion.div 
                                    className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2074&auto=format&fit=crop')] bg-cover bg-center"
                                    whileHover={{ scale: 1.1 }}
                                    transition={{ duration: 0.7 }}
                                />
                                <div className="absolute inset-0 flex items-center justify-center bg-background/20 backdrop-blur-[2px] group-hover:bg-background/10 transition-colors">
                                    <motion.span 
                                        className="bg-background font-bold text-sm px-4 py-2 rounded-full shadow-lg text-foreground flex items-center gap-2"
                                        whileHover={{ scale: 1.05 }}
                                    >
                                        <MapPin size={16} className="text-primary" /> Tech Hub, NY
                                    </motion.span>
                                </div>
                            </motion.div>
                        </motion.div>

                        {/* Form */}
                        <motion.div
                            initial={{ x: 50, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            <motion.div 
                                className="bg-card border border-border rounded-3xl p-8 lg:p-12 shadow-xl shadow-primary/5"
                                whileHover={{ scale: 1.01 }}
                                transition={{ duration: 0.3 }}
                            >
                                <h3 className="font-display text-2xl font-bold mb-6">Send us a message</h3>
                                <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                                    <div className="grid sm:grid-cols-2 gap-6">
                                        <motion.div 
                                            className="space-y-2"
                                            initial={{ y: 20, opacity: 0 }}
                                            whileInView={{ y: 0, opacity: 1 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: 0.3 }}
                                        >
                                            <label htmlFor="firstName" className="text-sm font-semibold text-foreground">First Name</label>
                                            <input
                                                type="text"
                                                id="firstName"
                                                placeholder="John"
                                                className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                                            />
                                        </motion.div>
                                        <motion.div 
                                            className="space-y-2"
                                            initial={{ y: 20, opacity: 0 }}
                                            whileInView={{ y: 0, opacity: 1 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: 0.4 }}
                                        >
                                            <label htmlFor="lastName" className="text-sm font-semibold text-foreground">Last Name</label>
                                            <input
                                                type="text"
                                                id="lastName"
                                                placeholder="Doe"
                                                className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                                            />
                                        </motion.div>
                                    </div>

                                    <motion.div 
                                        className="space-y-2"
                                        initial={{ y: 20, opacity: 0 }}
                                        whileInView={{ y: 0, opacity: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.5 }}
                                    >
                                        <label htmlFor="email" className="text-sm font-semibold text-foreground">Email Address</label>
                                        <input
                                            type="email"
                                            id="email"
                                            placeholder="john@company.com"
                                            className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                                        />
                                    </motion.div>

                                    <motion.div 
                                        className="space-y-2"
                                        initial={{ y: 20, opacity: 0 }}
                                        whileInView={{ y: 0, opacity: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.6 }}
                                    >
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
                                    </motion.div>

                                    <motion.div 
                                        className="space-y-2"
                                        initial={{ y: 20, opacity: 0 }}
                                        whileInView={{ y: 0, opacity: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.7 }}
                                    >
                                        <label htmlFor="message" className="text-sm font-semibold text-foreground">Your Message</label>
                                        <textarea
                                            id="message"
                                            rows={5}
                                            placeholder="Tell us about your project goals..."
                                            className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all resize-none"
                                        ></textarea>
                                    </motion.div>

                                    <motion.button 
                                        type="submit" 
                                        className="w-full flex items-center justify-center gap-2 rounded-xl bg-primary px-8 py-4 font-bold text-primary-foreground transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-primary/20"
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        Send Message <ArrowRight size={18} />
                                    </motion.button>
                                    <p className="text-xs text-center text-muted-foreground mt-4">We respect your privacy. No spam, ever.</p>
                                </form>
                            </motion.div>
                        </motion.div>

                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default Contact;
