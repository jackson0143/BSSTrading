import ItemCard from "../components/ItemCard";

import { cubOptions } from "../options/cubOptions";
import { hiveOptions } from "../options/hiveOptions";
import { stickerOptions } from "../options/stickerOptions";
import { voucherOptions } from "../options/voucherOptions";
import { beequipOptions } from "../options/beequipOptions";
import DisplayCard from "../components/DisplayCard";
import { useState } from "react";
import DescriptionDialog from "../components/DescriptionDialog";
import ItemDialog from "../components/ItemDialog";
function Home() {
  const [query, setQuery] = useState("");

  const search = (item) => {
    return query.toLowerCase() === ""
      ? item
      : item.name.split("_").join(" ").toLowerCase().includes(query);
  };

  const [isOpen, setIsOpen] = useState(false);
  const [dataFromDialog, setDataFromDialog] = useState(null);
  const [isOpen2, setIsOpen2] = useState(false);
  const [dataFromDialog2, setDataFromDialog2] = useState(null);
  const [currentBeequip, setCurrentBeequip] = useState();
  const handleBeequip = (item) => {
    setCurrentBeequip(item);
    setIsOpen2(true);
  };

  const [OurInventory, setOurItemQuantities] = useState({
    cub: {},
    voucher: {},
    hive: {},
    sticker: {},
    beequip: {},
  });
  const [TheirInventory, setTheirItemQuantities] = useState({
    cub: {},
    voucher: {},
    hive: {},
    sticker: {},
    beequip: {},
  });

  const resetOurInventory = () => {
    setOurItemQuantities({
      cub: {},
      voucher: {},
      hive: {},
      sticker: {},
      beequip: {},
    });
  };
  const resetTheirInventory = () => {
    setTheirItemQuantities({
      cub: {},
      voucher: {},
      hive: {},
      sticker: {},
      beequip: {},
    });
  };

  /*
  
    const listtoPrint =['Bee_Cub', 'Brown_Cub', 'Doodle_Cub', 'Gingerbread_Cub', 'name_extract.py', 'Noob_Cub', 'Peppermint_Cub', 'Robo_Cub', 'Snow_Cub', 'Star_Cub', 'Stick_Cub']
      const objectString = listtoPrint.map((name, index) => ({
      name: name.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') +" hive",
      image:name,
      type: "cub",
      

      
  
    }))
    console.log(objectString)
    */
    
  const handleOurAddItem = (item) => {
    const {type, name} = item
    const currentQuantity = OurInventory[type][name] || 0;
    const updatedQuantities = {
      ...OurInventory,
      [type]: {
        ...OurInventory[type],
        [name]: currentQuantity + 1,
      },
    };
    setOurItemQuantities(updatedQuantities);
    console.log(OurInventory)
  };

  const handleOurRemoveItem = (item) => {

    const {type, name} = item
    const currentQuantity = OurInventory[type][name] || 0;

    if (currentQuantity > 0) {
      const updatedQuantities = {
        ...OurInventory,
        [type]: {
          ...OurInventory[type],
          [name]: currentQuantity - 1,
        },
      };
      if (updatedQuantities[type][name] === 0) {
        delete updatedQuantities[type][name];
      }
      setOurItemQuantities(updatedQuantities);
    }
  };
  const handleTheirAddItem = (item) => {
    const {type, name} = item
    const currentQuantity = TheirInventory[type][name] || 0;
    const updatedQuantities = {
      ...TheirInventory,
      [type]: {
        ...TheirInventory[type],
        [name]: currentQuantity + 1,
      },
    };
    setTheirItemQuantities(updatedQuantities);
  };

  const handleTheirRemoveItem = (item) => {
    const {type, name} = item
    const currentQuantity = TheirInventory[type][name] || 0;

    if (currentQuantity > 0) {
      const updatedQuantities = {
        ...TheirInventory,
        [type]: {
          ...TheirInventory[type],
          [name]: currentQuantity - 1,
        },
      };

      if (updatedQuantities[type][name] === 0) {
        delete updatedQuantities[type][name];
      }

      setTheirItemQuantities(updatedQuantities);
    }
  };
  
  const getAllItems = (team) => {
    const allItems = [];
    
    Object.keys(team.cub).forEach((name) => {
      allItems.push({ type: "cub", name, count: team.cub[name] });
    });
   

    Object.keys(team.voucher).forEach((name) => {
      allItems.push({
        type: "voucher",
        name,
        count: team.voucher[name],
      });
    });

    Object.keys(team.hive).forEach((name) => {
      allItems.push({ type: "hive", name, count: team.hive[name] });
    });

    Object.keys(team.sticker).forEach((name) => {
      allItems.push({
        type: "sticker",
        name,
        count: team.sticker[name],
      });
    });
    Object.keys(team.beequip).forEach((name) => {
      allItems.push({
        type: "beequip",
        name,
        count: team.beequip[name],
      });
    });
    
    return allItems;
  };

  
  return (
    <div className="grid grid-cols-12 p-14 gap-8">
      <div className="bg-[#3c3c3c] col-span-5  border rounded-lg shadow-md border-gray-800 p-4">
        <div className="flex flex-col">
          <div className="flex justify-center custom text-red-500 mb-4 text-3xl font-bold">
            YOUR OFFER
          </div>

          <div className="flex flex-wrap gap-3 pl-2 py-2 mt-4 bg-[#565656] border rounded-lg ">
            {getAllItems(OurInventory).length === 0 ? (
              <div className="text-white px-4 py-[38px]  text-xxl">
                No items added to the offer
              </div>
            ) : (
              getAllItems(OurInventory).map((item) => (
                <DisplayCard

                  type={item.type}
                  name={item.name}
                  count={item.count}
                  onClick={() => handleOurRemoveItem(item)}
                />
              ))
            )}
          </div>

          {dataFromDialog != null ? (
            <div className=" ml-1 rounded-md pl-4 py-2 mt-4 bg-[#565656] w-3/4">
              NOTE: {dataFromDialog}
            </div>
          ) : null}
          <DescriptionDialog
            open={isOpen}
            setOpen={setIsOpen}
            onSubmit={setDataFromDialog}
          ></DescriptionDialog>

          {/* Cub skins text + search bar */}
          <div className="flex pt-9 justify-between">
            <div className="flex ">
              <h2 className="text-2xl font-bold  tracking-tight text-white flex text-center items-center  pr-3">
                Cub skins
              </h2>
              <button
                type="button"
                onClick={() => setIsOpen(true)}
                className="text-white  bg-gray-800 hover:bg-gray-700 font-medium rounded-lg text-sm px-3 "
              >
                Add description
              </button>
            </div>
            <div className="flex">
              {" "}
              <button
                type="button"
                className="px-4   text-sm font-semibold shadow-lg rounded-lg bg-red-400 text-gray-50 hover:text-gray-200 text-center me-2  "
                onClick={resetOurInventory}
              >
                Clear all
              </button>
              <div className="flex items-center max-w-2xl h-12 rounded-lg focus-within:shadow-lg bg-[#565656] overflow-hidden">
                <div className="grid place-items-center h-full w-10 text-gray-300 bg-[#565656]">
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
                  className="flex peer h-full w-full bg-[#565656] outline-none text-sm text-white-700 pr-2"
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
                item = {item}
                onClick={() => handleOurAddItem(item)}
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
               item = {item}
                onClick={() => handleOurAddItem(item)}
              />
            ))}
          </div>
          {/* Display Beequips */}
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl pt-9">
            Beequips
          </h2>
          <ItemDialog
            beequip={currentBeequip}
            open={isOpen2}
            setOpen={setIsOpen2}
            onSubmit={setDataFromDialog2}
          ></ItemDialog>
          <div className="flex flex-wrap gap-4 mt-4">
            {beequipOptions.filter(search).map((item) => (
              <ItemCard
               item = {item}
                onClick={() => handleBeequip(item)}
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
               item = {item}
                onClick={() => handleOurAddItem(item)}
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
               item = {item}
                onClick={() => handleOurAddItem(item)}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="col-span-2 flex flex-col items-center pt-32">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="size-48"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
          />
        </svg>
        <p className="">TRADE</p>

        <p className="">made by euwunha</p>
      </div>

      <div className="bg-[#3c3c3c] col-span-5 border rounded-lg shadow-md border-gray-800 p-4">
        <div className="flex flex-col">
          <div className="flex justify-center text-green-500 custom mb-4 text-3xl font-bold">
            LOOKING FOR
          </div>

          
          <div className="flex flex-wrap gap-3 pl-2 py-2 mt-4 bg-[#565656] border rounded-lg">
            {getAllItems(TheirInventory).length === 0 ? (
              <div className="text-white px-4 py-[38px] text-xl">
                No items added to the offer
              </div>
            ) : (
              getAllItems(TheirInventory).map((item) => (
                <DisplayCard

                  type={item.type}
                  name={item.name}
                  count={item.count}
                  onClick={() => handleTheirRemoveItem(item)}
                />
              ))
            )}
          </div>
            
          <div className="flex pt-9 justify-between">
            <div className="flex">
              <h2 className="text-2xl font-bold tracking-tight text-white  pr-4">
                Cub skins
              </h2>
            </div>
            <div className="flex">
              {" "}
              <button
                type="button"
                className="px-4  text-sm font-semibold shadow-lg rounded-lg bg-red-400 text-gray-50 hover:text-gray-200 text-center me-2  "
                onClick={resetTheirInventory}
              >
                Clear all
              </button>
              <div className="flex items-center max-w-2xl h-12 rounded-lg focus-within:shadow-lg bg-[#565656] overflow-hidden">
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
               item = {item}
                onClick={() => handleTheirAddItem(item)}
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
               item = {item}
                onClick={() => handleTheirAddItem(item)}
              />
            ))}
          </div>

          {/* Display Beequips */}
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl pt-9">
            Beequips
          </h2>
          <div className="flex flex-wrap gap-4 mt-4">
            {beequipOptions.filter(search).map((item) => (
                            <ItemCard
               item = {item}
                onClick={() => handleTheirAddItem(item)}
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
               item = {item}
                onClick={() => handleTheirAddItem(item)}
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
               item = {item}
                onClick={() => handleTheirAddItem(item)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
