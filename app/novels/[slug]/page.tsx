import { getNovelBySlug, getNovelChapters, getNovelCharacters } from "../../../lib/api";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import Image from "next/image";
import FadeIn from "../../../components/FadeIn";
import ScrollReveal from "../../../components/ScrollReveal";

export default async function NovelDetails({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const novel = getNovelBySlug(slug);
    if (!novel) return notFound();
    const chapters = getNovelChapters(slug);
    const characters = getNovelCharacters(slug);

    return (
        <FadeIn className="max-w-5xl mx-auto px-6 md:px-12 py-24 min-h-[85vh]">
            <div className="flex flex-col md:flex-row gap-12 lg:gap-24 mb-32 items-center md:items-start">

                {/* Book Cover Design */}
                <div className="w-full md:w-5/12 aspect-[3/4] bg-zinc-200 dark:bg-zinc-900 rounded-3xl shadow-2xl overflow-hidden relative shrink-0 border border-black/5 dark:border-white/10 group">
                    {novel.cover ? (
                        <Image
                            src={novel.cover}
                            alt={novel.title}
                            fill
                            className="object-cover transition-transform duration-[15s] ease-out group-hover:scale-105"
                            sizes="(max-width: 768px) 100vw, 40vw"
                        />
                    ) : (
                        <div className="absolute inset-0 flex items-center justify-center text-zinc-500">
                            <span className="font-serif italic text-2xl">[ Cover Art ]</span>
                        </div>
                    )}
                    {/* Cinematic overlay */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000 -translate-x-full group-hover:translate-x-full ease-in-out pointer-events-none"></div>
                </div>

                {/* Novel Info & Synopsis */}
                <div className="w-full md:w-7/12">
                    <span className="text-sm text-[#8b3a3a] dark:text-[#bf5b5b] font-bold uppercase tracking-[0.2em] mb-4 block">Published {novel.date}</span>
                    <h1 className="text-5xl lg:text-7xl font-serif mb-10 text-[#1f1d1c] dark:text-zinc-100 leading-[1.1] tracking-tight">{novel.title}</h1>

                    <div className="prose dark:prose-invert prose-zinc max-w-none text-zinc-700 dark:text-zinc-300 leading-[2] text-lg font-serif">
                        <MDXRemote source={novel.content} />
                    </div>
                </div>
            </div>

            {/* Chapter Index Section */}
            <div className="border-t border-black/10 dark:border-white/10 pt-24">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-serif text-[#1f1d1c] dark:text-zinc-100 tracking-tight">Chapter Index</h2>
                    <div className="h-px w-24 bg-gradient-to-r from-transparent via-[#8b3a3a] to-transparent mx-auto mt-6"></div>
                </div>

                {chapters.length === 0 ? (
                    <p className="text-center text-zinc-500 text-lg font-mono tracking-wider uppercase">Vault requires more entries.</p>
                ) : (
                    <div className="grid gap-6 max-w-3xl mx-auto">
                        {chapters.map((chapter, index) => (
                            <ScrollReveal key={chapter.slug} delay={index * 0.1}>
                                <Link
                                    href={`/novels/${novel.slug}/${chapter.slug}`}
                                    className="group block p-8 bg-[#fdfcfa] dark:bg-zinc-900 border border-black/5 dark:border-white/5 rounded-2xl hover:shadow-[0_20px_40px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)] transition-all duration-500 transform hover:-translate-y-2 relative overflow-hidden"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#8b3a3a]/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none"></div>
                                    <div className="flex justify-between items-center relative z-10">
                                        <h3 className="text-xl md:text-2xl font-serif text-[#1f1d1c] dark:text-zinc-300 group-hover:text-[#8b3a3a] dark:group-hover:text-[#bf5b5b] transition-colors leading-tight">
                                            {chapter.title}
                                        </h3>
                                        <div className="w-12 h-12 rounded-full border border-zinc-200 dark:border-zinc-800 flex items-center justify-center text-[#8b3a3a] dark:text-[#bf5b5b] group-hover:bg-[#8b3a3a] group-hover:text-white dark:group-hover:bg-[#bf5b5b] dark:group-hover:text-black transition-all duration-300">
                                            &rarr;
                                        </div>
                                    </div>
                                </Link>
                            </ScrollReveal>
                        ))}
                    </div>
                )}
            </div>

            {/* Dramatis Personae (Characters) Section */}
            {characters.length > 0 && (
                <div className="border-t border-black/10 dark:border-white/10 pt-24 mt-24">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-serif text-[#1f1d1c] dark:text-zinc-100 tracking-tight">Dramatis Personae</h2>
                        <div className="h-px w-24 bg-gradient-to-r from-transparent via-[#8b3a3a] to-transparent mx-auto mt-6"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                        {characters.map((character, index) => (
                            <ScrollReveal key={character.slug} delay={index * 0.1} className="group flex flex-col md:flex-row gap-6 p-6 bg-[#fdfcfa] dark:bg-zinc-900/50 border border-black/5 dark:border-white/5 rounded-3xl hover:bg-white dark:hover:bg-zinc-900 hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)] transition-all duration-500 hover:-translate-y-2">
                                <div className="w-full md:w-1/3 aspect-[3/4] relative rounded-2xl overflow-hidden shrink-0">
                                    {character.image ? (
                                        <Image
                                            src={character.image}
                                            alt={character.name}
                                            fill
                                            className="object-cover transition-transform duration-[10s] ease-out group-hover:scale-110"
                                            sizes="(max-width: 768px) 100vw, 30vw"
                                        />
                                    ) : (
                                        <div className="absolute inset-0 bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center text-zinc-400">
                                            <span className="font-serif italic">No Image</span>
                                        </div>
                                    )}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                                </div>
                                <div className="w-full md:w-2/3 flex flex-col justify-center">
                                    <h3 className="text-2xl font-serif text-[#1f1d1c] dark:text-zinc-100 mb-1 group-hover:text-[#8b3a3a] dark:group-hover:text-[#bf5b5b] transition-colors">{character.name}</h3>
                                    <span className="text-sm text-[#8b3a3a] dark:text-[#bf5b5b] font-bold uppercase tracking-widest mb-4 block">{character.role}</span>
                                    <div className="prose dark:prose-invert prose-sm prose-zinc text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-none">
                                        <MDXRemote source={character.content} />
                                    </div>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            )}
        </FadeIn>
    );
}
