import { useRef } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowRight, Trophy, Users, Target, Rocket } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";

const stats = [
    { label: "Successful Campaigns", value: "500+" },
    { label: "Team Experts", value: "45+" },
    { label: "Global Clients", value: "120+" },
    { label: "Industry Awards", value: "15" },
];

const values = [
    {
        icon: Target,
        title: "Results-Driven",
        description: "We don't just create campaigns; we engineer predictable growth and measurable ROI for our partners."
    },
    {
        icon: Users,
        title: "Client-Centric",
        description: "Your business goals become our mission. We believe in transparency and building long-term relationships."
    },
    {
        icon: Trophy,
        title: "Excellence",
        description: "We strive for perfection in every detail, delivering premium quality work that stands out in the digital landscape."
    },
    {
        icon: Rocket,
        title: "Innovation",
        description: "The digital world moves fast. We stay ahead of the curve, utilizing the latest tools, trends, and strategies."
    }
];

const About = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

    return (
        <div className="min-h-screen bg-background">
            <Header />

            {/* Hero Section with parallax */}
            <section className="relative pt-32 pb-20 overflow-hidden bg-gradient-to-br from-primary/10 via-background to-secondary/20">
                {/* Animated background blobs */}
                <motion.div 
                    className="absolute top-0 right-0 -mt-20 -mr-20 h-[500px] w-[500px] rounded-full bg-primary/20 blur-3xl opacity-50"
                    style={{ y: useTransform(scrollYProgress, [0, 1], [0, 100]) }}
                />
                <motion.div 
                    className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-secondary/30 blur-3xl"
                    style={{ y: useTransform(scrollYProgress, [0, 1], [0, -50]) }}
                />

                {/* Floating decorative elements */}
                <motion.div 
                    className="absolute top-40 left-[10%] h-4 w-4 rounded-full bg-primary/40 blur-sm"
                    animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
                    transition={{ duration: 4, repeat: Infinity }}
                />
                <motion.div 
                    className="absolute top-60 right-[15%] h-6 w-6 rotate-45 bg-secondary/30 blur-sm"
                    animate={{ rotate: [45, 90, 45], scale: [1, 1.2, 1] }}
                    transition={{ duration: 3, repeat: Infinity }}
                />

                <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
                    <motion.div
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="max-w-3xl"
                    >
                        <span className="mb-4 inline-block rounded-full bg-primary/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-foreground">
                            About MH Digital
                        </span>
                        <h1 className="heading-xl mb-6">
                            Pioneering <span className="italic text-primary">digital</span> excellence
                        </h1>
                        <p className="text-body text-xl">
                            We are a collective of digital craftsmen, strategists, and innovators dedicated to transforming brands and driving exponential growth in the digital age.
                        </p>
                    </motion.div>
                </div>
            </section>

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
                                        <p className="text-muted-foreground text-sm">To empower businesses with the strategies, tools, and execution needed to dominate their market online.</p>
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
                                    Founded in 2014, MH Digital started with a simple observation: most businesses were failing to translate their real-world value into digital success. We set out to bridge that gap.
                                </motion.p>
                                <motion.p
                                    initial={{ y: 20, opacity: 0 }}
                                    whileInView={{ y: 0, opacity: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.4 }}
                                >
                                    Over the past decade, we've grown from a small boutique consultancy into a full-service digital marketing powerhouse. Our journey has been defined by a relentless pursuit of performance and a deep commitment to our clients' success.
                                </motion.p>
                                <motion.p
                                    initial={{ y: 20, opacity: 0 }}
                                    whileInView={{ y: 0, opacity: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.5 }}
                                >
                                    Today, we partner with ambitious brands across the globe, providing end-to-end digital solutions—from brand identity and web development to advanced performance marketing and data analytics.
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

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
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

            <Footer />
        </div>
    );
};

export default About;
