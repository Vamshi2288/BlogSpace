export default function Quote() {
  return (
    <div className="bg-slate-300 h-screen flex justify-center items-center text-center flex-col p-8">
      <div className="max-w-[80%]">
        <p className="text-5xl font-primary leading-snug text-center px-8">
          <b>
            "Success is not final, failure is not fatal. It is the courage to
            continue that counts."
          </b>
        </p>
        <p className="text-xl font-black font-primary text-gray-600 mt-4 text-right pr-8">
          — Winston Churchill
        </p>
      </div>
    </div>
  );
}
