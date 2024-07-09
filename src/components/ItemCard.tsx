import React from "react";

const ItemCard = ({title, type}) => {

  const formattedTitle = title.replace(/_/g, " ");
  return (
    <button className="bg-[#2b2b2b] rounded-lg  p-2">
        
      <img src={`./${type}/${title}.png`}  className="rounded-md my-2" />
      <div className="text-white text-md font-semibold ">{formattedTitle}</div>
    
      {/*<div className="text-green-400 text-xl font-bold mb-4">$22</div>*/}

    </button>
  );
};

export default ItemCard;