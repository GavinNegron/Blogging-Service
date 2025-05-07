import api from "@/utils/api/axios.config";

export const fetchBlogContent = async (blogId: string) => {
  const { data } = await api.get(`/api/blog/${blogId}/content`);
  return data || [];
};

export const saveEditorAction = async (blogId: string, action: any) => {
  const response = await api.post(`/api/blog/${blogId}/save-action`, {
    type: action.type,
    payload: action.payload
  });
  return response.data;
};