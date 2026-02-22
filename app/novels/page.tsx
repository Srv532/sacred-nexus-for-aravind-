import { getAllNovels } from "../../lib/api";
import { Metadata } from "next";
import ClientNovels from "./ClientNovels";

export const metadata: Metadata = {
    title: "Novels by Aravind A",
};

export default function NovelsPage() {
    const novels = getAllNovels();
    return <ClientNovels novels={novels} />;
}
