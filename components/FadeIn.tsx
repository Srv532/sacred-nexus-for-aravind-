"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

export default function FadeIn({ children, className }: { children: ReactNode, className?: string }) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 100, rotateX: 45 }}
            animate={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
            transition={{ duration: 1.2, type: "spring", bounce: 0.5 }}
            className={className}
        >
            {children}
        </motion.div>
    );
}
