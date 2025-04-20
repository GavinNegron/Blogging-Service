
import React, { Suspense } from "react";
import Loading from "./loading"; 

export default async function PostsPage() {
  return (
    <Suspense fallback={<Loading />}>
      <div className="dashboard__banner no-select">
        <div className="dashboard__banner-header">
          <span>Dashboard Overview</span>
        </div>
      </div>
    </Suspense>
  );
}