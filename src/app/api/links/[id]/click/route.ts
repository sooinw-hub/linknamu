import { links } from "@/lib/links";
import { getClicksCollection } from "@/lib/mongodb";

export async function POST(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  if (!links.some((link) => link.id === id)) {
    return Response.json({ error: "Not found" }, { status: 404 });
  }

  try {
    const clicks = await getClicksCollection();
    const doc = await clicks.findOneAndUpdate(
      { _id: id },
      { $inc: { count: 1 } },
      { upsert: true, returnDocument: "after" },
    );
    return Response.json({ id, count: doc?.count ?? 1 });
  } catch {
    return Response.json({ error: "Click tracking unavailable" }, { status: 503 });
  }
}
