import { Linkedin, Twitter } from "lucide-react";
import { Reveal, RevealFade } from "@/components/ui/Reveal";

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
    return (
        <section id="team" className="section-padding bg-secondary/30">
            <div className="mx-auto max-w-7xl">
                <Reveal width="100%">
                    <div className="mb-16 max-w-2xl text-center mx-auto">
                        <span className="mb-4 inline-block rounded-full bg-primary/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-foreground">
                            Our Team
                        </span>
                        <h2 className="heading-lg mb-4">
                            Meet the <span className="italic text-primary">experts</span>
                        </h2>
                        <p className="text-body mx-auto max-w-xl">
                            We are a team of passionate digital marketers, developers, and designers dedicated to driving your success.
                        </p>
                    </div>
                </Reveal>

                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                    {teamMembers.map((member, index) => (
                        <RevealFade key={member.name} delay={index * 0.1} width="100%">
                            <div className="group relative overflow-hidden rounded-2xl bg-card border border-border transition-all hover:-translate-y-1 hover:shadow-lg">
                                <div className="aspect-[4/5] overflow-hidden">
                                    <img
                                        src={member.image}
                                        alt={member.name}
                                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        loading="lazy"
                                    />
                                </div>
                                <div className="p-6">
                                    <h3 className="font-display text-xl font-bold">{member.name}</h3>
                                    <p className="text-primary text-sm font-semibold mb-3">{member.role}</p>
                                    <p className="text-sm text-muted-foreground mb-4">{member.bio}</p>
                                    <div className="flex gap-3">
                                        <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                                            <Linkedin size={18} />
                                        </a>
                                        <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                                            <Twitter size={18} />
                                        </a>
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

export default Team;
