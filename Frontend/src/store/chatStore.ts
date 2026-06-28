import { create } from 'zustand';

export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  avatar?: string;
  timestamp: Date;
  sources?: { filename: string; pages: number[] }[];
}

export interface UploadedPDF {
  id: string;
  name: string;
  uploadedAt: Date;
  size: number;
}

interface ChatStore {
  messages: Message[];
  uploadedPDFs: UploadedPDF[];
  isLoading: boolean;
  darkMode: boolean;
  
  addMessage: (message: Message) => void;
  clearMessages: () => void;
  addPDF: (pdf: UploadedPDF) => void;
  removePDF: (id: string) => void;
  setIsLoading: (loading: boolean) => void;
  toggleDarkMode: () => void;
}

export const useChatStore = create<ChatStore>((set) => ({
  messages: [],
  uploadedPDFs: [],
  isLoading: false,
  darkMode: false,
  
  addMessage: (message) =>
    set((state) => ({
      messages: [...state.messages, message],
    })),
  
  clearMessages: () =>
    set({
      messages: [],
    }),
  
  addPDF: (pdf) =>
    set((state) => ({
      uploadedPDFs: [...state.uploadedPDFs, pdf],
    })),
  
  removePDF: (id) =>
    set((state) => ({
      uploadedPDFs: state.uploadedPDFs.filter((pdf) => pdf.id !== id),
    })),
  
  setIsLoading: (loading) =>
    set({
      isLoading: loading,
    }),
  
  toggleDarkMode: () =>
    set((state) => ({
      darkMode: !state.darkMode,
    })),
}));
