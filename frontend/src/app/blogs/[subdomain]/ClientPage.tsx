'use client'

type BlogDetails = {
  name: string
  description: string
}

export default function ClientPage({ blogDetails }: { blogDetails: BlogDetails }) {
  return (
    <div className="dashboard__banner no-select">
      <div className="dashboard__banner-header">
        <span>{blogDetails.name}</span>
        <p>{blogDetails.description}</p>
      </div>
    </div>
  )
}
