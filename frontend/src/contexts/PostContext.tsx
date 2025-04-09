import { createContext, useContext, useState, ReactNode } from 'react';

interface PostContextType {
  selectedPosts: string[];
  handleSelectPost: (postId: string) => void;
}

const PostContext = createContext<PostContextType | undefined>(undefined);

export const PostProvider = ({ children }: { children: ReactNode }) => {
  const [selectedPosts, setSelectedPosts] = useState<string[]>([]);

  const handleSelectPost = (postId: string) => {
    setSelectedPosts((prev) =>
      prev.includes(postId) ? prev.filter((id) => id !== postId) : [...prev, postId]
    );
  };

  return (
    <PostContext.Provider value={{ selectedPosts, handleSelectPost }}>
      {children}
    </PostContext.Provider>
  );
};

export const usePostContext = () => {
  const context = useContext(PostContext);
  if (!context) {
    throw new Error('usePost must be used within a PostProvider');
  }
  return context;
};