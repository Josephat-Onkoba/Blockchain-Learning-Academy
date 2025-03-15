import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
  asChild?: boolean;
  href?: string;
}

const Button = ({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  href,
  children,
  ...props
}: ButtonProps) => {
  const baseClasses = "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";
  
  const variants = {
    default: "bg-blue-700 text-white hover:bg-blue-800",
    destructive: "bg-red-600 text-white hover:bg-red-700",
    outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
    secondary: "bg-secondary-600 text-white hover:bg-secondary-700",
    ghost: "hover:bg-accent hover:text-accent-foreground",
    link: "text-blue-600 underline-offset-4 hover:underline",
  };

  const sizes = {
    default: "h-10 py-2 px-4",
    sm: "h-9 px-3 rounded-md",
    lg: "h-11 px-8 rounded-md",
    icon: "h-10 w-10",
  };

  const classes = cn(
    baseClasses,
    variants[variant],
    sizes[size],
    className
  );

  // If asChild is true, or if href is provided, render as Link
  if (asChild || href) {
    return (
      <Link
        href={href || "#"}
        className={classes}
        {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      className={classes}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;