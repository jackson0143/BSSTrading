import { useState } from "react";
import "./App.css";
import ItemCard from "./components/ItemCard";

function App() {
  const options = [
    "Bee_Cub",
    "Brown_Cub",
    "Doodle_Cub",
    "Gingerbread_Cub",
    "Peppermint_Cub",
    "Robo_Cub",
    "Snow_Cub",
    "Star_Cub",
    "Stick_Cub",
  ];

  const options2 = [
    "Basic_black",
    "Basic_blue",
    "Basic_green",
    "Basic_pink",
    "Basic_red",
    "Basic_white",
    "Wavy_cyan",
    "Wavy_doodle",
    "Wavy_festive",
    "Wavy_purple",
    "Wavy_yellow",
  ];

  return (
    <div className="grid grid-cols-2 p-14 gap-80">
      <div className="bg-[#3c3c3c] border rounded-lg shadow-md border-gray-800 p-4">
        <div className="flex flex-col ">
          <div className="flex justify-center text-white mb-4">YOUR OFFER</div>
          <button className="bg-[#e7892c] hover:bg-[#cf7b27] text-white font-bold py-2 px-6 rounded">
            Add item
          </button>

          <div className = 'flex pt-9 justify-between'>
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl ">
            Cub skins
            
          </h2>
          
          <input className=" border-2 border-gray-300 bg-[#3c3c3c] h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
          type="search" name="search" placeholder="Search"></input>
          </div>

     
          <div className="flex flex-wrap  gap-4 mt-4">
            {options.map((item, index) => (
              <ItemCard type="cubs" title={item} />
            ))}
          </div>

          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl pt-9">
            Hive skins
          </h2>
          <div className="flex flex-wrap   gap-4 mt-4">
            {options2.map((item, index) => (
              <ItemCard type="hive" title={item} />
            ))}
          </div>
        </div>
      </div>









      <div className="bg-[#3c3c3c] border rounded-lg shadow-md border-gray-800 p-4">
        <div className="flex flex-col ">
          <div className="flex justify-center text-white mb-4">YOUR OFFER</div>
          <button className="bg-[#e7892c] hover:bg-[#cf7b27] text-white font-bold py-2 px-6 rounded">
            Add item
          </button>
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl pt-9">
            Cub skins
          </h2>
          <div className="flex flex-wrap  gap-4 mt-4">
            {options.map((item, index) => (
              <ItemCard type="cubs" title={item} />
            ))}
          </div>

          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl pt-9">
            Hive skins
          </h2>
          <div className="flex flex-wrap   gap-4 mt-4">
            {options2.map((item, index) => (
              <ItemCard type="hive" title={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
