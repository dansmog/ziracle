"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import Image from "next/image";

import discoverIcon from "@/images/discover.svg";
import inviteIcon from "@/images/invite.svg";
import profileIcon from "@/images/profile.svg";

const list = [
  { section: "discover", label: "Discover", icon: discoverIcon },
  { section: "invite", label: "Invite", icon: inviteIcon },
  { section: "profile", label: "Profile", icon: profileIcon },
];

export default function ThanksHeader() {
  return (
    <header className="mt-[25px] w-full relative md:mt-[103px] flex flex-col md:flex-row justify-between md:items-center">
      <svg
        width="82"
        height="20"
        viewBox="0 0 82 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_32_648)">
          <path
            d="M44.0402 12.1775C44.0582 15.5531 44.0539 19.3842 44.0539 19.3842H41.6162V17.9876C38.132 21.2458 32.1524 20.4768 29.7981 16.1987C27.5805 12.1689 29.4636 7.00194 33.8688 5.41862C39.1286 3.52788 44.017 7.82314 44.0402 12.1783V12.1775ZM36.1087 7.40526C33.0201 7.56625 31.21 10.0256 31.2625 12.514C31.3244 15.4494 33.7785 18.3224 37.6462 17.4798C43.4477 16.2167 42.3995 7.07729 36.1087 7.40526Z"
            fill="#6632CB"
          />
          <path
            d="M57.8793 15.2225C57.2671 16.3015 56.2267 17.1544 54.7279 17.4806C50.8602 18.3224 48.4053 15.4495 48.3442 12.5149C48.2918 10.0264 50.1018 7.56711 53.1904 7.40612C55.4889 7.28624 57.0865 8.43113 57.9068 9.99218L58.0393 9.93053L60.1752 8.94149C59.2887 7.23315 57.9877 6.00263 56.0504 5.37324C50.769 3.6589 45.7869 7.51402 45.8953 12.7144C46.0157 18.4645 52.365 21.7545 57.3703 19.0254C58.4339 18.4457 59.5406 17.2588 60.1305 16.2424L57.8802 15.2234L57.8793 15.2225Z"
            fill="#6632CB"
          />
          <path
            d="M10.8877 5.55917V7.78044C7.64512 9.13598 3.37156 15.4127 3.24688 17.0046H10.8533V19.4006H0C0.365446 15.7715 4.41028 10.0197 7.07245 7.78044H0.0240764V5.55917H10.8877Z"
            fill="#6632CB"
          />
          <path
            d="M64.9152 1.22966V19.4006H62.4448V1.22966C62.4448 0.550608 62.9977 0 63.6796 0C64.3615 0 64.9144 0.550608 64.9144 1.22966H64.9152Z"
            fill="#6632CB"
          />
          <path
            d="M16.5446 6.43166V19.4005H14.0742V6.43166C14.0742 5.7526 14.6271 5.202 15.309 5.202C15.9909 5.202 16.5438 5.7526 16.5438 6.43166H16.5446Z"
            fill="#6632CB"
          />
          <path
            d="M74.4172 17.7007C72.2813 17.7007 70.4815 16.3897 69.7283 14.3611L69.6922 14.2275L81.9978 11.072C81.9746 10.8691 81.8319 10.3938 81.7046 9.98534C80.7544 6.91118 77.6658 4.96307 74.4172 4.96307C70.3345 4.96307 67.0137 8.33437 67.0137 12.4781C67.0137 12.836 67.0403 13.2059 67.0911 13.5476C67.1126 13.7231 67.147 13.9107 67.202 14.1564C67.9741 17.5928 70.9424 20.0581 74.4172 19.993C77.5523 19.934 80.199 18.3198 81.42 15.7303C81.5085 15.5437 81.6014 15.3184 81.6908 15.0804C81.8121 14.7533 81.9127 14.4407 81.9677 14.2669H79.4302C78.6976 16.3238 76.56 17.6998 74.4172 17.6998V17.7007ZM69.4574 11.7528C69.7816 9.21723 71.9192 7.35132 74.4198 7.35132C76.0793 7.35132 77.8756 8.16396 78.8051 9.56746L69.4385 11.9069L69.4574 11.7528Z"
            fill="#6632CB"
          />
          <path
            d="M15.31 2.93886C16.1249 2.93886 16.7856 2.28097 16.7856 1.46943C16.7856 0.657886 16.1249 0 15.31 0C14.4951 0 13.8345 0.657886 13.8345 1.46943C13.8345 2.28097 14.4951 2.93886 15.31 2.93886Z"
            fill="#6632CB"
          />
          <path
            d="M28.2206 5.22084C25.9952 5.36298 24.0021 6.28866 22.5669 7.699V6.42823C22.5669 5.75089 22.0158 5.20114 21.3347 5.20114C20.6537 5.20114 20.1025 5.75004 20.1025 6.42823V19.4005H22.6177V13.0492C22.6177 10.1926 25.0803 7.83858 28.2206 7.5697V5.22084Z"
            fill="#6632CB"
          />
        </g>
        <defs>
          <clipPath id="clip0_32_648">
            <rect width="82" height="20" fill="white" />
          </clipPath>
        </defs>
      </svg>
      <HeaderNavigation />
    </header>
  );
}

const HeaderNavigation = () => {
  const params = useParams();
  const pathname = usePathname();
  const referralId = params.referralCode as string; // dynamic id from URL

  return (
    <div className="gap-4 hidden md:flex">
      {list.map((btn) => {
        const href = `/thank-you/${referralId}/${btn.section}`;
        const isActive = pathname === href;

        return (
          <Link
            key={btn.section}
            href={href}
            className={`flex items-center  gap-2 px-4 py-[3.5px] rounded-full font-medium font-z-inter transition-colors
              ${
                isActive
                  ? "bg-[#1F0E5B] text-[#FDFD80]"
                  : "bg-white text-[#6A40D5] border-[#E5E5E5] border-[1px]"
              }`}
          >
            <Image src={btn.icon} alt={btn.label} width={20} height={20} />
            <span>{btn.label}</span>
          </Link>
        );
      })}
    </div>
  );
};
