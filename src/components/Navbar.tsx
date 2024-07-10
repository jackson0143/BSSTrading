function Navbar() {
  return (
    <nav>
      
      <div className="grid grid-cols-5 p-5 bg-[#282828] shadow-2xl justify-center">
      <img src="./bannerbss.jpg" className = "w-auto ml-28"></img>
        <div className="col-span-3  text-center">
          <a href="/" className="text-6xl font-bold cursor-pointer text-center">
            BSS trade creator (beta)
          </a>
          <p className="pt-10">by euwunha</p>
          <p className="pt-2">Discord: euwunha</p>
        </div>
        <div>
        <p className="pt-32">All credits go to Bee Swarm Simulator (game and Wiki)</p>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
