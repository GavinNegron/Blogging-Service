'use client';

import { useState } from 'react';
import Link from 'next/link';
import Checkbox from '@/components/checkbox/';
import './dashboard-posts.sass';

interface Post {
  _id: string;
  title: string;
  slug: string;
  imageUrl: string;
  status: string;
  views: number;
  createdAt: string;
}

interface PostsClientPageProps {
  posts: Post[];
}

export default function PostsClientPage({ posts }: PostsClientPageProps) {
  const [localPosts, setLocalPosts] = useState<Post[]>(posts);

  return (
    <>
      <div className="dashboard__header">
        <span>Manage Posts</span>
      </div>
      <div className="dashboard__posts-grid">
        <div className="dashboard__posts-grid-header">
          <div className="dashboard__posts-grid-checkbox dashboard__posts-grid--item"><Checkbox /></div>
          <div className='dashboard__posts-grid--item'>Image</div>
          <div className='dashboard__posts-grid--item'>Title</div>
          <div className='dashboard__posts-grid--item'>Date</div>
          <div className='dashboard__posts-grid--item'>Views</div>
          <div className='dashboard__posts-grid--item'>Status</div>
          <div className='dashboard__posts-grid--item'>Edit</div>
          <div className='dashboard__posts-grid--item'>Delete</div>
        </div>

        {localPosts.map((post) => (
          <div key={post._id} className="dashboard__posts-grid-row">
            <div className="dashboard__posts-grid-checkbox">
              <Checkbox />
            </div>
            <div className="dashboard__posts-grid-image">
              <a href={`/dashboard/posts/edit/${post.slug}`}>
                <img 
                  src={post.imageUrl || 'https://via.placeholder.com/150'} 
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
                href={`/dashboard/posts/edit/${post.slug}`}
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