'use client';

import { useState, lazy } from 'react';
import Link from 'next/link';
import Checkbox from '../../../components/ui/checkbox';
import Search from '../../../components/ui/search';
import { usePopup } from '@/contexts/PopupContext';
import { usePostContext } from '@/contexts/PostContext';
import './dashboard-blog.sass';

const DeletePost = lazy(() => import('@/components/popups/dashboard/DeletePost'));
const CreatePost = lazy(() => import('@/components/popups/dashboard/CreatePost'));

interface Post {
  id: string;
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

export default function BlogClientPage({ posts = [] }: BlogClientPageProps) {
  const { handleSelectPost } = usePostContext();
  

  const { togglePopup } = usePopup();

  const [searchQuery, setSearchQuery] = useState('');

  return (
    <>
       <div className="dashboard__content d-flex flex-col">
        <div className="dashboard__banner no-select">
          <div className="dashboard__banner-header">
            <span>Manage Posts</span>
          </div>
        </div>
        <div className="dashboard__blog-grid no-select">
          <div className="dashboard__blog__top">
            <div className="dashboard__blog__search">
              <Search value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
            </div>
            <div className="dashboard__blog__filters">
              <div className="dashboard__filters">
                <div className="dashboard__filters-item">
                  <Checkbox />
                  <span>Featured</span>
                </div>
                <span>|</span>
                <div className="dashboard__filters-item">
                  <Checkbox/>
                  <span>Challenges</span>
                </div>
                <span>|</span>
                <div className="dashboard__filters-item">
                  <span>Status:</span>
                  <select name="status">
                    <option value="">All</option>
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>
              </div>
              
              <div className="dashboard__new-post">
                <div className="dashboard__new-post-item">
                  <Link href="#new-post" onClick={() => togglePopup('createPost', true)}>
                    <i className="fa-solid fa-plus"></i>
                    <span>New Post</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="dashboard__blog-grid-header">
            <div className="dashboard__blog-grid-checkbox dashboard__blog-grid-item"><Checkbox /></div>
            <div className="dashboard__blog-grid-item">Image</div>
            <div className="dashboard__blog-grid-item dashboard__blog-grid-title">Title</div>
            <div className="dashboard__blog-grid-item">Date</div>
            <div className="dashboard__blog-grid-item">Views</div>
            <div className="dashboard__blog-grid-item">Status</div>
            <div className="dashboard__blog-grid-item">Edit</div>
            <div className="dashboard__blog-grid-item">Delete</div>
          </div>

          {posts?.length > 0 ? (
            posts.map((post) => (
              <div key={post.id} className="dashboard__blog-grid-row">
                <div className="dashboard__blog-grid-checkbox">
                  <Checkbox onChange={() => handleSelectPost(post.id)}/>
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
                  <Link className="dashboard__icon--edit" href={`/dashboard/blog/edit/${post.slug}`}>Edit</Link>
                </div>
                <div>
                  <button className="dashboard__icon--delete" onClick={() => togglePopup('deletePost', true)}>Delete</button>
                </div>
              </div>
            ))
          ) : (
            <div className='dashboard__blog-grid__no-posts'>No posts found.</div>
          )}
        </div>
       </div>
      {/* ----- POPUP COMPONENTS ----- */}
        <DeletePost/>
        <CreatePost/>
    </>
  );
};