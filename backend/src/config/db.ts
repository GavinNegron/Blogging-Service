import { drizzle } from "drizzle-orm/postgres-js"; 
import { schema } from "./schema";

if (!process.env.DATABASE_URL) {
    console.log(process.env.DATABASE_URL)
    throw new Error("DATABASE_URL is missing from environment variables.");
}

export const db = drizzle(process.env.DATABASE_URL, { schema });