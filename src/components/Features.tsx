import { useRef } from "react";
import { Check, ArrowRight, TrendingUp, Users, Clock, Award } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";

const featuresImg = "/assets/feature.jpg";

const features = [
    { text: "Data-driven strategy & analytics", icon: TrendingUp },
    { text: "Dedicated account manager", icon: Users },
    { text: "Real-time campaign dashboards", icon: Clock },
    { text: "A/B testing & optimization", icon: Award },
    { text: "Monthly performance reports", icon: TrendingUp },
    { text: "24/7 support & communication", icon: Clock },
];

const Features = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const imageY = useTransform(scrollYProgress, [0, 1], [100, -100]);
    const contentY = useTransform(scrollYProgress, [0, 1], [-50, 50]);

    return (
        <section id="features" className="section-padding bg-secondary/30 dark:bg-secondary/10 relative overflow-hidden">
            {/* Enhanced Parallax background circles */}
            <motion.div 
                className="absolute -left-20 top-1/4 h-80 w-80 rounded-full bg-primary/20 blur-[80px] dark:bg-primary/10"
                style={{ y: imageY }}
                animate={{ 
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 0.8, 0.5]
                }}
                transition={{ duration: 8, repeat: Infinity }}
            />
            <motion.div 
                className="absolute -right-20 bottom-1/4 h-80 w-80 rounded-full bg-secondary/30 blur-[80px] dark:bg-secondary/20"
                style={{ y: contentY }}
                animate={{ 
                    scale: [1, 1.3, 1],
                    opacity: [0.5, 0.7, 0.5]
                }}
                transition={{ duration: 10, repeat: Infinity, delay: 1 }}
            />
            
            {/* Grid pattern overlay */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMzMzMiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] dark:opacity-20" />

            <div ref={containerRef} className="mx-auto max-w-7xl relative z-10">
                <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
                    {/* Image with parallax - Enhanced */}
                    <motion.div
                        style={{ y: imageY }}
                        initial={{ x: -100, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <div className="relative">
                            <motion.div 
                                className="overflow-hidden rounded-3xl border border-border/50 shadow-2xl"
                                whileHover={{ scale: 1.02 }}
                                transition={{ duration: 0.3 }}
                            >
                                <img
                                    src={featuresImg}
                                    alt="Team collaboration on digital marketing strategy"
                                    className="h-auto w-full object-cover"
                                    loading="lazy"
                                />
                                {/* Gradient overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent" />
                            </motion.div>
                            
                            {/* Floating card with animation - Enhanced */}
                            <motion.div 
                                className="absolute -bottom-6 -right-4 rounded-2xl border border-border/50 bg-card/90 backdrop-blur-xl p-5 shadow-2xl md:-right-8 dark:bg-card/80"
                                initial={{ scale: 0, rotate: -10 }}
                                whileInView={{ scale: 1, rotate: 0 }}
                                viewport={{ once: true }}
                                transition={{ 
                                    duration: 0.5, 
                                    delay: 0.3,
                                    type: "spring",
                                    stiffness: 200
                                }}
                                whileHover={{ scale: 1.1, rotate: 5 }}
                            >
                                <motion.div 
                                    className="flex items-baseline gap-1 font-display text-4xl font-bold text-foreground dark:text-white"
                                    animate={{ scale: [1, 1.1, 1] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                >
                                    <span className="text-primary">3</span>
                                    <span className="text-secondary">x</span>
                                </motion.div>
                                <div className="text-sm font-medium text-muted-foreground dark:text-gray-400">Average ROI</div>
                                <motion.div 
                                    className="mt-2 flex items-center gap-1 text-xs text-green-500"
                                    animate={{ x: [0, 5, 0] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                >
                                    <TrendingUp size={12} />
                                    +150% this year
                                </motion.div>
                            </motion.div>

                            {/* Enhanced Floating stat cards */}
                            <motion.div
                                className="absolute -top-4 -left-4 rounded-xl bg-card/90 backdrop-blur-xl border border-border/50 p-3 shadow-lg dark:bg-card/80"
                                initial={{ scale: 0 }}
                                whileInView={{ scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.5 }}
                                whileHover={{ scale: 1.1 }}
                            >
                                <div className="flex items-center gap-2">
                                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/20">
                                        <TrendingUp className="text-primary" size={16} />
                                    </div>
                                    <div>
                                        <div className="text-xs text-muted-foreground dark:text-gray-400">Growth</div>
                                        <div className="font-bold text-foreground dark:text-white">+250%</div>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Decorative floating elements - Enhanced */}
                            <motion.div
                                className="absolute -top-4 -left-4 h-10 w-10 rounded-full bg-primary/40 blur-md"
                                animate={{ 
                                    y: [0, -25, 0],
                                    x: [0, 15, 0],
                                    scale: [1, 1.2, 1]
                                }}
                                transition={{ duration: 4, repeat: Infinity }}
                            />
                            <motion.div
                                className="absolute top-1/3 -right-6 h-6 w-6 rounded-full bg-secondary/60 blur-md"
                                animate={{ 
                                    y: [0, 20, 0],
                                    x: [0, -15, 0],
                                    scale: [1, 1.3, 1]
                                }}
                                transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                            />
                            <motion.div
                                className="absolute bottom-1/3 -left-3 h-4 w-4 rounded-full bg-accent/50 blur-sm"
                                animate={{ 
                                    y: [0, -15, 0],
                                    x: [0, 10, 0]
                                }}
                                transition={{ duration: 2.5, repeat: Infinity, delay: 1 }}
                            />
                        </div>
                    </motion.div>

                    {/* Text content with scroll animation - Enhanced */}
                    <motion.div
                        style={{ y: contentY }}
                        initial={{ x: 100, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                    >
                        <motion.span 
                            className="mb-4 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary/20 to-secondary/20 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-foreground dark:text-white"
                            initial={{ y: -20, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            viewport={{ once: true }}
                        >
                            <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                            Why Choose Us
                        </motion.span>
                        
                        <motion.h2 
                            className="heading-lg mb-6"
                            initial={{ y: 20, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                        >
                            Built for{" "}
                            <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary to-secondary dark:from-primary dark:to-secondary">
                                results
                            </span>
                        </motion.h2>
                        
                        <motion.p 
                            className="text-body mb-8 text-lg"
                            initial={{ y: 20, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                        >
                            We combine creativity with data science to deliver marketing
                            campaigns that don't just look good—they perform. Our approach
                            is transparent, collaborative, and relentlessly focused on your
                            growth.
                        </motion.p>
                        
                        <ul className="grid gap-4 sm:grid-cols-2">
                            {features.map((feature, index) => (
                                <motion.li 
                                    key={feature.text} 
                                    className="group flex items-start gap-3 p-3 rounded-xl hover:bg-card/50 dark:hover:bg-card/30 transition-colors"
                                    initial={{ x: 30, opacity: 0 }}
                                    whileInView={{ x: 0, opacity: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.1 * index + 0.3 }}
                                    whileHover={{ x: 5 }}
                                >
                                    <motion.span 
                                        className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-lg shadow-primary/30"
                                        whileHover={{ scale: 1.2, rotate: 360 }}
                                        transition={{ duration: 0.4 }}
                                    >
                                        <feature.icon size={16} />
                                    </motion.span>
                                    <span className="text-sm font-medium text-foreground dark:text-white group-hover:text-primary transition-colors">
                                        {feature.text}
                                    </span>
                                </motion.li>
                            ))}
                        </ul>

                        {/* CTA Button */}
                        <motion.div
                            className="mt-8"
                            initial={{ y: 20, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.8 }}
                        >
                            <motion.a
                                href="/#contact"
                                className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-primary-foreground font-semibold shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 transition-all"
                                whileHover={{ scale: 1.05, x: 5 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Get Started
                                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                            </motion.a>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Features;
