import { getChapterBySlug, getNovelChapters } from "../../../../lib/api";
import { notFound } from "next/navigation";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import FadeIn from "../../../../components/FadeIn";
import ReadingProgress from "../../../../components/ReadingProgress";

export default async function ChapterPage({ params }: { params: Promise<{ slug: string, chapter: string }> }) {
    const { slug, chapter } = await params;
    const chapterData = getChapterBySlug(slug, chapter);
    if (!chapterData) return notFound();

    const allChapters = getNovelChapters(slug);
    const currentIndex = allChapters.findIndex(c => c.slug === chapter);

    const prevChapter = currentIndex > 0 ? allChapters[currentIndex - 1] : null;
    const nextChapter = currentIndex < allChapters.length - 1 ? allChapters[currentIndex + 1] : null;

    return (
        <>
            <ReadingProgress />
            <FadeIn className="max-w-3xl mx-auto px-6 md:px-12 py-16 md:py-32 min-h-screen">
                {/* Immersive Chapter Header */}
                <header className="mb-20 md:mb-32 text-center">
                    <h1 className="text-4xl md:text-5xl font-serif mb-8 leading-[1.3] text-[#1f1d1c] dark:text-zinc-100 tracking-tight">
                        {chapterData.title}
                    </h1>
                    {chapterData.characters && chapterData.characters.length > 0 && (
                        <div className="flex flex-wrap justify-center gap-2">
                            {chapterData.characters.map((char) => (
                                <span key={char} className="text-xs text-[#8b3a3a] dark:text-[#bf5b5b] tracking-widest uppercase border border-black/5 dark:border-white/10 px-3 py-1 rounded-full bg-white/50 dark:bg-black/20">
                                    {char}
                                </span>
                            ))}
                        </div>
                    )}
                </header>

                {/* Chapter Prose - Highly optimized for reading to prevent overwhelming the reader */}
                <div className="prose dark:prose-invert prose-zinc max-w-2xl mx-auto font-serif text-[1.15rem] md:text-[1.25rem] text-[#2c2a29] dark:text-zinc-300 prose-p:leading-[2.2] prose-p:tracking-[0.01em] prose-p:mb-12 selection:bg-[#8b3a3a]/30 selection:text-black dark:selection:text-white">
                    <MDXRemote source={chapterData.content} />
                </div>

                {/* Elegant Footer Navigation */}
                <nav className="mt-32 pt-12 border-t border-black/10 dark:border-white/10 flex justify-between items-center text-sm uppercase tracking-widest font-sans font-bold">
                    {prevChapter ? (
                        <Link href={`/novels/${slug}/${prevChapter.slug}`} className="text-zinc-500 hover:text-[#8b3a3a] dark:hover:text-[#bf5b5b] transition-colors flex items-center gap-3 group">
                            <span className="text-2xl font-light transition-transform group-hover:-translate-x-2">&larr;</span> Previous
                        </Link>
                    ) : (
                        <Link href={`/novels/${slug}`} className="text-zinc-400 hover:text-black dark:hover:text-white transition-colors">
                            Index
                        </Link>
                    )}

                    {nextChapter ? (
                        <Link href={`/novels/${slug}/${nextChapter.slug}`} className="text-zinc-500 hover:text-[#8b3a3a] dark:hover:text-[#bf5b5b] transition-colors flex items-center gap-3 group">
                            Next <span className="text-2xl font-light transition-transform group-hover:translate-x-2">&rarr;</span>
                        </Link>
                    ) : (
                        <span className="text-zinc-400">End</span>
                    )}
                </nav>
            </FadeIn>
        </>
    );
}
