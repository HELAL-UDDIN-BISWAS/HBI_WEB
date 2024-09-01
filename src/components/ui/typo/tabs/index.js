'use client';

import * as React from 'react';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import { cn } from '@/utils/cn';

const Tabs = TabsPrimitive.Root;

const TabsList = React.forwardRef((props, ref) => (
	<TabsPrimitive.List
		ref={ref}
		className={cn(
			'inline-flex h-10 items-center justify-center rounded-t-md bg-muted text-muted-foreground',
			props.className
		)}
		{...props}
	/>
));
TabsList.displayName = TabsPrimitive.List.displayName;

const TabsTrigger = React.forwardRef((props, ref) => (
	<TabsPrimitive.Trigger
		ref={ref}
		className={cn(
			'inline-flex items-center justify-center whitespace-nowrap rounded-t-md px-3 py-2.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none !text-[#627AA4] data-[state=active]:underline decoration-2 decoration-primary underline-offset-8 lg:text-lg disabled:opacity-50 data-[state=active]:bg-white data-[state=active]:text-foreground    data-[state=active]:shadow-none',
			props.className
		)}
		{...props}
	/>
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = React.forwardRef((props, ref) => (
	<TabsPrimitive.Content
		ref={ref}
		className={cn(
			' ring-offset-background  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring data-[state=active]:shadow-none rounded-lg  focus-visible:ring-offset-2 ',
			props.className
		)}
		{...props}
	/>
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsList, TabsTrigger, TabsContent };
