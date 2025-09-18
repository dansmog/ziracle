import { NextResponse } from "next/server";
import { createContact } from "@/lib/emails/brevo";
import {
  createWaitlistUser,
  getUserByEmail,
  // getUserByReferralCode,
} from "@/lib/supabase/queries";
import { generateReferralCode } from "@/utils/generateReferralCode";
// import { buildReferralCircles } from "@/lib/referral/circleBuilder";

export async function POST(request: Request) {
  try {
    //extract referral_code from the request, when we go back to referral code sharing
    const { email } = await request.json();

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
          isRedirect: false, //change this back to true when we go back to referral
        },
        { status: 200 }
      );
    }

    //validate referral code if provided
    //turn this back on when we go back to referral sharing
    // let referrer = null;
    // if (referral_code) {
    //   const referrerResult = await getUserByReferralCode(referral_code);
    //   if (!referrerResult.success) {
    //     return NextResponse.json(
    //       { success: false, message: "Invalid referral code" },
    //       { status: 400 }
    //     );
    //   }

    //   referrer = referrerResult.data;
    // }

    const newReferralCode = generateReferralCode();
    //logic for creating contact happens here
    const brevoResponse = await createContact(email, [5], {
      thankYouUrl: `https://ziracle.com/thank-you/${newReferralCode}/invite`,
      shareUrl: `https://ziracle.com/ref/${newReferralCode}`,
    });
    //logic for waitlist happens heres
    if (brevoResponse?.id) {
      console.log("the res", brevoResponse)
      const payload = {
        email,
        referral_code: newReferralCode,
        referred_by: null,
        // referred_by: referrer?.id || null,
      };

      const waitlistResponse = await createWaitlistUser(payload);

      //turn this back on when we go back to referral code sharing
      // if (waitlistResponse.success && referrer) {
      //   await buildReferralCircles(waitlistResponse.data.id, referrer.id);
      // }

      return NextResponse.json(
        {
          success: true,
          message: "You are now part of Ziracle",
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
