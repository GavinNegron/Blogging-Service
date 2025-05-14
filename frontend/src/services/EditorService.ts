import api from "@/utils/api/axios.config";

export const fetchBlogContent = async (blogId: string) => {
  const { data } = await api.get(`/api/blog/${blogId}/content`);
  return data || [];
};

export const saveEditorAction = async (blogId: string, actions: any[]) => {
  if (!blogId || !actions || actions.length === 0) {
    throw new Error("blogId and actions are required");
  }
  
  const formattedActions = actions.map(action => ({
    type: action.type,
    payload: action.payload
  }));
  
  const response = await api.post(`/api/blog/${blogId}/save-action`, {
    correlationId: generateCorrelationId(),
    actions: formattedActions
  });
  
  return response.data;
};

const generateCorrelationId = () => `${Math.random().toString(36).slice(2)}-${Date.now()}`;