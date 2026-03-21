import { useRef } from "react";
import { ArrowRight, ArrowUpRight, Sparkles, Zap, Target, TrendingUp, MousePointer2, Rocket, Shield } from "lucide-react";
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
        <section ref={containerRef} className="relative min-h-screen overflow-hidden bg-gradient-to-br from-primary/20 via-background to-primary/10 dark:from-primary/10 dark:via-background dark:to-secondary/10">
            {/* Scroll Progress Bar */}
            <ScrollProgress />

            {/* Enhanced Parallax Background Blobs */}
            <motion.div 
                className="absolute -left-32 top-1/4 h-96 w-96 rounded-full bg-primary/30 blur-[100px] dark:bg-primary/20"
                style={{ y: useTransform(scrollYProgress, [0, 1], [0, 100]) }}
                animate={{ 
                    scale: [1, 1.2, 1],
                }}
                transition={{ duration: 8, repeat: Infinity }}
            />
            <motion.div 
                className="absolute -right-32 bottom-1/4 h-96 w-96 rounded-full bg-secondary/20 blur-[100px] dark:bg-secondary/10"
                style={{ y: useTransform(scrollYProgress, [0, 1], [0, -150]) }}
                animate={{ 
                    scale: [1, 1.3, 1],
                }}
                transition={{ duration: 10, repeat: Infinity, delay: 1 }}
            />
            <motion.div 
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-accent/10 blur-[120px] dark:bg-accent/5"
                style={{ y }}
                animate={{ 
                    opacity: [0.3, 0.5, 0.3],
                }}
                transition={{ duration: 6, repeat: Infinity }}
            />
            
            {/* Floating Shapes */}
            <FloatingShapes />

            {/* Floating decorative elements with icons - Enhanced */}
            <FloatingElement delay={0} className="absolute top-32 left-[15%]">
                <motion.div 
                    className="flex h-14 w-14 items-center justify-center rounded-2xl bg-card/80 backdrop-blur-xl shadow-2xl border border-primary/20 dark:border-primary/30"
                    animate={{ rotate: 360, y: [0, -10, 0] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear", y: { duration: 3, repeat: Infinity } }}
                    whileHover={{ scale: 1.1, rotate: 0 }}
                >
                    <Sparkles className="text-primary" size={24} />
                </motion.div>
            </FloatingElement>
            
            <FloatingElement delay={0.5} className="absolute top-48 right-[20%]">
                <motion.div 
                    className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/20 backdrop-blur-xl shadow-lg border border-primary/30"
                    animate={{ scale: [1, 1.3, 1], boxShadow: ["0 0 0 0 rgba(59, 130, 246, 0.4)", "0 0 0 20px rgba(59, 130, 246, 0)", "0 0 0 0 rgba(59, 130, 246, 0)"] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    whileHover={{ scale: 1.2 }}
                >
                    <Zap className="text-primary" size={22} />
                </motion.div>
            </FloatingElement>
            
            <FloatingElement delay={1} className="absolute top-[60%] left-[10%]">
                <motion.div 
                    className="flex h-16 w-16 items-center justify-center rounded-2xl bg-secondary/80 backdrop-blur-xl shadow-2xl border border-secondary/30"
                    animate={{ rotate: -360, x: [0, 10, 0] }}
                    transition={{ duration: 25, repeat: Infinity, ease: "linear", x: { duration: 4, repeat: Infinity } }}
                    whileHover={{ scale: 1.1 }}
                >
                    <Target className="text-foreground dark:text-white" size={26} />
                </motion.div>
            </FloatingElement>
            
            <FloatingElement delay={1.5} className="absolute top-[40%] right-[8%]">
                <motion.div 
                    className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary/70 backdrop-blur-xl shadow-lg"
                    animate={{ y: [0, -20, 0], x: [0, 8, 0], rotate: [0, 15, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    whileHover={{ scale: 1.3 }}
                >
                    <TrendingUp className="text-white" size={16} />
                </motion.div>
            </FloatingElement>

            {/* More floating elements */}
            <FloatingElement delay={2} className="absolute top-[25%] left-[8%]">
                <motion.div 
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-accent/30 backdrop-blur"
                    animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 4, repeat: Infinity }}
                >
                    <MousePointer2 className="text-accent" size={14} />
                </motion.div>
            </FloatingElement>

            <FloatingElement delay={2.5} className="absolute top-[70%] right-[15%]">
                <motion.div 
                    className="flex h-12 w-12 items-center justify-center rounded-2xl bg-card/60 backdrop-blur-xl border border-border shadow-xl"
                    animate={{ rotate: 45, scale: [1, 1.1, 1] }}
                    transition={{ duration: 8, repeat: Infinity }}
                    whileHover={{ rotate: 0 }}
                >
                    <Rocket className="text-secondary" size={20} />
                </motion.div>
            </FloatingElement>

            {/* Main Content */}
            <motion.div 
                className="relative mx-auto flex max-w-7xl flex-col items-center px-6 pt-16 text-center md:pt-24 lg:px-8"
                style={{ y, opacity, scale }}
            >
                {/* Animated Badge - Enhanced */}
                <motion.div
                    initial={{ y: -30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="mb-8"
                >
                    <motion.div 
                        className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary/20 to-secondary/20 dark:from-primary/30 dark:to-secondary/30 px-6 py-2.5 text-sm font-semibold border border-primary/20 dark:border-primary/40 backdrop-blur-xl"
                        animate={{ 
                            boxShadow: ["0 0 0 0 rgba(59, 130, 246, 0)", "0 0 0 10px rgba(59, 130, 246, 0)", "0 0 0 0 rgba(59, 130, 246, 0)"] 
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                    >
                        <motion.span 
                            className="h-2.5 w-2.5 rounded-full bg-primary"
                            animate={{ scale: [1, 1.5, 1], opacity: [1, 0.7, 1] }}
                            transition={{ duration: 1, repeat: Infinity }}
                        />
                        <span className="bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent dark:from-white dark:to-primary">
                            #1 Digital Marketing Agency
                        </span>
                    </motion.div>
                </motion.div>

                {/* Main heading with stagger animation - Enhanced */}
                <motion.h1 
                    className="heading-lg mb-6 max-w-5xl"
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                >
                    Building Tomorrow's{" "}
                    <motion.span 
                        className="italic text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary to-secondary dark:from-primary dark:via-primary dark:to-secondary"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                        whileHover={{ scale: 1.05 }}
                    >
                        
                    </motion.span>
                    <br />
                    Digital {" "}
                    <span className="font-display font-black tracking-tighter bg-gradient-to-r from-foreground via-foreground to-primary dark:from-white dark:via-white dark:to-primary bg-clip-text text-transparent">
                        Experiences
                    </span>
                </motion.h1>

                <motion.p 
                    className="text-body mb-10 max-w-2xl text-lg md:text-xl"
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                >
                    We are a team of passionate creators, thinkers, and builders dedicated to crafting exceptional digital experiences that drive growth and inspire.
                </motion.p>

                {/* CTA Buttons with magnetic effect - Enhanced */}
                <motion.div 
                    className="flex flex-col items-center gap-4 sm:flex-row"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                >
                    <motion.a 
                        href="/#services" 
                        className="group relative overflow-hidden rounded-full bg-primary px-8 py-4 text-primary-foreground shadow-2xl shadow-primary/30 dark:shadow-primary/50"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <motion.div 
                            className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-primary"
                            animate={{ x: ["-100%", "100%"] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        />
                        <span className="relative flex items-center gap-2 font-semibold">
                            Get Started 
                            <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                        </span>
                    </motion.a>
                    <motion.a 
                        href="/#portfolio" 
                        className="group relative overflow-hidden rounded-full border-2 border-border bg-transparent px-8 py-4 font-semibold text-foreground backdrop-blur-sm dark:text-white"
                        whileHover={{ scale: 1.05, borderColor: "rgb(59, 130, 246)" }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <span className="flex items-center gap-2">
                            View Our Work <ArrowUpRight size={18} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                        </span>
                    </motion.a>
                </motion.div>

                {/* Trust Badges */}
                <motion.div 
                    className="mt-12 flex flex-wrap items-center justify-center gap-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                >
                    {[
                        { icon: Shield, label: "ISO 27001 Certified" },
                        { icon: Zap, label: "24/7 Support" },
                        { icon: Target, label: "100% Satisfaction" }
                    ].map((item, index) => (
                        <motion.div
                            key={index}
                            className="flex items-center gap-2 text-sm text-muted-foreground dark:text-gray-400"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 1 + index * 0.1 }}
                            whileHover={{ scale: 1.05 }}
                        >
                            <item.icon size={16} className="text-primary" />
                            {item.label}
                        </motion.div>
                    ))}
                </motion.div>

                {/* Stats with counter animation - Enhanced */}
                <motion.div 
                    className="mt-20 grid w-full max-w-3xl grid-cols-2 gap-8 border-t border-border/50 bg-card/30 backdrop-blur-sm rounded-2xl p-6 md:grid-cols-4 dark:bg-card/10"
                    initial={{ y: 40, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                >
                    {[
                        { value: "250+", label: "Projects Done", suffix: "", delay: 0 },
                        { value: "50+", label: "Team Members", suffix: "", delay: 0.1 },
                        { value: "98%", label: "Client Satisfaction", suffix: "%", delay: 0.2 },
                        { value: "12+", label: "Years Experience", suffix: "+", delay: 0.3 },
                    ].map((stat, index) => (
                        <motion.div
                            key={stat.label}
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.8 + stat.delay }}
                            className="group text-center"
                        >
                            <motion.div 
                                className="font-display text-4xl font-bold bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent dark:from-white dark:to-primary md:text-5xl"
                                whileHover={{ scale: 1.1, y: -5 }}
                                transition={{ type: "spring", stiffness: 300 }}
                            >
                                {stat.value}
                            </motion.div>
                            <div className="mt-2 text-sm font-medium text-muted-foreground group-hover:text-primary transition-colors dark:text-gray-400 dark:group-hover:text-primary">
                                {stat.label}
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </motion.div>

            {/* Parallax Marquee Section - Enhanced */}
            <Parallax speed={0.3} direction="up" className="relative z-10">
                <div className="mt-20 overflow-hidden border-y border-border/50 bg-gradient-to-r from-secondary/30 via-background to-secondary/30 dark:from-secondary/10 dark:via-background dark:to-secondary/10 py-6">
                    <motion.div 
                        className="flex items-center gap-16 whitespace-nowrap"
                        animate={{ x: [0, -1000] }}
                        transition={{ 
                            duration: 25, 
                            repeat: Infinity, 
                            ease: "linear" 
                        }}
                    >
                        {[...Array(2)].map((_, i) => (
                            <div key={i} className="flex items-center gap-16">
                                {[
                                    { text: "Meta Ads Management", icon: Zap },
                                    { text: "Google Ads (PPC)", icon: Target },
                                    { text: "Social Media Marketing", icon: TrendingUp },
                                    { text: "Content Marketing", icon: Sparkles },
                                    { text: "Email Marketing", icon: MousePointer2 },
                                    { text: "Affiliate Marketing", icon: Rocket },
                                    { text: "Influencer Marketing", icon: Shield },
                                    { text: "Marketing Strategy", icon: Target },
                                ].map((item) => (
                                    <motion.span
                                        key={`${i}-${item.text}`}
                                        className="flex items-center gap-3 font-display text-xl font-bold text-foreground/50 dark:text-white/40 cursor-pointer"
                                        whileHover={{ 
                                            scale: 1.1, 
                                            color: "rgb(59, 130, 246)",
                                            textShadow: "0 0 20px rgba(59, 130, 246, 0.5)"
                                        }}
                                        transition={{ type: "spring", stiffness: 300 }}
                                    >
                                        <item.icon size={20} className="text-primary" />
                                        {item.text} 
                                        <span className="mx-4 text-primary">✦</span>
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
