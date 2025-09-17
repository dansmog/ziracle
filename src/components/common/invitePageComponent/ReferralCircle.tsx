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

  console.log({ leaderboard });

  const params = useParams();

  const referralId = params.referralCode as string;

  const leaderboardData = [
    {
      rank: 1,
      name: "Howard Fisher",
      connections: 12,
      score: 12500,
      referral_code: "9kjq817a",
    },
    {
      rank: 2,
      name: "Josh Rashkin",
      connections: 12,
      score: 12000,
      referral_code: "9a0q817a",
    },
    {
      rank: 3,
      name: "Daniel Anthony",
      connections: 12,
      score: 11000,
      referral_code: "9ajq897a",
    },
    {
      rank: 4,
      name: "Blessing Tuna",
      connections: 12,
      score: 8500,
      referral_code: "9ajq817a",
    },
    {
      rank: 5,
      name: "Mark Fish",
      connections: 12,
      score: 7500,
      referral_code: "9ajq8h7a",
    },
    {
      rank: 6,
      name: "Jane Smith",
      connections: 8,
      score: 9800,
      referral_code: "b2k9p7q3",
    },
    {
      rank: 7,
      name: "Alex Johnson",
      connections: 15,
      score: 15100,
      referral_code: "c4r7d2x9",
    },
    {
      rank: 8,
      name: "Emily White",
      connections: 6,
      score: 7500,
      referral_code: "e5s8m1g6",
    },
    {
      rank: 9,
      name: "Chris Brown",
      connections: 20,
      score: 18900,
      referral_code: "f8t2v5j4",
    },
    {
      rank: 10,
      name: "Sarah Davis",
      connections: 10,
      score: 11200,
      referral_code: "g1u6h9c2",
    },
    {
      rank: 11,
      name: "Michael Wilson",
      connections: 4,
      score: 6100,
      referral_code: "h3w9n5l1",
    },
    {
      rank: 12,
      name: "Jessica Moore",
      connections: 18,
      score: 17400,
      referral_code: "i7x2p8k4",
    },
    {
      rank: 13,
      name: "David Taylor",
      connections: 7,
      score: 8300,
      referral_code: "j9y5o2a8",
    },
    {
      rank: 14,
      name: "Olivia Lee",
      connections: 11,
      score: 12000,
      referral_code: "k1z8q6b3",
    },
    {
      rank: 15,
      name: "James Anderson",
      connections: 9,
      score: 10500,
      referral_code: "l2a7s4c9",
    },
    {
      rank: 16,
      name: "Sophie Clark",
      connections: 14,
      score: 13900,
      referral_code: "m4b5t1d7",
    },
    {
      rank: 17,
      name: "Ryan Hall",
      connections: 5,
      score: 7000,
      referral_code: "n6c8u3e5",
    },
    {
      rank: 18,
      name: "Megan Scott",
      connections: 17,
      score: 16800,
      referral_code: "o9d1v4f6",
    },
    {
      rank: 19,
      name: "Daniel Baker",
      connections: 3,
      score: 5500,
      referral_code: "p1e2w7g8",
    },
    {
      rank: 20,
      name: "Lily Adams",
      connections: 13,
      score: 13100,
      referral_code: "q3f4x5h9",
    },
  ];



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
                <span className="text-[#1F0E5B] text-[8px] font-z-inter tracking-tighter">
                  Earn 2x ZAPs
                </span>
              </div>
            </div>

            <div className="flex gap-[4.5px]">
              <span className="w-[14px] h-[14px] bg-[#FDFD80] border-[1px] border-[#E5E5E5] rounded-full"></span>
              <div className="flex flex-col">
                <span className="text-[11px] font-medium font-z-inter tracking-tighter text-[#1F0E5B]">
                  Mid Circle
                </span>
                <span className="text-[#1F0E5B] text-[8px] font-z-inter tracking-tighter">
                  Earn 1.5x ZAPs
                </span>
              </div>
            </div>

            <div className="flex gap-[4.5px]">
              <span className="w-[14px] h-[14px] bg-[#F97100] rounded-full"></span>
              <div className="flex flex-col">
                <span className="text-[11px] font-medium font-z-inter tracking-tighter text-[#1F0E5B]">
                  Outer Circle
                </span>
                <span className="text-[#1F0E5B] text-[8px] font-z-inter tracking-tighter">
                  Earn 1.2x ZAPs
                </span>
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
              {leaderboard?.map((item, index) => {
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
                              layout="fill"
                              objectFit="contain"
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
                      <div className="flex flex-col gap-0 right-align text-right">
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
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
