import React from 'react';
import Head from 'next/head';
import Onboarding from './ClientPage'; 

export default async function OnboardingPage() {
    return (
        <>
            <Head>
                <title>Dashboard</title>
            </Head>
          
            <div className="main db">
                <Onboarding />
            </div>
        </>
    );
} 