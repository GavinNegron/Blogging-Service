import api from "@/utils/api/axios.config";

interface Blog {
  id: string;
  name: string;
  description?: string;
  onboardingComplete: boolean;
}

export async function fetchUserBlog(userId: string, cookieHeader?: string): Promise<Blog | null> {
  try {
    const response = await api.get(`/api/user/${userId}/blog`, {
      headers: cookieHeader ? { Cookie: cookieHeader } : undefined,
    });

    if (response.data && response.data.blogName && response.data.description) {
      return {
        id: response.data.id,
        name: response.data.blogName,
        description: response.data.description,
        onboardingComplete: response.data.onboardingComplete
      };
    }

    return null;
  } catch (error) {
    console.error("Failed to fetch blog details:", error);
    return null;
  }
}