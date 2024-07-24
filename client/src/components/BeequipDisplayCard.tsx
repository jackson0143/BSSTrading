import { useState } from "react";

const BeequipDisplayCard = ({ item, onClick }) => {
  const [style, setStyle] = useState({ display: "none" });
  const { name, type, image, main_stat, main_stat_negative, hive_bonus } = item;

  return (
    <div
      className="bg-[#2b2b2b] z-0 rounded-lg p-2  h-auto relative"
      onMouseEnter={() => {
        setStyle({ display: "block" });
      }}
      onMouseLeave={() => {
        setStyle({ display: "none" });
      }}
    >
      <div className="flex flex-col items-center">
        <button
          onClick={onClick}
          type="button"
          style={style}
          className=" absolute top-2 right-2 focus:outline-none text-white bg-red-500 hover:bg-red-400  font-medium rounded-lg text-sm px-1.5 py-1.5  "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-4"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
          </svg>
        </button>
        <img
          src={`./${type}/${image}.png`}
          className="rounded-md my-2"
          width={60}
          height={60}
          alt={name}
        />

        <div className="flex ">
          <div className="text-white text-sm font-semibold">
            {name}
           
          </div>
          
          <div className="text-green-400 text-sm font-bold pl-2">
            
          </div>
          
        </div>
      </div>
      <div>
      {Object.keys(main_stat).map((stat) => (
              <div className="">
                <label className="text-[#c5ffca] text-xl font-extrabold font-outline-main-stat ">

                  {stat} 
                  : {main_stat[stat]}
                  </label>
                 
             
              </div>
            ))}

{Object.keys(main_stat_negative).map((stat) => (
              <div className="">
                <label className="text-[#c5ffca] text-xl font-extrabold font-outline-">

                  {stat} 
                  : {main_stat_negative[stat]}
                  </label>
                 
             
              </div>
            ))}

{Object.keys(hive_bonus).map((stat) => (
              <div className="">
                <label className="text-[#ffec89] text-xl font-extrabold font-outline-hive-bonus ">

                  {stat} 
                  : {hive_bonus[stat]}
                  </label>
                 
             
              </div>
            ))}
      </div>
    </div>
  );
};

export default BeequipDisplayCard;