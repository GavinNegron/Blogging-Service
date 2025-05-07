'use client';

import { createContext, useContext, useRef, useState, ReactNode } from 'react';

type HoverData = {
  type: string;
  className: string;
  content: string | null;
};

type EditorContextType = {
  setHoverData: (data: HoverData | null) => void;
  draggedElementRef: React.RefObject<HTMLElement | null>;
  startRef: React.MutableRefObject<{ x: number; y: number }>;
  iframeRef: React.RefObject<HTMLIFrameElement | null>;
  allowedElements: string[];
};

const EditorContext = createContext<EditorContextType | undefined>(undefined);

export const EditorProvider = ({ children }: { children: ReactNode }) => {
  const draggedElementRef = useRef<HTMLElement | null>(null);
  const startRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const [hoverData, setHoverData] = useState<HoverData | null>(null);

  const allowedElements = ['ul', 'ol', 'li', 'a', 'span', 'img', 'p', 'button', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'];

  return (
    <EditorContext.Provider
      value={{
        setHoverData,
        draggedElementRef,
        startRef,
        iframeRef,
        allowedElements,
      }}
    >
      {children}
    </EditorContext.Provider>
  );
};

export const useEditorContext = () => {
  const context = useContext(EditorContext);
  if (!context) {
    throw new Error('useEditorContext must be used within an EditorProvider');
  }
  return context;
};
