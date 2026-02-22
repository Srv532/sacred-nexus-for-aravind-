"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import React, { useRef } from "react";
import Image from "next/image";

type NovelData = {
    slug: string;
    title: string;
    description: string;
    cover: string;
    date: string;
    author: string;
    content: string;
};

export default function ClientHome({ featuredNovels }: { featuredNovels: NovelData[] }) {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    // Parallax effects
    const yText = useTransform(scrollYProgress, [0, 1], [0, 200]);
    const opacityText = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

    return (
        <div ref={containerRef} className="relative min-h-screen bg-transparent overflow-hidden">

            {/* Immersive Cinematic Background */}
            <div className="absolute inset-0 z-[-1] min-h-screen">
                <Image
                    src="/hero_bg.png"
                    alt="Cinematic Devapuram Background"
                    fill
                    priority
                    className="object-cover object-center scale-[1.02] transform transition-transform duration-[20s] ease-linear hover:scale-[1.05]"
                    sizes="100vw"
                />
                {/* Dark/Light Gradient Overlay for Text Readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#eeece6] via-[#eeece6]/40 to-black/30 dark:from-[#0a0a0a] dark:via-[#0a0a0a]/50 dark:to-black/60 opacity-60 dark:opacity-90"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#eeece6] dark:to-[#0a0a0a]"></div>
            </div>

            {/* Hero Section */}
            <section className="relative z-10 px-6 md:px-12 max-w-7xl mx-auto flex flex-col items-center justify-center min-h-[90vh]">
                <motion.div
                    style={{ y: yText, opacity: opacityText }}
                    className="text-center z-10 pointer-events-auto"
                >
                    <motion.h1
                        initial={{ opacity: 0, scale: 0.95, y: 50 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                        className="text-6xl md:text-9xl font-serif text-white tracking-tight mb-6 drop-shadow-2xl"
                    >
                        Stories that <br /><span className="italic text-[#ff6b6b] drop-shadow-[0_0_15px_rgba(255,107,107,0.5)]">move</span> you.
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
                        className="max-w-2xl mx-auto text-lg md:text-2xl text-zinc-100 font-sans font-light mb-12 leading-relaxed drop-shadow-lg"
                    >
                        Welcome to the expanding universe of Aravind A.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.6 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="inline-block relative group"
                    >
                        <div className="absolute -inset-1 bg-gradient-to-r from-[#ff6b6b] to-[#8b3a3a] rounded-full blur opacity-50 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                        <Link
                            href="/novels/sacred-nexus"
                            className="relative bg-black text-white px-10 py-5 rounded-full font-bold tracking-widest text-sm uppercase shadow-2xl transition-all duration-300 flex items-center gap-3"
                        >
                            Start Reading <span aria-hidden="true" className="text-xl">&rarr;</span>
                        </Link>
                    </motion.div>
                </motion.div>

                {/* Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5, duration: 1 }}
                    className="absolute bottom-12 left-1/2 -translate-x-1/2 text-white/70 flex flex-col items-center gap-2 pointer-events-none drop-shadow-md"
                >
                    <span className="text-xs uppercase tracking-[0.3em] font-sans">Scroll</span>
                    <motion.div
                        animate={{ y: [0, 10, 0] }}
                        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                        className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent"
                    />
                </motion.div>
            </section>

            {/* Featured Section Container */}
            <section className="relative z-20 py-32 px-6 md:px-12 bg-[#eeece6] dark:bg-[#0a0a0a] transition-colors duration-500 rounded-t-[4rem] border-t border-black/5 dark:border-white/10 shadow-[0_-30px_60px_rgba(0,0,0,0.1)] dark:shadow-[0_-30px_60px_rgba(0,0,0,0.5)]">
                <div className="max-w-7xl mx-auto">

                    <div className="text-center mb-24">
                        <h2 className="text-sm tracking-[0.3em] font-sans font-bold uppercase text-[#8b3a3a] mb-4">The Collection</h2>
                        <div className="h-px w-24 bg-gradient-to-r from-transparent via-[#8b3a3a] to-transparent mx-auto"></div>
                    </div>

                    <div className="flex flex-col gap-32">
                        {featuredNovels.map((novel, index) => (
                            <motion.div
                                initial={{ opacity: 0, y: 100 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                                key={novel.slug}
                                className={`flex flex-col ${index % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} gap-16 items-center group`}
                            >
                                <div className="w-full md:w-5/12">
                                    <Link href={`/novels/${novel.slug}`}>
                                        <div className="aspect-[3/4] bg-zinc-200 dark:bg-zinc-900 rounded-[2rem] overflow-hidden relative shadow-2xl transition-all duration-700 hover:shadow-[0_40px_80px_rgba(0,0,0,0.3)] hover:-translate-y-4 border border-white/10">
                                            {novel.cover ? (
                                                <Image
                                                    src={novel.cover}
                                                    alt={novel.title}
                                                    fill
                                                    className="object-cover transition-transform duration-[10s] ease-out group-hover:scale-110"
                                                    sizes="(max-width: 768px) 100vw, 40vw"
                                                />
                                            ) : (
                                                <div className="absolute inset-0 flex items-center justify-center text-zinc-600 z-20 mix-blend-overlay">
                                                    <span className="font-serif italic text-3xl tracking-wide">[ {novel.title} ]</span>
                                                </div>
                                            )}
                                            <div className="absolute inset-0 z-30 opacity-0 group-hover:opacity-100 bg-gradient-to-tr from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-all duration-1000 ease-in-out pointer-events-none"></div>
                                        </div>
                                    </Link>
                                </div>
                                <div className="w-full md:w-7/12 text-center md:text-left">
                                    <span className="uppercase tracking-[0.2em] text-xs text-[#8b3a3a] font-bold mb-4 block">{novel.date}</span>
                                    <h2 className="text-5xl md:text-7xl font-serif mb-8 text-[#1f1d1c] dark:text-white leading-[1.1] tracking-tight">{novel.title}</h2>
                                    <p className="text-zinc-700 dark:text-zinc-400 mb-10 text-xl font-sans font-light leading-relaxed max-w-xl mx-auto md:mx-0">
                                        {novel.description}
                                    </p>

                                    <Link href={`/novels/${novel.slug}`} className="group/btn inline-flex items-center gap-4 text-black dark:text-white font-bold uppercase tracking-widest text-sm transition-all duration-300">
                                        <span className="relative">
                                            Enter The Saga
                                            <span className="absolute -bottom-2 left-0 w-0 h-[2px] bg-[#8b3a3a] transition-all duration-300 group-hover/btn:w-full"></span>
                                        </span>
                                        <span className="p-3 rounded-full border border-zinc-300 dark:border-zinc-700 group-hover/btn:border-[#8b3a3a] transition-all duration-300 group-hover/btn:translate-x-2">
                                            &rarr;
                                        </span>
                                    </Link>
                                </div>
                            </motion.div>
                        ))}

                        {featuredNovels.length === 0 && (
                            <div className="text-center text-2xl font-serif italic text-zinc-500 py-16">
                                Vault is currently empty.
                            </div>
                        )}
                    </div>

                    <div className="mt-32 text-center">
                        <Link href="/novels" className="inline-block px-12 py-5 rounded-full border border-black dark:border-white text-black dark:text-white font-bold tracking-widest uppercase text-sm hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-500">
                            View All Works
                        </Link>
                    </div>

                </div>
            </section>
        </div>
    );
}
