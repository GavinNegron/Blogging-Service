'use client';

import { useState } from 'react';
import Link from 'next/link';
import Checkbox from '@/components/checkbox/';
import StatBox from '@/components/analytics';
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
     <div className="dashboard__blog">
      <div className="dashboard__header">
        <span>Manage Posts</span>
      </div>
      <div className="dashboard__blog__stats">
        <StatBox 
            icon='fa-solid fa-eye'
            header='Daily Views'
            value={15}
            change={12}
            bgColor='#7175d224'
            color='#636af9'
          />
          <StatBox 
            icon='fa-solid fa-heart'
            header='Daily Likes'
            value={14}
            change={63}
            bgColor='#af71d224'
            color='#9d6fff'
          />
          <StatBox  
            icon='fa-solid fa-comment'
            header='Daily Comments'
            value={34}
            change={32}
            bgColor='#53caff24'
            color='#41a2e3'
          />
          <StatBox 
            icon='fa-solid fa-share'
            header='Daily Shares'
            value={23}
            change={34}
            bgColor='#73d9d424'
            color='#4ad89c'
          />
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
     </div>
    </>
  );
}