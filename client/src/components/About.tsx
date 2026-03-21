import { useRef } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowRight, Trophy, Users, Target, Rocket, Sparkles } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";

const stats = [
    { label: "Project Done", value: "50+" },
    { label: "Happy Clinets", value: "32+" },
    { label: "YYears of Experience", value: "20+" },
];

const values = [
    {
        icon: Target,
        title: "Our Mission",
        description: "Deliver innovative and scalable software solutions that empower organizations to achieve operational excellence and sustainable growth."
    },
    {
        icon: Users,
        title: "Client-Centric",
        description: "To be recognized globally as a leading software development company known for technical excellence, reliability, and business-driven innovation."
    },
    {
        icon: Trophy,
        title: "Excellence",
        description: "Innovation, Excellence, Integrity, and Customer-Centricity drive everything we do. We believe in building lasting relationships through exceptional service."
    },
 
];

const About = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

    return (
        <div id="about" className="min-h-screen bg-background">
           

        

            
               <motion.div
                    initial={{ y: 30, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-12 text-center"
                >
                    <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary/20 to-secondary/20 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-foreground dark:text-white">
                        <Sparkles className="text-primary" size={14} />
                       About MH Digital
                    </span>
                    <h2 className="heading-lg mb-4">
                         Pioneering digital{" "}
                        <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary to-secondary dark:from-primary dark:to-secondary">
                        excellence
                        </span>
                    </h2>
                    
                </motion.div>

            {/* Story Section */}
            <section className="section-padding">
                <div className="mx-auto max-w-7xl">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        {/* Image with parallax */}
                        <motion.div
                            style={{ y }}
                            initial={{ x: -100, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                        >
                            <div className="relative rounded-3xl overflow-hidden shadow-2xl group">
                                <motion.img
                                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop"
                                    alt="Our Team at work"
                                    className="w-full h-[600px] object-cover"
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ duration: 0.5 }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent"></div>
                                <motion.div 
                                    className="absolute bottom-8 left-8 right-8"
                                    initial={{ y: 20, opacity: 0 }}
                                    whileInView={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.3 }}
                                >
                                    <div className="bg-card/90 backdrop-blur-md border border-border p-6 rounded-2xl">
                                        <p className="font-display text-2xl font-bold text-foreground mb-2">Our Mission</p>
                                        <p className="text-muted-foreground text-sm">Deliver innovative and scalable software solutions that empower organizations to achieve operational excellence and sustainable growth.</p>
                                    </div>
                                </motion.div>
                            </div>
                        </motion.div>

                        {/* Content */}
                        <motion.div
                            initial={{ x: 100, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                        >
                            <h2 className="heading-lg mb-6">The story behind the <span className="italic text-primary">agency</span></h2>
                            <div className="space-y-6 text-body">
                                <motion.p
                                    initial={{ y: 20, opacity: 0 }}
                                    whileInView={{ y: 0, opacity: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.3 }}
                                >
                                     MH Digital Edge is a full-service software development company delivering enterprise-grade digital solutions to businesses worldwide. We specialize in custom software development, web and mobile applications, and end-to-end digital transformation. 
                                </motion.p>
                                <motion.p
                                    initial={{ y: 20, opacity: 0 }}
                                    whileInView={{ y: 0, opacity: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.4 }}
                                >
                                    Our multidisciplinary team combines strategic thinking, advanced engineering, and user-centric design to build scalable, secure, and high-performance digital products. We work with startups, SMEs, and large enterprises to streamline operations, improve efficiency, and accelerate business growth.
                                </motion.p>
                                
                            </div>

                            {/* Stats */}
                            <div className="mt-10 grid grid-cols-2 gap-8 border-t border-border pt-10">
                                {stats.map((stat, index) => (
                                    <motion.div
                                        key={stat.label}
                                        initial={{ y: 20, opacity: 0 }}
                                        whileInView={{ y: 0, opacity: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.6 + index * 0.1 }}
                                        whileHover={{ scale: 1.05 }}
                                    >
                                        <div className="font-display text-4xl font-bold text-foreground mb-1">{stat.value}</div>
                                        <div className="text-sm font-medium text-muted-foreground">{stat.label}</div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Core Values */}
            <section className="section-padding bg-secondary/30 relative overflow-hidden">
                {/* Background decoration */}
                <motion.div 
                    className="absolute -left-40 top-0 h-80 w-80 rounded-full bg-primary/10 blur-3xl"
                    style={{ y }}
                />
                <motion.div 
                    className="absolute -right-40 bottom-0 h-80 w-80 rounded-full bg-secondary/20 blur-3xl"
                    style={{ y: useTransform(scrollYProgress, [0, 1], [-30, 30]) }}
                />

                <div className="mx-auto max-w-7xl relative z-10">
                    <motion.div
                        initial={{ y: 30, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center max-w-2xl mx-auto mb-16"
                    >
                        <span className="mb-4 inline-block rounded-full bg-primary/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-foreground">
                            Our Values
                        </span>
                        <h2 className="heading-lg mb-4">
                            What drives <span className="italic text-primary">us</span>
                        </h2>
                        <p className="text-body">
                            Our culture is built on a foundation of core values that guide everything we do, from hiring to client strategy.
                        </p>
                    </motion.div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {values.map((item, index) => (
                            <motion.div
                                key={item.title}
                                initial={{ y: 50, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ 
                                    duration: 0.5, 
                                    delay: index * 0.1,
                                    type: "spring",
                                    stiffness: 100,
                                    damping: 15
                                }}
                            >
                                <motion.div 
                                    className="bg-card border border-border p-8 rounded-3xl h-full transition-all hover:border-primary/50 hover:shadow-lg group"
                                    whileHover={{ scale: 1.02, y: -5 }}
                                >
                                    <motion.div 
                                        className="h-14 w-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-6"
                                        whileHover={{ rotate: 360, scale: 1.1 }}
                                        transition={{ duration: 0.5 }}
                                    >
                                        <item.icon size={28} />
                                    </motion.div>
                                    <h3 className="font-display text-xl font-bold mb-3 group-hover:text-primary transition-colors">{item.title}</h3>
                                    <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
                                </motion.div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="section-padding">
                <div className="mx-auto max-w-5xl">
                    <motion.div 
                        className="bg-foreground text-background rounded-3xl p-12 lg:p-20 text-center relative overflow-hidden"
                        initial={{ scale: 0.95, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        {/* Animated background blobs */}
                        <motion.div 
                            className="absolute top-0 right-0 w-64 h-64 bg-primary/20 blur-3xl rounded-full"
                            animate={{ scale: [1, 1.2, 1], x: [0, 20, 0] }}
                            transition={{ duration: 5, repeat: Infinity }}
                        />
                        <motion.div 
                            className="absolute bottom-0 left-0 w-64 h-64 bg-primary/10 blur-3xl rounded-full"
                            animate={{ scale: [1, 1.3, 1], x: [0, -20, 0] }}
                            transition={{ duration: 6, repeat: Infinity }}
                        />

                        <motion.div className="relative z-10">
                            <motion.h2 
                                className="heading-lg text-background mb-6"
                                initial={{ y: 20, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 }}
                            >
                                Ready to write your <span className="italic text-primary">success story</span>?
                            </motion.h2>
                            <motion.p 
                                className="text-background/80 text-lg max-w-2xl mx-auto mb-10"
                                initial={{ y: 20, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.3 }}
                            >
                                Join the hundreds of businesses that have transformed their digital presence with MH Digital.
                            </motion.p>
                            <motion.a 
                                href="/contact" 
                                className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 font-semibold text-primary-foreground transition-all duration-300 hover:scale-105 hover:shadow-lg"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Let's Talk <ArrowRight size={18} />
                            </motion.a>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

        </div>
    );
};

export default About;
