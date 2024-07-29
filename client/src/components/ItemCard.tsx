
const ItemCard = ({ item, onClick}) => {

  const {type, image, name} = item

 
{
    return (

      type != 'other'? (
      <button className="bg-[#2b2b2b]  hover:shadow-xl rounded-lg p-2 w-40 h-auto flex flex-col items-center " onClick={onClick}  >
        <img src={`./${type}/${image}.png`} className="rounded-md my-2 w-16"   alt={image} />
        <p className="text-white text-sm font-semibold ">{name}</p>
      </button>): <button className="bg-[#2b2b2b]  hover:shadow-xl rounded-lg p-2 w-40  h-auto flex flex-col items-center " onClick={onClick}  >
        <img src={`./${type}/${image}.png`} className="rounded-md   w-30"  alt={image} />
        <p className="text-white text-sm font-semibold ">{name}</p>
      </button>
    );
  
}
}
export default ItemCard
