import { useParams, Navigate, Link } from "react-router-dom";
import { ArrowLeft, Check, ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Reveal, RevealFade } from "@/components/ui/Reveal";
import { servicesData } from "@/data/services";
import { useEffect } from "react";

const ServiceDetail = () => {
    const { id } = useParams<{ id: string }>();
    const service = servicesData.find((s) => s.id === id);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    if (!service) {
        return <Navigate to="/" />;
    }

    return (
        <div className="min-h-screen bg-background">
            <Header />

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 overflow-hidden bg-gradient-to-b from-primary/10 to-background border-b border-border/50">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <Reveal width="100%">
                        <div className="max-w-3xl mb-8">
                            <Link to="/#services" className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors mb-6 group">
                                <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
                                Back to Services
                            </Link>

                            <div className="flex items-center gap-4 mb-6">
                                <div className="h-16 w-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                                    <service.icon size={32} />
                                </div>
                                <span className="inline-block rounded-full bg-primary/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-foreground">
                                    Service Details
                                </span>
                            </div>

                            <h1 className="heading-xl mb-6">
                                {service.title}
                            </h1>
                            <p className="text-body text-xl">
                                {service.description}
                            </p>
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* Content Section */}
            <section className="section-padding">
                <div className="mx-auto max-w-7xl">
                    <div className="grid lg:grid-cols-2 gap-16 items-start">
                        {/* Image */}
                        <RevealFade width="100%">
                            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-border group">
                                <img
                                    src={service.image}
                                    alt={service.title}
                                    className="w-full h-[500px] object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent"></div>
                            </div>
                        </RevealFade>

                        {/* Text and Features */}
                        <Reveal width="100%" delay={0.2}>
                            <div>
                                <h2 className="heading-md mb-6">
                                    Elevate your <span className="italic text-primary">game</span>
                                </h2>
                                <p className="text-body mb-10 text-muted-foreground leading-relaxed">
                                    {service.longDescription}
                                </p>

                                <div className="bg-secondary/30 rounded-3xl p-8 border border-border">
                                    <h3 className="font-display text-xl font-bold mb-6">What's included:</h3>
                                    <ul className="grid sm:grid-cols-2 gap-4">
                                        {service.features.map((feature, i) => (
                                            <li key={i} className="flex items-start gap-3">
                                                <div className="mt-1 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                                                    <Check size={12} />
                                                </div>
                                                <span className="text-sm font-medium text-foreground">
                                                    {feature}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="mt-10">
                                    <Link to="/contact" className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 font-semibold text-primary-foreground transition-all hover:scale-105">
                                        Start Your Project <ArrowRight size={18} />
                                    </Link>
                                </div>
                            </div>
                        </Reveal>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default ServiceDetail;
