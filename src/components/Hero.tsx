import { ArrowRight, ArrowUpRight } from "lucide-react";

const Hero = () => {
    return (
        <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-primary/20 via-background to-primary/10 pt-24">
            {/* Decorative blobs */}
            <div className="absolute -left-32 top-1/4 h-96 w-96 rounded-full bg-primary/20 blur-3xl" />
            <div className="absolute -right-32 bottom-1/4 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />

            <div className="relative mx-auto flex max-w-7xl flex-col items-center px-6 pt-16 text-center md:pt-24 lg:px-8">
                {/* Badge */}
                <div className="mb-8 inline-flex animate-fade-in items-center gap-2 rounded-full bg-primary/15 px-5 py-2 text-sm font-medium text-foreground">
                    <span className="h-2 w-2 rounded-full bg-primary" />
                    #1 Digital Marketing Agency
                </div>

                {/* Main heading */}
                <h1 className="heading-xl mb-6 max-w-5xl animate-fade-in-up">
                    We are a{" "}
                    <span className="italic text-primary">digital</span>
                    <br />
                    marketing{" "}
                    <span className="font-display font-black tracking-tighter">AGENCY</span>
                </h1>

                <p className="text-body mb-10 max-w-2xl animate-fade-in-up opacity-0 [animation-delay:200ms]">
                    Boost your brand with cutting-edge digital marketing strategies.
                    We craft data-driven campaigns that deliver measurable results
                    and transform your online presence.
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col items-center gap-4 animate-fade-in-up opacity-0 [animation-delay:400ms] sm:flex-row">
                    <a href="/#services" className="btn-primary text-base">
                        Get Started <ArrowRight size={18} />
                    </a>
                    <a href="/#portfolio" className="btn-outline text-base">
                        View Our Work <ArrowUpRight size={18} />
                    </a>
                </div>

                {/* Stats */}
                <div className="mt-20 grid w-full max-w-3xl grid-cols-2 gap-8 border-t border-border pt-10 animate-fade-in-up opacity-0 [animation-delay:600ms] md:grid-cols-4">
                    {[
                        { value: "250+", label: "Projects Done" },
                        { value: "50+", label: "Team Members" },
                        { value: "98%", label: "Client Satisfaction" },
                        { value: "12+", label: "Years Experience" },
                    ].map((stat) => (
                        <div key={stat.label}>
                            <div className="font-display text-3xl font-bold text-foreground md:text-4xl">
                                {stat.value}
                            </div>
                            <div className="mt-1 text-sm text-muted-foreground">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Scrolling marquee */}
            <div className="mt-20 overflow-hidden border-y border-border bg-secondary/50 py-4">
                <div className="flex animate-marquee items-center gap-12 whitespace-nowrap">
                    {[...Array(2)].map((_, i) => (
                        <div key={i} className="flex items-center gap-12">
                            {["SEO Optimization", "Social Media", "Content Marketing", "PPC Campaigns", "Email Marketing", "Brand Strategy", "Web Development", "Analytics"].map(
                                (item) => (
                                    <span
                                        key={`${i}-${item}`}
                                        className="font-display text-lg font-semibold text-foreground/40 md:text-xl"
                                    >
                                        {item} <span className="mx-4 text-primary">✦</span>
                                    </span>
                                )
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Hero;
