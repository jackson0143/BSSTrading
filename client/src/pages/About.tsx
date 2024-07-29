function About() {
  return (
    <section className=" ">
      <div className="  flex justify-center     pb-60 min-h-screen">
        <div className="flex flex-col gap-6 w-1/3 ">
          <p className="text-4xl font-bold pt-12">About</p>
          <p className="text-2xl  text-white ">
            This application was made for fun. Create trade offers and
            screenshot to send to other players. All image credits go to Bee Swarm Simulator and Onett.
            
            <br></br>
            <br></br>
            Some new features of the site include:
            <ul>
              <li>- Searching</li>
              <li>- Beequip details (Incomplete)</li>
              <li>- Temporary save on close</li>
            </ul>
            <br></br>
            More features to come - <span className = "italic font-bold text-4xl">euwunha</span>
          </p>
          <a
            href="/"
            className="px-8 py-4 text-xl font-semibold rounded flex bg-purple-600 w-1/2 justify-center text-gray-50 hover:text-gray-200"
          >
            Back to home
          </a>
        </div>
        
      </div>
    </section>
  );
}
export default About;
