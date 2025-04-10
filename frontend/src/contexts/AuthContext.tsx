import { createContext, useContext, useEffect, useState } from "react";
import { authClient } from "@/utils/auth-client";

interface User {
  id: string;
  email: string;
}

interface AuthContextType {
  user: User | null; 
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: session } = authClient.useSession();
  const [user, setUser] = useState<User | null>(null); 
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (session?.user) {
      setUser(session.user); 
    }
    setIsLoading(false);
  }, [session]);

  return (
    <AuthContext.Provider value={{ user, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
