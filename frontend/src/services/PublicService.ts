import api from "@/utils/api/axios.config";

interface Blog {
  id: string;
  name: string;
  description: string;
}

export async function fetchBlogDetails(blogId: string): Promise<Blog | null> {
  try {
    const response = await api.get(`/api/public/blog/${blogId}/details`);

    if (response.data && response.data.name && response.data.description) {
      return {
        id: response.data.id,
        name: response.data.name,
        description: response.data.description,
      };
    }

    return null;
  } catch (error: any) {
    if (error.response?.status === 404) {
      console.warn(`Blog with ID ${blogId} not found (404).`);
    } else {
      console.error("Failed to fetch blog details:", error);
    }
    return null;
  }
}