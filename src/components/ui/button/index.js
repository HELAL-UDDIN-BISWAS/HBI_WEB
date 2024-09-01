import React from "react";
import { cva } from "class-variance-authority";

import { cn } from "@/utils/cn";
import { Slot } from "@radix-ui/react-slot";

const buttonVariants = cva(
	"inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none  focus:outline-none",
	{
		variants: {
			variant: {
				disable: "bg-blue-300 text-[#fff] shadow font-semibold",
				default: "bg-primaryColor text-[#fff] shadow font-semibold",
				destructive:
					"bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
				outline:
					"border border-primaryColor text-primaryColor bg-background font-semibold shadow-sm hover:bg-accent hover:text-accent-foreground",

				errorOutline:
					"border border-red-200 text-red-200 bg-background font-semibold shadow-sm hover:bg-accent hover:text-accent-foreground",
				secondary:
					"bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
				ghost: "hover:bg-accent hover:text-accent-foreground",
				link: "text-sm underline-offset-4 text-blue-600 ",
				disableLink: "text-sm underline-offset-4 text-blue-200",
			},
			size: {
				default: "h-[52px] w-full px-4 py-2 rounded-xl text-sm",
				sm: "h-8 rounded-[160px] px-3 text-sm",
				lg: "h-10 rounded-[160px] px-8 text-sm",
				icon: "h-9 w-9",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	}
);

const Button = React.forwardRef(
	(
		{ className, variant, size, asChild = false, disabled = false, ...props },
		ref
	) => {
		const Component = asChild ? Slot : "button";
		return (
			<Component
				className={cn(
					buttonVariants({
						variant: disabled
							? variant == "link"
								? "disableLink"
								: "disable"
							: variant,
						size,
						className,
					})
				)}
				ref={ref}
				disabled={disabled}
				{...props}
			/>
		);
	}
);
Button.displayName = "Button";

export { Button, buttonVariants };
