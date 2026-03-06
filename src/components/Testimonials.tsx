import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Star, Quote, Sparkles } from "lucide-react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { testimonialService } from "../services/api";
import type { ITestimonial } from "../types";

const Testimonials = () => {
    const [testimonials, setTestimonials] = useState<ITestimonial[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [current, setCurrent] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

    // Fetch testimonials from API
    useEffect(() => {
        const fetchTestimonials = async () => {
            try {
                setLoading(true);
                const data = await testimonialService.getAllTestimonials();
                setTestimonials(data);
            } catch (err) {
                setError('Failed to fetch testimonials');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchTestimonials();
    }, []);

    const prev = () =>
        setCurrent((c) => (c === 0 ? testimonials.length - 1 : c - 1));
    const next = () =>
        setCurrent((c) => (c === testimonials.length - 1 ? 0 : c + 1));

    const t = testimonials[current];

    return (
        <section id="testimonials" className="section-padding bg-secondary/30 relative overflow-hidden dark:bg-secondary/10">
            {/* Background decoration */}
            <motion.div 
                className="absolute left-0 top-0 h-80 w-80 rounded-full bg-primary/20 blur-[100px] dark:bg-primary/10"
                style={{ y: useTransform(scrollYProgress, [0, 1], [0, 50]) }}
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 8, repeat: Infinity }}
            />
            <motion.div 
                className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-secondary/30 blur-[100px] dark:bg-secondary/20"
                style={{ y: useTransform(scrollYProgress, [0, 1], [0, -50]) }}
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 10, repeat: Infinity, delay: 1 }}
            />

            {/* Grid pattern */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMzMzMiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] dark:opacity-10" />

            <div ref={containerRef} className="mx-auto max-w-4xl text-center relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ y: 30, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary/20 to-secondary/20 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-foreground dark:text-white">
                        <Sparkles className="text-primary" size={14} />
                        Testimonials
                    </span>
                    <h2 className="heading-lg mb-12">
                        What our{" "}
                        <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary to-secondary dark:from-primary dark:to-secondary">
                            clients say
                        </span>
                    </h2>
                </motion.div>

                {/* Loading State */}
                {loading && (
                    <div className="py-12">
                        <div className="text-xl text-muted-foreground">Loading testimonials...</div>
                    </div>
                )}

                {/* Error State */}
                {error && (
                    <div className="py-12">
                        <p className="text-xl text-red-500">{error}</p>
                    </div>
                )}

                {/* Testimonial Carousel */}
                {!loading && !error && testimonials.length > 0 && (
                    <motion.div
                        style={{ y }}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="relative">
                            <Quote className="mx-auto mb-8 text-primary/40" size={56} />
                            
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={current}
                                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: -20, scale: 0.95 }}
                                    transition={{ duration: 0.4 }}
                                    className="bg-card/50 backdrop-blur-xl rounded-3xl p-8 border border-border/50 shadow-xl dark:bg-card/30"
                                >
                                    <p className="mb-8 font-display text-xl md:text-2xl leading-relaxed text-foreground dark:text-white">
                                        "{t.comment}"
                                    </p>
                                </motion.div>
                            </AnimatePresence>
                            
                            <div className="mb-4 flex items-center justify-center gap-1">
                                {Array.from({ length: t.stars }).map((_, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ scale: 0, rotate: -180 }}
                                        whileInView={{ scale: 1, rotate: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.1, type: "spring" }}
                                    >
                                        <Star
                                            size={20}
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
                                    className="flex flex-col items-center"
                                >
                                    <div className="flex items-center justify-center gap-4">
                                        {t.profilePic?.url && (
                                            <motion.img
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                src={t.profilePic.url}
                                                alt={t.name}
                                                className="w-16 h-16 rounded-full object-cover border-2 border-primary shadow-lg"
                                            />
                                        )}
                                        <div className="text-left">
                                            <div className="font-display text-xl font-bold text-foreground dark:text-white">
                                                {t.name}
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            </AnimatePresence>

                            {/* Navigation */}
                            <div className="mt-10 flex items-center justify-center gap-4">
                                <motion.button
                                    onClick={prev}
                                    className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-border text-foreground hover:border-primary hover:text-primary hover:bg-primary/10 transition-all"
                                    aria-label="Previous testimonial"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    <ChevronLeft size={24} />
                                </motion.button>
                                <div className="flex items-center gap-2 px-4">
                                    {testimonials.map((_, index) => (
                                        <motion.button
                                            key={index}
                                            onClick={() => setCurrent(index)}
                                            className={`h-2 rounded-full transition-all ${
                                                current === index ? "w-8 bg-gradient-to-r from-primary to-secondary" : "w-2 bg-primary/30 hover:bg-primary/50"
                                            }`}
                                            whileHover={{ scale: 1.2 }}
                                            whileTap={{ scale: 0.9 }}
                                        />
                                    ))}
                                </div>
                                <motion.button
                                    onClick={next}
                                    className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-border text-foreground hover:border-primary hover:text-primary hover:bg-primary/10 transition-all"
                                    aria-label="Next testimonial"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    <ChevronRight size={24} />
                                </motion.button>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* No Testimonials */}
                {!loading && !error && testimonials.length === 0 && (
                    <div className="py-12">
                        <p className="text-muted-foreground">No testimonials available.</p>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Testimonials;
