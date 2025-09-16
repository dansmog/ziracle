import { redirect } from "next/navigation";
import { createClient } from "./supabase/server";
import { User } from "@supabase/supabase-js";

export async function getCurrentUser(): Promise<User | null> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}

export async function requireAuth(): Promise<User | null> {
  const user = getCurrentUser();
  if (!user) {
    redirect("/login");
  }
  return user;
}

export async function requireAuthAPI(): Promise<User> {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error("Authentication required");
  }
  return user;
}
