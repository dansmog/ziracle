import Image from "next/image";

// Make sure your paths are correct
import inviteIcon from "@/images/gift.svg";
import whatsapp from "@/images/whatsapp.svg";
import mail from "@/images/mail.svg";
import { useState } from "react";
import { toast, Toaster } from "sonner";

export default function InviteFriends({ code }: { code: string }) {
  const [isCopied, setIsCopied] = useState(false);

  const referralLink = `https://ziracle.com/ref/${code}`;

  const emailBody = `Hey,%0A%0AJust joined Ziracle, a new invite-only platform in Edinburgh for students. It helps you discover the best spots, get discounts, and earn points with friends.%0A%0AI’ve got invites — if you want in, grab yours here:%0A%0A${referralLink}%0A%0ACheers,`;

  const mailtoLink = `mailto:?subject=You've been invited to Ziracle&body=${emailBody}`;

  const whatsappCopy = `Hey! Check this out — Ziracle is a new invite-only app in Edinburgh for student deals + points. I've got invites if you want in: ${referralLink}`;

  const encodedMessage = encodeURIComponent(whatsappCopy);

  // The WhatsApp share link
  const whatsappLink = `https://wa.me/?text=${encodedMessage}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(referralLink);
      setIsCopied(true);
      toast.success("ziracle invite link copied successfully");
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    } catch (err) {
      console.error("Failed to copy text:", err);
    }
  };

  return (
    <div className="bg-[#EFEAF6] rounded-3xl p-5 md:p-8 w-full mx-auto">
      <Toaster richColors position="top-center" />
      <div className="flex flex-col w-fill gap-2 text-[#3C326B]">
        <div className="relative flex items-center">
          <div className="w-6 h-6">
            <Image src={inviteIcon} alt="Invite friends icon" />
          </div>
          <h1 className="text-[22px] font-medium font-z-inter text-[#1F0E5B]">
            Invite Friends
          </h1>
        </div>
        <div className="flex flex-col">
          <p className="text-sm font-normal font-z-inter">
            Every friend you invite creates ripples of points. The bigger your
            circle, the more you earn.
          </p>
        </div>
      </div>

      {/* Referral Link & Buttons */}
      <div className="flex items-center gap-2 my-6">
        <div className="bg-white text-sm md:text-base rounded-lg px-3 py-2 w-[300px] md:max-w-[453px] flex-grow text-gray-500 font-mono">
          ziracle.com/ref/{code}
        </div>
        <button
          onClick={handleCopy}
          className="bg-[#6B42DA] text-sm md:text-base whitespace-normal cursor-pointer text-white h-10 rounded-full font-medium font-z-epilogue px-4 w-fit hover:bg-[#5a36b8]"
        >
          {isCopied ? "Copied!" : "Copy link"}
        </button>
      </div>

      {/* Social Share Buttons */}
      <div className="flex gap-4">
        <a
          href={mailtoLink}
          className="flex items-center gap-2 border border-[#6B42DA] text-[#6B42DA] px-6 py-1 rounded-full font-medium font-z-epilogue hover:bg-gray-100"
        >
          <div className="w-[30px] h-[30px] relative">
            <Image src={mail} alt="Mail icon" layout="fill" />
          </div>
          Mail
        </a>
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 bg-[#6B42DA] text-white px-6 py-1 rounded-full font-medium font-z-epilogue hover:bg-[#5a36b8]"
        >
          <div className="w-[30px] h-[30px] relative">
            <Image src={whatsapp} alt="WhatsApp icon" layout="fill" />
          </div>
          WhatsApp
        </a>
      </div>
    </div>
  );
}
