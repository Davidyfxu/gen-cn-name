import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// For server-side usage (API routes and server components)
export const createServerSupabaseClient = async () => {
  const cookieStore = await cookies();

  return createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet: any) {
        try {
          cookiesToSet.forEach(({ name, value, options }: any) => {
            cookieStore.set(name, value, {
              ...options,
              httpOnly: false, // Important for auth cookies
              secure: process.env.NODE_ENV === "production",
              sameSite: "lax",
            });
          });
        } catch (error) {
          console.log("Cookie setting error in server component:", error);
        }
      },
    },
  });
};
