import api from "@/utils/axios.config";

export async function fetchUserPosts(userId: string, limit: number = 5) {
    try {
        const response = await api.get(`/api/user/${userId}/blog/posts?limit=${limit}`, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error('Failed to fetch posts:', error);
        return { success: false, message: 'Failed to fetch posts. Please try again later.' };
    }
}

export async function deleteUserPosts(userId: string, postIds: string[]) {
    try {
        const response = await api.delete(`/api/user/${userId}/blog/posts`, { data: { postIds } });
        return response.data;
    } catch (error) {
        console.error('Failed to delete posts:', error);
        return { success: false, message: 'Failed to delete posts. Please try again later.' };
    }
}
