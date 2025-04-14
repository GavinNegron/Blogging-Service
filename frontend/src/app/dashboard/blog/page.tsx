import ClientPage from './ClientPage';
import { Metadata } from 'next';
import { fetchUserPosts } from '@/services/PostService';
import api from '@/utils/axios.config';
import { cookies } from 'next/headers';

export const metadata: Metadata = {
  title: 'Manage Posts',
};

export default async function PostsPage() {
  const cookieHeader = (await cookies()).toString();
  await new Promise((resolve) => setTimeout(resolve, 150));


  const session = await api.get('/api/auth/get-session', {
    headers: {
      cookie: cookieHeader
    },
  })  

  const userId = session.data?.user?.id;

  if (!userId) {
    return <p>Error: Unauthorized</p>;
  }

  const posts = await fetchUserPosts(userId);
  return <ClientPage posts={posts} />;
}