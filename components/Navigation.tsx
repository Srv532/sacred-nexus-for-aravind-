"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { FiSun, FiMoon } from "react-icons/fi";
import { motion } from "framer-motion";

export default function Navigation() {
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme, systemTheme } = useTheme();

    // useEffect only runs on the client, so now we can safely show the UI
    useEffect(() => {
        setMounted(true);
    }, []);

    const currentTheme = theme === 'system' ? systemTheme : theme;

    return (
        <motion.header
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="fixed w-full top-0 left-0 bg-[#faf7f2]/80 dark:bg-zinc-950/80 backdrop-blur-md z-50 py-4 px-6 md:px-12 flex justify-between items-center transition-colors duration-500 border-b border-transparent dark:border-zinc-800"
        >
            <Link href="/" className="text-xl font-bold tracking-widest uppercase text-black dark:text-white">
                Aravind A
            </Link>
            <nav className="flex items-center gap-6 md:gap-8 text-sm uppercase tracking-wide">
                <Link href="/novels" className="hover:text-[#8b3a3a] dark:hover:text-[#bf5b5b] transition-colors relative group">
                    <span className="relative z-10">Novels</span>
                    <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#8b3a3a] dark:bg-[#bf5b5b] transition-all duration-300 group-hover:w-full"></span>
                </Link>
                <Link href="/about" className="hover:text-[#8b3a3a] dark:hover:text-[#bf5b5b] transition-colors relative group">
                    <span className="relative z-10">About</span>
                    <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#8b3a3a] dark:bg-[#bf5b5b] transition-all duration-300 group-hover:w-full"></span>
                </Link>

                {mounted && (
                    <motion.button
                        whileHover={{ rotate: 15 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setTheme(currentTheme === "dark" ? "light" : "dark")}
                        className="p-2 rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors"
                        aria-label="Toggle Dark Mode"
                    >
                        {currentTheme === "dark" ? <FiSun size={18} /> : <FiMoon size={18} />}
                    </motion.button>
                )}
            </nav>
        </motion.header>
    );
}
