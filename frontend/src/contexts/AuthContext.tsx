"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { authClient } from "@/utils/auth-client";

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
    if (session?.user) {
      setUser(session.user); 
    }
    setIsLoading(false);

    setBlog({ id: '1234', name: "Error loading blog" });
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