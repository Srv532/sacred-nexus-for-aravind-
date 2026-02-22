import { getAllNovels } from "../lib/api";
import ClientHome from "./ClientHome";

export default function Home() {
  const novels = getAllNovels();

  // Sort by date (descending)
  const featuredNovels = novels.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 2);

  return <ClientHome featuredNovels={featuredNovels} />;
}
