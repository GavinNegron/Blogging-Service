export type BlogElement = {
  id: string;
  type: string;
  class?: string;
  children?: BlogElement[];
  layout?: Record<string, any>;
  content?: string;
};

export type EditorAction =
  | { type: 'ADD_ELEMENT'; payload: BlogElement; parentId?: string }
  | { type: 'UPDATE_ELEMENT'; payload: { id: string; updates: Partial<BlogElement> } }
  | { type: 'DELETE_ELEMENT'; payload: { id: string } }
  | { type: 'MOVE_ELEMENT'; payload: { id: string; newParentId: string; index?: number } }
  | { type: 'RESET_CHANGES' }
  | { type: 'INIT_CONTENT'; payload: BlogElement[] };