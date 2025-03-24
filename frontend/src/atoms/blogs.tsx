import { atom } from "jotai";
import { MakeBlog } from "../pages/Createblog";
export interface blogpost {
  title: string;
  content: string;
  author: { name: string };
  published: string;
  id: number;
}
const blogstore = atom<blogpost[]>([]);
export default blogstore;
