export default function Loader() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="w-12 h-12 border-4 border-gray-300 border-t-amber-500 rounded-full animate-spin"></div>
      <br />
      <p className="text-white font-primary text-2xl ">
        {" "}
        Loading the blogs for you.....
      </p>
    </div>
  );
}
