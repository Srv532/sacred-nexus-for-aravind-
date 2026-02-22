"use client";

import { motion, useScroll } from "framer-motion";

export default function ReadingProgress() {
    const { scrollYProgress } = useScroll();

    return (
        <motion.div
            className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#8b3a3a] via-[#bf5b5b] to-[#ff6b6b] transform origin-left z-50 shadow-[0_0_15px_rgba(255,107,107,0.8)]"
            style={{ scaleX: scrollYProgress }}
        />
    );
}
