import api from "@/utils/axios.config";

interface PostData {
    title: string
    image: string
  }

export async function fetchUserPosts(userId: string, limit: number = 5) {
    try {
        const response = await api.get(`/api/user/${userId}/blog/posts?limit=${limit}`);
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

export async function createUserPost(userId: string, postData: PostData) {
    try {
      const response = await api.post(`/api/user/${userId}/blog/posts`, postData)
      return response.data;
    } catch (error) {
      console.error(error);
      return { success: false, message: 'Failed to create new post. Please try again later. '}
    }
  }