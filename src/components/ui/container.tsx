import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

// Max-widths in rem so they scale with the user's root font-size preference.
// sm:  40rem =  640px at 16px base
// md:  60rem =  960px at 16px base
// lg:  90rem = 1440px at 16px base
const maxWidths = {
  sm: "max-w-[40rem]",
  md: "max-w-[60rem]",
  lg: "max-w-[90rem]",
} as const;

interface ContainerProps {
  children: ReactNode;
  /** Controls the maximum width of the container. Defaults to "lg". */
  size?: keyof typeof maxWidths;
  className?: string;
}

export default function Container({
  children,
  size = "lg",
  className,
}: ContainerProps) {
  return (
    <div className={cn("mx-auto w-full", maxWidths[size], className)}>
      {children}
    </div>
  );
}
