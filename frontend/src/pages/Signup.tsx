import Auth from "../components/auth";
import Quote from "../components/qoute";

export const Signup = () => {
  return (
    <div className="w-full min-h-screen grid grid-cols-1 lg:grid-cols-2">
      <div className="flex justify-center items-center bg-black text-white">
        <div className="p-8 rounded-lg w-full max-w-md">
          <Auth type="signup" />
        </div>
      </div>

      <div className="hidden lg:block">
        <Quote />
      </div>
    </div>
  );
};
