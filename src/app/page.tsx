import LinkCard from "@/components/LinkCard";
import Profile from "@/components/Profile";
import { links, profile } from "@/lib/links";
import { getClickCounts } from "@/lib/mongodb";

export const dynamic = "force-dynamic";

export default async function Home() {
  const counts = await getClickCounts();

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-md flex-col gap-8 px-5 py-12">
      <Profile {...profile} />
      <ul className="flex flex-col gap-5">
        {links.map((link) => (
          <li key={link.id}>
            <LinkCard {...link} clicks={counts[link.id] ?? 0} />
          </li>
        ))}
      </ul>
    </main>
  );
}
