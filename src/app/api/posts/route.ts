import { NextResponse } from "next/server";

export async function GET() {
    return NextResponse.json([
        {
            "_id": "67af7f4a424af1c940f6c53b",
            "title": "Fortnite Chapter 6 Season 2: \"Lawless\" – Release Date, Themes, and New Collabs",
            "imageUrl": "https://storage.googleapis.com/nofunmondays/images/1739559699219-vm6gq",
            "featured": true,
            "slug": "fortnite-chapter-6-season-2-lawless--release-date-themes-and-new-collabs",
            "status": "published",
            "views": 19,
            "createdAt": "2025-02-14T17:37:14.776Z",
            "__v": 0,
            "description": "According to recent Fortnite Leaks, Chapter 6 Season 2 is set to be heist themed. In this article, we..."
        },
        {
            "_id": "67ad26fad7f474c13ae901c0",
            "title": "Everything you need to know about Fortnite Chapter 6 Season 2 + Live event info",
            "imageUrl": "https://storage.googleapis.com/nofunmondays/images/1739400954431-zrbsfm",
            "featured": false,
            "slug": "everything-you-need-to-know-about-fortnite-chapter-6-season-2--live-event-info",
            "status": "published",
            "views": 19,
            "createdAt": "2025-02-12T22:55:54.921Z",
            "__v": 0,
            "description": "As Fortnite Chapter 6 Season 1 nears its end, people are looking forward to the upcoming live event..."
        }
    ]);
}