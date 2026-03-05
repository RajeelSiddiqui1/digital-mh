import { Search, Megaphone, Target, Share2, PenTool, Mail, Users, Star, type LucideIcon, Lightbulb } from "lucide-react";

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
    id: "meta-ads-management",
    icon: Megaphone,
    title: "Meta Ads Management",
    description:
        "High-converting Facebook and Instagram advertising campaigns designed to generate leads and boost sales.",
    longDescription:
        "Our Meta Ads Management service focuses on building profitable campaigns on Facebook and Instagram. From audience research to creative optimization, we handle every aspect of your paid advertising to ensure maximum return on investment and consistent lead generation.",
    image: "/assets/services/meta-ads-management.jpg",
    features: [
        "Audience Research and Targeting",
        "Pixel Setup and Conversion Tracking",
        "Creative Design and Ad Copywriting",
        "Retargeting Campaign Setup",
        "A/B Testing for Ad Optimization",
        "Budget Optimization and ROAS Scaling"
    ]
},
{
    id: "google-ads",
    icon: Target,
    title: "Google Ads (PPC Advertising)",
    description:
        "Drive instant traffic and high-intent customers with powerful Google Ads campaigns.",
    longDescription:
        "Our Google Ads services help your business capture high-intent customers actively searching for your products or services. We create optimized PPC campaigns across search, display, shopping, and YouTube ads to drive targeted traffic and increase conversions.",
    image: "/assets/services/google-ads.jpg",
    features: [
        "Search Ads Campaign Setup",
        "Display Advertising",
        "Google Shopping Ads",
        "YouTube Video Ads",
        "Conversion Tracking Setup",
        "Landing Page Optimization"
    ]
},
{
    id: "social-media-marketing",
    icon: Share2,
    title: "Social Media Marketing",
    description:
        "Build your brand presence and grow a loyal audience through strategic social media marketing.",
    longDescription:
        "Our Social Media Marketing service helps businesses grow organically on major platforms. We develop strategic content plans, create engaging posts, and analyze performance to help your brand build trust, awareness, and long-term audience engagement.",
    image: "/assets/services/social-media-marketing.jpg",
    features: [
        "Content Creation and Post Designing",
        "Social Media Strategy Development",
        "Hashtag Research and Optimization",
        "Audience Growth Planning",
        "Platform Management (Facebook, Instagram, LinkedIn, TikTok)",
        "Analytics and Performance Reporting"
    ]
},
{
    id: "content-marketing",
    icon: PenTool,
    title: "Content Marketing",
    description:
        "Build trust and authority with powerful, value-driven content marketing strategies.",
    longDescription:
        "Our Content Marketing services focus on creating high-quality content that educates, engages, and converts your audience. From blogs to sales copy, we help position your brand as an authority in your industry.",
    image: "/assets/services/content-marketing.jpg",
    features: [
        "Professional Blog Writing",
        "Website Content Creation",
        "Sales Copywriting",
        "Social Media Content",
        "Email Copywriting",
        "Video Script Writing"
    ]
},
{
    id: "email-marketing",
    icon: Mail,
    title: "Email Marketing",
    description:
        "Convert leads into loyal customers with powerful email marketing campaigns.",
    longDescription:
        "Our Email Marketing services help you nurture leads and increase customer lifetime value through targeted and automated email campaigns. We design strategic email funnels that engage, convert, and retain customers.",
    image: "/assets/services/email-marketing.jpg",
    features: [
        "Email Campaign Strategy",
        "Automation Setup",
        "Newsletter Design and Creation",
        "Sales Funnel Development",
        "Lead Nurturing Sequences",
        "Performance Tracking and Optimization"
    ]
},
{
    id: "affiliate-marketing",
    icon: Users,
    title: "Affiliate Marketing",
    description:
        "Scale your revenue through performance-based affiliate partnerships.",
    longDescription:
        "Our Affiliate Marketing services help you build and manage a successful affiliate program. We recruit high-quality partners, design commission structures, and track performance to drive scalable sales growth.",
    image: "/assets/services/affiliate-marketing.jpg",
    features: [
        "Affiliate Program Setup",
        "Affiliate Partner Recruitment",
        "Commission Structure Planning",
        "Tracking System Setup",
        "Performance Monitoring",
        "Affiliate Campaign Optimization"
    ]
},
{
    id: "influencer-marketing",
    icon: Star,
    title: "Influencer Marketing",
    description:
        "Promote your brand through trusted creators and influencers.",
    longDescription:
        "Our Influencer Marketing services connect your brand with trusted influencers in your niche. We manage the entire process from influencer research to campaign execution and performance tracking to ensure maximum brand exposure.",
    image: "/assets/services/influencer-marketing.jpg",
    features: [
        "Influencer Research and Selection",
        "Outreach and Negotiation",
        "Campaign Planning and Management",
        "Content Collaboration",
        "Performance Tracking",
        "Brand Awareness Campaigns"
    ]
},
{
    id: "marketing-strategy-consulting",
    icon: Lightbulb,
    title: "Marketing Strategy & Consulting",
    description:
        "Custom marketing roadmap designed to accelerate your business growth and maximize results.",
    longDescription:
        "Our Marketing Strategy & Consulting service helps businesses build a clear and effective growth plan. We analyze your competitors, research your market, and design a strategic marketing funnel that positions your brand for long-term success. From brand positioning to growth planning, we guide your business with data-driven strategies.",
    image: "/assets/services/marketing-strategy-consulting.jpg",
    features: [
        "Competitor Analysis",
        "Market Research",
        "Sales Funnel Strategy",
        "Brand Positioning",
        "Growth Planning"
    ]
}
];
