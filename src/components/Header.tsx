import { useState, useEffect } from "react";
import { Menu, X, Moon, Sun, ArrowRight } from "lucide-react";

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isDark, setIsDark] = useState(() => {
        if (typeof window !== "undefined") {
            return localStorage.getItem("theme") === "dark";
        }
        return false;
    });

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
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
                ? "bg-background/80 backdrop-blur-xl shadow-sm"
                : "bg-transparent"
                }`}
        >
            <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
                {/* Logo */}
                <a href="/">
                    <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary font-display text-lg font-bold text-primary-foreground">
                        MH
                    </span>
                    <span className="font-display text-xl font-bold text-foreground">
                        Digital
                    </span>
                </a>

                {/* Desktop Nav */}
                <nav className="hidden items-center gap-8 lg:flex">
                    {navLinks.map((link) => (
                        <a
                            key={link.label}
                            href={link.href}
                            className="font-body text-sm font-medium text-foreground/70 transition-colors hover:text-foreground"
                        >
                            {link.label}
                        </a>
                    ))}
                </nav>

                {/* Right side */}
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => setIsDark(!isDark)}
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
                        aria-label="Toggle theme"
                    >
                        {isDark ? <Sun size={18} /> : <Moon size={18} />}
                    </button>

                    <a
                        href="/#pricing"
                        className="btn-primary hidden text-sm lg:inline-flex"
                    >
                        Let's talk <ArrowRight size={16} />
                    </a>

                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-foreground lg:hidden"
                        aria-label="Toggle menu"
                    >
                        {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="border-t border-border bg-background/95 backdrop-blur-xl lg:hidden">
                    <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-6 py-4">
                        {navLinks.map((link) => (
                            <a
                                key={link.label}
                                href={link.href}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="rounded-lg px-4 py-3 font-body text-sm font-medium text-foreground/70 transition-colors hover:bg-secondary hover:text-foreground"
                            >
                                {link.label}
                            </a>
                        ))}
                        <a
                            href="/#pricing"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="btn-primary mt-2 justify-center text-sm"
                        >
                            Let's talk <ArrowRight size={16} />
                        </a>
                    </nav>
                </div>
            )}
        </header>
    );
};

export default Header;
