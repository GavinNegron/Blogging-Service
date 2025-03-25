'use client';

import { useState } from 'react';
import Link from 'next/link';
import Checkbox from '@/components/checkbox/';
import './dashboard-blog.sass';

interface Post {
  _id: string;
  title: string;
  slug: string;
  imageUrl: string;
  status: string;
  views: number;
  createdAt: string;
}

interface BlogClientPageProps {
  posts: Post[];
}

export default function BlogClientPage({ posts }: BlogClientPageProps) {
  const [localPosts, setLocalPosts] = useState<Post[]>(posts);

  return (
    <>
      <div className="dashboard__header">
        <span>Manage Posts</span>
      </div>
      <div className="dashboard__blog-grid">
        <div className="dashboard__blog-grid-header">
          <div className="dashboard__blog-grid-checkbox dashboard__blog-grid--item"><Checkbox /></div>
          <div className='dashboard__blog-grid--item'>Image</div>
          <div className='dashboard__blog-grid--item dashboard__blog-grid--title'>Title</div>
          <div className='dashboard__blog-grid--item'>Date</div>
          <div className='dashboard__blog-grid--item'>Views</div>
          <div className='dashboard__blog-grid--item'>Status</div>
          <div className='dashboard__blog-grid--item'>Edit</div>
          <div className='dashboard__blog-grid--item'>Delete</div>
        </div>

        {localPosts.map((post) => (
          <div key={post._id} className="dashboard__blog-grid-row">
            <div className="dashboard__blog-grid-checkbox">
              <Checkbox />
            </div>
            <div className="dashboard__blog-grid-image">
              <a href={`/dashboard/blog/edit/${post.slug}`}>
                <img 
                  src={post.imageUrl || '/placeholder.png'} 
                  alt={post.title || 'Post image'} 
                />
              </a>
            </div>
            <div>{post.title}</div>
            <div>
              {new Date(post.createdAt).toLocaleDateString()}
            </div>
            <div>{post.views || 0}</div>
            <div>
              <i>{post.status || 'Published'}</i>
            </div>
            <div>
              <Link 
                className="dashboard__icon--edit" 
                href={`/dashboard/blog/edit/${post.slug}`}
              >
                Edit
              </Link>
            </div>
            <div>
              <Link 
                className="dashboard__icon--delete" 
                href="#"
              >
                Delete
              </Link>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}