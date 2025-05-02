import ClientPage from './ClientPage';
import { Metadata } from 'next';
import { fetchUserPosts } from '@/services/PostService';
import api from '@/utils/api/axios.config';
import { getCookieHeaderFromServer } from '@/utils/misc/getCookieHeader';
import { EditorProvider } from '@/contexts/EditorContext';
import { PopupProvider } from '@/contexts/PopupContext';

export const metadata: Metadata = {
  title: 'Website Editor - Placeholder',
};

export default async function Page() {
  const cookieHeader = await getCookieHeaderFromServer();

  const session = await api.get('/api/auth/get-session', {
    headers: {
      cookie: cookieHeader,
    },
  });

  const userId = session.data?.user?.id;

  if (!userId) {
    return <p>Error: Unauthorized</p>;
  }

  return (
    <PopupProvider>
      <EditorProvider>
        <ClientPage />
      </EditorProvider>
    </PopupProvider>
  );
}