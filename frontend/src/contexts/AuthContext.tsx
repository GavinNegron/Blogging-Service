"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { authClient } from "@/utils/auth/auth-client";
import { fetchUserBlog } from "@/services/BlogService";

interface User {
  id: string;
  name: string;
  email: string;
  image?: string | null;
}

interface Session {
  user: User | null;
}

interface Blog {
  id: string;
  name: string;
  description?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  session?: Session | null;
  blog: Blog | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: session } = authClient.useSession();
  const [user, setUser] = useState<User | null>(null);
  const [blog, setBlog] = useState<Blog | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      if (session?.user) {
        setUser(session.user);

        try {
          const blogData = await fetchUserBlog(session.user.id);
          setBlog(blogData);
        } catch (error) {
          console.error("Failed to fetch blog:", error);
          setBlog({ id: "1234", name: "Error loading blog" });
        }
      }
      setIsLoading(false);
    };

    loadData();
  }, [session]);

  return (
    <AuthContext.Provider value={{ user, isLoading, session, blog }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};
