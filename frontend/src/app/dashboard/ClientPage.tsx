"use client"

import React, { Suspense } from "react";
import Loading from "./loading"; 
import styles from './styles.module.sass';
import DefaultButton from '@/components/ui/buttons/default/DefaultButton';
import ViewPlansBanner from "@/components/dashboard/ViewPlans";
import Link from "next/link";

export default function ClientPage() {
  return (
    <Suspense fallback={<Loading />}>
        <div className="flex-col dashboard__content__inner">
            <div className="dashboard__banner no-select">
                <div className="dashboard__banner-header">
                    <span>Dashboard Overview</span>
                </div>
            </div>
            <ViewPlansBanner/>
            <nav className={`${styles['editor__header']} d-flex `}>
                <div className={styles['editor__header__item']}>
                    <DefaultButton icon='fa fa-pen-to-square' background='#2a2c31' height={20}>
                        <Link href={'http://localhost:3000/dashboard/editor'} target="_blank">Edit Site</Link>
                    </DefaultButton>
                </div>
            </nav>
        </div>

    </Suspense>
  );
}