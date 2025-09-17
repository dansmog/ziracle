"use client";

import Congratulations from "@/components/common/invitePageComponent/Congratulations";
import InviteFriends from "@/components/common/invitePageComponent/InviteBox";
import ProfileHead from "@/components/common/invitePageComponent/ProfileHead";
import Ranking from "@/components/common/invitePageComponent/Ranking";
import ReferralCircle from "@/components/common/invitePageComponent/ReferralCircle";
import ReferralSteps from "@/components/common/invitePageComponent/ReferralSteps";
import ThemeLayout from "@/components/common/layouts/ThemeLayout";
import ThanksHeader from "@/components/common/ThanksHeader";

import Image from "next/image";
import { useParams } from "next/navigation";

import positionTrophy from "@/images/positionTrophy.svg";
import network from "@/images/invite_dark.svg";
import directInvites from "@/images/directInvites.svg";
import joinedIcon from "@/images/joinedIcon.svg";
import { useEffect, useState } from "react";
import { fetchUserByReferralCode } from "@/utils/httpHelper";
import dayjs from "dayjs";
import { getLocalPartFromEmail } from "@/utils";

export interface UserData {
  id: number;
  created_at: string;
  email: string;
  first_name: string | null;
  last_name: string | null;
  referral_code: string;
  referred_by: number | null;
  circle?: {
    inner_circle: number;
    mid_circle: number;
    outer_circle: number;
  };
  ranking?: {
    rank: number;
    total_users: number;
    total_network: number;
  };
  total_network: number;
  direct_invites: number;
  direct_referrals: number;
}

export default function ThankYouPage() {
  const [user, setUser] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const params = useParams();

  const referralId = params.referralCode as string;

  useEffect(() => {
    if (!referralId) {
      return;
    }

    const fetchData = async () => {
      try {
        setIsLoading(true);
        const user = await fetchUserByReferralCode(referralId);
        const userData = user?.data?.data;
        setIsLoading(false);
        setUser((userData || null) as UserData | null);
      } catch (error) {
        setIsLoading(false);
        setError(true);
        console.error("Failed to fetch user:", error);
      }
    };

    fetchData();
  }, []);

  if (isLoading)
    return (
      <div className="w-full flex flex-col h-screen justify-center items-center gap-1">
        <h1 className="font-z-openSauceSans text-2xl md:text3xl tracking-tighter text-z-navyblue">
          Please wait, fetching your data...
        </h1>
        <p className="font-z-epilogue text-lg md:text-2xl tracking-tighter text-z-navyblue">
          Do you know that with ziracle, you can enjoy lots of benefits?
        </p>
      </div>
    );

  const formattedDate = dayjs(user?.created_at).format("MMM D");

  return (
    <section className="w-full">
      <ThemeLayout>
        <ThanksHeader />
        <section className="pt-6 pb-8 md:pt-14 md:pb-14">
          <h1 className="text-2xl md:text-[40px] tracking-tighter font-medium font-z-inter text-z-navyblue">
            Invite
          </h1>
        </section>
        <section className="flex flex-col gap-6 mb-14">
          <ProfileHead
            name={getLocalPartFromEmail(user?.email ?? "")}
            email={user?.email ?? ""}
          />
          <Congratulations />
          <ReferralSteps />
          <InviteFriends code={user?.referral_code ?? ""} />
          <section className="grid grid-cols-2 md:grid-cols-4 gap-[20.33px] ">
            <div className="bg-[#F97100] rounded-xl flex item-center py-[22.5px] px-4 md:px-6 gap-3">
              <div className="w-10 h-10 md:w-[47px] md:h-[47px] shrink-0 rounded-full  bg-[#1F0E5B] flex justify-center items-center">
                <Image src={positionTrophy} alt="waitlist position" />
              </div>
              <div className="flex flex-col">
                <h6 className="font-z-epilogue text-xs md:text-sm text-[#FCFAF6] font-normal tracking-tighter">
                  Ranking
                </h6>
                <span className="font-z-inter text-2xl md:text-3xl font-bold text-[#FCFAF6] tracking-tighter">
                  {user?.ranking?.rank}
                </span>
              </div>
            </div>

            <div className="bg-[#6A40D5] rounded-xl flex item-center py-[22.5px] px-4 md:px-6 gap-3">
              <div className="w-10 h-10 md:w-[47px] md:h-[47px] shrink-0 rounded-full  bg-white flex justify-center items-center">
                <Image src={network} alt="waitlist position" />
              </div>
              <div className="flex flex-col">
                <h6 className="font-z-epilogue text-xs md:text-sm text-[#FCFAF6] font-normal tracking-tighter">
                  Total Network
                </h6>
                <span className="font-z-inter text-2xl md:text-3xl font-bold text-[#FCFAF6] tracking-tighter">
                  {user?.total_network}
                </span>
              </div>
            </div>

            <div className="bg-[#6A40D5] rounded-xl flex item-center py-[22.5px] px-4 md:px-6 gap-3">
              <div className="w-10 h-10 md:w-[47px] md:h-[47px] shrink-0 rounded-full  bg-white flex justify-center items-center">
                <Image src={directInvites} alt="waitlist position" />
              </div>
              <div className="flex flex-col">
                <h6 className="font-z-epilogue text-xs md:text-sm text-[#FCFAF6] font-normal tracking-tighter">
                  Direct invites
                </h6>
                <span className="font-z-inter text-2xl md:text-3xl font-bold text-[#FCFAF6] tracking-tighter">
                  {user?.direct_invites}
                </span>
              </div>
            </div>

            <div className="bg-[#6A40D5] rounded-xl flex item-center py-[22.5px] px-4 md:px-6 gap-3">
              <div className="w-10 h-10 md:w-[47px] md:h-[47px] shrink-0 rounded-full  bg-white flex justify-center items-center">
                <Image src={joinedIcon} alt="waitlist position" />
              </div>
              <div className="flex flex-col">
                <h6 className="font-z-epilogue text-xs md:text-sm text-[#FCFAF6] font-normal tracking-tighter">
                  Joined
                </h6>
                <span className="font-z-inter text-2xl md:text-3xl font-bold text-[#FCFAF6] tracking-tighter">
                  {formattedDate}
                </span>
              </div>
            </div>
          </section>
          {user && user.circle ? (
            <ReferralCircle circle={user.circle} />
          ) : (
            <p>Loading your referral data...</p>
          )}
        </section>

        <Ranking rank={user?.ranking?.rank} />
      </ThemeLayout>
    </section>
  );
}
