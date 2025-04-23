import api from "@/utils/axios.config";

export async function completeOnboarding(
  userId: string, 
  blogName: string, 
  cookieHeader?: string
) {
  try {
    const response = await api.post(
      `/api/user/${userId}/onboarding/complete`,
      {
        blogName,
      },
      {
        headers: cookieHeader ? { Cookie: cookieHeader } : undefined,
      }
    );

    return response.data;
  } catch (error) {
    console.error("Failed to complete onboarding:", error);
    return {
      success: false,
      message: "Failed to complete onboarding. Please try again later.",
    };
  }
}