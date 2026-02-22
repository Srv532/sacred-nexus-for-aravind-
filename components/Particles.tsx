"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Particles() {
    const [particles, setParticles] = useState<{ id: number; x: number; y: number; size: number; duration: number }[]>([]);

    useEffect(() => {
        // Generate random particles
        const newParticles = Array.from({ length: 40 }).map((_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: Math.random() * 4 + 1,
            duration: Math.random() * 10 + 10,
        }));
        setParticles(newParticles);
    }, []);

    return (
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
            {particles.map((p) => (
                <motion.div
                    key={p.id}
                    className="absolute bg-white rounded-full opacity-20 dark:opacity-40"
                    style={{
                        left: `${p.x}%`,
                        top: `${p.y}%`,
                        width: p.size,
                        height: p.size,
                        boxShadow: `0 0 ${p.size * 2}px rgba(255,255,255,0.8)`
                    }}
                    animate={{
                        y: ["0%", "-100%", "0%"],
                        x: ["0%", "5%", "-5%", "0%"],
                        opacity: [0.1, 0.5, 0.1],
                        scale: [1, 1.5, 1]
                    }}
                    transition={{
                        duration: p.duration,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                />
            ))}
        </div>
    );
}
