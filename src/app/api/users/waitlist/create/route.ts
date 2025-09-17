import { NextResponse } from "next/server";
import { createContact } from "@/lib/emails/brevo";
import {
  createWaitlistUser,
  getUserByEmail,
  getUserByReferralCode,
} from "@/lib/supabase/queries";
import { generateReferralCode } from "@/utils/generateReferralCode";
import { buildReferralCircles } from "@/lib/referral/circleBuilder";

export async function POST(request: Request) {
  try {
    const { email, referral_code } = await request.json();

    if (!email) {
      return NextResponse.json(
        { success: false, message: "Email is required." },
        { status: 400 }
      );
    }

    const existingUser = await getUserByEmail(email);

    if (existingUser.success && existingUser.data) {
      return NextResponse.json(
        {
          success: false,
          message: "Your email already exist",
          data: existingUser,
          isRedirect: true,
        },
        { status: 200 }
      );
    }

    //validate referral code if provided
    let referrer = null;
    if (referral_code) {
      const referrerResult = await getUserByReferralCode(referral_code);
      if (!referrerResult.success) {
        return NextResponse.json(
          { success: false, message: "Invalid referral code" },
          { status: 400 }
        );
      }

      referrer = referrerResult.data;
    }

    //logic for creating contact happens here
    const brevoResponse = await createContact(email, [5]);
    //logic for waitlist happens here
    if (brevoResponse?.id) {
      const referral_code = generateReferralCode();
      const payload = {
        email,
        referral_code,
        referred_by: referrer?.id || null,
      };

      const waitlistResponse = await createWaitlistUser(payload);

      if (waitlistResponse.success && referrer) {
        await buildReferralCircles(waitlistResponse.data.id, referrer.id);
      }

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
    console.log("error", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error." },
      { status: 500 }
    );
  }
}
