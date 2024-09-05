import React from "react";
import {
  MdFavorite,
  MdOutlineFavoriteBorder,
  MdStar,
  MdAddShoppingCart,
  MdOutlineRemoveShoppingCart,
} from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../feataures/cart/cartSlice";
import { Link } from "react-router-dom";
import { addToWishList, removeWishFromList } from "../feataures/cart/wishSlice";

function ProductsFlitered({ product }) {

  const dispatch = useDispatch();

  const { cartItems } = useSelector((state) => state.cart);
  const { itemList } = useSelector((state) => state.wish);

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        id: product._id,
        name: product.name,
        image: product.image,
        price: product.price,
        description: product.description,
        countInStock: product.countInStock,
        qty: 1,
      })
    );
  };

  const handleWishRemove = (id) => {
    dispatch(removeWishFromList(id));
  }

  const productFind = cartItems.find((x) => x.id === product._id);

  const handleAddToWishList = () => {
    dispatch(
      addToWishList({
        id: product._id,
        name: product.name,
        image: product.image,
        price: product.price,
        description: product.description,
        countInStock: product.countInStock,
        qty: 1,
      })
    );
  };

  return (
    <div>
      <div>
        <div
          key={product._id}
          className={`bg-slate-200 flex flex-col gap-4 justify-between p-4 ${
            productFind && "opacity-60 shadow-xl shadow-slate-400"
          } `}
        >
          <div className="flex justify-between">
            <div>
              {product.countInStock === 0 ? (
                <p className="text-xs">not In stok</p>
              ) : (
                <p className="text-xs">qty:{product.countInStock}</p>
              )}
            </div>
            <div className="flex flex-col items-center gap-3">
              {itemList.find((x) => x.id === product._id) ? (
                <button
                  onClick={() => handleWishRemove(product._id)}
                  className="text-red-400 text-lg bg-white p-2 rounded-full cursor-pointer"
                >
                  <MdFavorite />
                </button>
              ) : (
                <button
                  onClick={handleAddToWishList}
                  className="text-red-600 text-lg bg-white p-2 rounded-full cursor-pointer"
                >
                  <MdOutlineFavoriteBorder />
                </button>
              )}

              {productFind ? (
                <button
                  onClick={() => dispatch(removeFromCart(product._id))}
                  className={
                    product.countInStock
                      ? "bg-slate-400 p-2 rounded-full text-md"
                      : "hidden"
                  }
                >
                  <MdOutlineRemoveShoppingCart />
                </button>
              ) : (
                <button
                  onClick={handleAddToCart}
                  className={
                    product.countInStock
                      ? "bg-indigo-500 p-2 text-white text-md rounded-full"
                      : "invisible p-2"
                  }
                >
                  <MdAddShoppingCart />
                </button>
              )}
            </div>
          </div>
          <Link to={`/product/${product._id}`} className="w-[200px]">
            <img src={product.image} alt="" className="w-[100%]" />
          </Link>
          <p className="text-left text-sm text-slate-700 w-[190px] h-[30px]">{product.name}</p>
          <div className="flex justify-between items-center w-full bg-white px-2 rounded-lg">
            <p className=" text-green-900 text-sm font-bold rounded-md p-1">
              {product.price} $
            </p>
            <div className="text-xs text-slate-600 flex items-center gap-1">
              <p className="text-2xl text-yellow-500">
                <MdStar />
              </p>
              4.2 ({product.reviews.length} reviews)
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductsFlitered;
