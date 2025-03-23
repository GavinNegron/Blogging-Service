import React from 'react';
import Head from 'next/head';
import { redirect } from 'next/navigation'; // Import redirect
import { NavbarDashboard } from '@/components/navbar/index';
import { SidebarDashboard } from '@/components/sidebar/index';
import { auth } from '@/utils/auth';
import { headers } from 'next/headers';
import { db } from '@/db/drizzle';
import { eq } from 'drizzle-orm';
import { schema } from '@/db/schema';
import './dashboard.sass';

export default async function DashboardPage() {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session?.user?.id) {
        redirect('/login'); 
    }

    return (
        <>
            <Head>
                <title>Dashboard</title>
            </Head>
            <NavbarDashboard />
            <main className="main db">
                <SidebarDashboard user={session?.user} />
                <div className="dashboard">
                    Welcome to your dashboard!
                </div>
            </main>
        </>
    );
}
