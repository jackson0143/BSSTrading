import { useState } from "react";
import "./App.css";
import ItemCard from "./components/ItemCard";

import { cubOptions } from "./options/cubOptions";
import { hiveOptions } from "./options/hiveOptions";
import { stickerOptions } from "./options/stickerOptions";
import { voucherOptions } from "./options/voucherOptions";
import DisplayCard from "./components/DisplayCard";
function App() {
  const [query, setQuery] = useState("");
  console.log(cubOptions.filter((option) => option.name.includes("b")));

  const search = (item) => {
    return query.toLowerCase() === ""
      ? item
      : item.name.split("_").join(" ").toLowerCase().includes(query);
  };

  const [OurInventory, setOurItemQuantities] = useState({
    cubs: {},
    hive: {},
    vouchers: {},
    stickers: {},
  });

  const resetOurInventory = () => {
    setOurItemQuantities({
      cubs: {},
      hive: {},
      vouchers: {},
      stickers: {},
    });
  };
  const [TheirInventory, setTheirItemQuantities] = useState({
    cubs: {},
    hive: {},
    vouchers: {},
    stickers: {},
  });
  const resetTheirInventory = () => {
    setTheirItemQuantities({
      cubs: {},
      hive: {},
      vouchers: {},
      stickers: {},
    });
  };
  const handleOurAddItem = (item, type) => {
    const currentQuantity = OurInventory[type][item] || 0;
    const updatedQuantities = {
      ...OurInventory,
      [type]: {
        ...OurInventory[type],
        [item]: currentQuantity + 1,
      },
    };
    setOurItemQuantities(updatedQuantities);
  };

  const handleTheirAddItem = (item, type) => {
    const currentQuantity = TheirInventory[type][item] || 0;
    const updatedQuantities = {
      ...TheirInventory,
      [type]: {
        ...TheirInventory[type],
        [item]: currentQuantity + 1,
      },
    };
    setTheirItemQuantities(updatedQuantities);
  };

  const getAllItems = (team) => {
    const allItems = [];

    Object.keys(team.cubs).forEach((item) => {
      allItems.push({ type: "cubs", item, count: team.cubs[item] });
    });

    Object.keys(team.hive).forEach((item) => {
      allItems.push({ type: "hive", item, count: team.hive[item] });
    });

    Object.keys(team.vouchers).forEach((item) => {
      allItems.push({
        type: "vouchers",
        item,
        count: team.vouchers[item],
      });
    });

    Object.keys(team.stickers).forEach((item) => {
      allItems.push({
        type: "stickers",
        item,
        count: team.stickers[item],
      });
    });
    return allItems;
  };

  return (
    <div className="grid grid-cols-2 p-14 gap-80">
      <div className="bg-[#3c3c3c] border rounded-lg shadow-md border-gray-800 p-4">
        <div className="flex flex-col">
          <div className="flex justify-center text-white mb-4 text-5xl font-bold">
            YOUR OFFER
          </div>

          <div className="flex flex-wrap gap-3 pl-2 py-2 mt-4 bg-[#565656] border rounded-lg ">
            {getAllItems(OurInventory).length === 0 ? (
              <div className="text-white px-4 py-[38px]  text-3xl">
                No items added to the offer
              </div>
            ) : (
              getAllItems(OurInventory).map((item) => (
                <DisplayCard
                  type={item.type}
                  title={item.item}
                  count={item.count}
                />
              ))
            )}
          </div>
          {/* Cub skins text + search bar */}
          <div className="flex pt-9 justify-between">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Cub skins
            </h2>
            <div className="flex">
              {" "}
              <button
                type="button"
                className="text-red-600 hover:text-white border border-red-600 hover:bg-red-700 font-medium rounded-lg text-sm px-3   text-center me-2  "
                onClick={resetOurInventory}
              >
                Clear all
              </button>
              <div className="flex items-center w-80 h-12 rounded-lg focus-within:shadow-lg bg-[#565656] overflow-hidden">
                <div className="grid place-items-center h-full w-12 text-gray-300 bg-[#565656]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>

                <input
                  className="peer h-full w-full bg-[#565656] outline-none text-sm text-white-700 pr-2"
                  type="text"
                  id="search"
                  placeholder="Search something.."
                  onChange={(e) => setQuery(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 mt-4">
            {cubOptions.filter(search).map((item) => (
              <ItemCard
                type={item.type}
                title={item.name}
                onClick={() => handleOurAddItem(item.name, item.type)}
              />
            ))}
          </div>

          {/* Display Vouchers */}
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl pt-9">
            Vouchers
          </h2>
          <div className="flex flex-wrap gap-4 mt-4">
            {voucherOptions.filter(search).map((item) => (
              <ItemCard
                type={item.type}
                title={item.name}
                onClick={() => handleOurAddItem(item.name, item.type)}
              />
            ))}
          </div>

          {/* Display Hive skins */}
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl pt-9">
            Hive skins
          </h2>
          <div className="flex flex-wrap gap-4 mt-4">
            {hiveOptions.filter(search).map((item) => (
              <ItemCard
                type={item.type}
                title={item.name}
                onClick={() => handleOurAddItem(item.name, item.type)}
              />
            ))}
          </div>

          {/* Display Stickers */}
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl pt-9">
            Stickers
          </h2>
          <div className="flex flex-wrap gap-4 mt-4">
            {stickerOptions.filter(search).map((item) => (
              <ItemCard
                type={item.type}
                title={item.name}
                onClick={() => handleOurAddItem(item.name, item.type)}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="bg-[#3c3c3c] border rounded-lg shadow-md border-gray-800 p-4">
        <div className="flex flex-col">
          <div className="flex justify-center text-white mb-4 text-5xl font-bold">
            LOOKING FOR
          </div>
          <div className="flex flex-wrap gap-3 pl-2 py-2 mt-4 bg-[#565656] border rounded-lg">
            {getAllItems(TheirInventory).length === 0 ? (
              <div className="text-white px-4 py-[38px] text-3xl">
                No items added to the offer
              </div>
            ) : (
              getAllItems(TheirInventory).map((item) => (
                <DisplayCard
                  type={item.type}
                  title={item.item}
                  count={item.count}
                />
              ))
            )}
          </div>
          <div className="flex pt-9 justify-between">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Cub skins
            </h2>
            <div className="flex">
              {" "}
              <button
                type="button"
                className="text-red-600 hover:text-white border border-red-600 hover:bg-red-700 font-medium rounded-lg text-sm px-3   text-center me-2  "
                onClick={resetTheirInventory}
              >
                Clear all
              </button>
              <div className="flex items-center w-80 h-12 rounded-lg focus-within:shadow-lg bg-[#565656] overflow-hidden">
                <div className="grid place-items-center h-full w-12 text-gray-300 bg-[#565656]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>

                <input
                  className="peer h-full w-full bg-[#565656] outline-none text-sm text-white-700 pr-2"
                  type="text"
                  id="search"
                  placeholder="Search something.."
                  onChange={(e) => setQuery(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 mt-4">
            {cubOptions.filter(search).map((item) => (
              <ItemCard
                type={item.type}
                title={item.name}
                onClick={() => handleTheirAddItem(item.name, item.type)}
              />
            ))}
          </div>

          {/* Display Vouchers */}
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl pt-9">
            Vouchers
          </h2>
          <div className="flex flex-wrap gap-4 mt-4">
            {voucherOptions.filter(search).map((item) => (
              <ItemCard
                type={item.type}
                title={item.name}
                onClick={() => handleTheirAddItem(item.name, item.type)}
              />
            ))}
          </div>

          {/* Display Hive skins */}
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl pt-9">
            Hive skins
          </h2>
          <div className="flex flex-wrap gap-4 mt-4">
            {hiveOptions.filter(search).map((item) => (
              <ItemCard
                type={item.type}
                title={item.name}
                onClick={() => handleTheirAddItem(item.name, item.type)}
              />
            ))}
          </div>

          {/* Display Stickers */}
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl pt-9">
            Stickers
          </h2>
          <div className="flex flex-wrap gap-4 mt-4">
            {stickerOptions.filter(search).map((item) => (
              <ItemCard
                type={item.type}
                title={item.name}
                onClick={() => handleTheirAddItem(item.name, item.type)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
