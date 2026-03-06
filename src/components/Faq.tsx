import { useState, useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { faqService } from "../services/api";
import type { IFaq } from "../types";

const Faq = () => {
    const [faqs, setFaqs] = useState<IFaq[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [openIndex, setOpenIndex] = useState<number | null>(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

    // Fetch FAQs from API
    useEffect(() => {
        const fetchFaqs = async () => {
            try {
                setLoading(true);
                const data = await faqService.getAllFaqs();
                setFaqs(data);
            } catch (err) {
                setError('Failed to fetch FAQs');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchFaqs();
    }, []);

    const toggleFaq = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section id="faq" className="section-padding bg-background relative overflow-hidden">
            {/* Background decoration */}
            <motion.div 
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-primary/5 blur-3xl"
                style={{ y }}
            />

            <div ref={containerRef} className="mx-auto max-w-3xl relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ y: 30, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-12 text-center"
                >
                    <span className="mb-4 inline-block rounded-full bg-primary/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-foreground">
                        FAQ
                    </span>
                    <h2 className="heading-lg mb-4">
                        Frequently asked <span className="italic text-primary">questions</span>
                    </h2>
                    <p className="text-body mx-auto max-w-xl">
                        Everything you need to know about our digital marketing services and how we work.
                    </p>
                </motion.div>

                {/* Loading State */}
                {loading && (
                    <div className="text-center py-12">
                        <div className="text-xl text-muted-foreground">Loading FAQs...</div>
                    </div>
                )}

                {/* Error State */}
                {error && (
                    <div className="text-center py-12">
                        <p className="text-xl text-red-500">{error}</p>
                    </div>
                )}

                {/* FAQs List */}
                {!loading && !error && faqs.length > 0 && (
                    <div className="space-y-4">
                        {faqs.map((faq, index) => (
                            <motion.div
                                key={faq._id}
                                initial={{ y: 20, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: index * 0.1 }}
                            >
                                <motion.div
                                    className={`overflow-hidden rounded-2xl border transition-all duration-300 cursor-pointer ${
                                        openIndex === index 
                                            ? "border-primary bg-primary/5 shadow-lg shadow-primary/10" 
                                            : "border-border bg-card hover:border-primary/30"
                                    }`}
                                    onClick={() => toggleFaq(index)}
                                >
                                    <motion.div 
                                        className="flex items-center justify-between p-6 text-left"
                                        whileHover={{ x: 5 }}
                                    >
                                        <span className="font-display text-lg font-bold text-foreground pr-4">
                                            {faq.question}
                                        </span>
                                        <motion.div
                                            className="text-primary flex-shrink-0"
                                            animate={{ rotate: openIndex === index ? 180 : 0 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <ChevronDown size={20} />
                                        </motion.div>
                                    </motion.div>
                                    
                                    <AnimatePresence>
                                        {openIndex === index && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                            >
                                                <div className="px-6 pb-6 text-sm text-muted-foreground leading-relaxed space-y-3">
                                                    {faq.answers.map((answer, answerIndex) => (
                                                        <p key={answerIndex}>{answer}</p>
                                                    ))}
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            </motion.div>
                        ))}
                    </div>
                )}

                {/* No FAQs found */}
                {!loading && !error && faqs.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-muted-foreground">No FAQs available.</p>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Faq;
