import Congratulations from "@/components/common/invitePageComponent/Congratulations";
import InviteFriends from "@/components/common/invitePageComponent/InviteBox";
import ProfileHead from "@/components/common/invitePageComponent/ProfileHead";
import Ranking from "@/components/common/invitePageComponent/Ranking";
import ReferralCircle from "@/components/common/invitePageComponent/ReferralCircle";
import ReferralSteps from "@/components/common/invitePageComponent/ReferralSteps";
import ThemeLayout from "@/components/common/layouts/ThemeLayout";
import ThanksHeader from "@/components/common/ThanksHeader";

import Image from "next/image";

import positionTrophy from "@/images/positionTrophy.svg";
import network from "@/images/invite_dark.svg";
import directInvites from "@/images/directInvites.svg";

export default function ThankYouPage() {
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
          <ProfileHead name="Juwon" email="juwonanthony@gmail.com" />
          <Congratulations />
          <ReferralSteps />
          <InviteFriends />
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
                  #7335
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
                  27
                </span>
              </div>
            </div>

            <div className="bg-[#6A40D5] rounded-xl flex item-center py-[22.5px] px-4 md:px-6 gap-3">
              <div className="w-10 h-10 md:w-[47px] md:h-[47px] shrink-0 rounded-full  bg-white flex justify-center items-center">
                <Image src={network} alt="waitlist position" />
              </div>
              <div className="flex flex-col">
                <h6 className="font-z-epilogue text-xs md:text-sm text-[#FCFAF6] font-normal tracking-tighter">
                  Direct invites
                </h6>
                <span className="font-z-inter text-2xl md:text-3xl font-bold text-[#FCFAF6] tracking-tighter">
                  16
                </span>
              </div>
            </div>


            <div className="bg-[#6A40D5] rounded-xl flex item-center py-[22.5px] px-4 md:px-6 gap-3">
              <div className="w-10 h-10 md:w-[47px] md:h-[47px] shrink-0 rounded-full  bg-white flex justify-center items-center">
                <Image src={directInvites} alt="waitlist position" />
              </div>
              <div className="flex flex-col">
                <h6 className="font-z-epilogue text-xs md:text-sm text-[#FCFAF6] font-normal tracking-tighter">
                  Joined
                </h6>
                <span className="font-z-inter text-2xl md:text-3xl font-bold text-[#FCFAF6] tracking-tighter">
                  Sept 10
                </span>
              </div>
            </div>

          </section>
          <ReferralCircle />
        </section>

        <Ranking rank={"23,500"} />
      </ThemeLayout>
    </section>
  );
}
