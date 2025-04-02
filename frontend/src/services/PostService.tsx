import axios from 'axios';

export async function fetchUserPosts(userId: string, limit: number = 5) {
    try {

        const response = await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}/api/user/${userId}/blog/posts?limit=${limit}`,
        );

        return response.data;
    } catch (error) {
        console.error('Failed to fetch posts:', error);
        throw new Error('Failed to fetch posts.');
    }
}