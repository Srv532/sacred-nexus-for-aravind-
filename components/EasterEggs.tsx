"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function EasterEggs() {
    const [activeEgg, setActiveEgg] = useState<string | null>(null);

    // Track typed keys
    const [keys, setKeys] = useState<string[]>([]);

    // Konami code: up up down down left right left right b a
    const konami = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];

    // "Raurava" code: r a u r a v a
    const raurava = ["r", "a", "u", "r", "a", "v", "a"];

    // "Sanjay"
    const sanjay = ["s", "a", "n", "j", "a", "y"];

    const handleKeyDown = useCallback((e: KeyboardEvent) => {
        const key = e.key;

        setKeys((prevKeys) => {
            const newKeys = [...prevKeys, key];
            if (newKeys.length > 20) newKeys.shift(); // keep it from growing forever

            // Check for Konami code (Divine Transfer)
            const konamiMatch = konami.every((k, i) => newKeys[newKeys.length - konami.length + i] === k);
            if (konamiMatch) {
                setActiveEgg("divine_transfer");
                setTimeout(() => setActiveEgg(null), 5000);
            }

            // Check for Raurava (Destroyed Kingdom)
            const rauravaMatch = raurava.every((k, i) => newKeys[newKeys.length - raurava.length + i]?.toLowerCase() === k);
            if (rauravaMatch) {
                setActiveEgg("raurava");
                setTimeout(() => setActiveEgg(null), 5000);
            }

            // Check for Sanjay (Science accident)
            const sanjayMatch = sanjay.every((k, i) => newKeys[newKeys.length - sanjay.length + i]?.toLowerCase() === k);
            if (sanjayMatch) {
                setActiveEgg("sanjay");
                setTimeout(() => setActiveEgg(null), 5000);
            }

            return newKeys;
        });
    }, [konami, raurava, sanjay]);

    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [handleKeyDown]);

    return (
        <AnimatePresence>
            {activeEgg === "divine_transfer" && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, backgroundColor: "rgba(255,255,255,0.95)" }}
                    exit={{ opacity: 0, transition: { duration: 2 } }}
                    className="fixed inset-0 z-[100] flex flex-col items-center justify-center pointer-events-none mix-blend-screen"
                >
                    <motion.div
                        initial={{ scale: 0.8 }}
                        animate={{ scale: [1, 1.2, 1], rotate: [0, 5, -5, 0] }}
                        transition={{ duration: 0.5, repeat: 3 }}
                        className="w-32 h-32 rounded-full bg-blue-400 blur-3xl opacity-50 absolute"
                    ></motion.div>
                    <div className="relative z-10 text-center">
                        <p className="font-serif text-3xl font-bold tracking-[0.3em] text-[#1f1d1c] uppercase relative">
                            "I am giving you everything."
                            <motion.span
                                animate={{ opacity: [0, 1, 0] }}
                                transition={{ repeat: Infinity, duration: 1 }}
                                className="absolute inset-0 bg-white mix-blend-overlay"
                            />
                        </p>
                        <p className="font-serif italic text-lg text-zinc-600 mt-4 mx-auto max-w-lg">
                            My consciousness, my skills, my memories... It must be done.
                        </p>
                    </div>
                </motion.div>
            )}

            {activeEgg === "raurava" && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, transition: { duration: 3 } }}
                    className="fixed inset-0 z-[100] pointer-events-none flex items-center justify-center bg-red-900/40 mix-blend-multiply"
                >
                    <motion.div
                        animate={{ y: [0, -10, 0] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        className="text-center"
                    >
                        <h1 className="font-serif text-6xl md:text-9xl tracking-[0.5em] text-red-100 opacity-20 uppercase font-black uppercase blur-[2px]">
                            Raurava
                        </h1>
                        <p className="font-sans font-bold text-red-200 uppercase tracking-widest text-sm mt-4 opacity-50">
                            The Architect of Destruction Returns
                        </p>
                    </motion.div>
                </motion.div>
            )}

            {activeEgg === "sanjay" && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [1, 0, 1, 0, 1], backgroundColor: ["#000", "#111", "#000", "#fff", "transparent"] }}
                    transition={{ duration: 0.5, times: [0, 0.2, 0.4, 0.5, 1] }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] pointer-events-none flex items-center justify-center bg-black"
                >
                    <div className="text-center font-mono">
                        {/* Matrix-style glitching text */}
                        <motion.h1
                            initial={{ x: -10 }}
                            animate={{ x: [10, -5, 5, 0] }}
                            transition={{ duration: 0.2, repeat: 5 }}
                            className="text-white text-5xl md:text-8xl font-black mb-8 blur-[1px]"
                            style={{ textShadow: '2px 0 0 red, -2px 0 0 cyan' }}
                        >
                            Creeeeeeeeek... ZRRRRRPP!
                        </motion.h1>
                        <p className="text-red-500 font-bold tracking-widest uppercase">
                            Warning: Energy Cascade Critical
                        </p>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
