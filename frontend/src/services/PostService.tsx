import rpc from "@/utils/axios.config";

export async function fetchUserPosts(userId: string, limit: number = 5) {
    try {

        const response = await rpc.get(
            `/api/user/${userId}/blog/posts?limit=${limit}`, {
                withCredentials: true
            }
        );

        return response.data;
    } catch (error) {
        console.error('Failed to fetch posts:', error);
        throw new Error('Failed to fetch posts.');
    }
}