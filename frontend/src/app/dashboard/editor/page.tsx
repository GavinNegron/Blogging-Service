import ClientPage from './ClientPage'
import { Metadata } from 'next'
import { fetchUserPosts } from '@/services/PostService'
import api from '@/utils/axios.config'
import { getCookieHeaderFromServer } from '@/utils/getCookieHeader'

export const metadata: Metadata = {
  title: 'Manage Posts',
}

export default async function PostsPage() {
  const cookieHeader = await getCookieHeaderFromServer();
  
  const session = await api.get('/api/auth/get-session', {
    headers: {
      cookie: cookieHeader,
    },
  })

  const userId = session.data?.user?.id

  if (!userId) {
    return <p>Error: Unauthorized</p>
  }

  const posts = await fetchUserPosts(userId, 5, cookieHeader)

  return <ClientPage/>
}