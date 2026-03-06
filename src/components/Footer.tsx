import { useRef } from "react";
import { ArrowUpRight, Facebook, Twitter, Linkedin, Instagram, Mail, MapPin, Phone, Sparkles } from "lucide-react";
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

const socialLinks = [
    { icon: Facebook, label: "Facebook", href: "#" },
    { icon: Twitter, label: "Twitter", href: "#" },
    { icon: Linkedin, label: "LinkedIn", href: "#" },
    { icon: Instagram, label: "Instagram", href: "#" },
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
                className="absolute -left-20 -top-20 h-80 w-80 rounded-full bg-primary/20 blur-[100px]"
                style={{ y }}
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 10, repeat: Infinity }}
            />
            <motion.div 
                className="absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-secondary/30 blur-[100px]"
                style={{ y: useTransform(scrollYProgress, [0, 1], [-30, 30]) }}
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 12, repeat: Infinity, delay: 1 }}
            />

            {/* Links */}
            <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8 relative z-10">
                <div className="grid gap-12 md:grid-cols-5">
                    {/* Brand & Contact Info */}
                    <motion.div
                        className="md:col-span-2"
                        initial={{ y: 20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="flex items-center gap-2 mb-4">
                            <motion.div 
                                className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-secondary font-display text-lg font-bold text-white shadow-lg shadow-primary/30"
                                whileHover={{ scale: 1.1, rotate: 5 }}
                            >
                                MH
                            </motion.div>
                            <span className="font-display text-2xl font-bold">Digital</span>
                        </div>
                        <p className="mt-4 text-sm leading-relaxed text-background/70 max-w-sm">
                            Empowering brands with innovative digital marketing solutions since 2014. 
                            Let's build something amazing together.
                        </p>
                        
                        {/* Contact Info */}
                        <div className="mt-6 space-y-3">
                            <motion.div 
                                className="flex items-center gap-3 text-sm text-background/60"
                                whileHover={{ x: 5 }}
                            >
                                <Mail size={16} className="text-primary" />
                                info@mhdigitaledge.com
                            </motion.div>
                            <motion.div 
                                className="flex items-center gap-3 text-sm text-background/60"
                                whileHover={{ x: 5 }}
                            >
                                <Phone size={16} className="text-primary" />
                                +1 (555) 123-4567
                            </motion.div>
                            <motion.div 
                                className="flex items-center gap-3 text-sm text-background/60"
                                whileHover={{ x: 5 }}
                            >
                                <MapPin size={16} className="text-primary" />
                                New York, USA
                            </motion.div>
                        </div>

                        {/* Social Icons */}
                        <div className="mt-6 flex gap-3">
                            {socialLinks.map((social, index) => (
                                <motion.a
                                    key={social.label}
                                    href={social.href}
                                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-background/20 text-background/60 transition-all hover:border-primary hover:bg-primary hover:text-primary-foreground"
                                    whileHover={{ scale: 1.1, y: -3 }}
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <social.icon size={18} />
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
                            <h4 className="mb-5 font-display text-sm font-bold uppercase tracking-wider flex items-center gap-2">
                                <Sparkles size={14} className="text-primary" />
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
                                            className="text-sm text-background/60 transition-all hover:text-primary hover:translate-x-1 inline-block"
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

                {/* Newsletter Section */}
                <motion.div 
                    className="mt-16 flex flex-col items-center justify-between gap-6 border-t border-background/10 pt-8 md:flex-row"
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                >
                    <div className="text-center md:text-left">
                        <p className="text-sm text-background/60">© 2026 MH Digital. All rights reserved.</p>
                    </div>
                    <div className="flex gap-6 text-sm text-background/40">
                        <motion.a 
                            href="#" 
                            className="hover:text-primary transition-colors"
                            whileHover={{ y: -2 }}
                        >
                            Privacy Policy
                        </motion.a>
                        <motion.a 
                            href="#" 
                            className="hover:text-primary transition-colors"
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
