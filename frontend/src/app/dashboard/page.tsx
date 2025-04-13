
import React, { Suspense } from "react";
import Loading from "./loading"; 

export default async function PostsPage() {
  return (
    <Suspense fallback={<Loading />}>
      <div className="dashboard__content d-flex flex-col">
        <div className="dashboard__banner">
          <div className="dashboard__banner-header">
            <span>Dashboard</span>
          </div>
        </div>
      </div>
    </Suspense>
  );
}