import useLogout from "../hooks/useLogout";
import useLogin from "../hooks/useLogin";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
function Navbar() {
  const {  user } = useContext(AuthContext);
  const { logout } = useLogout();
  const { login } = useLogin();
 
  return (
    <nav>
      <div className="grid grid-cols-5 p-5 bg-[#282828] shadow-2xl ">
        <div className = "flex col-span-1 items-center ">
        
        <a
            href="/about"
            className="bg-[#4A4A4A] px-4 py-2 rounded text-white hover:bg-[#6A6A6A] text-xl mb-4 ml-12"
          >
            About the site
          </a>
        </div>
        <div className="flex col-span-3 flex-col  items-center">
          <a href="/" className="text-6xl font-bold cursor-pointer ">
            Bees For Trade (beta)
          </a>

          <div className="pt-6">
            <a
              type="button"
              className="flex items-center bg-[#7289da]  hover:bg-[#7289da]/90 rounded-lg  font-medium  text-lg hover:bg-gray-200 shadow-lg  px-5 py-2.5 me-2 mb-2  "
              href="https://discord.gg/uWpZUcu3Am"
              target="_blank"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-discord mr-2"
                viewBox="0 0 16 16"
              >
                <path d="M13.545 2.907a13.2 13.2 0 0 0-3.257-1.011.05.05 0 0 0-.052.025c-.141.25-.297.577-.406.833a12.2 12.2 0 0 0-3.658 0 8 8 0 0 0-.412-.833.05.05 0 0 0-.052-.025c-1.125.194-2.22.534-3.257 1.011a.04.04 0 0 0-.021.018C.356 6.024-.213 9.047.066 12.032q.003.022.021.037a13.3 13.3 0 0 0 3.995 2.02.05.05 0 0 0 .056-.019q.463-.63.818-1.329a.05.05 0 0 0-.01-.059l-.018-.011a9 9 0 0 1-1.248-.595.05.05 0 0 1-.02-.066l.015-.019q.127-.095.248-.195a.05.05 0 0 1 .051-.007c2.619 1.196 5.454 1.196 8.041 0a.05.05 0 0 1 .053.007q.121.1.248.195a.05.05 0 0 1-.004.085 8 8 0 0 1-1.249.594.05.05 0 0 0-.03.03.05.05 0 0 0 .003.041c.24.465.515.909.817 1.329a.05.05 0 0 0 .056.019 13.2 13.2 0 0 0 4.001-2.02.05.05 0 0 0 .021-.037c.334-3.451-.559-6.449-2.366-9.106a.03.03 0 0 0-.02-.019m-8.198 7.307c-.789 0-1.438-.724-1.438-1.612s.637-1.613 1.438-1.613c.807 0 1.45.73 1.438 1.613 0 .888-.637 1.612-1.438 1.612m5.316 0c-.788 0-1.438-.724-1.438-1.612s.637-1.613 1.438-1.613c.807 0 1.451.73 1.438 1.613 0 .888-.631 1.612-1.438 1.612" />
              </svg>
              Join the server
            </a>
          
          </div>
        </div>
        <div className = "flex flex-col justify-center items-center">
          <div className="flex ">
           
            {!user && (
              <button
                onClick={login}
                className="bg-[#5865f2] text-white px-7 py-6 flex items-center rounded-md shadow-lg hover:bg-[#4752C4] focus:outline-none transition duration-200"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-discord mr-2"
                  viewBox="0 0 16 16"
                >
                  <path d="M13.545 2.907a13.2 13.2 0 0 0-3.257-1.011.05.05 0 0 0-.052.025c-.141.25-.297.577-.406.833a12.2 12.2 0 0 0-3.658 0 8 8 0 0 0-.412-.833.05.05 0 0 0-.052-.025c-1.125.194-2.22.534-3.257 1.011a.04.04 0 0 0-.021.018C.356 6.024-.213 9.047.066 12.032q.003.022.021.037a13.3 13.3 0 0 0 3.995 2.02.05.05 0 0 0 .056-.019q.463-.63.818-1.329a.05.05 0 0 0-.01-.059l-.018-.011a9 9 0 0 1-1.248-.595.05.05 0 0 1-.02-.066l.015-.019q.127-.095.248-.195a.05.05 0 0 1 .051-.007c2.619 1.196 5.454 1.196 8.041 0a.05.05 0 0 1 .053.007q.121.1.248.195a.05.05 0 0 1-.004.085 8 8 0 0 1-1.249.594.05.05 0 0 0-.03.03.05.05 0 0 0 .003.041c.24.465.515.909.817 1.329a.05.05 0 0 0 .056.019 13.2 13.2 0 0 0 4.001-2.02.05.05 0 0 0 .021-.037c.334-3.451-.559-6.449-2.366-9.106a.03.03 0 0 0-.02-.019m-8.198 7.307c-.789 0-1.438-.724-1.438-1.612s.637-1.613 1.438-1.613c.807 0 1.45.73 1.438 1.613 0 .888-.637 1.612-1.438 1.612m5.316 0c-.788 0-1.438-.724-1.438-1.612s.637-1.613 1.438-1.613c.807 0 1.451.73 1.438 1.613 0 .888-.631 1.612-1.438 1.612" />
                </svg>
                Login using Discord
              </button>
            )}
            {user && (
              <>
                <Menu as="div" className="relative inline-block text-left">
                  <div>
                    <MenuButton className="inline-flex w-full items-center justify-center gap-x-1.5 rounded-md  px-3 pr-10 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-inset ring-gray-300 hover:bg-[#444444]">
                      <img
                        className="w-20 h-20 rounded-full"
                        src={`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`}
                        alt={user.username}
                      />
                      <p className="text-white text-bold text-2xl mt-2 pl-3">{user.username}</p>
                    </MenuButton>
                  </div>

                  <MenuItems
                    transition
                    className="absolute left-0 z-10 mt-2 w-full  origin-top-right rounded-md bg-[#333333] shadow-lg ring-1 ring-black ring-opacity-5 transition    data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                  >
                    <div className="py-1">
                      <MenuItem>
                        <a
                          href="#"
                          className="block px-4 py-2 text-sm bg-[#333333] "
                        >
                          Account settings
                        </a>
                      </MenuItem>

                      <form action="#">
                        <MenuItem>
                          <button
                            type="submit"
                            onClick={logout}
                            className="block px-4 py-2 text-sm bg-[#333333]"
                          >
                            Sign out
                          </button>
                        </MenuItem>
                      </form>
                    </div>
                  </MenuItems>
                </Menu>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
