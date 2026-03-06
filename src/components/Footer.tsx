import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";

const footerLinks = [
    {
        title: "Services",
        links: [
            { label: "SEO Optimization", href: "/#services" },
            { label: "Social Media", href: "/#services" },
            { label: "PPC Advertising", href: "/#services" },
            { label: "Content Marketing", href: "/#services" },
            { label: "Web Development", href: "/#services" },
        ]
    },
    {
        title: "Company",
        links: [
            { label: "About Us", href: "/about" },
            { label: "Careers", href: "#" },
            { label: "Blog", href: "#" },
            { label: "Contact", href: "/contact" },
            { label: "Partners", href: "#" },
        ]
    },
    {
        title: "Resources",
        links: [
            { label: "Case Studies", href: "/#portfolio" },
            { label: "Whitepapers", href: "#" },
            { label: "Guides", href: "#" },
            { label: "FAQ", href: "/#faq" },
            { label: "Support", href: "/contact" },
        ]
    }
];

const Footer = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

    return (
        <footer ref={containerRef} className="bg-foreground text-background relative overflow-hidden">
            {/* Background decoration */}
            <motion.div 
                className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-primary/10 blur-3xl"
                style={{ y }}
            />
            <motion.div 
                className="absolute -right-20 bottom-0 h-64 w-64 rounded-full bg-secondary/20 blur-3xl"
                style={{ y: useTransform(scrollYProgress, [0, 1], [-30, 30]) }}
            />

            

            {/* Links */}
            <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8 relative z-10">
                <div className="grid gap-12 md:grid-cols-4">
                    {/* Brand */}
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="flex items-center gap-2">
                            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary font-display text-lg font-bold text-primary-foreground">
                                MH
                            </span>
                            <span className="font-display text-xl font-bold">Digital</span>
                        </div>
                        <p className="mt-4 text-sm leading-relaxed text-background/50">
                            Empowering brands with innovative digital marketing solutions
                            since 2014.
                        </p>
                        {/* Social Icons */}
                        <div className="mt-6 flex gap-3">
                            {["FB", "X", "IN", "IG"].map((s, index) => (
                                <motion.a
                                    key={s}
                                    href="#"
                                    className="flex h-9 w-9 items-center justify-center rounded-full border border-background/20 text-xs font-bold text-background/60 transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground"
                                    whileHover={{ scale: 1.1, y: -3 }}
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    {s}
                                </motion.a>
                            ))}
                        </div>
                    </motion.div>

                    {/* Link columns */}
                    {footerLinks.map((section, sectionIndex) => (
                        <motion.div
                            key={section.title}
                            initial={{ y: 20, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: sectionIndex * 0.1 }}
                        >
                            <h4 className="mb-4 font-display text-sm font-bold uppercase tracking-wider">
                                {section.title}
                            </h4>
                            <ul className="space-y-3">
                                {section.links.map((link, linkIndex) => (
                                    <motion.li
                                        key={link.label}
                                        initial={{ x: -10, opacity: 0 }}
                                        whileInView={{ x: 0, opacity: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: sectionIndex * 0.1 + linkIndex * 0.05 }}
                                    >
                                    <motion.a
                                            href={link.href}
                                            className="text-sm text-background/50 transition-colors hover:text-primary block"
                                            whileHover={{ x: 5 }}
                                        >
                                            {link.label}
                                        </motion.a>
                                    </motion.li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </div>

                <motion.div 
                    className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-background/10 pt-8 md:flex-row"
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                >
                    <p className="text-xs text-background/40">
                        © 2026 MH Digital. All rights reserved.
                    </p>
                    <div className="flex gap-6 text-xs text-background/40">
                        <motion.a 
                            href="#" 
                            className="hover:text-primary"
                            whileHover={{ y: -2 }}
                        >
                            Privacy Policy
                        </motion.a>
                        <motion.a 
                            href="#" 
                            className="hover:text-primary"
                            whileHover={{ y: -2 }}
                        >
                            Terms of Service
                        </motion.a>
                    </div>
                </motion.div>
            </div>
        </footer>
    );
};

export default Footer;
