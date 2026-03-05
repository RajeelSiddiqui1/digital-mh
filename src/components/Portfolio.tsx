import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";

const portfolio1 = "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop";
const portfolio2 = "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1974&auto=format&fit=crop";
const portfolio3 = "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=2000&auto=format&fit=crop";
const portfolio4 = "https://images.unsplash.com/photo-1523289333742-be1143f6b766?q=80&w=2070&auto=format&fit=crop";

const projects = [
    {
        image: portfolio1,
        title: "Analytics Dashboard",
        category: "Web Development",
    },
    {
        image: portfolio2,
        title: "Social Media App",
        category: "Mobile Design",
    },
    {
        image: portfolio3,
        title: "Brand Identity System",
        category: "Branding",
    },
    {
        image: portfolio4,
        title: "E-Commerce Redesign",
        category: "UI/UX Design",
    },
];

const Portfolio = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

    return (
        <section id="portfolio" className="section-padding bg-background relative overflow-hidden">
            {/* Background decoration */}
            <motion.div 
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-primary/5 blur-3xl"
                style={{ y }}
            />

            <div ref={containerRef} className="mx-auto max-w-7xl relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className="mb-16 text-center"
                >
                    <span className="mb-4 inline-block rounded-full bg-primary/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-foreground">
                        Portfolio
                    </span>
                    <h2 className="heading-lg mb-4">
                        Recent{" "}
                        <span className="italic text-primary">projects</span>
                    </h2>
                    <p className="text-body mx-auto max-w-xl">
                        A selection of our latest work showcasing the diverse range of
                        digital solutions we deliver for our clients.
                    </p>
                </motion.div>

                <div className="grid gap-6 sm:grid-cols-2">
                    {projects.map((project, index) => (
                        <motion.div
                            key={project.title}
                            initial={{ y: 50, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ 
                                duration: 0.5, 
                                delay: index * 0.15,
                                type: "spring",
                                stiffness: 100,
                                damping: 15
                            }}
                        >
                            <motion.div
                                className="group relative overflow-hidden rounded-2xl bg-card cursor-pointer"
                                whileHover={{ scale: 1.02 }}
                                transition={{ duration: 0.3 }}
                            >
                                {/* Image with zoom effect */}
                                <motion.div
                                    whileHover={{ scale: 1.1 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        className="aspect-[4/3] w-full object-cover"
                                        loading="lazy"
                                    />
                                </motion.div>

                                {/* Overlay with slide-up effect */}
                                <motion.div 
                                    className="absolute inset-0 flex items-end bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent p-6"
                                    initial={{ opacity: 0 }}
                                    whileHover={{ opacity: 1 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <motion.div 
                                        className="flex w-full items-end justify-between"
                                        initial={{ y: 20 }}
                                        whileHover={{ y: 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <div>
                                            <motion.span 
                                                className="mb-1 block text-xs font-semibold uppercase tracking-wider text-primary"
                                                whileHover={{ x: 5 }}
                                            >
                                                {project.category}
                                            </motion.span>
                                            <h3 className="font-display text-xl font-bold text-background">
                                                {project.title}
                                            </h3>
                                        </div>
                                        <motion.span 
                                            className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground"
                                            whileHover={{ scale: 1.2, rotate: 45 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <ArrowUpRight size={18} />
                                        </motion.span>
                                    </motion.div>
                                </motion.div>

                                {/* Corner accent */}
                                <motion.div 
                                    className="absolute top-0 right-0 h-16 w-16 bg-gradient-to-bl from-primary/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                                />
                            </motion.div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Portfolio;
