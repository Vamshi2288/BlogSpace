import { useNavigate } from "react-router-dom";
import { Avatar } from "./Blogscard";
import { memo } from "react";
import { Pen } from "./pen";

export const Appbar = memo(function Appbar({ name }: { name: string | null }) {
  const navigate = useNavigate();
  return (
    <nav className="w-full bg-blend-color-burn shadow-md py-1 px-6 flex justify-between items-center">
      {/* Website Name */}
      <div
        className="text-xl   font-primary text-white hover:opacity-70 hover:cursor-pointer"
        onClick={() => navigate("/blogs")}
      >
        BlogSpace
      </div>

      {/* Right Side Items */}
      <div className="flex items-center space-x-6 text-gray-700">
        {name ? <Avatar name={name} /> : null}
        <button
          onClick={() => {
            navigate("/signin");
          }}
          className=" font-primary text-white  px-3 py-1.5 text  hover:text-slate-600 hover:cursor-pointer"
        >
          Logout
        </button>
        <Pen />
      </div>
    </nav>
  );
});
