import { redirect } from "next/navigation";
import { CreateClient } from "./supabase/server";

export async function getCurrentUser(): Promise<any> {
  const supabase = await CreateClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}

export async function requireAuth(): Promise<any> {
  const user = getCurrentUser();
  if (!user) {
    redirect("/login");
  }
  return user;
}

export async function requireAuthAPI(): Promise<any> {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error("Authentication required");
  }
  return user;
}
