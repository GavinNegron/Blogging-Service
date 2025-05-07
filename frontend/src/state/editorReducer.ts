interface EditorState {
  content: any[];
}

export const editorReducer = (state: EditorState, action: any) => {
  switch (action.type) {
    case 'DELETE_ELEMENT':
      return {
        content: state.content.filter((item) => item.id !== action.payload.id)
      };
    default:
      return state;
  }
};