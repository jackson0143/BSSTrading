import { useState } from "react";

const BeequipDisplayCard = ({ item, onClick }) => {
  const [style, setStyle] = useState({ display: "none" });
  const { name, type, image, main_stat, main_stat_negative, hive_bonus } = item;
  console.log(hive_bonus);
  return (
    <div
      className="bg-[#2b2b2b] z-0 rounded-lg p-2 w-[333px]  h-auto relative"
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
          <div className="text-white text-sm font-semibold">{name}</div>

          <div className="text-green-400 text-sm font-bold pl-2"></div>
        </div>
      </div>
      <div>
        {Object.keys(main_stat).map(
          (stat) =>
            main_stat[stat] !== "" && (
              <div className="" key={stat}>
                <label className="text-[#c5ffca] text-xl font-extrabold font-outline-main-stat">
                  {stat[0] === "+" ? (
                    <>
                      {stat[0]}
                      {main_stat[stat]} {stat.slice(1)}
                    </>
                  ) : (
                    <>
                      {"+"}
                      {main_stat[stat]}
                      {stat[0]} {stat.slice(1)}
                    </>
                  )}
                </label>
              </div>
            )
        )}

        {Object.keys(main_stat_negative).map(
          (stat) =>
            main_stat_negative[stat] !== "" && (
              <div className="">
                <label className="text-[#c5ffca] text-xl font-extrabold font-outline-">
                  {stat[0] === "+" ? (
                    <>
                      {stat[0]}
                      {main_stat_negative[stat]} {stat.slice(1)}
                    </>
                  ) : (
                    <>
                      {"+"}
                      {main_stat_negative[stat]}
                      {stat[0]} {stat.slice(1)}
                    </>
                  )}
                </label>
              </div>
            )
        )}

        {Object.keys(hive_bonus).map(
          (stat) =>
            hive_bonus[stat] !== "" && (
              <div className="">
                <label className="text-[#ffec89] text-lg font-extrabold font-outline-hive-bonus  ">
                  {stat[0] === "+" ? (
                    <>[Hive bonus]
                      {stat[0]}
                      {hive_bonus[stat]} {stat.slice(1)}
                    </>
                  ) : (
                    <>
                    [Hive bonus]
                      {"+"}
                      {hive_bonus[stat]}
                      {stat[0]} {stat.slice(1)}
                    </>
                  )}
                </label>
              </div>
            )
        )}
      </div>
    </div>
  );
};

export default BeequipDisplayCard;
