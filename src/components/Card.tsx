// Tremor Card [v0.0.2]

<<<<<<< HEAD
import React from "react";
import { Slot } from "@radix-ui/react-slot";

import { cx } from "../lib/utils";

interface CardProps extends React.ComponentPropsWithoutRef<"div"> {
  asChild?: boolean;
=======
import React from "react"
import { Slot } from "@radix-ui/react-slot"

import { cx } from "../lib/utils"

interface CardProps extends React.ComponentPropsWithoutRef<"div"> {
  asChild?: boolean
>>>>>>> 54ff285a82f3b75f15404a3b5e71ecebb71f0687
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, asChild, ...props }, forwardedRef) => {
<<<<<<< HEAD
    const Component = asChild ? Slot : "div";
=======
    const Component = asChild ? Slot : "div"
>>>>>>> 54ff285a82f3b75f15404a3b5e71ecebb71f0687
    return (
      <Component
        ref={forwardedRef}
        className={cx(
          // base
          "relative w-full rounded-lg border p-6 text-left shadow-sm",
          // background color
          "bg-white dark:bg-[#090E1A]",
          // border color
          "border-gray-200 dark:border-gray-900",
          className,
        )}
        tremor-id="tremor-raw"
        {...props}
      />
<<<<<<< HEAD
    );
  },
);

Card.displayName = "Card";

export default Card;
=======
    )
  },
)

Card.displayName = "Card"

export { Card, type CardProps }
>>>>>>> 54ff285a82f3b75f15404a3b5e71ecebb71f0687
