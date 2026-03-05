import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface RevealProps {
    children: ReactNode;
    width?: "fit-content" | "100%";
    delay?: number;
    className?: string;
}

export const Reveal = ({ children, width = "fit-content", delay = 0, className = "" }: RevealProps) => {
    return (
        <div style={{ position: "relative", width, overflow: "hidden" }} className={className}>
            <motion.div
                variants={{
                    hidden: { opacity: 0, y: 75 },
                    visible: { opacity: 1, y: 0 },
                }}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: delay }}
            >
                {children}
            </motion.div>
        </div>
    );
};

export const RevealFade = ({ children, width = "fit-content", delay = 0, className = "" }: RevealProps) => {
    return (
        <div style={{ position: "relative", width }} className={className}>
            <motion.div
                variants={{
                    hidden: { opacity: 0 },
                    visible: { opacity: 1 },
                }}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: delay }}
            >
                {children}
            </motion.div>
        </div>
    );
};
