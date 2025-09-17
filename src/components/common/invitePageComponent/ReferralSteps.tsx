import Image from "next/image";
import waveSeparator from "@/images/seperator.svg";
import shareIcon from "@/images/share.svg";
import profileIcon from "@/images/invite_dark.svg";
import pointsIcon from "@/images/rewards.svg";

const steps = [
  {
    icon: shareIcon,
    text: "Share your link",
    alt: "Share icon",
    classname: "w-[18px] h-4 md:w-[36px] md:h-[31px] relative",
  },
  {
    icon: profileIcon,
    text: "Friends sign up",
    alt: "Friends sign up icon",
    classname: "w-[18px] h-[11px] md:w-[42px] md:h-[27px] relative",
  },
  {
    icon: pointsIcon,
    text: "You both earn points ongoing",
    alt: "Points icon",
    classname: "w-[18px] h-[18px] md:w-[35px] md:h-[35px] relative",
  },
];

export default function ReferralSteps() {
  return (
    <div className="flex items-center justify-center gap-4 md:py-8 px-4 text-white">
      {steps.map((step, index) => (
        <div className="flex items-center" key={index}>
          {/* Step content */}
          <div
            key={index}
            className="flex flex-col items-center gap-1 md:gap-4 md:min-w-[250px]"
          >
            <div className={step.classname}>
              <Image
                src={step.icon}
                alt={step.alt}
                layout="fill"
                objectFit="contain"
              />
            </div>
            <p className="text-center text-[8px] md:text-base whitespace-wrap md:whitespace-normal font-z-inter text-z-navyblue">
              {step.text}
            </p>
          </div>

          {/* Separator icon - don't render after the last step */}
          {index < steps.length - 1 && (
            <div className="w-[42px] h-[36px] md:w-[121px] md:h-[101px]">
              <Image
                src={waveSeparator}
                alt="separator"
                layout="responsive"
                width={100}
                height={50}
                key={index}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
