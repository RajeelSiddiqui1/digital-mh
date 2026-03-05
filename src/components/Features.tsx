import { useRef } from "react";
import { Check } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";

const featuresImg = "/assets/feature.jpg";

const features = [
    "Data-driven strategy & analytics",
    "Dedicated account manager",
    "Real-time campaign dashboards",
    "A/B testing & optimization",
    "Monthly performance reports",
    "24/7 support & communication",
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
        <section id="features" className="section-padding bg-secondary/30 relative overflow-hidden">
            {/* Parallax background circles */}
            <motion.div 
                className="absolute -left-20 top-1/4 h-64 w-64 rounded-full bg-primary/10 blur-3xl"
                style={{ y: imageY }}
            />
            <motion.div 
                className="absolute -right-20 bottom-1/4 h-64 w-64 rounded-full bg-secondary/20 blur-3xl"
                style={{ y: contentY }}
            />

            <div ref={containerRef} className="mx-auto max-w-7xl relative z-10">
                <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
                    {/* Image with parallax */}
                    <motion.div
                        style={{ y: imageY }}
                        initial={{ x: -100, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <div className="relative">
                            <motion.div 
                                className="overflow-hidden rounded-3xl"
                                whileHover={{ scale: 1.02 }}
                                transition={{ duration: 0.3 }}
                            >
                                <img
                                    src={featuresImg}
                                    alt="Team collaboration on digital marketing strategy"
                                    className="h-auto w-full object-cover"
                                    loading="lazy"
                                />
                            </motion.div>
                            
                            {/* Floating card with animation */}
                            <motion.div 
                                className="absolute -bottom-6 -right-4 rounded-2xl border border-border bg-card p-5 shadow-lg md:-right-8"
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
                                    className="font-display text-3xl font-bold text-foreground"
                                    animate={{ scale: [1, 1.1, 1] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                >
                                    3x
                                </motion.div>
                                <div className="text-sm text-muted-foreground">Average ROI</div>
                            </motion.div>

                            {/* Decorative floating elements */}
                            <motion.div
                                className="absolute -top-4 -left-4 h-8 w-8 rounded-full bg-primary/30 blur-sm"
                                animate={{ 
                                    y: [0, -20, 0],
                                    x: [0, 10, 0]
                                }}
                                transition={{ duration: 3, repeat: Infinity }}
                            />
                            <motion.div
                                className="absolute top-1/3 -right-6 h-4 w-4 rounded-full bg-secondary/50 blur-sm"
                                animate={{ 
                                    y: [0, 15, 0],
                                    x: [0, -10, 0]
                                }}
                                transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
                            />
                        </div>
                    </motion.div>

                    {/* Text content with scroll animation */}
                    <motion.div
                        style={{ y: contentY }}
                        initial={{ x: 100, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                    >
                        <span className="mb-4 inline-block rounded-full bg-primary/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-foreground">
                            Why Choose Us
                        </span>
                        <h2 className="heading-lg mb-6">
                            Built for{" "}
                            <span className="italic text-primary">results</span>
                        </h2>
                        <p className="text-body mb-8">
                            We combine creativity with data science to deliver marketing
                            campaigns that don't just look good—they perform. Our approach
                            is transparent, collaborative, and relentlessly focused on your
                            growth.
                        </p>
                        <ul className="grid gap-4 sm:grid-cols-2">
                            {features.map((feature, index) => (
                                <motion.li 
                                    key={feature} 
                                    className="flex items-start gap-3"
                                    initial={{ x: 20, opacity: 0 }}
                                    whileInView={{ x: 0, opacity: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.1 * index }}
                                >
                                    <motion.span 
                                        className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground"
                                        whileHover={{ scale: 1.2, rotate: 360 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <Check size={14} />
                                    </motion.span>
                                    <span className="text-sm font-medium text-foreground">
                                        {feature}
                                    </span>
                                </motion.li>
                            ))}
                        </ul>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Features;
