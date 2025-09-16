import { NextResponse } from "next/server";
import { createContact } from "@/lib/emails/brevo";
import { createWaitlistUser, getUserByEmail } from "@/lib/supabase/queries";
import { ALLOWED_EMAILS_BREVO_LIST_ID } from "@/utils";
import { generateReferralCode } from "@/utils/generateReferralCode";

export async function POST(request: Request) {
  try {
    const { email } = await request.json();
    console.log("the request obect", email);

    if (!email) {
      return NextResponse.json(
        { success: false, message: "Email is required." },
        { status: 400 }
      );
    }

    const user = await getUserByEmail(email);

    if (user.success) {
      console.log({ user });
      return NextResponse.json(
        { success: false, message: "Your email already exist", data: user },
        { status: 409 }
      );
    }

    //logic for creating contact happens here
    const response = await createContact(email, [5]);
    console.log({ response });
    //logic for waitlist happens here
    if (response?.id) {
      const referral_code = generateReferralCode();
      const payload = { email, referral_code };

      const waitlistResponse = await createWaitlistUser(payload);

      return NextResponse.json(
        {
          success: true,
          message: "You are now part of Ziracle, please check your email",
          data: waitlistResponse,
        },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { success: false, message: "Failed to create contact, please try again" },
      { status: 500 }
    );
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error." },
      { status: 500 }
    );
  }
}
