import { createClient } from "@supabase/supabase-js";
import { createBrowserClient } from "@supabase/ssr";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// For client-side usage in components
export const createBrowserSupabaseClient = () => {
  return createBrowserClient(supabaseUrl, supabaseAnonKey);
};

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
