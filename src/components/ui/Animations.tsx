import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import type { ReactNode } from "react";

interface ParallaxProps {
    children: ReactNode;
    speed?: number; // 0-1, higher is more movement
    direction?: "up" | "down" | "left" | "right";
    className?: string;
}

export const Parallax = ({ children, speed = 0.5, direction = "up", className = "" }: ParallaxProps) => {
    const { scrollYProgress } = useScroll();
    
    const getTransform = () => {
        const y = useTransform(scrollYProgress, [0, 1], [0, -100 * speed]);
        const x = useTransform(scrollYProgress, [0, 1], [0, 50 * speed]);
        
        switch (direction) {
            case "up": return { y };
            case "down": return { y: useTransform(scrollYProgress, [0, 1], [0, 100 * speed]) };
            case "left": return { x: useTransform(scrollYProgress, [0, 1], [0, 100 * speed]) };
            case "right": return { x: useTransform(scrollYProgress, [0, 1], [0, -100 * speed]) };
            default: return { y };
        }
    };

    const transform = getTransform();

    return (
        <motion.div style={transform} className={className}>
            {children}
        </motion.div>
    );
};

interface FloatingElementProps {
    children: ReactNode;
    delay?: number;
    className?: string;
    floatRange?: number;
}

export const FloatingElement = ({ children, delay = 0, className = "", floatRange = 20 }: FloatingElementProps) => {
    return (
        <motion.div
            className={className}
            animate={{
                y: [0, -floatRange, 0],
                rotate: [0, 2, -2, 0],
            }}
            transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: delay,
            }}
        >
            {children}
        </motion.div>
    );
};

interface DroppingElementProps {
    children: ReactNode;
    delay?: number;
    className?: string;
    startPosition?: number;
}

export const DroppingElement = ({ children, delay = 0, className = "", startPosition = -100 }: DroppingElementProps) => {
    return (
        <motion.div
            className={className}
            initial={{ y: startPosition, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
                duration: 0.8,
                delay: delay,
                ease: [0.25, 0.46, 0.45, 0.94], // Custom cubic-bezier for bouncy effect
            }}
        >
            {children}
        </motion.div>
    );
};

interface ScrollProgressProps {
    className?: string;
}

export const ScrollProgress = ({ className = "" }: ScrollProgressProps) => {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    return (
        <motion.div
            className={`fixed left-0 right-0 top-0 h-1 origin-left bg-primary z-[100] ${className}`}
            style={{ scaleX }}
        />
    );
};

interface BounceInProps {
    children: ReactNode;
    delay?: number;
    className?: string;
}

export const BounceIn = ({ children, delay = 0, className = "" }: BounceInProps) => {
    return (
        <motion.div
            className={className}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
                duration: 0.6,
                delay: delay,
                type: "spring",
                stiffness: 200,
                damping: 15,
            }}
        >
            {children}
        </motion.div>
    );
};

interface StaggerChildrenProps {
    children: ReactNode;
    className?: string;
    staggerDelay?: number;
}

export const StaggerChildren = ({ children, className = "", staggerDelay = 0.1 }: StaggerChildrenProps) => {
    return (
        <motion.div
            className={className}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={{
                hidden: { opacity: 0 },
                visible: {
                    opacity: 1,
                    transition: {
                        staggerChildren: staggerDelay,
                    },
                },
            }}
        >
            {children}
        </motion.div>
    );
};

export const StaggerItem = ({ children, className = "" }: { children: ReactNode; className?: string }) => {
    return (
        <motion.div
            className={className}
            variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.5, ease: "easeOut" }}
        >
            {children}
        </motion.div>
    );
};

// Magnetic button effect
interface MagneticButtonProps {
    children: ReactNode;
    className?: string;
    onClick?: () => void;
}

export const MagneticButton = ({ children, className = "", onClick }: MagneticButtonProps) => {
    return (
        <motion.button
            className={className}
            onClick={onClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
            {children}
        </motion.button>
    );
};

// Tilt card effect
interface TiltCardProps {
    children: ReactNode;
    className?: string;
}

export const TiltCard = ({ children, className = "" }: TiltCardProps) => {
    return (
        <motion.div
            className={className}
            whileHover={{ 
                rotateX: 5,
                rotateY: -5,
                scale: 1.02,
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
            {children}
        </motion.div>
    );
};

// Continuous floating shapes
interface FloatingShapesProps {
    className?: string;
}

export const FloatingShapes = ({ className = "" }: FloatingShapesProps) => {
    return (
        <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
            <FloatingElement delay={0} className="absolute top-20 left-10">
                <div className="h-4 w-4 rounded-full bg-primary/30 blur-sm" />
            </FloatingElement>
            <FloatingElement delay={1} className="absolute top-40 right-20">
                <div className="h-6 w-6 rotate-45 bg-secondary blur-sm" />
            </FloatingElement>
            <FloatingElement delay={2} className="absolute bottom-40 left-1/4">
                <div className="h-3 w-3 rounded-full bg-accent/40 blur-sm" />
            </FloatingElement>
            <FloatingElement delay={0.5} className="absolute top-60 right-1/3">
                <div className="h-5 w-5 rotate-12 bg-primary/20 blur-sm" />
            </FloatingElement>
            <FloatingElement delay={1.5} className="absolute bottom-20 right-10">
                <div className="h-8 w-8 rounded-full bg-secondary/30 blur-sm" />
            </FloatingElement>
        </div>
    );
};
