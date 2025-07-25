import { create } from "zustand";
import { User, NameGeneration } from "./supabase";

interface AppState {
  user: User | null;
  credits: number;
  generations: NameGeneration[];
  isLoading: boolean;

  // Actions
  setUser: (user: User | null) => void;
  setCredits: (credits: number) => void;
  addGeneration: (generation: NameGeneration) => void;
  setGenerations: (generations: NameGeneration[]) => void;
  setLoading: (loading: boolean) => void;
}

export const useAppStore = create<AppState>((set, get) => ({
  user: null,
  credits: 0,
  generations: [],
  isLoading: false,

  setUser: (user) => set({ user }),
  setCredits: (credits) => set({ credits }),
  addGeneration: (generation) =>
    set((state) => ({
      generations: [generation, ...state.generations],
    })),
  setGenerations: (generations) => set({ generations }),
  setLoading: (isLoading) => set({ isLoading }),
}));
