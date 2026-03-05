import { useState, useEffect } from "react";
import { Menu, X, Moon, Sun, ArrowRight } from "lucide-react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isDark, setIsDark] = useState(() => {
        if (typeof window !== "undefined") {
            return localStorage.getItem("theme") === "dark";
        }
        return false;
    });

    const { scrollY } = useScroll();
    const headerOpacity = useTransform(scrollY, [0, 50], [0, 1]);
    const headerBlur = useTransform(scrollY, [0, 50], [0, 10]);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        if (isDark) {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    }, [isDark]);

    const navLinks = [
        { label: "About", href: "/about" },
        { label: "Services", href: "/#services" },
        { label: "Portfolio", href: "/#portfolio" },
        { label: "Team", href: "/#team" },
        { label: "FAQ", href: "/#faq" },
        { label: "Contact", href: "/contact" },
    ];

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                isScrolled
                    ? "bg-background/80 backdrop-blur-xl shadow-sm"
                    : "bg-transparent"
            }`}
            style={{
                backgroundColor: isScrolled ? 'rgba(var(--background-rgb), 0.8)' : 'transparent',
            }}
        >
            {/* Scroll progress line */}
            <motion.div 
                className="absolute bottom-0 left-0 h-0.5 bg-primary"
                style={{ 
                    scaleX: useTransform(scrollY, [0, 500], [0, 1]),
                    transformOrigin: "left"
                }}
            />

            <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
                {/* Logo with animation */}
                <motion.a 
                    href="/"
                    className="flex items-center gap-2 group"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                >
                    <motion.div 
                        className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary font-display text-lg font-bold text-primary-foreground"
                        whileHover={{ rotate: 360, scale: 1.1 }}
                        transition={{ duration: 0.5 }}
                    >
                        MH
                    </motion.div>
                    <span className="font-display text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                        Digital
                    </span>
                </motion.a>

                {/* Desktop Nav */}
                <nav className="hidden items-center gap-8 lg:flex">
                    {navLinks.map((link, index) => (
                        <motion.a
                            key={link.label}
                            href={link.href}
                            className="font-body text-sm font-medium text-foreground/70 transition-colors hover:text-foreground relative"
                            initial={{ y: -20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: index * 0.05 }}
                            whileHover={{ y: -2 }}
                        >
                            {link.label}
                            <motion.span 
                                className="absolute -bottom-1 left-0 h-0.5 bg-primary"
                                initial={{ width: 0 }}
                                whileHover={{ width: "100%" }}
                                transition={{ duration: 0.2 }}
                            />
                        </motion.a>
                    ))}
                </nav>

                {/* Right side */}
                <div className="flex items-center gap-4">
                    <motion.button
                        onClick={() => setIsDark(!isDark)}
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
                        aria-label="Toggle theme"
                        whileHover={{ scale: 1.1, rotate: 15 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <motion.div
                            animate={{ rotate: isDark ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            {isDark ? <Sun size={18} /> : <Moon size={18} />}
                        </motion.div>
                    </motion.button>

                    <motion.a
                        href="/#pricing"
                        className="btn-primary hidden text-sm lg:inline-flex"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Let's talk <ArrowRight size={16} />
                    </motion.a>

                    <motion.button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-foreground lg:hidden"
                        aria-label="Toggle menu"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <motion.div
                            animate={{ rotate: isMobileMenuOpen ? 90 : 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                        </motion.div>
                    </motion.button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="border-t border-border bg-background/95 backdrop-blur-xl lg:hidden"
                    >
                        <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-6 py-4">
                            {navLinks.map((link, index) => (
                                <motion.a
                                    key={link.label}
                                    href={link.href}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="rounded-lg px-4 py-3 font-body text-sm font-medium text-foreground/70 transition-colors hover:bg-secondary hover:text-foreground"
                                    initial={{ x: -20, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: index * 0.05 }}
                                    whileHover={{ x: 5 }}
                                >
                                    {link.label}
                                </motion.a>
                            ))}
                            <motion.a
                                href="/#pricing"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="btn-primary mt-2 justify-center text-sm"
                                initial={{ y: 10, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: navLinks.length * 0.05 }}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                Let's talk <ArrowRight size={16} />
                            </motion.a>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
};

export default Header;
