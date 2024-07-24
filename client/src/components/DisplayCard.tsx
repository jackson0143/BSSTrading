import { useState } from "react";

const DisplayCard = ({ name, type, count = 0, onClick }) => {
  const [style, setStyle] = useState({ display: "none" });

  
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

        <button onClick = {onClick} type="button"  style={style} className=" absolute top-2 right-2 focus:outline-none text-white bg-red-500 hover:bg-red-400  font-medium rounded-lg text-sm px-1.5 py-1.5  ">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4">
  <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
</svg>

        </button>
        <img
          src={`./${type}/${name}.png`}
          className="rounded-md my-2"
          width={60}
          height={60}
          alt={name}
        />

        <div className="flex ">
          <div className="text-white text-sm font-semibold">{name}</div>
          <div className="text-green-400 text-sm font-bold pl-2">{count}</div>
        </div>
      </div>
    </div>
  );
};

export default DisplayCard;
