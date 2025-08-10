import { create } from "zustand";

// Database types
export interface User {
  id: string;
  clerk_user_id: string;
  email: string;
  credits: number;
  created_at: string;
  updated_at: string;
}

export interface NameGeneration {
  id: string;
  user_id: string;
  input_data: {
    age?: number;
    name?: string;
    hobbies?: string[];
    expectations?: string;
    china_knowledge?: string;
    chat_context?: string;
  };
  generated_name: {
    chinese_name: string;
    pinyin: string;
    traditional?: string;
    meaning: string;
    cultural_significance: string;
  };
  created_at: string;
}

export interface Payment {
  id: string;
  user_id: string;
  amount: number;
  credits_purchased: number;
  creem_payment_id: string;
  status: "pending" | "completed" | "failed";
  created_at: string;
}

interface AppState {
  user: User | null;
  credits: number;
  generations: NameGeneration[];
  payments: Payment[];
  isLoading: boolean;

  // Actions
  setUser: (user: User | null) => void;
  setCredits: (credits: number) => void;
  addGeneration: (generation: NameGeneration) => void;
  setGenerations: (generations: NameGeneration[]) => void;
  setPayments: (payments: Payment[]) => void;
  setLoading: (loading: boolean) => void;
  setUserData: (data: {
    credits: number;
    generations: NameGeneration[];
    payments: Payment[];
  }) => void;
}

export const useAppStore = create<AppState>((set, get) => ({
  user: null,
  credits: 0,
  generations: [],
  payments: [],
  isLoading: false,

  setUser: (user) => set({ user }),
  setCredits: (credits) => set({ credits }),
  addGeneration: (generation) =>
    set((state) => ({
      generations: [generation, ...state.generations],
    })),
  setGenerations: (generations) => set({ generations }),
  setPayments: (payments) => set({ payments }),
  setLoading: (isLoading) => set({ isLoading }),
  setUserData: (data) =>
    set({
      credits: data.credits || 0,
      generations: data.generations || [],
      payments: data.payments || [],
    }),
}));
