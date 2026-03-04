import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Reveal, RevealFade } from "@/components/ui/Reveal";

const faqs = [
    {
        question: "What services do you offer?",
        answer: "We offer a full suite of digital marketing services including SEO, PPC, Social Media Management, Content Creation, Web Design, and Conversion Rate Optimization.",
    },
    {
        question: "How long does it take to see results from SEO?",
        answer: "SEO is a long-term strategy. While some improvements can be seen in the first month, significant and sustainable results typically take 3 to 6 months.",
    },
    {
        question: "Do you offer custom pricing plans?",
        answer: "Yes, we understand that every business is unique. We offer custom packages tailored to your specific goals, budget, and industry requirements.",
    },
    {
        question: "Will I have a dedicated account manager?",
        answer: "Absolutely. Every client is assigned a dedicated account manager who will be your main point of contact, providing regular updates and performance reports.",
    },
    {
        question: "How do you measure success?",
        answer: "We use a data-driven approach, tracking key performance indicators (KPIs) such as organic traffic, conversion rates, cost per acquisition (CPA), and overall ROI.",
    },
];

const Faq = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const toggleFaq = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section id="faq" className="section-padding bg-background">
            <div className="mx-auto max-w-3xl">
                <Reveal width="100%">
                    <div className="mb-12 text-center">
                        <span className="mb-4 inline-block rounded-full bg-primary/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-foreground">
                            FAQ
                        </span>
                        <h2 className="heading-lg mb-4">
                            Frequently asked <span className="italic text-primary">questions</span>
                        </h2>
                        <p className="text-body mx-auto max-w-xl">
                            Everything you need to know about our digital marketing services and how we work.
                        </p>
                    </div>
                </Reveal>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <RevealFade key={index} delay={index * 0.1} width="100%">
                            <div
                                className={`overflow-hidden rounded-2xl border transition-all duration-300 ${openIndex === index ? "border-primary bg-primary/5" : "border-border bg-card"
                                    }`}
                            >
                                <button
                                    onClick={() => toggleFaq(index)}
                                    className="flex w-full items-center justify-between p-6 text-left"
                                >
                                    <span className="font-display text-lg font-bold text-foreground">
                                        {faq.question}
                                    </span>
                                    <ChevronDown
                                        className={`text-primary transition-transform duration-300 flex-shrink-0 ${openIndex === index ? "rotate-180" : ""
                                            }`}
                                    />
                                </button>
                                <div
                                    className={`grid transition-all duration-300 ease-in-out ${openIndex === index ? "grid-rows-[1fr] pb-6 opacity-100" : "grid-rows-[0fr] opacity-0"
                                        }`}
                                >
                                    <div className="overflow-hidden px-6 text-sm text-muted-foreground leading-relaxed">
                                        {faq.answer}
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

export default Faq;
