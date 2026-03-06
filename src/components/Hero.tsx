import { useRef } from "react";
import { ArrowRight, ArrowUpRight, Sparkles, Zap, Target, TrendingUp } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FloatingElement, Parallax, ScrollProgress, FloatingShapes } from "@/components/ui/Animations";

const Hero = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

    return (
        <section ref={containerRef} className="relative min-h-screen overflow-hidden bg-gradient-to-br from-primary/20 via-background to-primary/10 pt-24">
            {/* Scroll Progress Bar */}
            <ScrollProgress />

            {/* Parallax Background Blobs */}
            <motion.div 
                className="absolute -left-32 top-1/4 h-96 w-96 rounded-full bg-primary/20 blur-3xl"
                style={{ y: useTransform(scrollYProgress, [0, 1], [0, 100]) }}
            />
            <motion.div 
                className="absolute -right-32 bottom-1/4 h-96 w-96 rounded-full bg-primary/10 blur-3xl"
                style={{ y: useTransform(scrollYProgress, [0, 1], [0, -150]) }}
            />
            
            {/* Floating Shapes */}
            <FloatingShapes />

            {/* Floating decorative elements with icons */}
            <FloatingElement delay={0} className="absolute top-32 left-[15%]">
                <motion.div 
                    className="flex h-12 w-12 items-center justify-center rounded-2xl bg-card/80 backdrop-blur shadow-lg"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                    <Sparkles className="text-primary" size={20} />
                </motion.div>
            </FloatingElement>
            
            <FloatingElement delay={0.5} className="absolute top-48 right-[20%]">
                <motion.div 
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20 backdrop-blur"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                    <Zap className="text-primary" size={18} />
                </motion.div>
            </FloatingElement>
            
            <FloatingElement delay={1} className="absolute top-[60%] left-[10%]">
                <motion.div 
                    className="flex h-14 w-14 items-center justify-center rounded-2xl bg-secondary/80 backdrop-blur shadow-lg"
                    animate={{ rotate: -360 }}
                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                >
                    <Target className="text-foreground" size={22} />
                </motion.div>
            </FloatingElement>
            
            <FloatingElement delay={1.5} className="absolute top-[40%] right-[8%]">
                <motion.div 
                    className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/30 backdrop-blur"
                    animate={{ y: [0, -15, 0], x: [0, 5, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                >
                    <TrendingUp className="text-primary-foreground" size={14} />
                </motion.div>
            </FloatingElement>

            {/* Main Content */}
            <motion.div 
                className="relative mx-auto flex max-w-7xl flex-col items-center px-6 pt-16 text-center md:pt-24 lg:px-8"
                style={{ y, opacity, scale }}
            >
                {/* Animated Badge */}
                <motion.div
                    initial={{ y: -30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="mb-8"
                >
                    <div className="inline-flex animate-pulse items-center gap-2 rounded-full bg-primary/15 px-5 py-2 text-sm font-medium text-foreground">
                        <span className="h-2 w-2 rounded-full bg-primary" />
                        #1 Digital Marketing Agency
                    </div>
                </motion.div>

                {/* Main heading with stagger animation */}
                <motion.h1 
                    className="heading-lg mb-6 max-w-5xl"
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                >
                    Building Tomorrow's{" "}
                    <motion.span 
                        className="italic text-primary"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                    >
                        Digital
                    </motion.span>
                    <br />
                   Digital {" "}
                    <span className="font-display font-black tracking-tighter">Experiences</span>
                </motion.h1>

                <motion.p 
                    className="text-body mb-10 max-w-2xl"
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                >
                    We are a team of passionate creators, thinkers, and builders dedicated to crafting exceptional digital experiences that drive growth and inspire.
                </motion.p>

                {/* CTA Buttons with magnetic effect */}
                <motion.div 
                    className="flex flex-col items-center gap-4 sm:flex-row"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                >
                    <motion.a 
                        href="/#services" 
                        className="btn-primary text-base group"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Get Started 
                        <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                    </motion.a>
                    <motion.a 
                        href="/#portfolio" 
                        className="btn-outline text-base"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        View Our Work <ArrowUpRight size={18} />
                    </motion.a>
                </motion.div>

                {/* Stats with counter animation */}
                <motion.div 
                    className="mt-20 grid w-full max-w-3xl grid-cols-2 gap-8 border-t border-border pt-10 md:grid-cols-4"
                    initial={{ y: 40, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                >
                    {[
                        { value: "250+", label: "Projects Done", delay: 0 },
                        { value: "50+", label: "Team Members", delay: 0.1 },
                        { value: "98%", label: "Client Satisfaction", delay: 0.2 },
                        { value: "12+", label: "Years Experience", delay: 0.3 },
                    ].map((stat, index) => (
                        <motion.div
                            key={stat.label}
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.8 + stat.delay }}
                            className="group"
                        >
                            <motion.div 
                                className="font-display text-3xl font-bold text-foreground md:text-4xl"
                                whileHover={{ scale: 1.1 }}
                            >
                                {stat.value}
                            </motion.div>
                            <div className="mt-1 text-sm text-muted-foreground group-hover:text-primary transition-colors">
                                {stat.label}
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </motion.div>

            {/* Parallax Marquee Section - moves slower than scroll */}
            <Parallax speed={0.3} direction="up" className="relative z-10">
                <div className="mt-20 overflow-hidden border-y border-border bg-secondary/50 py-4">
                    <motion.div 
                        className="flex items-center gap-12 whitespace-nowrap"
                        animate={{ x: [0, -1000] }}
                        transition={{ 
                            duration: 20, 
                            repeat: Infinity, 
                            ease: "linear" 
                        }}
                    >
                        {[...Array(2)].map((_, i) => (
                            <div key={i} className="flex items-center gap-12">
                                {[
                                    "Meta Ads Management",
                                    "Google Ads (PPC)",
                                    "Social Media Marketing",
                                    "Content Marketing",
                                    "Email Marketing",
                                    "Affiliate Marketing",
                                    "Influencer Marketing",
                                    "Marketing Strategy"
                                ].map((item) => (
                                    <motion.span
                                        key={`${i}-${item}`}
                                        className="font-display text-lg font-semibold text-foreground/40 md:text-xl cursor-pointer hover:text-primary transition-colors"
                                        whileHover={{ scale: 1.1 }}
                                    >
                                        {item} <span className="mx-4 text-primary">✦</span>
                                    </motion.span>
                                ))}
                            </div>
                        ))}
                    </motion.div>
                </div>
            </Parallax>
        </section>
    );
};

export default Hero;
