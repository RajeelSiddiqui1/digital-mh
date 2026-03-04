import { ArrowUpRight } from "lucide-react";
import { Reveal, RevealFade } from "@/components/ui/Reveal";

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
    return (
        <section id="portfolio" className="section-padding bg-background">
            <div className="mx-auto max-w-7xl">
                <Reveal width="100%">
                    <div className="mb-16 text-center">
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
                    </div>
                </Reveal>

                <div className="grid gap-6 sm:grid-cols-2">
                    {projects.map((project, index) => (
                        <RevealFade key={project.title} delay={index * 0.1} width="100%">
                            <div
                                className="group relative overflow-hidden rounded-2xl bg-card"
                            >
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    loading="lazy"
                                />
                                <div className="absolute inset-0 flex items-end bg-gradient-to-t from-foreground/70 via-transparent to-transparent p-6 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                                    <div className="flex w-full items-end justify-between">
                                        <div>
                                            <span className="mb-1 block text-xs font-semibold uppercase tracking-wider text-primary">
                                                {project.category}
                                            </span>
                                            <h3 className="font-display text-xl font-bold text-background">
                                                {project.title}
                                            </h3>
                                        </div>
                                        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
                                            <ArrowUpRight size={18} />
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </RevealFade>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Portfolio;
