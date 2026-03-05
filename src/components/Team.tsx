import { useRef } from "react";
import { Linkedin, Twitter } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";

const teamMembers = [
    {
        name: "Alex Carter",
        role: "Founder & CEO",
        image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1974&auto=format&fit=crop",
        bio: "10+ years scaling digital brands.",
    },
    {
        name: "Sarah Jenkins",
        role: "Head of Marketing",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976&auto=format&fit=crop",
        bio: "Data-driven creative strategist.",
    },
    {
        name: "David Chen",
        role: "Lead Developer",
        image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1974&auto=format&fit=crop",
        bio: "Full-stack wizard & UI expert.",
    },
    {
        name: "Elena Rodriguez",
        role: "SEO Specialist",
        image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop",
        bio: "Growth hacker & organic search pro.",
    },
];

const Team = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

    return (
        <section id="team" className="section-padding bg-secondary/30 relative overflow-hidden">
            {/* Background decoration */}
            <motion.div 
                className="absolute right-0 top-1/4 h-80 w-80 rounded-full bg-primary/10 blur-3xl"
                style={{ y }}
            />

            <div ref={containerRef} className="mx-auto max-w-7xl relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ y: 30, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-16 max-w-2xl text-center mx-auto"
                >
                    <span className="mb-4 inline-block rounded-full bg-primary/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-foreground">
                        Our Team
                    </span>
                    <h2 className="heading-lg mb-4">
                        Meet the <span className="italic text-primary">experts</span>
                    </h2>
                    <p className="text-body mx-auto max-w-xl">
                        We are a team of passionate digital marketers, developers, and designers dedicated to driving your success.
                    </p>
                </motion.div>

                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                    {teamMembers.map((member, index) => (
                        <motion.div
                            key={member.name}
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
                                className="group relative overflow-hidden rounded-2xl bg-card border border-border transition-all hover:-translate-y-2 hover:shadow-xl"
                                whileHover={{ scale: 1.02 }}
                            >
                                {/* Image overlay */}
                                <div className="aspect-[4/5] overflow-hidden relative">
                                    <motion.img
                                        src={member.image}
                                        alt={member.name}
                                        className="h-full w-full object-cover"
                                        loading="lazy"
                                        whileHover={{ scale: 1.1 }}
                                        transition={{ duration: 0.5 }}
                                    />
                                    {/* Gradient overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                                    
                                    {/* Social icons on hover */}
                                    <motion.div 
                                        className="absolute bottom-6 left-6 flex gap-3 opacity-0 translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0"
                                    >
                                        <a href="#" className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground hover:scale-110 transition-transform">
                                            <Linkedin size={16} />
                                        </a>
                                        <a href="#" className="flex h-9 w-9 items-center justify-center rounded-full bg-background/80 text-foreground hover:scale-110 transition-transform">
                                            <Twitter size={16} />
                                        </a>
                                    </motion.div>
                                </div>
                                
                                <div className="p-6">
                                    <h3 className="font-display text-xl font-bold group-hover:text-primary transition-colors">
                                        {member.name}
                                    </h3>
                                    <p className="text-primary text-sm font-semibold mb-3">{member.role}</p>
                                    <p className="text-sm text-muted-foreground mb-4">{member.bio}</p>
                                    
                                    {/* Visible social icons */}
                                    <div className="flex gap-3">
                                        <motion.a 
                                            href="#" 
                                            className="text-muted-foreground hover:text-primary transition-colors"
                                            whileHover={{ scale: 1.2, y: -2 }}
                                        >
                                            <Linkedin size={18} />
                                        </motion.a>
                                        <motion.a 
                                            href="#" 
                                            className="text-muted-foreground hover:text-primary transition-colors"
                                            whileHover={{ scale: 1.2, y: -2 }}
                                        >
                                            <Twitter size={18} />
                                        </motion.a>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Team;
