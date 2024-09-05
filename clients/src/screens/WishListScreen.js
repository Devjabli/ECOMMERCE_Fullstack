import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeWishFromList } from "../feataures/cart/wishSlice";
import { Link } from "react-router-dom";

function WishListScreen() {
  const { itemList } = useSelector((state) => state.wish);
  const dispatch = useDispatch();

  return (
    <div className="mt-6">
      {!itemList.length ? <p className="flex justify-center mt-20 text-xl text-slate-800">No items in your wishlist</p> : 
      <div>

      <p className="py-6">My Wish List</p>
      <div className="flex flex-wrap gap-2">
        {itemList.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between text-slate-600 gap-4 h-20 w-full border-[1px] p-6 rounded-full"
          >
            <Link to={`/product/${item.id}`}>

            <img src={item.image} alt="" className="w-[80px]" />
            </Link>
            <p className="px-6 w-[200px] border-l-2">{item.name}</p>
            <p className="px-6 border-r-2 border-l-2 w-[100px]" >${item.price}</p>
            <button
              onClick={() => dispatch(removeWishFromList(item.id))}
              className="text-orange-600"
              >
              remove
            </button>
          </div>
        ))}
      </div>
        </div>
      }
    </div>
  );
}

export default WishListScreen;
