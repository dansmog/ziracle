"use client";

import { useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";

import lightCircle from "@/images/light_circle.svg";
import darkCircle from "@/images/dark_circle.svg";
import Top20Trophy from "@/images/Top20Trophy.svg";

import Top1 from "@/images/top1.svg";
import Top2 from "@/images/top2.svg";
import Top3 from "@/images/top3.svg";
import { getLocalPartFromEmail } from "@/utils";

const tabs = ["your circle", "top 20"];

const top3 = [Top1, Top2, Top3];

interface circleProps {
  inner_circle: number;
  mid_circle: number;
  outer_circle: number;
}

interface leaderboardProps {
  direct_invites: number;
  email: string;
  first_name?: string;
  last_name?: string;
  total_network: number;
  referral_code?: string;
  rank?: number;
}

export default function ReferralCircle({
  circle,
  leaderboard,
}: {
  circle: circleProps;
  leaderboard: leaderboardProps[];
}) {
  const [activeTab, setActiveTab] = useState(tabs[0]);

  const params = useParams();

  const referralId = params.referralCode as string;

  return (
    <section>
      <div className="flex md:hidden gap-4 mb-6">
        {tabs?.map((tab) => {
          return (
            <span
              className={`${
                activeTab === tab
                  ? "bg-[#1F0E5B] text-[#FDFD80]"
                  : "bg-[#F5F5F5]"
              }  border-[1px] flex items-center gap-[6px] py-[7px] px-4 capitalize cursor-pointer border-[#E5E5E5] rounded-full`}
              key={tab}
              onClick={() => setActiveTab(tab)}
            >
              {activeTab === tab ? (
                <Image src={lightCircle} alt="referral circle" />
              ) : (
                <Image src={darkCircle} alt="referral circle" />
              )}
              {tab}
            </span>
          );
        })}
      </div>
      <div className="section grid grid-cols-1 md:grid-cols-2 gap-6">
        <div
          className={`w-full h-[390px] flex flex-col bg-[#F5F5F5] border-[1px] border-[#E5E5E5] p-[21px] rounded-[20px] overflow-y-scroll
          ${activeTab !== "your circle" ? "hidden md:flex" : ""}`}
        >
          <div className="flex items-center gap-[9px]">
            <Image src={darkCircle} alt="referral circle" />
            <h6 className="font-z-inter font-medium text-[22px]">
              Your Circle
            </h6>
          </div>
          <p className="font-z-inter mt-1 text-sm font-[rgba(31, 14, 91, 0.8)] tracking-tighter">
            Earn bonus ZAPs based on your network depth
          </p>
          <div className="circle mt-[17px] mx-auto relative">
            <div className="bg-[#F97100] w-[209px] h-[209px] rounded-full flex justify-center items-center">
              <div className="bg-[#FDFD80] w-[149px] h-[149px] rounded-full flex justify-center items-center">
                <div className="bg-[#6A40D5] w-[70px] h-[70px] rounded-full">
                  <span className="absolute bottom-[96px] right-0 md:right-[-5px] bg-[#F5F5F596] border-[.5px] border-[#E5E5E5] rounded-full p-1 text-[#1F0E5B] font-z-inter text-[11px] md:text-sm">
                    {circle?.inner_circle} Connections
                  </span>
                </div>
                <span className="absolute bottom-[60px] right-[-20px] md:right-[-40px] bg-[#F5F5F596] border-[.5px] border-[#E5E5E5] rounded-full p-1 text-[#1F0E5B] font-z-inter text-[11px] md:text-sm">
                  {circle?.mid_circle} Connections
                </span>
              </div>
              <span className="absolute bottom-5 right-[-30px] md:right-[-50px] bg-[#F5F5F596] border-[.5px] border-[#E5E5E5] rounded-full p-1 text-[#1F0E5B] font-z-inter text-[11px] md:text-sm">
                {circle?.outer_circle} Connections
              </span>
            </div>
          </div>
          <div className="flex items-center justify-between w-full md:max-w-[320px] mx-auto mt-[36px]">
            <div className="flex gap-[4.5px]">
              <span className="w-[14px] h-[14px] bg-[#6A40D5] rounded-full"></span>
              <div className="flex flex-col">
                <span className="text-[11px] font-medium font-z-inter tracking-tighter text-[#1F0E5B]">
                  Inner Circle
                </span>
                {/* <span className="text-[#1F0E5B] text-[8px] font-z-inter tracking-tighter">
                  Earn 2x ZAPs
                </span> */}
              </div>
            </div>

            <div className="flex gap-[4.5px]">
              <span className="w-[14px] h-[14px] bg-[#FDFD80] border-[1px] border-[#E5E5E5] rounded-full"></span>
              <div className="flex flex-col">
                <span className="text-[11px] font-medium font-z-inter tracking-tighter text-[#1F0E5B]">
                  Mid Circle
                </span>
                {/* <span className="text-[#1F0E5B] text-[8px] font-z-inter tracking-tighter">
                  Earn 1.5x ZAPs
                </span> */}
              </div>
            </div>

            <div className="flex gap-[4.5px]">
              <span className="w-[14px] h-[14px] bg-[#F97100] rounded-full"></span>
              <div className="flex flex-col">
                <span className="text-[11px] font-medium font-z-inter tracking-tighter text-[#1F0E5B]">
                  Outer Circle
                </span>
                {/* <span className="text-[#1F0E5B] text-[8px] font-z-inter tracking-tighter">
                  Earn 1.2x ZAPs
                </span> */}
              </div>
            </div>
          </div>
        </div>

        <div
          className={`w-full h-[390px] pb-2 bg-[#f5f5f5] border-[1px] border-[#E5E5E5] p-[21px] rounded-[20px] overflow-y-scroll
          ${activeTab !== "top 20" ? "hidden md:flex" : ""}`}
        >
          <div className="flex flex-col gap-[26px] w-full pb-5">
            <h1 className="font-z-inter font-bold flex items-center gap-2 text-[22px] text-[#1F0E5B]">
              <Image src={Top20Trophy} alt="Trophy" />
              Top 20
            </h1>

            <div className="">
              {leaderboard && leaderboard.length > 0 ? (
                leaderboard.map((item, index) => {
                  const RankComponent = top3[index];
                  const email = getLocalPartFromEmail(item?.email);
                  const badge = `${email?.charAt(0)}${email?.charAt(1)}`;

                  return (
                    <div
                      className="w-full py-1 flex items-center justify-between border-b-[0.5px] border-[#6A40D5]"
                      key={index}
                    >
                      <div
                        className={`w-full flex items-center justify-between py-1 px-6 ${
                          item?.referral_code === referralId
                            ? "bg-[#C09FFF66] rounded-full"
                            : ""
                        }`}
                      >
                        <div className="flex items-center gap-2 md:gap-4">
                          {index < 3 && RankComponent ? (
                            <div className="w-6 h-6 md:w-[30px] md:h-[30px] relative">
                              <Image
                                src={RankComponent}
                                alt={`Rank ${item.rank} icon`}
                                fill
                                className="object-contain"
                              />
                            </div>
                          ) : (
                            <span className="flex items-center justify-center w-[24px] h-[24px] md:w-[30px] md:h-[30px] rounded-full bg-[#6A40D5] text-sm md:text-base font-z-inter font-bold text-white">
                              {item.rank}
                            </span>
                          )}
                          <div className="flex items-center gap-2">
                            <span className="flex w-[30px] h-[30px] md:w-[42px] uppercase shrink-0 md:h-[42px] text-white font-z-openSauceSans text-sm md:text-xl justify-center items-center rounded-full bg-[#6A40D5]">
                              {badge}
                            </span>
                            <div className="flex flex-col">
                              <h1 className="text-xs font-z-inter">
                                {item?.email}
                              </h1>
                              <span className="text-[#3E3E3E80] text-[10px] font-z-inter">
                                {item?.direct_invites} Connections
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col gap-0 text-right">
                          <h6 className="font-z-inter text-sm font-bold text-[#1F0E5B]">
                            {item?.total_network}
                          </h6>
                          <span className="font-z-inter text-[10px] text-[#3E3E3E80]">
                            Total circle number
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="py-10 flex flex-col items-center justify-center text-center">
                  <h1 className="text-lg text-center font-z-openSauceSans tracking-tighter font-semibold text-[#1F0E5B]">
                    No leaders yet.
                  </h1>
                  <p className="mt-2 text-sm text-center text-gray-600 max-w-sm mx-auto">
                    Be the first to climb the leaderboard and set the pace!{" "}
                    <br /> Share your Ziracle link with friends.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
