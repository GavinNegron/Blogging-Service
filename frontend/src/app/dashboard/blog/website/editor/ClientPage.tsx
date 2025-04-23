'use client';

import ViewPlansBanner from '@/components/dashboard/ViewPlans';
import { useAuthContext } from '@/contexts/AuthContext';

export default function BlogWebsiteEditorClientPage() {
  const { user } = useAuthContext();

  let firstName = user?.name.trim().split(" ")[0];

  return (
    <>
   
    <div className="d-flex flex-col dashboard__content__inner">
      <div className="dashboard__banner no-select">
        <div className="dashboard__banner-header">
          <span>{firstName ? `Welcome Back, ${firstName}!` : 'Welcome Back!'}</span>
        </div>
      </div>
      <ViewPlansBanner />
    </div>
    </>
  );
}