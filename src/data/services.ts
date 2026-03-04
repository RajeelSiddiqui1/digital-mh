import {
    Search,
    BarChart3,
    Megaphone,
    Palette,
    Globe,
    Mail,
    type LucideIcon
} from "lucide-react";

export interface ServiceData {
    id: string;
    icon: LucideIcon;
    title: string;
    description: string;
    longDescription: string;
    image: string;
    features: string[];
}

export const servicesData: ServiceData[] = [
    {
        id: "seo-optimization",
        icon: Search,
        title: "SEO Optimization",
        description:
            "Dominate search rankings with our proven SEO strategies. We optimize every aspect of your online presence for maximum visibility.",
        longDescription: "Our SEO Optimization service goes beyond just keywords. We provide a comprehensive audit of your website's technical health, content quality, and backlink profile. By understanding your market and competitors, we craft a bespoke strategy to elevate your rankings and drive organic, high-converting traffic. Experience sustainable growth and long-term dominance in search engine results.",
        image: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?q=80&w=2074&auto=format&fit=crop",
        features: [
            "Comprehensive Website Audit and Keyword Research",
            "On-Page Optimization and Content Strategy",
            "High-Quality Link Building",
            "Local SEO Strategies",
            "Technical SEO Enhancements",
            "Monthly Performance Reporting"
        ]
    },
    {
        id: "social-media-marketing",
        icon: Megaphone,
        title: "Social Media Marketing",
        description:
            "Build a loyal community and amplify your brand voice across all major social platforms with engaging content strategies.",
        longDescription: "A strong social media presence is crucial in today's digital landscape. Our experts design targeted campaigns that do more than just get likes; they build communities. We handle everything from content creation and scheduling to community management and analytics. Through engaging storytelling and interactive media, we turn your followers into loyal brand advocates.",
        image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=1974&auto=format&fit=crop",
        features: [
            "Platform-Specific Content Creation",
            "Community Management & Engagement",
            "Influencer Partnerships",
            "Social Media Strategy Formulation",
            "Analytics and ROI Tracking",
            "Contests and Campaign Management"
        ]
    },
    {
        id: "ppc-advertising",
        icon: BarChart3,
        title: "PPC Advertising",
        description:
            "Maximize ROI with targeted pay-per-click campaigns. Every dollar works harder with our data-driven ad management.",
        longDescription: "Pay-Per-Click advertising provides immediate visibility. We execute highly targeted campaigns on Google, Bing, and social media networks. By leveraging deep data analysis, A/B testing, and continuous optimization, we ensure your ad spend delivers maximum returns. Expect highly qualified leads and a surge in conversions with our precision-engineered PPC solutions.",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
        features: [
            "Google Ads & Social Media Ads Management",
            "A/B Testing & Conversion Optimization",
            "Keyword Bid Strategy & Optimization",
            "Landing Page Optimization",
            "Retargeting Campaigns",
            "Transparent ROI Reporting"
        ]
    },
    {
        id: "brand-identity",
        icon: Palette,
        title: "Brand Identity",
        description:
            "Create a memorable brand that resonates with your audience. From logos to full brand guidelines, we bring your vision to life.",
        longDescription: "Your brand is your identity. We dive deep into your company's core values to craft a visual and verbal identity that stands out. Whether you're starting from scratch or undergoing a comprehensive rebrand, our creative team develops striking logos, cohesive color palettes, unique typography, and complete brand guidelines that leave a lasting impression on your target audience.",
        image: "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=1964&auto=format&fit=crop",
        features: [
            "Logo Design and Visual Identity",
            "Brand Strategy and Positioning",
            "Comprehensive Brand Guidelines",
            "Typography and Color Palette Selection",
            "Marketing Collateral Design",
            "Brand Voice and Messaging Matrix"
        ]
    },
    {
        id: "web-development",
        icon: Globe,
        title: "Web Development",
        description:
            "Beautiful, fast, and conversion-optimized websites built with modern technologies that scale with your business.",
        longDescription: "We build websites that act as powerful digital storefronts. Our development team focuses on creating blazing-fast, responsive, and secure websites that look stunning on every device. By combining best-in-class UX/UI design with scalable architecture, we deliver digital platforms that not only reflect your brand's quality but also drive conversions seamlessly.",
        image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072&auto=format&fit=crop",
        features: [
            "Custom Front-End & Back-End Development",
            "Responsive and Mobile-First Design",
            "E-Commerce Solutions",
            "CMS Integration and Management",
            "Website Speed Optimization",
            "Robust Security Measures"
        ]
    },
    {
        id: "email-marketing",
        icon: Mail,
        title: "Email Marketing",
        description:
            "Nurture leads and retain customers with personalized email campaigns that drive engagement and conversions.",
        longDescription: "Email remains one of the highest ROI channels. We create sophisticated, automated email marketing funnels that guide your prospects through the customer journey. From visually appealing newsletters to hyper-personalized retention campaigns, we craft compelling messages that command attention in crowded inboxes, driving repeat business and boosting customer lifetime value.",
        image: "https://images.unsplash.com/photo-1557200134-90327ee9fafa?q=80&w=2070&auto=format&fit=crop",
        features: [
            "Automated Drip Campaigns",
            "Newsletter Strategy and Design",
            "List Segmentation and Management",
            "A/B Testing for Subject Lines and Content",
            "Lead Magnet Integration",
            "Performance and Engagement Analytics"
        ]
    },
];
