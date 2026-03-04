import { Check } from "lucide-react";
import { Reveal, RevealFade } from "@/components/ui/Reveal";

const featuresImg = "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop";

const features = [
    "Data-driven strategy & analytics",
    "Dedicated account manager",
    "Real-time campaign dashboards",
    "A/B testing & optimization",
    "Monthly performance reports",
    "24/7 support & communication",
];

const Features = () => {
    return (
        <section id="features" className="section-padding bg-secondary/30">
            <div className="mx-auto max-w-7xl">
                <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
                    {/* Image */}
                    <RevealFade width="100%">
                        <div className="relative">
                            <div className="overflow-hidden rounded-3xl">
                                <img
                                    src={featuresImg}
                                    alt="Team collaboration on digital marketing strategy"
                                    className="h-auto w-full object-cover"
                                    loading="lazy"
                                />
                            </div>
                            {/* Floating card */}
                            <div className="absolute -bottom-6 -right-4 rounded-2xl border border-border bg-card p-5 shadow-lg md:-right-8">
                                <div className="font-display text-3xl font-bold text-foreground">
                                    3x
                                </div>
                                <div className="text-sm text-muted-foreground">Average ROI</div>
                            </div>
                        </div>
                    </RevealFade>

                    {/* Text content */}
                    <Reveal width="100%" delay={0.2}>
                        <div>
                            <span className="mb-4 inline-block rounded-full bg-primary/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-foreground">
                                Why Choose Us
                            </span>
                            <h2 className="heading-lg mb-6">
                                Built for{" "}
                                <span className="italic text-primary">results</span>
                            </h2>
                            <p className="text-body mb-8">
                                We combine creativity with data science to deliver marketing
                                campaigns that don't just look good—they perform. Our approach
                                is transparent, collaborative, and relentlessly focused on your
                                growth.
                            </p>
                            <ul className="grid gap-4 sm:grid-cols-2">
                                {features.map((feature) => (
                                    <li key={feature} className="flex items-start gap-3">
                                        <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                                            <Check size={14} />
                                        </span>
                                        <span className="text-sm font-medium text-foreground">
                                            {feature}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </Reveal>
                </div>
            </div>
        </section>
    );
};

export default Features;
