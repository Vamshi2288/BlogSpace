import { atom } from "jotai";
import { MakeBlog } from "../pages/Createblog";
const Createnewblog = atom<MakeBlog>({
  title: "",
  content: "",
});
export default Createnewblog;
