import { ArrowUpRight } from "lucide-react";

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
    return (
        <footer className="bg-foreground text-background">
            {/* CTA Banner */}
            <div className="section-padding border-b border-background/10">
                <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 md:flex-row">
                    <div>
                        <h2 className="font-display text-3xl font-bold md:text-4xl">
                            Ready to grow your{" "}
                            <span className="italic text-primary">brand?</span>
                        </h2>
                        <p className="mt-2 text-background/60">
                            Let's create something extraordinary together.
                        </p>
                    </div>
                    <a
                        href="/#pricing"
                        className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 font-semibold text-primary-foreground transition-all hover:scale-105"
                    >
                        Start a Project <ArrowUpRight size={18} />
                    </a>
                </div>
            </div>

            {/* Links */}
            <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
                <div className="grid gap-12 md:grid-cols-4">
                    {/* Brand */}
                    <div>
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
                            {["FB", "X", "IN", "IG"].map((s) => (
                                <a
                                    key={s}
                                    href="#"
                                    className="flex h-9 w-9 items-center justify-center rounded-full border border-background/20 text-xs font-bold text-background/60 transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground"
                                >
                                    {s}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Link columns */}
                    {footerLinks.map((section) => (
                        <div key={section.title}>
                            <h4 className="mb-4 font-display text-sm font-bold uppercase tracking-wider">
                                {section.title}
                            </h4>
                            <ul className="space-y-3">
                                {section.links.map((link) => (
                                    <li key={link.label}>
                                        <a
                                            href={link.href}
                                            className="text-sm text-background/50 transition-colors hover:text-primary"
                                        >
                                            {link.label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-background/10 pt-8 md:flex-row">
                    <p className="text-xs text-background/40">
                        © 2026 MH Digital. All rights reserved.
                    </p>
                    <div className="flex gap-6 text-xs text-background/40">
                        <a href="#" className="hover:text-primary">Privacy Policy</a>
                        <a href="#" className="hover:text-primary">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
