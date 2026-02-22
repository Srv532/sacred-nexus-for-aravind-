import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const contentDirectory = path.join(process.cwd(), 'content');
const novelsDirectory = path.join(contentDirectory, 'novels');

export interface NovelData {
    slug: string;
    title: string;
    description: string;
    cover: string;
    date: string;
    author: string;
    content: string;
}

export interface ChapterData {
    slug: string;
    title: string;
    order: number;
    characters?: string[];
    content: string;
}

export interface CharacterData {
    slug: string;
    name: string;
    role: string;
    image: string;
    content: string;
}

// Get basic info of all novels
export function getAllNovels(): NovelData[] {
    if (!fs.existsSync(novelsDirectory)) return [];
    const novelSlugs = fs.readdirSync(novelsDirectory).filter(file => {
        return fs.statSync(path.join(novelsDirectory, file)).isDirectory();
    });

    const novels = novelSlugs.map((slug) => getNovelBySlug(slug));
    return novels.filter(n => n !== null) as NovelData[];
}

// Get specific novel info
export function getNovelBySlug(slug: string): NovelData | null {
    const fullPath = path.join(novelsDirectory, slug, 'index.md');
    if (!fs.existsSync(fullPath)) return null;
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
        slug,
        title: data.title || '',
        description: data.description || '',
        cover: data.cover || '',
        date: data.date || '',
        author: data.author || '',
        content
    };
}

// Get all chapters for a specific novel
export function getNovelChapters(novelSlug: string): ChapterData[] {
    const chaptersDir = path.join(novelsDirectory, novelSlug, 'chapters');
    if (!fs.existsSync(chaptersDir)) return [];

    const chapterFiles = fs.readdirSync(chaptersDir).filter(f => f.endsWith('.md'));

    const chapters = chapterFiles.map(file => {
        const fullPath = path.join(chaptersDir, file);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data, content } = matter(fileContents);
        // Replace .md from the file name to get slug
        const slug = file.replace(/\.md$/, '');

        return {
            slug,
            title: data.title || '',
            order: data.order || 0,
            characters: data.characters || [],
            content
        };
    });

    // Sort by order
    return chapters.sort((a, b) => a.order - b.order);
}

// Get a specific chapter
export function getChapterBySlug(novelSlug: string, chapterSlug: string): ChapterData | null {
    const fullPath = path.join(novelsDirectory, novelSlug, 'chapters', `${chapterSlug}.md`);
    if (!fs.existsSync(fullPath)) return null;
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
        slug: chapterSlug,
        title: data.title || '',
        order: data.order || 0,
        characters: data.characters || [],
        content
    };
}

// Get exact about data
export function getAboutData() {
    const fullPath = path.join(contentDirectory, 'about.md');
    if (!fs.existsSync(fullPath)) return null;
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
        name: data.name || '',
        role: data.role || '',
        photo: data.photo || '',
        content
    };
}

// Get all characters for a specific novel
export function getNovelCharacters(novelSlug: string): CharacterData[] {
    const charactersDir = path.join(novelsDirectory, novelSlug, 'characters');
    if (!fs.existsSync(charactersDir)) return [];

    const characterFiles = fs.readdirSync(charactersDir).filter(f => f.endsWith('.md') && f !== 'character-list.md');

    const characters = characterFiles.map(file => {
        const fullPath = path.join(charactersDir, file);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data, content } = matter(fileContents);
        const slug = file.replace(/\.md$/, '');

        return {
            slug,
            name: data.name || '',
            role: data.role || '',
            image: data.image || '',
            content
        };
    });

    return characters;
}
