import { useNavigate } from "react-router-dom";
import { Appbar } from "./Appbar";
import { memo } from "react";

export interface BlogsCardprops {
  title: string;
  content: string;
  published: string;
  authorname: string;
  id?: number;
  type?: "Allblogs" | "Blog";
}

export const Blogscard = memo(function Blogscard({
  title,
  content,
  published,
  authorname,
  id,
  type,
}: BlogsCardprops) {
  const navigate = useNavigate();
  return (
    <div className="bg-white flex pt-3 flex-col items-center w-full ">
      <div className="w-full fixed mb-20 pb-0 top-0 left-0 align-middle bg-black shadow-md ">
        <Appbar name={authorname} />
      </div>

      <div
        onClick={() => {
          navigate(`/blog/${id}`);
        }}
        className="w-full  max-w-2xl mt-11 border-2 rounded-full border-amber-50 space-y-2 bg-black hover:cursor-pointer hover:shadow-2xl  transition-all duration- 
  transform  hover:scale-3d hover:-translate-y-0.5 "
      >
        <div className="bg-black shadow-md rounded p-4 border-b border-gray-700">
          <div className="flex items-center align-middle space-x-2">
            <Avatar name={authorname} />
            <div>
              <p className="text-white font-primary">{authorname}</p>
              <p className="text-gray-400 font-light text-xs ">
                Published on • {published}
              </p>
            </div>
          </div>

          <h2 className="text-lg font-primary text-white mt-2 mb-1">{title}</h2>

          <p className="text-gray-300 font-primary text-sm leading-snug">
            {type === "Allblogs"
              ? content.length > 200
                ? content.slice(0, 200) + " ..."
                : content
              : content}
          </p>

          <p className="text-gray-500 font-primary text-xs mt-1">{`${Math.ceil(
            content.length / 100
          )} min read`}</p>
        </div>
      </div>
    </div>
  );
});

export const Avatar = memo(function Avatar({ name }: { name: string }) {
  const displayName = name && name.trim() ? name : "U";
  return (
    <div>
      <div className="relative inline-flex items-center justify-center w-10 h-10 bg-white rounded-full">
        <span className="font-primary text-black">
          {displayName.charAt(0).toUpperCase()}
          {displayName.charAt(1) ? displayName.charAt(1).toUpperCase() : ""}
        </span>
      </div>
    </div>
  );
});
