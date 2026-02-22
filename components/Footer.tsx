"use client";

export default function Footer() {
    return (
        <footer className="py-12 px-6 text-center text-zinc-500 dark:text-zinc-500 text-sm border-t border-zinc-200 dark:border-zinc-800 transition-colors duration-500">
            <p>&copy; {new Date().getFullYear()} Aravind A. All rights reserved.</p>
        </footer>
    );
}
