import { db } from "@/db/drizzle";
import { ilike } from "drizzle-orm"; 

export async function HEAD(req: Request) {
    const { searchParams } = new URL(req.url);
    const username = searchParams.get("username");

    if (!username) return new Response(null, { status: 400 });

    const userExists = await db.query.user.findFirst({
        where: (user) => ilike(user.name, username)
    });

    return new Response(null, { status: userExists ? 200 : 404 });
}