import api from "@/utils/axios.config";

interface Blog {
  id: string;
  name: string;
  description?: string;
  onboardingComplete: boolean;
}

export async function fetchUserBlog(userId: string, cookieHeader?: string): Promise<Blog | null> {
  try {
    const response = await api.get(`/api/user/${userId}/blog/`, {
      headers: cookieHeader ? { Cookie: cookieHeader } : undefined,
    });

    if (response.data && response.data.blogName && response.data.description) {
      return {
        id: userId,
        name: response.data.blogName,
        description: response.data.description,
        onboardingComplete: response.data.onboardingComplete
      };
    }

    console.warn("Unexpected response format:", response.data);
    return null;
  } catch (error) {
    console.error("Failed to fetch blog details:", error);
    return null;
  }
}
