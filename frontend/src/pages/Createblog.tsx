import { memo } from "react";
import { Appbar } from "../components/Appbar";
import { useAtom } from "jotai";
import Createnewblog from "../atoms/createBlog";
import axios from "axios";
import { BACKEND_URL } from "../config/config";
export interface MakeBlog {
  title?: string;
  content?: string;
}
export const Createblog = memo(function Createblog() {
  const [newblog, setnewblog] = useAtom(Createnewblog);
  return (
    <>
      {/* Fixed AppBar */}
      <div className="bg-black fixed top-0 left-0 w-full z-50">
        <Appbar name={""} />
      </div>

      <div className="pt-[60px] flex flex-col items-center w-full">
        <input
          type="text"
          placeholder="Enter your title..."
          className="w-[75%] p-3 text-2xl font-semibold border border-gray-300 rounded-lg 
               focus:outline-none focus:ring-2 mt-4"
          onChange={(e) => {
            const title = e.target.value;
            setnewblog((prev) => ({ ...prev, title }));
          }}
        />

        <textarea
          placeholder="Write your blog here..."
          className="w-[75%] min-h-[500px] p-3 border border-gray-300 rounded-lg 
               focus:outline-none focus:ring-2 focus:ring-blue-500 mt-4 resize-none"
          onChange={(e) => {
            const content = e.target.value;
            setnewblog((prev) => ({ ...prev, content }));
          }}
        />

        <button
          onClick={async () => {
            await axios.post(`${BACKEND_URL}/api/v1/blog`, newblog, {
              headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
              },
            });
          }}
          className="mt-6 px-6 py-3 bg-slate-800 text-white text-lg font-semibold rounded-lg 
                     hover:bg-slate-500 hover:cursor-pointer transition-all"
        >
          Post your blog
        </button>
      </div>
    </>
  );
});
