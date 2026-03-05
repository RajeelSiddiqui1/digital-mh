import { useState, useRef } from "react";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";

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
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

    const prev = () =>
        setCurrent((c) => (c === 0 ? testimonials.length - 1 : c - 1));
    const next = () =>
        setCurrent((c) => (c === testimonials.length - 1 ? 0 : c + 1));

    const t = testimonials[current];

    return (
        <section id="testimonials" className="section-padding bg-secondary/30 relative overflow-hidden">
            {/* Background decoration */}
            <motion.div 
                className="absolute left-0 top-0 h-64 w-64 rounded-full bg-primary/10 blur-3xl"
                style={{ y: useTransform(scrollYProgress, [0, 1], [0, 50]) }}
            />
            <motion.div 
                className="absolute bottom-0 right-0 h-64 w-64 rounded-full bg-secondary/20 blur-3xl"
                style={{ y: useTransform(scrollYProgress, [0, 1], [0, -50]) }}
            />

            <div ref={containerRef} className="mx-auto max-w-4xl text-center relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ y: 30, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <span className="mb-4 inline-block rounded-full bg-primary/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-foreground">
                        Testimonials
                    </span>
                    <h2 className="heading-lg mb-12">
                        What our{" "}
                        <span className="italic text-primary">clients say</span>
                    </h2>
                </motion.div>

                {/* Testimonial Carousel */}
                <motion.div
                    style={{ y }}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="relative">
                        <Quote className="mx-auto mb-6 text-primary/30" size={48} />
                        
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={current}
                                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                                transition={{ duration: 0.4 }}
                            >
                                <p className="mb-8 font-display text-xl font-medium leading-relaxed text-foreground md:text-2xl">
                                    "{t.quote}"
                                </p>
                            </motion.div>
                        </AnimatePresence>
                        
                        <div className="mb-2 flex items-center justify-center gap-1">
                            {Array.from({ length: t.rating }).map((_, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ scale: 0, rotate: -180 }}
                                    whileInView={{ scale: 1, rotate: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1, type: "spring" }}
                                >
                                    <Star
                                        size={16}
                                        className="fill-primary text-primary"
                                    />
                                </motion.div>
                            ))}
                        </div>
                        
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={`${current}-name`}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.3 }}
                            >
                                <div className="font-display text-lg font-bold text-foreground">
                                    {t.name}
                                </div>
                                <div className="text-sm text-muted-foreground">{t.role}</div>
                            </motion.div>
                        </AnimatePresence>

                        {/* Navigation */}
                        <div className="mt-10 flex items-center justify-center gap-4">
                            <motion.button
                                onClick={prev}
                                className="flex h-12 w-12 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
                                aria-label="Previous testimonial"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <ChevronLeft size={20} />
                            </motion.button>
                            <span className="text-sm text-muted-foreground">
                                {current + 1} / {testimonials.length}
                            </span>
                            <motion.button
                                onClick={next}
                                className="flex h-12 w-12 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
                                aria-label="Next testimonial"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <ChevronRight size={20} />
                            </motion.button>
                        </div>

                        {/* Dots indicator */}
                        <div className="mt-6 flex justify-center gap-2">
                            {testimonials.map((_, index) => (
                                <motion.button
                                    key={index}
                                    onClick={() => setCurrent(index)}
                                    className={`h-2 rounded-full transition-all ${
                                        current === index ? "w-8 bg-primary" : "w-2 bg-primary/30"
                                    }`}
                                    whileHover={{ scale: 1.2 }}
                                    whileTap={{ scale: 0.9 }}
                                />
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Testimonials;
