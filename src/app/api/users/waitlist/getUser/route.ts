import {
  getUserByReferralCodeWithCircles,
} from "@/lib/supabase/queries";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const referral_code = searchParams.get("referral_code");

    if (!referral_code) {
      return NextResponse.json(
        { success: false, message: "Referral code is required." },
        { status: 400 }
      );
    }

    const referrerResult = await getUserByReferralCodeWithCircles(
      referral_code
    );

    if (!referrerResult.success) {
      return NextResponse.json(
        { success: false, message: "Invalid referral code" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Successfully fetched your data",
        data: referrerResult,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Internal Server Error." },
      { status: 500 }
    );
  }
}
