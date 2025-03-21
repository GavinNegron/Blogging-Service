import React from 'react';
import Head from 'next/head';
import { redirect } from 'next/navigation';
import { auth } from '@/utils/auth';
import { headers } from 'next/headers';
import Onboarding from './ClientPage'; 

export default async function OnboardingPage() {
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
            <main className="main db">
                <Onboarding />
            </main>
        </>
    );
}
