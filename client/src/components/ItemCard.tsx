
const ItemCard = ({ item, onClick}) => {

  const {type, image, name} = item
{
    return (
      <button className="bg-[#2b2b2b]  hover:shadow-xl rounded-lg p-2 w-40 h-auto flex flex-col items-center " onClick={onClick}  >
        <img src={`./${type}/${image}.png`} className="rounded-md my-2 "  width={50} height={50} alt={image} />
        <p className="text-white text-sm font-semibold ">{name}</p>
      </button>
    );
  
}
}
export default ItemCard
