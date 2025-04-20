import api from "@/utils/axios.config"

export async function fetchUserBlog(userId: string, cookieHeader?: string) {
  try {
    const response = await api.get(
      `/api/user/${userId}/blog/`,
      {
        headers: cookieHeader ? { Cookie: cookieHeader } : undefined,
      }
    )
    return response.data
  } catch (error) {
    console.error("Failed to blog details:", error)
    return {
      success: false,
      message: "Failed to blog details. Please try again later.",
    }
  }
}