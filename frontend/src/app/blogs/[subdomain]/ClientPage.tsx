'use client'

type BlogDetails = {
  name: string
  description: string
  id: string
}

export default function ClientPage({ blogDetails }: { blogDetails: BlogDetails }) {
  return (
    <div className="dashboard__banner no-select">
      <div className="dashboard__banner-header">
        <span>{blogDetails.name}</span>
        <p>{blogDetails.description}</p>
      </div>
    </div>
    // <>
    //    <iframe
    //     src={`http://localhost:3000/dashboard/editor/website/render/${blogDetails.id}`}
    //     width="100%"
    //     height="100%"
    //     title="Preview Website"
    //     sandbox="allow-same-origin allow-scripts"
    //     style={{ border: 'none', transformOrigin: 'center center' }}
    //   />
    // </>
  )
}