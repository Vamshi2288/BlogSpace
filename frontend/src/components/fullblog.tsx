import { memo } from "react";
import { Avatar, BlogsCardprops } from "./Blogscard";
export const FullBlog = memo(function FullBlog({
  title,
  content,
  authorname,
  published,
}: BlogsCardprops) {
  return (
    <>
      {/* Main Container Below AppBar */}
      <div className="flex w-full h-[calc(100vh-60px)] pt-2 px-10">
        {/* Blog Container - Fixed Below AppBar */}
        <div className="w-[75%] max-w-full bg-white shadow-lg p-6 rounded-lg flex flex-col">
          {/* Blog Header (Fixed) */}
          <div className="pb-4">
            <h2 className="text-3xl font-bold text-gray-900">
              {title.toUpperCase()}
            </h2>
            <p className="text-gray-600 text-sm mt-1">
              Published on {published}
            </p>
            <hr className="my-4 border-gray-300" />
          </div>

          {/* Scrollable Content */}
          <div className="overflow-y-auto flex-1 h-[calc(100vh-150px)] pr-2">
            <div className="text-gray-800 leading-7 font-primary text-lg">
              {content}
            </div>
          </div>
        </div>

        {/* Author Section - Fixed Below AppBar */}
        <div className="w-[25%] ml-8 p-6 bg-gray-100 shadow-md rounded-lg self-start h-fit">
          <h3 className="text-xl font-semibold text-gray-900 py-2">
            About the Author
          </h3>

          {/* Avatar and Name in a Row */}
          <div className="flex items-center gap-3 mt-2">
            <Avatar name={authorname} />
            <p className="text-gray-800 font-primary">
              {authorname.toUpperCase()}
            </p>
          </div>
        </div>
      </div>
    </>
  );
});
