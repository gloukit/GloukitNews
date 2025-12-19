import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import {format} from "date-fns"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date:string) {
  return format(new Date(date),"dd / MM / yyyy , EEEE , HH:mm");
}

export async function copyToClipboard(text:string){
  await navigator.clipboard.writeText(text);
}

export function formatTitle(title:string){
  return title.replace(/\s+-\s+.*/, "");
}