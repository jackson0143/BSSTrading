function About() {
  return (
    <section className=" ">
      <div className="  flex justify-center     pb-60 min-h-screen">
        <div className="flex flex-col gap-6 w-1/3 ">
          <p className="text-4xl font-bold pt-12">About</p>
          <p className="text-2xl  text-white ">
            This application was made for a game i used to play, Bee Swawrm Simulator. Create trade offers and
            screenshot to send to other players. All image credits go to Bee Swarm Simulator.
            
            <br></br>
            <br></br>
            Some new features of the site include:
            <li>Discord Profile saving integration</li>
            <li> Create trade offers on the site </li>
            <li> Chat direct messages with others</li>
            <li> Account details</li>
            <ul>
    
            </ul>
            <br></br>
            More features to come - <span className = "italic font-bold text-4xl"></span>
          </p>
          <a
            href="/"
            className="px-8 py-4 text-xl font-semibold rounded flex bg-[#6A6A6A] w-1/2 justify-center text-gray-50 hover:text-gray-200"
          >
            Back to home
          </a>
        </div>
        
      </div>
    </section>
  );
}
export default About;
