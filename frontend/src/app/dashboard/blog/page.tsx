import BlogClientPage from './ClientPage';
import { Metadata } from 'next';
import { fetchUserPosts } from '@/services/PostService';

export const metadata: Metadata = {
  title: 'Manage Posts',
};

export default async function PostsPage() {
  const posts = await fetchUserPosts(`CM008qCVC5ZhTGdNcxSqsnzUlW3LhFRq`);
  return <BlogClientPage posts={posts} />;
}