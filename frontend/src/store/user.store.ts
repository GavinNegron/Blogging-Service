import { create } from 'zustand';
import axios from 'axios';

interface UserInterface {
    id: string;
    name: string;
    email: string;
    emailVerified: boolean;
    image: string;
    createdAt: Date;
    updatedAt: Date;
};

type useUserInterface = {
    user: UserInterface;
    fetchUserData: () => Promise<void>;
    isLoading: boolean;
};

const useUserStore = create<useUserInterface>((set) => ({
    user: {
        id: "",
        name: "",
        email: "",
        emailVerified: false,
        image: "",
        createdAt: new Date(),
        updatedAt: new Date()
    },
    isLoading: false,
    fetchUserData: async () => {
        set({ isLoading: true });
        try {
            const response = await axios.get('/api/user/profile', {
                withCredentials: true
            });
            set({ user: response.data.user});
        } catch (error) {
            console.error(`Error fetching user profile: ${error}`);
        } finally {
            set({ isLoading: false });
        }
    }
}));

export default useUserStore;