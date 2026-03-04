import { useState } from "react";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";
import { Reveal, RevealFade } from "@/components/ui/Reveal";

const testimonials = [
    {
        name: "Sarah Mitchell",
        role: "CEO, TechVenture Inc.",
        quote:
            "MH Digital transformed our online presence completely. Our organic traffic increased by 340% in just six months. Their team is incredibly talented and responsive.",
        rating: 5,
    },
    {
        name: "James Rodriguez",
        role: "Marketing Director, GrowthLab",
        quote:
            "The best marketing agency we've ever worked with. Their data-driven approach and creative campaigns delivered results beyond our expectations.",
        rating: 5,
    },
    {
        name: "Emily Chen",
        role: "Founder, StyleHouse",
        quote:
            "From brand identity to social media strategy, MH Digital handled everything flawlessly. Our brand recognition doubled within the first quarter.",
        rating: 5,
    },
];

const Testimonials = () => {
    const [current, setCurrent] = useState(0);

    const prev = () =>
        setCurrent((c) => (c === 0 ? testimonials.length - 1 : c - 1));
    const next = () =>
        setCurrent((c) => (c === testimonials.length - 1 ? 0 : c + 1));

    const t = testimonials[current];

    return (
        <section id="testimonials" className="section-padding bg-secondary/30">
            <div className="mx-auto max-w-4xl text-center">
                <Reveal width="100%">
                    <span className="mb-4 inline-block rounded-full bg-primary/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-foreground">
                        Testimonials
                    </span>
                    <h2 className="heading-lg mb-12">
                        What our{" "}
                        <span className="italic text-primary">clients say</span>
                    </h2>
                </Reveal>

                <RevealFade width="100%" delay={0.2}>
                    <div className="relative">
                        <Quote className="mx-auto mb-6 text-primary/30" size={48} />
                        <p className="mb-8 font-display text-xl font-medium leading-relaxed text-foreground md:text-2xl">
                            "{t.quote}"
                        </p>
                        <div className="mb-2 flex items-center justify-center gap-1">
                            {Array.from({ length: t.rating }).map((_, i) => (
                                <Star
                                    key={i}
                                    size={16}
                                    className="fill-primary text-primary"
                                />
                            ))}
                        </div>
                        <div className="font-display text-lg font-bold text-foreground">
                            {t.name}
                        </div>
                        <div className="text-sm text-muted-foreground">{t.role}</div>

                        {/* Navigation */}
                        <div className="mt-10 flex items-center justify-center gap-4">
                            <button
                                onClick={prev}
                                className="flex h-12 w-12 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
                                aria-label="Previous testimonial"
                            >
                                <ChevronLeft size={20} />
                            </button>
                            <span className="text-sm text-muted-foreground">
                                {current + 1} / {testimonials.length}
                            </span>
                            <button
                                onClick={next}
                                className="flex h-12 w-12 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
                                aria-label="Next testimonial"
                            >
                                <ChevronRight size={20} />
                            </button>
                        </div>
                    </div>
                </RevealFade>
            </div>
        </section>
    );
};

export default Testimonials;
