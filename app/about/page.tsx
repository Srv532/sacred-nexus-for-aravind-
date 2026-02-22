import { getAboutData } from "../../lib/api";
import { MDXRemote } from "next-mdx-remote/rsc";
import Image from "next/image";
import FadeIn from "../../components/FadeIn";

export default function AboutPage() {
    const data = getAboutData();

    if (!data) {
        return (
            <div className="py-24 text-center min-h-[85vh]">
                <h1 className="text-3xl font-serif">About the author narrative not found.</h1>
            </div>
        );
    }

    return (
        <FadeIn className="max-w-5xl mx-auto px-6 md:px-12 py-32 min-h-[85vh]">
            <div className="bg-[#fdfcfa] dark:bg-zinc-900/50 backdrop-blur-sm rounded-[3rem] p-8 md:p-16 lg:p-24 shadow-[0_20px_60px_rgba(0,0,0,0.05)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.4)] flex flex-col md:flex-row gap-20 items-start border border-black/5 dark:border-white/5 relative overflow-hidden group">
                {/* Subtle cinematic gradient overlay inside the card */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-[#8b3a3a]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000 ease-in-out pointer-events-none"></div>

                {/* Author Portrait & Info */}
                <div className="w-full md:w-1/3 md:sticky md:top-32 text-center shrink-0">
                    <div className="w-48 h-48 md:w-56 md:h-56 rounded-full bg-zinc-200 dark:bg-zinc-800 mx-auto shadow-2xl overflow-hidden relative mb-8 border-4 border-[#faf7f2] dark:border-zinc-950 transition-transform duration-700 hover:scale-105">
                        {data.photo ? (
                            <Image
                                src={data.photo}
                                alt={data.name}
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 192px, 224px"
                            />
                        ) : (
                            <div className="absolute inset-0 flex items-center justify-center text-zinc-500 font-serif italic">
                                [ Portrait ]
                            </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                    </div>
                    <h1 className="text-4xl font-serif mb-3 text-black dark:text-white">{data.name}</h1>
                    <p className="text-[#8b3a3a] dark:text-[#bf5b5b] tracking-widest uppercase text-sm font-bold mb-6">
                        {data.role}
                    </p>
                    {/* Simple static contact placeholder */}
                    <a href="mailto:contact@example.com" className="inline-block px-6 py-3 border border-zinc-300 dark:border-zinc-700 rounded-full text-sm font-medium hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors uppercase tracking-wide">
                        Get in Touch
                    </a>
                </div>

                {/* Biography Prose */}
                <div className="w-full md:w-2/3 prose dark:prose-invert prose-lg text-zinc-600 dark:text-zinc-300 font-serif prose-p:leading-[1.8] max-w-none">
                    <MDXRemote source={data.content} />
                </div>

            </div>
        </FadeIn>
    );
}
