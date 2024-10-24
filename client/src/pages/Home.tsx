import ItemCard from "../components/ItemCard";

import { cubOptions } from "../options/cubOptions";
import { hiveOptions } from "../options/hiveOptions";
import { stickerOptions } from "../options/stickerOptions";
import { voucherOptions } from "../options/voucherOptions";
import { beequipOptions } from "../options/beequipOptions";
import { otherOptions } from "../options/otherOptions";
import DisplayCard from "../components/DisplayCard";
import { useState, useEffect } from "react";
import DescriptionDialog from "../components/DescriptionDialog";
import BeequipDisplayCard from "../components/BeequipDisplayCard";
import ItemDialog from "../components/ItemDialog";

import html2canvas from "html2canvas";

function Home() {

  
  const saveToFiles= () => {
    // Create a temporary container
    const container = document.createElement("div");

    document.body.appendChild(container);
    container.className = "grid grid-cols-12";

    // Append the divs to the temporary container
    const leftCol = document.getElementById("leftCol");
    const middleCol = document.getElementById("middleCol");
    const rightCol = document.getElementById("rightCol");
    
    // Cast the cloned nodes to HTMLElement to access the className property
    const middleColCloned = middleCol.cloneNode(true) as HTMLElement;
    const leftColCloned = leftCol.cloneNode(true) as HTMLElement;
    const rightColCloned = rightCol.cloneNode(true) as HTMLElement;
    
    leftColCloned.className = "flex flex-col bg-[#3c3c3c] col-span-5";
    rightColCloned.className = "flex flex-col bg-[#3c3c3c] col-span-5";
    
    container.appendChild(leftColCloned);
    container.appendChild(middleColCloned);
    container.appendChild(rightColCloned);

    // Use html2canvas to capture the container, then create an image element and set its source to the canvas data URL
    
    html2canvas(container).then((canvas) => {
      const img = document.createElement("img");
      img.src = canvas.toDataURL("image/png");

      //add the image to the document or trigger a download
      document.body.appendChild(img);
      // For download:
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = "BeesForTrade.png";
      link.click();

      // Clean up
      document.body.removeChild(container);
    });
    
  };
  const copyToClipBoard = () => {
    // Create a temporary container
    const container = document.createElement("div");

    document.body.appendChild(container);
    container.className = "grid grid-cols-12";

    // Append the divs to the temporary container
    const leftCol = document.getElementById("leftCol");
    const middleCol = document.getElementById("middleCol");
    const rightCol = document.getElementById("rightCol");
    
    // Cast the cloned nodes to HTMLElement to access the className property
    const middleColCloned = middleCol.cloneNode(true) as HTMLElement;
    const leftColCloned = leftCol.cloneNode(true) as HTMLElement;
    const rightColCloned = rightCol.cloneNode(true) as HTMLElement;
    
    leftColCloned.className = "flex flex-col bg-[#3c3c3c] col-span-5";
    rightColCloned.className = "flex flex-col bg-[#3c3c3c] col-span-5";
    
    container.appendChild(leftColCloned);
    container.appendChild(middleColCloned);
    container.appendChild(rightColCloned);
  
    container.appendChild(leftColCloned);
    container.appendChild(middleColCloned);
    container.appendChild(rightColCloned);

    html2canvas(container).then((canvas) => {
      // Convert canvas to Blob
      canvas.toBlob((blob) => {
        // Create a new ClipboardItem
        const clipboardItem = new ClipboardItem({ "image/png": blob });
        
        // Copy the item to the clipboard
        navigator.clipboard.write([clipboardItem]).then(() => {
          alert("Image copied to clipboard!"); 
        }).catch(err => {
          console.error("Failed to copy image: ", err);
        });
  
        // Clean up
        document.body.removeChild(container);
      }, "image/png");
    });
  };

  const [ourQuery, setOurQuery] = useState("");
  const [theirQuery, setTheirQuery] = useState("");

  const search = (item, query) => {
    return query.toLowerCase() === ""
      ? item
      : item.name.split("_").join(" ").toLowerCase().includes(query);
  };
  const [isOpen, setIsOpen] = useState(false);
  const [dataFromDialog, setDataFromDialog] = useState(null);
  const [isOpenOurs, setIsOpenOurs] = useState(false);
  const [isOpenTheirs, setIsOpenTheirs] = useState(false);

  const [currentBeequip, setCurrentBeequip] = useState();
  const handleBeequip = (item, team) => {
    setCurrentBeequip(item);
    team == "ours" ? setIsOpenOurs(true) : setIsOpenTheirs(true);
  };

  const defaultInventory = {
    cub: {},
    hive: {},
    sticker: {},
    beequip: [],
    voucher: {},
    other: {},
  };

  const [OurInventory, setOurItemQuantities] = useState(() => {
    // getting stored value
    const saved = localStorage.getItem("OurInventory");
    const initialValue = JSON.parse(saved);
    return initialValue || defaultInventory;
  });
  const [TheirInventory, setTheirItemQuantities] = useState(() => {
    // getting stored value
    const saved = localStorage.getItem("TheirInventory");
    const initialValue = JSON.parse(saved);
    return initialValue || defaultInventory;
  });

  useEffect(() => {
    // storing input name
    localStorage.setItem("OurInventory", JSON.stringify(OurInventory));
    localStorage.setItem("TheirInventory", JSON.stringify(TheirInventory));
  }, [OurInventory, TheirInventory]);

  const resetInventory = (setInventory) => {
    setInventory(defaultInventory);
  };

  const handleAddItem = (item, inventory, setInventory) => {
    const { type, name, image, main_stat, main_stat_negative, hive_bonus } =
      item;

    let updatedInventory;

    if (type === "beequip") {
      // Initialize inventory[type] as an array if it is undefined
      const beequips = inventory[type] || [];

      // Generate a unique index for the beequip item
      const idx = beequips.length;
      const newBeequipItem = {
        id: idx + 1, // Unique identifier for the beequip item
        name,
        image,
        main_stat,
        main_stat_negative,
        hive_bonus,
      };

      // Add the new beequip item to the list
      updatedInventory = {
        ...inventory,
        [type]: [...beequips, newBeequipItem],
      };
    } else {
      // Initialize inventory[type] as an object if it is undefined
      const currentItems = inventory[type] || {};

      // Find the current item in the inventory, or create the item if it doesn't already exist
      const currentItem = currentItems[name] || {
        quantity: 0,
        image: "",
        name: "",
      };

      updatedInventory = {
        ...inventory,
        [type]: {
          ...currentItems,
          [name]: {
            quantity: currentItem.quantity + 1,
            name: name || currentItem.name,
            image: image || currentItem.image,
          },
        },
      };
    }

    setInventory(updatedInventory);
  };

  const handleRemoveItem = (item, inventory, setInventory) => {
    const { type, name, id } = item;

    if (type === "beequip") {
      // Remove the beequip item by filtering out the item from the list
      const updatedBeequips = inventory[type].filter((equip) => equip.id != id);

      //update new inventory
      setInventory({
        ...inventory,
        [type]: updatedBeequips,
      });
    } else if (type === "other") {
      // Remove all quantities of the item
      const updatedInventory = {
        ...inventory,
        [type]: {
          ...inventory[type],
        },
      };
      delete updatedInventory[type][name];
      setInventory(updatedInventory);
    } else {
      //Otherwise update other items
      const currentQuantity = inventory[type]?.[name]?.quantity || 0;
      if (currentQuantity > 0) {
        const updatedQuantities = {
          ...inventory,
          [type]: {
            ...inventory[type],
            [name]: {
              ...inventory[type][name],
              quantity: currentQuantity - 1,
            },
          },
        };
        if (updatedQuantities[type][name].quantity === 0) {
          delete updatedQuantities[type][name];
        }
        setInventory(updatedQuantities);
      }
    }
  };

  const getAllItems = (inventory) => {
    const allItems = [];

    Object.keys(inventory).forEach((type) => {
      if (type === "beequip") {
        // For 'beequip', we are handling items as an array
        inventory[type].forEach((item) => {
          allItems.push({
            type,
            name: item.name,
            image: item.image,
            id: item.id,
            main_stat: item.main_stat,
            main_stat_negative: item.main_stat_negative,
            hive_bonus: item.hive_bonus,
          });
        });
      } else {
        // For other types, handle items as an object
        Object.keys(inventory[type]).forEach((name) => {
          const item = inventory[type][name];
          allItems.push({
            type,
            name: item.name,
            quantity: item.quantity,
            image: item.image,
          });
        });
      }
    });

    return allItems;
  };

  /*

  console.log(OurInventory)
  console.log(getAllItems(OurInventory))
  */
  /*
  
    const listtoPrint =['Bee_Cub', 'Brown_Cub', 'Doodle_Cub', 'Gingerbread_Cub', 'name_extract.py', 'Noob_Cub', 'Peppermint_Cub', 'Robo_Cub', 'Snow_Cub', 'Star_Cub', 'Stick_Cub']
      const objectString = listtoPrint.map((name, index) => ({
      name: name.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') +" hive",
      image:name,
      type: "cub",
      

      
  
    }))
    console.log(objectString)
    */

  return (
    <div className="grid grid-cols-12 p-14 gap-8">
      <div className="bg-[#3c3c3c] col-span-5  border rounded-lg shadow-md border-gray-800 p-4 ">
        <div className="flex flex-col  bg-[#3c3c3c] ">
          <div id="leftCol" className="bg-[#3c3c3c] ">
            <div className="flex justify-center custom text-red-500 mb-4 text-3xl font-bold">
              YOUR OFFER
            </div>

            <div className="flex flex-col pl-2 py-2 mt-4 bg-[#565656] border rounded-lg">
              {getAllItems(OurInventory).length === 0 ? (
                <div className="text-white px-4 py-[38px] text-xxl">
                  No items added to the offer
                </div>
              ) : (
                <>
                  {/* Display Cards in a row */}
                  <div className="flex flex-wrap gap-3 mb-3">
                    {getAllItems(OurInventory)
                      .filter((item) => item.type !== "beequip")
                      .map((item) => (
                        <DisplayCard
                          key={item.id}
                          item={item}
                          onClick={() =>
                            handleRemoveItem(
                              item,
                              OurInventory,
                              setOurItemQuantities
                            )
                          }
                        />
                      ))}
                  </div>

                  {/* Beequip Cards in a new row */}
                  <div className="flex flex-wrap gap-3">
                    {getAllItems(OurInventory)
                      .filter((item) => item.type === "beequip")
                      .map((item) => (
                        <BeequipDisplayCard
                          key={item.id}
                          item={item}
                          onClick={() =>
                            handleRemoveItem(
                              item,
                              OurInventory,
                              setOurItemQuantities
                            )
                          }
                        />
                      ))}
                  </div>
                </>
              )}
            </div>
          </div>
          {dataFromDialog != null ? (
            <div className=" ml-1 rounded-md pl-4 py-2 mt-4 text-lg font-semibold bg-[#565656] w-3/4">
              {dataFromDialog}
            </div>
          ) : null}
          <DescriptionDialog
            open={isOpen}
            setOpen={setIsOpen}
            onSubmit={setDataFromDialog}
          ></DescriptionDialog>

          <ItemDialog
            beequip={currentBeequip}
            open={isOpenOurs}
            setOpen={setIsOpenOurs}
            handleAddItem={handleAddItem}
            inventory={OurInventory}
            setInventory={setOurItemQuantities}
          ></ItemDialog>

          <ItemDialog
            beequip={currentBeequip}
            open={isOpenTheirs}
            setOpen={setIsOpenTheirs}
            handleAddItem={handleAddItem}
            inventory={TheirInventory}
            setInventory={setTheirItemQuantities}
          ></ItemDialog>

          {/* Cub skins text + search bar */}
          <div className="flex flex-col gap-4 pt-9 lg:flex-row sm:justify-between">
            <div className="flex flex-col sm:flex-row  gap-2  ">
              <h2 className="text-2xl font-bold  tracking-tight text-white flex text-center  pr-3">
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
            <div className="flex flex-col sm:flex-row  ">
              <button
                type="button"
                className="px-4   text-sm font-semibold shadow-lg rounded-lg bg-red-400 text-gray-50 hover:text-gray-200 text-center me-2   "
                onClick={() => resetInventory(setOurItemQuantities)}
              >
                Clear all
              </button>
              <div className="flex items-center max-w-xs sm:max-w-md h-12 rounded-lg focus-within:shadow-lg bg-[#565656] overflow-hidden">
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
                  onChange={(e) => setOurQuery(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 mt-4">
            {cubOptions
              .filter((item) => search(item, ourQuery))
              .map((item) => (
                <ItemCard
                  item={item}
                  onClick={() =>
                    handleAddItem(item, OurInventory, setOurItemQuantities)
                  }
                />
              ))}
          </div>

          {/* Display Vouchers */}
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl pt-9">
            Vouchers
          </h2>
          <div className="flex flex-wrap gap-4 mt-4">
            {voucherOptions
              .filter((item) => search(item, ourQuery))
              .map((item) => (
                <ItemCard
                  item={item}
                  onClick={() =>
                    handleAddItem(item, OurInventory, setOurItemQuantities)
                  }
                />
              ))}
          </div>

          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl pt-9">
            Other
          </h2>
          <div className="flex flex-wrap gap-4 mt-4">
            {otherOptions
              .filter((item) => search(item, ourQuery))
              .map((item) => (
                <ItemCard
                  item={item}
                  onClick={() =>
                    handleAddItem(item, OurInventory, setOurItemQuantities)
                  }
                />
              ))}
          </div>
          {/* Display Beequips */}
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl pt-9">
            Beequips
          </h2>

          <div className="flex flex-wrap gap-4 mt-4">
            {beequipOptions
              .filter((item) => search(item, ourQuery))
              .map((item) => (
                <ItemCard
                  item={item}
                  onClick={() => {
                    handleBeequip(item, "ours");
                  }}
                />
              ))}
          </div>

          {/* Display Hive skins */}
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl pt-9">
            Hive skins
          </h2>
          <div className="flex flex-wrap gap-4 mt-4">
            {hiveOptions
              .filter((item) => search(item, ourQuery))
              .map((item) => (
                <ItemCard
                  item={item}
                  onClick={() =>
                    handleAddItem(item, OurInventory, setOurItemQuantities)
                  }
                />
              ))}
          </div>

          {/* Display Stickers */}
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl pt-9">
            Stickers
          </h2>
          <div className="flex flex-wrap gap-4 mt-4">
            {stickerOptions
              .filter((item) => search(item, ourQuery))
              .map((item) => (
                <ItemCard
                  item={item}
                  onClick={() =>
                    handleAddItem(item, OurInventory, setOurItemQuantities)
                  }
                />
              ))}
          </div>
        </div>
      </div>
      <div
        id="middleCol"
        className=" bg-[#212121] col-span-2 flex flex-col items-center py-14"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-16 h-16 sm:w-24 sm:h-24 md:w-32 md:h-32 lg:w-40 lg:h-40"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
          />
        </svg>

        <p className="text-3xl  font-semibold mt-2">TRADE</p>
        <br></br>
        <p className="text-lg font-bold">beesfortrade.vercel.app </p>
        <p className="text-sm mt-1">made by me </p>

          <div className = "flex pt-3">
        <button
                type="button"
                className="px-4 py-2 text-sm font-semibold shadow-lg rounded-md bg-[#5684f4] inline-flex w-full items-center justify-center  text-gray-50 hover:text-gray-200 text-center me-2  "
                onClick={() => copyToClipBoard()}
              >
                Copy Image to Clipboard
              </button>
              <button
                type="button"
                className="px-4 py-2 text-sm font-semibold shadow-lg rounded-md bg-[#f4a556] text-gray-50  inline-flex w-full items-center justify-center hover:text-gray-200 text-center me-2  "
                onClick={() => saveToFiles()}
              >
                Save image to files
              </button>
     
      </div>
      </div>

      <div className="bg-[#3c3c3c] col-span-5 border rounded-lg shadow-md border-gray-800 p-4">
        <div className="flex flex-col ">
          <div id="rightCol" className="displayImage bg-[#3c3c3c] ">
            <div className="flex justify-center text-green-500 custom mb-4 text-3xl font-bold">
              LOOKING FOR
            </div>

            <div className="flex flex-col pl-2 py-2 mt-4 bg-[#565656] border rounded-lg">
              {getAllItems(TheirInventory).length === 0 ? (
                <div className="text-white px-4 py-[38px] text-xxl">
                  No items added to the offer
                </div>
              ) : (
                <>
                  {/* Display Cards in a row */}
                  <div className="flex flex-wrap gap-3 mb-3">
                    {getAllItems(TheirInventory)
                      .filter((item) => item.type !== "beequip")
                      .map((item) => (
                        <DisplayCard
                          key={item.id}
                          item={item}
                          onClick={() =>
                            handleRemoveItem(
                              item,
                              TheirInventory,
                              setTheirItemQuantities
                            )
                          }
                        />
                      ))}
                  </div>

                  {/* Beequip Cards in a new row */}
                  <div className="flex flex-wrap gap-3">
                    {getAllItems(TheirInventory)
                      .filter((item) => item.type === "beequip")
                      .map((item) => (
                        <BeequipDisplayCard
                          key={item.id}
                          item={item}
                          onClick={() =>
                            handleRemoveItem(
                              item,
                              TheirInventory,
                              setTheirItemQuantities
                            )
                          }
                        />
                      ))}
                  </div>
                </>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-4 pt-9 lg:flex-row sm:justify-between">
            <div className="flex flex-col sm:flex-row  gap-2  ">
              <h2 className="text-2xl font-bold  tracking-tight text-white flex text-center  pr-3">
                Cub skins
              </h2>
            </div>
            <div className="flex  sm:flex-row ">
              <button
                type="button"
                className="px-4  text-sm font-semibold shadow-lg rounded-lg bg-red-400 text-gray-50 hover:text-gray-200 text-center me-2  "
                onClick={() => resetInventory(setTheirItemQuantities)}
              >
                Clear all
              </button>
              <div className="flex items-center max-w-xs sm:max-w-md h-12 rounded-lg focus-within:shadow-lg bg-[#565656] overflow-hidden">
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
                  onChange={(e) => setTheirQuery(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 mt-4">
            {cubOptions
              .filter((item) => search(item, theirQuery))
              .map((item) => (
                <ItemCard
                  item={item}
                  onClick={() =>
                    handleAddItem(item, TheirInventory, setTheirItemQuantities)
                  }
                />
              ))}
          </div>

          {/* Display Vouchers */}
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl pt-9">
            Vouchers
          </h2>
          <div className="flex flex-wrap gap-4 mt-4">
            {voucherOptions
              .filter((item) => search(item, theirQuery))
              .map((item) => (
                <ItemCard
                  item={item}
                  onClick={() =>
                    handleAddItem(item, TheirInventory, setTheirItemQuantities)
                  }
                />
              ))}
          </div>

          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl pt-9">
            Other
          </h2>
          <div className="flex flex-wrap gap-4 mt-4">
            {otherOptions
              .filter((item) => search(item, theirQuery))
              .map((item) => (
                <ItemCard
                  item={item}
                  onClick={() =>
                    handleAddItem(item, TheirInventory, setTheirItemQuantities)
                  }
                />
              ))}
          </div>

          {/* Display Beequips */}
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl pt-9">
            Beequips
          </h2>
          <div className="flex flex-wrap gap-4 mt-4">
            {beequipOptions
              .filter((item) => search(item, theirQuery))
              .map((item) => (
                <ItemCard
                  item={item}
                  onClick={() => {
                    handleBeequip(item, "theirs");
                  }}
                />
              ))}
          </div>
          {/* Display Hive skins */}
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl pt-9">
            Hive skins
          </h2>
          <div className="flex flex-wrap gap-4 mt-4">
            {hiveOptions
              .filter((item) => search(item, theirQuery))
              .map((item) => (
                <ItemCard
                  item={item}
                  onClick={() =>
                    handleAddItem(item, TheirInventory, setTheirItemQuantities)
                  }
                />
              ))}
          </div>

          {/* Display Stickers */}
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl pt-9">
            Stickers
          </h2>
          <div className="flex flex-wrap gap-4 mt-4">
            {stickerOptions
              .filter((item) => search(item, theirQuery))
              .map((item) => (
                <ItemCard
                  item={item}
                  onClick={() =>
                    handleAddItem(item, TheirInventory, setTheirItemQuantities)
                  }
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
