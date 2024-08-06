import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { useState, useEffect } from "react";

function ItemDialog({ beequip, open, setOpen, handleAddItem, inventory, setInventory  }) {

  const [mainStats, setMainStats] = useState({});
  const [negativeStats, setNegativeStats] = useState({});
  const [hiveBonus, setHiveBonus] = useState({});

  //UseEffect to initially set the default stats
  useEffect(() => {
    if (beequip) {
      setMainStats(beequip.main_stat);
      setNegativeStats(beequip.main_stat_negative);
      setHiveBonus(beequip.hive_bonus);
    }
  }, [beequip]);

  //Handles when we edit stat values
  function handleStatChange(event, setStats, stats) {
    const { name, value } = event.target;
  
    // Allow digits and at most one decimal point
    const newValue = value.replace(/[^0-9.]/g, '');
  
    // Ensure only one decimal point is allowed
    const validValue = newValue.split('.').length > 2 ? newValue.slice(0, -1) : newValue;
  
    setStats({
      ...stats,
      [name]: validValue,
    });
  }
  

  function handleClick() {
    const updatedBeequip = {
      ...beequip,
      main_stat: mainStats,
      main_stat_negative: negativeStats,
      hive_bonus: hiveBonus,
    };
 
    handleAddItem(updatedBeequip, inventory, setInventory);
    setOpen(false);
    setMainStats(beequip.main_stat);
    setNegativeStats(beequip.main_stat_negative);
    setHiveBonus(beequip.hive_bonus);
  }

  return (
    <Dialog open={open} onClose={setOpen} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-white  text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:ease-out data-[leave]:ease-in my-8 w-full min-h-xl max-w-3xl data-[closed]:sm:translate-y-0 "
          >
            <div className="bg-[#3c3c3c] px-4 pb-4 pt-5">
              <div className="px-2 ">
                <div className="my-3 text-left">
                  <DialogTitle
                    as="h3"
                    className="pb-4 text-base font-semibold leading-6 text-white"
                  >
                    {beequip ? (
                      <div>
                        {beequip.name
                          .split("_")
                          .map(
                            (word) =>
                              word.charAt(0).toUpperCase() + word.slice(1)
                          )
                          .join(" ")}
                        {
                          <img
                            src={`./${beequip.type}/${beequip.image}.png`}
                            className="rounded-md my-2 "
                            width={50}
                            height={50}
                            alt={"empty"}
                          />
                        }
                      </div>
                    ) : (
                      <div>Beequip Name</div>
                    )}
                  </DialogTitle>

                  <div className="mt-4">
                    <h4 className="text-white text-2xl underline font-bold mb-4">Main Stats</h4>
                    {Object.keys(mainStats).map((stat) => (
                      <div key={stat} className="flex items-center justify-between mb-2">
                        <label className="text-[#c5ffca] ">{stat}:</label>
                        <input
                        maxLength={3}
                          name={stat}
                          value={mainStats[stat]}
                          onChange={(e) =>
                            handleStatChange(e, setMainStats, mainStats)
                          }
                          className="w-3/5 flex text-black py-3 rounded-lg px-3  focus:outline-none  hover:shadow"
                        />
                      </div>
                    ))}
                  </div>
                  <div className="mt-4">
                    <h4 className="text-white text-2xl underline font-bold mb-4">Negative Stats</h4>
                    {Object.keys(negativeStats).map((stat) => (
                      <div key={stat} className="flex items-center justify-between mb-2">
                        <label className="text-[#ffd3d3] ">{stat}:</label>
                        <input
                        maxLength={3}
                          name={stat}
                          value={negativeStats[stat]}
                          onChange={(e) =>
                            handleStatChange(e, setNegativeStats, negativeStats)
                          }
                          className="w-3/5 flex text-black py-2 rounded-lg px-3  focus:outline-none  hover:shadow"
                        />
                      </div>
                    ))}
                  </div>
                  <div className="mt-4">
                    <h4 className="text-white text-2xl underline font-bold mb-4">Hive Bonuses</h4>
                    {Object.keys(hiveBonus).map((stat) => (
                      <div key={stat} className="flex items-center justify-between mb-2">
                        <label className="text-[#ffec89]">{stat}:</label>
                        <input
                       maxLength={3}
                          name={stat}
                          
                          value={hiveBonus[stat]}
                          onChange={(e) =>
                            handleStatChange(e, setHiveBonus, hiveBonus)
                          }
                          className="w-3/5 flex text-black py-3 rounded-lg px-3  focus:outline-none  hover:shadow"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button
                type="button"
                onClick={handleClick}
                className="inline-flex w-full justify-center rounded-md bg-blue-800 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 sm:ml-3 sm:w-auto"
              >
                Confirm
              </button>
              <button
                type="button"
                data-autofocus
                onClick={() => setOpen(false)}
                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
              >
                Cancel
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}

export default ItemDialog;
