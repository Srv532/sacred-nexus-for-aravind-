"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

type NovelData = {
    slug: string;
    title: string;
    description: string;
    cover: string;
    date: string;
    author: string;
};

export default function ClientNovels({ novels }: { novels: NovelData[] }) {
    return (
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-32 min-h-[85vh]">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center mb-24"
            >
                <h1 className="text-6xl md:text-8xl font-serif text-[#1f1d1c] dark:text-zinc-100 tracking-tight mb-6">The Vault</h1>
                <div className="h-px w-32 bg-gradient-to-r from-transparent via-[#8b3a3a] to-transparent mx-auto mb-8"></div>
                <p className="text-zinc-500 dark:text-zinc-400 text-xl font-sans font-light max-w-2xl mx-auto">
                    Explore the complete collection of sagas, from finished epics to works currently in progress.
                </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 relative z-10">
                {novels.map((novel, index) => (
                    <motion.div
                        initial={{ opacity: 0, y: 100, rotate: -5 }}
                        whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.8, delay: index * 0.1, type: "spring", bounce: 0.4 }}
                        whileHover={{ scale: 1.05, rotate: 2 }}
                        key={novel.slug}
                        className="group cursor-pointer"
                    >
                        <motion.div
                            animate={{ y: [0, -15, 0] }}
                            transition={{ repeat: Infinity, duration: 4 + index, ease: "easeInOut" }}
                        >
                            <Link href={`/novels/${novel.slug}`}>
                                <div className="aspect-[3/4] bg-zinc-200 dark:bg-zinc-900 rounded-[2rem] overflow-hidden relative shadow-lg group-hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)] transition-all duration-700 border border-zinc-200 dark:border-white/10">
                                    {novel.cover ? (
                                        <Image
                                            src={novel.cover}
                                            alt={novel.title}
                                            fill
                                            className="object-cover transition-transform duration-[10s] ease-out group-hover:scale-110"
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        />
                                    ) : (
                                        <div className="absolute inset-0 flex items-center justify-center text-zinc-500 z-20">
                                            <span className="font-serif italic text-xl">Cover Art</span>
                                        </div>
                                    )}
                                    {/* Cinematic overlays */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
                                    <div className="absolute inset-0 z-30 opacity-0 group-hover:opacity-100 bg-gradient-to-tr from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-all duration-1000 ease-in-out pointer-events-none"></div>

                                    {/* Hover content inside card */}
                                    <div className="absolute bottom-0 left-0 right-0 p-8 z-20 translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                                        <span className="inline-block px-4 py-2 border border-white/30 rounded-full text-white text-xs tracking-widest uppercase backdrop-blur-sm">
                                            Read More
                                        </span>
                                    </div>
                                </div>

                                <div className="mt-8 text-center px-4">
                                    <p className="text-xs text-[#8b3a3a] dark:text-[#bf5b5b] mb-3 font-bold tracking-[0.2em] uppercase">{novel.date}</p>
                                    <h2 className="text-3xl font-serif font-bold group-hover:text-[#8b3a3a] dark:group-hover:text-[#bf5b5b] text-[#1f1d1c] dark:text-zinc-100 transition-colors mb-4">
                                        {novel.title}
                                    </h2>
                                    <p className="text-zinc-600 dark:text-zinc-400 line-clamp-3 leading-relaxed font-sans text-sm md:text-base">
                                        {novel.description}
                                    </p>
                                </div>
                            </Link>
                        </motion.div>
                    </motion.div>
                ))}
            </div>

            {novels.length === 0 && (
                <div className="text-center py-20 border border-dashed border-zinc-300 dark:border-zinc-800 rounded-3xl mt-12">
                    <p className="text-zinc-500 dark:text-zinc-500 font-serif italic text-2xl tracking-wide">The archives are currently empty.</p>
                </div>
            )}
        </div>
    );
}
