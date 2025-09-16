import { createClient } from "@/utils/supabase/server";

export async function getUserByEmail(email: string) {
  const supabase = await createClient();
  try {
    const { data, error } = await supabase
      .from("users")
      .select("email, referrer_code")
      .eq("email", email);

    if (error) {
      return { success: false, message: error.message };
    }

    return { success: true, data };
  } catch (err) {
    console.error("An unexpected error occurred:", err);
    return { success: false, message: "An unexpected error occurred." };
  }
}

export async function createWaitlistUser(userData: {
  email: string;
  referral_code: string;
}) {
  const supabase = await createClient();
  try {
    const { data, error } = await supabase
      .from("users")
      .insert([userData])
      .select();
    if (error) {
      console.error("Supabase insert error:", error.message);
      return { success: false, message: error.message };
    }

    return { success: true, data: data };
  } catch (error) {
    console.error("An unexpected error occurred:", error);
    return { success: false, message: "An unexpected error occurred." };
  }
}
