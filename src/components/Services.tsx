import { useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { servicesData } from "@/data/services";

const Services = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

    return (
        <section id="services" className="section-padding bg-background relative overflow-hidden">
            {/* Background decoration */}
            <motion.div 
                className="absolute -left-40 top-0 h-80 w-80 rounded-full bg-primary/5 blur-3xl"
                style={{ y }}
            />
            <motion.div 
                className="absolute -right-40 bottom-0 h-80 w-80 rounded-full bg-secondary/10 blur-3xl"
                style={{ y: useTransform(scrollYProgress, [0, 1], [-50, 50]) }}
            />

            <div className="mx-auto max-w-7xl relative z-10">
                {/* Header with reveal animation */}
                <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className="mb-16 max-w-2xl"
                >
                    <span className="mb-4 inline-block rounded-full bg-primary/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-foreground">
                        Our Services
                    </span>
                    <h2 className="heading-lg mb-4">
                        Solutions that{" "}
                        <span className="italic text-primary">drive growth</span>
                    </h2>
                    <p className="text-body">
                        We offer comprehensive digital marketing services tailored to
                        elevate your brand and accelerate business growth.
                    </p>
                </motion.div>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {servicesData.map((service, index) => (
                        <motion.div
                            key={service.id}
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
                            <Link
                                to={`/service/${service.id}`}
                                className="group relative block h-full overflow-hidden rounded-2xl border border-border bg-card p-8 transition-all duration-500 hover:-translate-y-2 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10"
                            >
                                {/* Hover glow effect */}
                                <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/5 to-primary/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                                
                                {/* Corner decorations */}
                                <div className="absolute -right-12 -top-12 h-24 w-24 rounded-full bg-primary/10 transition-transform duration-500 group-hover:scale-150" />
                                <div className="absolute -left-12 -bottom-12 h-24 w-24 rounded-full bg-secondary/10 transition-transform duration-500 group-hover:scale-150" />

                                <div className="relative z-10">
                                    <motion.div 
                                        className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground"
                                        whileHover={{ rotate: 360, scale: 1.1 }}
                                        transition={{ duration: 0.5 }}
                                    >
                                        <service.icon size={26} />
                                    </motion.div>
                                    
                                    <motion.h3 
                                        className="heading-md mb-3 text-xl"
                                        whileHover={{ x: 5 }}
                                    >
                                        {service.title}
                                    </motion.h3>
                                    
                                    <p className="text-sm leading-relaxed text-muted-foreground mb-6">
                                        {service.description}
                                    </p>
                                    
                                    <motion.div 
                                        className="mt-auto flex items-center gap-2 text-sm font-semibold text-primary"
                                        whileHover={{ x: 5 }}
                                    >
                                        Learn more <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                                    </motion.div>
                                </div>

                                {/* Bottom line that grows on hover */}
                                <motion.div 
                                    className="absolute bottom-0 left-0 h-1 bg-primary"
                                    initial={{ width: "0%" }}
                                    whileInView={{ width: "0%" }}
                                    whileHover={{ width: "100%" }}
                                    transition={{ duration: 0.3 }}
                                />
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;
