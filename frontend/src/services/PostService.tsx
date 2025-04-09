import api from "@/utils/axios.config";

export async function fetchUserPosts(userId: string, limit: number = 5) {
    try {
        const response = await api.get(`/api/user/${userId}/blog/posts?limit=${limit}`, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error('Failed to fetch posts:', error);
        throw new Error('Failed to fetch posts.');
    }
}

export async function deleteUserPosts(userId: string, postIds: string[]) {
    try {
        const response = await api.delete(`/api/user/${userId}/blog/posts`, { data: { postIds } });
        return response.data;
    } catch (error) {
        console.error('Failed to delete posts:', error);
        throw new Error('Failed to delete posts.');
    }
}