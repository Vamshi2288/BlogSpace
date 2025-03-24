import { atom } from "jotai";
import { blogpost } from "./blogs";

export const singleBlog = atom<blogpost | null>(null);
