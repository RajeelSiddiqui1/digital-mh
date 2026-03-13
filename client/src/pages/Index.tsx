import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Features from "@/components/Features";
import Portfolio from "@/components/Portfolio";
import Testimonials from "@/components/Testimonials";
import Team from "@/components/Team";
import Faq from "@/components/Faq";
import Footer from "@/components/Footer";
import Contact from "@/components/Contact";

const Index = () => {
    return (
        <div className="min-h-screen">
            <Header />
            <Hero />
            <Services />
            <Features />
            <Portfolio />
            <Team />
            {/* <Testimonials /> */}
            <Faq />
            <Contact/>
            <Footer />
        </div>
    );
};

export default Index;
