import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Reveal, RevealFade } from "@/components/ui/Reveal";
import { servicesData } from "@/data/services";

const Services = () => {
    return (
        <section id="services" className="section-padding bg-background">
            <div className="mx-auto max-w-7xl">
                <Reveal width="100%">
                    <div className="mb-16 max-w-2xl">
                        <span className="mb-4 inline-block rounded-full bg-primary/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-foreground">
                            Our Services
                        </span>
                        <h2 className="heading-lg mb-4">
                            Solutions that{" "}
                            <span className="italic text-primary">drive growth</span>
                        </h2>
                        <p className="text-body">
                            We offer comprehensive digital marketing services tailored to
                            elevate your brand and accelerate business growth.
                        </p>
                    </div>
                </Reveal>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {servicesData.map((service, index) => (
                        <RevealFade key={service.id} delay={index * 0.1} width="100%">
                            <Link
                                to={`/service/${service.id}`}
                                className="group block h-full rounded-2xl border border-border bg-card p-8 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg"
                            >
                                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                                    <service.icon size={26} />
                                </div>
                                <h3 className="heading-md mb-3 text-xl">{service.title}</h3>
                                <p className="text-sm leading-relaxed text-muted-foreground mb-6">
                                    {service.description}
                                </p>
                                <div className="mt-auto flex items-center gap-2 text-sm font-semibold text-primary">
                                    Learn more <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                                </div>
                            </Link>
                        </RevealFade>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;
