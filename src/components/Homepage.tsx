"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Image from "next/image";
import {
  animate,
  cubicBezier,
  motion,
  useMotionValue,
  useTransform,
} from "motion/react";
import { Toaster, toast } from "sonner";
import { useRouter } from "next/navigation";

import Header from "@/components/common/Header";
import AppButton from "@/components/ui/AppButton";
import AppInput from "@/components/ui/AppInput";
import ThemeLayout from "@/components/common/layouts/ThemeLayout";

import WaitlistUser from "@/images/waitlistUsers.png";

import { FeatureProps } from "@/types";
import { featuresData, isAllowedDomain, WHITELIST } from "@/utils";
import { apiRoutes, createWaitlist } from "@/utils/httpHelper";

export default function HomePage({ code }: { code?: string }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const router = useRouter();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<dataProps>({
    mode: "onSubmit",
  });

  useEffect(() => {
    if (code) {
      window.localStorage.setItem("ziracle_referral_code", code);
    }
  }, [code]);

  const text = "Edinburgh’s invite-only student discovery hub.";
  const letters = text.split(" ");

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const child = {
    hidden: { opacity: 0, y: `1em` },
    visible: {
      opacity: 1,
      y: `0em`,
      transition: {
        duration: 0.8,
        ease: cubicBezier(0.25, 0.1, 0.25, 1),
      },
    },
  };

  type dataProps = {
    email: string;
    referral_code: string | undefined;
  };
  //this would be switch for tanstack-query
  const onSubmit = async (data: dataProps) => {
    console.log({ data, code });
    //check email if it's part of whitelist or accepted email
    if (WHITELIST.includes(data?.email) || isAllowedDomain(data?.email)) {
      try {
        setIsLoading(true);
        const referral_code =
          window.localStorage.getItem("ziracle_referral_code") ?? undefined;

        const result = await createWaitlist(
          apiRoutes.createWaitlist,
          "POST",
          (data = { ...data, referral_code })
        );
        setIsLoading(false);
        toast.success(result?.message);
        console.log({ result });

        const newReferralCode = result?.data?.data?.referral_code;

        if (newReferralCode) {
          router.push(`/thank-you/${newReferralCode}/invite`);
        } else {
          toast.error("Referral code not found in API response.");
          router.push("/");
        }
      } catch (error: unknown) {
        setIsLoading(false);
        setIsError(true);
        if (error instanceof Error) {
          toast.error(error.message);
        } else {
          toast.error("An unknown error occurred.");
        }
      }
    } else {
      toast.error("We are sorry, we are exclusive to students alone");
    }
  };

  console.log({ isError });

  return (
    <section className="w-full min-h-screen flex flex-col">
      <Header />
      <Toaster richColors position="top-center" />
      <section className="flex flex-col justify-center items-center px-4 mx:px-0 max-w-[750px] mx-auto mt-14 md:mt-24">
        <motion.h1
          variants={container}
          initial="hidden"
          animate="visible"
          className="text-3xl space-x-2 md:text-[56px] text-z-navyblue tracking-tighter font-z-openSauceSans text-center leading-[110%]"
        >
          {letters.map((char, i) => (
            <motion.span
              key={i}
              variants={child}
              style={{ display: "inline-block" }}
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </motion.h1>
        <p className="max-w-[450px] mx-auto mt-4 font-z-epilogue text-base text-center tracking-tight">
          Find the best spots. Unlock student discounts. Earn points — and free
          lunches — by inviting friends.
        </p>

        <div className="mt-6 w-full md:max-w-[440px] flex flex-col md:flex-row items-center gap-2 mx-auto">
          <div className="w-full md:max-w-[245px]">
            <AppInput
              type="email"
              placeholder="ac.uk email required"
              register={register}
              errors={errors}
              name="email"
              noLabel={true}
            />
          </div>
          <div className="w-full md:max-w-[147px]">
            <AppButton
              intent="secondary"
              title="Get early access"
              size="small"
              isLoading={isLoading}
              fullWidth
              onClick={handleSubmit(onSubmit)}
            />
          </div>
        </div>
        {/* <SocialProof /> */}
      </section>
      <ThemeLayout>
        <div className="grid grid-cols-1 gap-0 md:grid-cols-3 md:gap-10 pt-10 md:pt-16">
          {featuresData?.map((item) => {
            return (
              <FeatureCard
                key={item?.id}
                img={item?.img}
                title={item?.title}
                body={item?.body}
                width={35}
                height={35}
                imageClassName="h-[35px] w-[35px]"
              />
            );
          })}
        </div>
      </ThemeLayout>

      <footer className="w-full">
        <img src="/Ziracle_Asset_Light.svg" className="w-full object-cover" />
      </footer>
    </section>
  );
}

const SocialProof = () => {
  const count = useMotionValue(0);
  const rounded = useTransform(() => Math.round(count.get()));

  useEffect(() => {
    const controls = animate(count, 20, { duration: 5 });
    return () => controls.stop();
  }, []);
  return (
    <div className="flex items-center gap-1 mt-6">
      <Image src={WaitlistUser} height={24} width={48} alt="waitlist users" />
      <span className="text-xs font-z-epilogue text-z-navyblue font-normal">
        <motion.span>{rounded}</motion.span>k+ people already on the waitlist
      </span>
    </div>
  );
};

const FeatureCard = ({
  img,
  title,
  body,
  className = "",
  imageClassName = "",
  width,
  height,
  imageSize,
}: FeatureProps) => {
  return (
    <div className={`flex flex-col text-center p-6 ${className}`}>
      <div
        className={`mx-auto mb-4 ${imageClassName}`}
        style={{ width: imageSize, height: imageSize }}
      >
        <Image
          src={img}
          alt={title}
          width={width}
          height={height}
          className="w-full h-full object-contain"
        />
      </div>

      <h3 className="text-xl tracking-tighter font-medium font-z-openSauceSans mb-2 text-z-navyblue">
        {title}
      </h3>

      <p className="text-z-navyblue whitespace-wrap md:whitespace-normal lg:whitespace-nowrap xl:whitespace-nowrap tracking-tight font-z-epilogue font-normal text-sm leading-relaxed">
        {body}
      </p>
    </div>
  );
};
