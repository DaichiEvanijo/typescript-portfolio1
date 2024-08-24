import { VariantProps, cva } from "class-variance-authority"
import { ComponentProps } from "react"
import { twMerge } from "tailwind-merge"

export const buttonStyles = cva(["transition-colors"], {
  variants: {
    variant: {
      default: ["bg-slate-300", "hover:bg-slate-200", "dark:bg-slate-300", "dark:hover:bg-slate-400", "dark:text-white"],
      // dark: [
      //   "bg-slate-500",
      //   "hover:bg-slate-400",
      //   "dark:bg-slate-300",
      //   "text-white",
      // ],
    },
    size: {
      default: ["rounded-lg", "p-1.5"],
      // icon: [
      //   "rounded-full",
      //   "w-10",
      //   "h-10",
      //   "flex",
      //   "items-center",
      //   "justify-center",
      //   "p-2.5",
      // ],
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
})

type ButtonProps = VariantProps<typeof buttonStyles> & ComponentProps<"button">

export function Button({ variant, size, className, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={twMerge(buttonStyles({ variant, size }), className)}
    />
  )
}
