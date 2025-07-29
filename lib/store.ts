import { create } from "zustand";
import { User, NameGeneration, Payment } from "./supabase";

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
