import ClientPage from './ClientPage'
import { Metadata } from 'next'
import api from '@/utils/api/axios.config'
import { getCookieHeaderFromServer } from '@/utils/misc/getCookieHeader'

export const metadata: Metadata = {
  title: 'Website Overview',
}

export default async function DashboardOverviewPage() {
  const cookieHeader = await getCookieHeaderFromServer();
  
  const session = await api.get('/api/auth/get-session', {
    headers: {
      cookie: cookieHeader,
    },
  })

  const userId = session.data?.user?.id

  

  return <ClientPage/>
}