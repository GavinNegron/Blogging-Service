import React from 'react';
import Head from 'next/head';
import { NavbarDashboard } from '@/components/navbar/index'
import { SidebarDashboard } from '@/components/sidebar/index'
import { auth } from '@/utils/auth';
import { headers } from 'next/headers';
import './dashboard.sass'

export default async function DashboardPage() {
    const session = await auth.api.getSession({
        headers: await headers(),
      });

  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <NavbarDashboard />
      <main className="main db">
      <SidebarDashboard user={session?.user}/>
        <div className="dashboard">
            
        </div>
      </main>
    </>
  );
}