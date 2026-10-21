import { MongoClient } from "mongodb";

const globalForMongo = globalThis as unknown as {
  mongoClient?: Promise<MongoClient>;
};

export function getClient(): Promise<MongoClient> {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("MONGODB_URI가 설정되지 않았습니다.");
  globalForMongo.mongoClient ??= new MongoClient(uri).connect();
  return globalForMongo.mongoClient;
}

export async function getClicksCollection() {
  const client = await getClient();
  return client
    .db(process.env.MONGODB_DB ?? "linknamu")
    .collection<{ _id: string; count: number }>("clicks");
}

export async function getClickCounts(): Promise<Record<string, number>> {
  try {
    const docs = await (await getClicksCollection()).find().toArray();
    return Object.fromEntries(docs.map((d) => [d._id, d.count]));
  } catch {
    return {};
  }
}
