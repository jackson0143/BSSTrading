
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { useState } from 'react'

function ItemDialog({ beequip, open, setOpen, onSubmit }) {
    
    const [item, setItem] = useState("")

    function handleClick(){

        onSubmit(item)
        setOpen(false)
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
                    <DialogTitle as="h3" className="pb-4 text-base font-semibold leading-6 text-white">
                    {beequip ? (
              <div >
                
            {beequip.name.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
            { <img src={`./${beequip.type}/${beequip.image}.png`} className="rounded-md my-2 "  width={50} height={50} alt={"empty"} />}
            {beequip.main_stat["+Convert Amount"]}
              </div>
            ) : <div>Beequip Name</div>}
                    </DialogTitle>
                    <div className="mt-4 w-full p-2">
                  <div className="relative">
                    <textarea
                      id="message"
                      name="message"
                    value = {item}
                      onChange={(e) => setItem(e.target.value)}
                      className="peer h-44 w-full resize-none rounded border border-gray-300 bg-white py-2 px-3 text-base leading-6 text-gray-900 placeholder-transparent outline-none transition-colors duration-200 ease-in-out focus:border-white-500 focus:ring-2 focus:ring-white-900"
                      placeholder="Message"
                    ></textarea>
            
                  </div>
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
    )
  }

  export default ItemDialog