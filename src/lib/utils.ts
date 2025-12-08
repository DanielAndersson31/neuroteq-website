import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { Snippet } from "svelte";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export type WithoutChild<T> = T extends { child?: Snippet }
	? Omit<T, "child">
	: T;

export type WithoutChildrenOrChild<T> = T extends { children?: Snippet; child?: Snippet }
	? Omit<T, "children" | "child">
	: T;
