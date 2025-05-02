import api from "@/utils/api/axios.config";

export async function fetchBlogContent(blogId: string, cookieHeader?: string) {
  try {
    const { data } = await api.get(`/api/blog/${blogId}/content`);
    return data || [];
  } catch (error) {
    console.error('Failed to fetch elements:', error);
    return [];
  }
}