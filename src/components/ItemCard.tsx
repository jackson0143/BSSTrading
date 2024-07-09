
const ItemCard = ({ option, title, type, onClick, count =0}) => {
    const titlesplitted = title.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  if (option === "button") {
    return (
      <button className="bg-[#2b2b2b] rounded-lg p-2 w-40 h-auto flex flex-col items-center " onClick={onClick}  >
        <img src={`./${type}/${title}.png`} className="rounded-md my-2 "  width={50} height={50} alt={titlesplitted} />
        <p className="text-white text-sm font-semibold ">{titlesplitted}</p>
      </button>
    );
  } else if (option === "display") {
    return (
      <div className="bg-[#2b2b2b] rounded-lg p-2 w-40 h-auto flex flex-col items-center ">
        <img src={`./${type}/${title}.png`} className="rounded-md my-2"  width={60} height={60} alt={titlesplitted} />
        <div className ="flex">
        <div className="text-white text-md font-semibold">{titlesplitted}</div>
        <div className="text-green-400 font-bold mr-1 pl-2">{count}</div>
        </div>
      </div>
    );
  } else {
    return null; // Handle other cases if needed
  }
};

export default ItemCard;
