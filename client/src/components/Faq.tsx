import { useState, useRef } from "react";
import { ChevronDown } from "lucide-react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";

const faqs = [
    {
        question: "What services does MH Digital offer?",
        answer: "We provide complete digital marketing solutions including SEO, Meta Ads, Google Ads, SMM, Email Marketing, Affiliate Marketing, Content Marketing, Influencer Marketing, and Website Development.",
    },
    {
        question: "How do I know which service is right for my business?",
        answer: "We offer a free consultation to understand your goals and recommend the best strategy based on your industry and budget.",
    },
    {
        question: "Do you work with international clients?",
        answer: "Yes, we provide digital marketing services globally.",
    },
    {
        question: "Do you provide reports?",
        answer: "Yes, we provide detailed weekly or monthly performance reports.",
    },
    {
        question: "How can we get started?",
        answer: "Contact us through our website or book a free strategy call to begin your growth journey.",
    },
];

const Faq = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

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

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <motion.div
                            key={index}
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
                                            <div className="px-6 pb-6 text-sm text-muted-foreground leading-relaxed">
                                                {faq.answer}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Faq;
