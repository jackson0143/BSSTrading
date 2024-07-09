
const ItemCard = ({ option, title, type, onClick, count =0}) => {
    const titlesplitted = title.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  if (option === "button") {
    return (
      <button className="bg-[#2b2b2b]  rounded-lg p-2" onClick={onClick}>
        <img src={`./${type}/${title}.png`} className="rounded-md my-2 "  width={150} height={150} alt={titlesplitted} />
        <div className="text-white text-md font-semibold">{titlesplitted}</div>
      </button>
    );
  } else if (option === "display") {
    return (
      <div className="bg-[#2b2b2b] rounded-lg p-2">
        <img src={`./${type}/${title}.png`} className="rounded-md my-2"  width={150} height={150} alt={titlesplitted} />
        <div className ="flex justify-between">
        <div className="text-white text-md font-semibold">{titlesplitted}</div>
        <div className="text-green-400 text-xl font-bold mr-1">{count}</div>
        </div>
      </div>
    );
  } else {
    return null; // Handle other cases if needed
  }
};

export default ItemCard;
