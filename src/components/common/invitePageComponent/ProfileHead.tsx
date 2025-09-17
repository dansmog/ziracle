import Image from "next/image";

import Badge from "@/images/badge.svg";

export default function ProfileHead({
  email,
  name,
}: {
  email: string | null;
  name: string | null;
}) {
  const userName = name ? name : ""
  return (
    <section className="flex items-center gap-4">
      <span className="w-[96px] uppercase bg-[#F5F5F5] border-[1px] border-[#E5E5E5] font-z-epilogue font-medium text-2xl md:text-4xl h-[96px] rounded-full flex justify-center items-center">
        {userName.charAt(0) + userName.charAt(1)}
      </span>
      <div className="flex flex-col">
        <h1 className="text-[26px] font-z-inter font-medium tracking-tighter">
          {" "}
          Hello, {name}!
        </h1>
        <p className="text-[11px] text-[#6A40D5]">{email}</p>

        <div className="mt-[9px] flex items-center gap-3 w-fit bg-[#F5F5F596] border-[.5px] border-[#e5e5e5] rounded-full px-[16px] py-[3.5px]">
          <div className="w-[26px] h-[26px]">
            <Image src={Badge} alt="badge" />
          </div>
          <span className="font-z-inter text-sm font-normal text-[#1F0E5B]">
            Starter
          </span>
        </div>
      </div>
    </section>
  );
}
