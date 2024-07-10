import { useState } from "react";

const DisplayCard = ({ title, type, count = 0 }) => {
  const [style, setStyle] = useState({ display: "none" });
  const titlesplitted = title
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
  
  return (
    <div
      className="bg-[#2b2b2b] z-0 rounded-lg p-2 w-40 h-auto relative"
      onMouseEnter={() => {
        setStyle({ display: "block" });
      }}
      onMouseLeave={() => {
        setStyle({ display: "none" });
      }}
    >
      <div className="flex flex-col items-center">

        <button type="button"  style={style} className=" absolute top-2 right-2 focus:outline-none text-white bg-red-700 hover:bg-red-800  font-medium rounded-lg text-sm px-1.5 py-1.5  ">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-4">
  <path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14" />
</svg>

        </button>
        <img
          src={`./${type}/${title}.png`}
          className="rounded-md my-2"
          width={60}
          height={60}
          alt={titlesplitted}
        />

        <div className="flex ">
          <div className="text-white text-sm font-semibold">{titlesplitted}</div>
          <div className="text-green-400 text-sm font-bold pl-2">{count}</div>
        </div>
      </div>
    </div>
  );
};

export default DisplayCard;
