'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Checkbox from '@/components/checkbox/index';
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

export default function PostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedPosts, setSelectedPosts] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/posts', {
          method: 'GET'
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch posts');
        }
        
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleSelectPost = (postId: string) => {
    setSelectedPosts(prev => 
      prev.includes(postId) 
        ? prev.filter(id => id !== postId)
        : [...prev, postId]
    );
  };

  const handleSelectAll = () => {
    if (selectedPosts.length === posts.length) {
      setSelectedPosts([]);
    } else {
      setSelectedPosts(posts.map(post => post._id));
    }
  };

  const handleDelete = async (postId: string) => {
    if (confirm('Are you sure you want to delete this post?')) {
      try {
        const response = await fetch(`/api/posts/${postId}`, {
          method: 'DELETE'
        });
        
        if (!response.ok) {
          throw new Error('Failed to delete post');
        }
        
        setPosts(prev => prev.filter(post => post._id !== postId));
        setSelectedPosts(prev => prev.filter(id => id !== postId));
      } catch (error) {
        console.error('Error deleting post:', error);
      }
    }
  };

  if (isLoading) {
    return <div>Loading posts...</div>;
  }

  return (
    <div className="dashboard__posts">
      <table>
        <thead className='no-select'>
          <tr>
            <th id="selectAll">
              <Checkbox
                checked={selectedPosts.length === posts.length && posts.length > 0}
                onChange={handleSelectAll}
              />
            </th>
            <th className="image">Image</th>
            <th className="title">Title</th>
            <th className="date">Date</th>
            <th className="views">Views</th>
            <th className="status">Status</th>
            <th className="edit">Edit</th>
            <th className="delete">Delete</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr key={post._id}>
              <td>
                <Checkbox
                  checked={selectedPosts.includes(post._id)}
                  onChange={() => handleSelectPost(post._id)}
                />
              </td>
              <td className="dashboard__posts__image no-select">
                <a href={`/dashboard/posts/edit/${post.slug}`}>
                  <img
                    src={post.imageUrl || 'https://via.placeholder.com/150'}
                    alt={post.title || 'Post image'}
                  />
                </a>
              </td>
              <td className="dashboard__posts__title">{post.title}</td>
              <td className="dashboard__posts__date">
                {new Date(post.createdAt).toLocaleDateString()}
              </td>
              <td className="dashboard__posts__views">{post.views || 0}</td>
              <td className="dashboard__posts__status">
                <i>{post.status || 'Published'}</i>
              </td>
              <td className="">
                <div id="edit" className="dashboard__posts__icon">
                  <p>
                    <Link
                      className="dashboard__posts__icon--edit"
                      href={`/dashboard/posts/edit/${post.slug}`}
                    >
                      Edit
                    </Link>
                  </p>
                </div>
              </td>
              <td className="">
                <div id="delete" className="dashboard__posts__icon">
                  <p>
                    <Link
                      className="dashboard__posts__icon--delete"
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        handleDelete(post._id);
                      }}
                    >
                      Delete
                    </Link>
                  </p>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}