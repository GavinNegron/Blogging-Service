import { NextResponse } from 'next/server';
import { db } from '@/db/drizzle';
import { eq } from 'drizzle-orm';
import { user } from '@/db/schema';
import { auth } from '@/utils/auth'; 

export async function POST(request: Request) {
  try {
    const session = await auth.api.getSession({
      headers: request.headers, 
    });

    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userid = session.user.id; 
    const { username } = await request.json();

    if (!username) {
      return NextResponse.json({ error: 'Username is required' }, { status: 400 });
    }

    await db
      .update(user)
      .set({ onboardingComplete: true })
      .where(eq(user.id, userid));

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to complete onboarding' }, { status: 500 });
  }
}