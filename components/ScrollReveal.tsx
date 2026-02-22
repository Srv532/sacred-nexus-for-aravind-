"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

export default function ScrollReveal({ children, className, delay = 0 }: { children: ReactNode, className?: string, delay?: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 150, scale: 0.8, rotate: -20, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, scale: 1, rotate: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, delay, type: "spring", bounce: 0.6 }}
            className={className}
        >
            {children}
        </motion.div>
    );
}
