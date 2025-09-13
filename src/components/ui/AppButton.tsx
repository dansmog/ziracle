import { type VariantProps, cva } from "class-variance-authority";
import Spinner from "../common/Spinner";

const button = cva(
  [
    "flex items-center cursor-pointer justify-center rounded-full font-z-epilogue text-base",
    "transition outline-none disabled:cursor-not-allowed transition-all duration-500 ease-in-out",
  ],
  {
    variants: {
      intent: {
        primary: "text-white bg-z-purple hover:bg-main-hover",
        secondary: "bg-z-orange text-white",
        transparent: "bg-white hover:bg-grey-100 text-grey-700",
        delete: "bg-error-50 text-error-600",
      },
      size: {
        medium: ["py-3 px-5"],
        large: ["h-[48px] px-4 w-fit"],
        small: ["w-fit text-base h-10 px-4 text-sm whitespace-nowrap"],
      },
    },
    compoundVariants: [{ intent: "primary", size: "large" }],
    defaultVariants: {
      intent: "primary",
      size: "large",
    },
  }
);

type props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  isLoading?: boolean;
  fullWidth?: boolean;
  hasImage?: boolean;
  leftIcon?: React.ReactNode;
};

export interface ButtonProps extends props, VariantProps<typeof button> {}

/**
 * @param {String} intent: any of ["primary", "secondary", "delete", "transparent"]
 * @param {String} size: any of ["small", "medium", "large"]
 * @param {boolean} isLoading: if true, show a loader
 * @returns
 */
export const AppButton: React.FC<ButtonProps> = ({
  intent,
  size,
  isLoading,
  fullWidth,
  leftIcon,
  disabled,
  ...props
}) => (
  <button
    className={`${button({ intent, size })} ${fullWidth ? "w-full" : ""}`}
    {...props}
    disabled={isLoading || disabled}
    style={disabled ? { backgroundColor: "#f5f5f5", color: "#A3A3A3" } : {}}
  >
    {isLoading ? (
      <Spinner color={intent === "primary" ? "#fff" : "#000"} />
    ) : (
      <>
        {leftIcon && <span className="flex items-center">{leftIcon}</span>}
        {props.title}
      </>
    )}
  </button>
);

export default AppButton;
