"use client";
import { useForm } from "react-hook-form";
import Image from "next/image";

import Header from "@/components/common/Header";
import AppButton from "@/components/ui/AppButton";
import AppInput from "@/components/ui/AppInput";
import { featuresData } from "@/utils";
import ThemeLayout from "@/components/common/layouts/ThemeLayout";

import WaitlistUser from "@/images/waitlistUsers.png";

export default function Home() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
  });

  const onSubmit = () => {
    return;
  };

  return (
    <section className="w-full">
      <Header />
      <section className="flex flex-col justify-center items-center px-4 mx:px-0 max-w-[750px] mx-auto mt-20 md:mt-32">
        <h1 className="text-3xl md:text-[56px] text-z-navyblue tracking-tighter font-z-openSauceSans text-center leading-[110%]">
          From Discovery to Discounts. Full-Circle Value
        </h1>
        <p className="max-w-[450px] mx-auto mt-4 font-z-epilogue text-base text-center tracking-tight">
          Edinburgh’s student discovery hub, where discovering places and
          inviting friends gives free lunches.
        </p>

        <div className="mt-6 w-full md:max-w-[440px] flex flex-col md:flex-row items-center gap-2 mx-auto">
          <div className="w-full md:max-w-[245px]">
            <AppInput
              type="email"
              placeholder="Jessica@email.com"
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
              fullWidth
              onClick={handleSubmit(onSubmit)}
            />
          </div>
        </div>
        <SocialProof />
      </section>
      <ThemeLayout>
        <div className="grid grid-cols-1 gap-0 md:grid-cols-3 md:gap-10 pt-16">
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
    </section>
  );
}

const SocialProof = () => {
  return (
    <div className="flex items-center gap-1 mt-6">
      <Image src={WaitlistUser} height={24} width={48} alt="waitlist users" />
      <span className="text-xs font-z-epilogue text-z-navyblue font-normal">
        20k+ people already on the waitlist
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

      <p className="text-z-navyblue whitespace-nowrap md:whitespace-normal lg:whitespace-nowrap xl:whitespace-nowrap tracking-tight font-z-epilogue font-normal text-sm leading-relaxed">
        {body}
      </p>
    </div>
  );
};
