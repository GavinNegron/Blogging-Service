'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Fuse from 'fuse.js';
import Checkbox from '../../../components/ui/checkbox';
import Search from '../../../components/ui/search';
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
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedPosts, setSelectedPosts] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'desc' });

  const fuse = new Fuse(posts, {
    keys: ['title'],
    threshold: 0.3,
  });

  const filteredPosts = searchQuery
    ? fuse.search(searchQuery).map(result => result.item)
    : (Array.isArray(posts) ? posts.filter((post) => {
        if (selectedStatus && post?.status !== selectedStatus) return false;
        return true;
      }) : []);

  const sortedPosts = filteredPosts.slice(0, 5).sort((a, b) => {
    if (sortConfig.key === 'date') {
      return sortConfig.direction === 'desc'
        ? new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        : new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    } else if (sortConfig.key === 'views') {
      return sortConfig.direction === 'desc' ? b.views - a.views : a.views - b.views;
    }
    return 0;
  });
      
  const handleSortChange = (key: 'date' | 'views') => {
    let direction: 'asc' | 'desc' = 'desc';
    if (sortConfig.key === key && sortConfig.direction === 'desc') {
      direction = 'asc';
    }
    setSortConfig({ key, direction });
  };
      
  useEffect(() => {
    const modifySection = document.querySelector('.dashboard__modify') as HTMLElement | null;
    if (modifySection) {
      modifySection.style.display = selectedPosts.length > 0 ? 'flex' : 'none';
    }
  }, [selectedPosts]);
      
  return (
    <>
      <div className="dashboard__blog">
        <div className="dashboard__banner">
          <div className="dashboard__banner-header">
            <span>Manage Posts</span>
          </div>
        </div>
        
        <div className="dashboard__blog-grid">
          <div className="dashboard__blog__top">
            <div className="dashboard__blog__search">
              <Search value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
            </div>
            <div className="dashboard__blog__filters no-select">
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
                  <Link href="#new-post">
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
            <div className="dashboard__blog-grid-item" onClick={() => handleSortChange('date')}>Date</div>
            <div className="dashboard__blog-grid-item" onClick={() => handleSortChange('views')}>Views</div>
            <div className="dashboard__blog-grid-item">Status</div>
            <div className="dashboard__blog-grid-item">Edit</div>
            <div className="dashboard__blog-grid-item">Delete</div>
          </div>

          {posts.map((post) => (
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