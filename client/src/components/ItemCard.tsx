
const ItemCard = ({ title, type, onClick}) => {

    const titlesplitted = title.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
{
    return (
      <button className="bg-[#2b2b2b]  hover:shadow-xl rounded-lg p-2 w-40 h-auto flex flex-col items-center " onClick={onClick}  >
        <img src={`./${type}/${title}.png`} className="rounded-md my-2 "  width={50} height={50} alt={titlesplitted} />
        <p className="text-white text-sm font-semibold ">{titlesplitted}</p>
      </button>
    );
  
}
}
export default ItemCard
