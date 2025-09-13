/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState } from "react";
import type { ChangeEvent } from "react";
import { cva } from "class-variance-authority";
import type { FieldErrors } from "react-hook-form";
import { EyeOpenIcon, EyeCloseIcon } from "@/icons";

interface IAppInput {
  type: string;
  placeholder: string;
  name: string;
  label?: string;
  errors?: FieldErrors;
  register?: any;
  maxLength?: number;
  noLabel?: boolean;
  height?: string;
  value?: string;
  disabled?: boolean;
  required?: boolean;
  leftIcon?: any;
  intent?: "primary" | "ghost" | "danger" | "disabled";
  size?: "large" | "small";
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void | any;
  onKeyPress?: any;
}

const input = cva(
  [
    "font-z-inter text-base text-z-blackcharcoal placeholder:text-z-blackcharcoal border-[.5px] outline:none rounded-xl focus:outline-none transition-all durations-[600ms] ease-in-out",
  ],
  {
    variants: {
      intent: {
        primary: [
          "border-z-light-grey-4",
          "bg-z-white-grey-2 font-regular",
        ],
        ghost: ["bg-transparent text-typography-900"],
        disabled: "bg-grey-50 border-[1px] border-grey-300",
        danger: [
          "border-error-500",
          "text-sm 0 focus:ring-primary-white bg-white",
        ],
      },
      size: {
        large: ["h-10 px-3"],
        small: ["py-2"],
      },
      hasLeftIcon: {
        true: "pl-12",
        false: "pl-4",
      },
    },

    defaultVariants: {
      size: "large",
      hasLeftIcon: false,
    },
  }
);

/**
 * AppInput component with support for left icons
 */
const AppInput = React.forwardRef(
  (
    {
      type,
      placeholder,
      name,
      size,
      label,
      errors,
      register,
      onChange,
      maxLength,
      height,
      value,
      disabled,
      intent,
      required,
      onKeyPress,
      leftIcon,
    }: IAppInput,
    ref
  ) => {
    const { ref: formRef, ...rest } = register(name);
    const [visible, setVisible] = useState(false);

    const toggleVisibility = () => {
      setVisible(!visible);
    };

    return (
      <div className="flex flex-col w-full relative">
        <div className="text-sm mb-1 font-gt-medium flex gap-1 items-center">
          {label?.length && (
            <label htmlFor={name} className="text-grey-700">
              {label} {required ? <span className="text-main">*</span> : null}
            </label>
          )}
        </div>

        <input
          type={type === "password" && visible ? "text" : type}
          placeholder={placeholder}
          name={name}
          id={name}
          value={value}
          ref={ref || formRef}
          {...rest}
          min={1}
          onKeyDown={onKeyPress}
          max={maxLength}
          maxLength={maxLength}
          onChange={(e) => {
            rest.onChange(e);
            if (onChange) onChange(e);
          }}
          disabled={disabled}
          autoComplete="off"
          aria-autocomplete="none"
          className={`${input({
            intent: errors?.[name] ? "danger" : intent ? intent : "primary",
            size: size ? size : "large",
            hasLeftIcon: !!leftIcon, // Convert to boolean
          })} pr-4`} // Add right padding separately
          style={{ height: height }}
        />

        {type === "password" && (
          <span
            className="absolute top-[40px] right-4 cursor-pointer uppercase text-xs font-medium text-additional-50"
            onClick={toggleVisibility}
          >
            {visible ? <EyeOpenIcon /> : <EyeCloseIcon />}
          </span>
        )}

        {leftIcon && (
          <span className="absolute  left-3 top-12 transform -translate-y-1/2">
            {leftIcon}
          </span>
        )}

        {errors?.[name] && (
          <span className="text-xs text-error-500 font-gt-regular pt-[1px]">
            {(errors[name] as { message?: string })?.message}
          </span>
        )}
      </div>
    );
  }
);

export default AppInput;
