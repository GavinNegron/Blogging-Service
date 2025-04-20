import api from "@/utils/axios.config"

export async function completeOnboarding(userId: string, blogname: string, cookieHeader?: string) {
  try {
    const response = await api.put(
      `/api/user/${userId}/onboarding/complete`,
      {
        headers: cookieHeader ? { Cookie: cookieHeader } : undefined,
      }
    )
    return response.data
  } catch (error) {
    console.error("Failed to complete onboarding:", error)
    return {
      success: false,
      message: "Failed to complete onboarding. Please try again later.",
    }
  }
}