import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { productDetails } from "../feataures/products/productDetailSLice";
import { useDispatch, useSelector } from "react-redux";
import { AiFillStar } from "react-icons/ai";
import {
  incrementQty,
  decrementQty,
  addToCart,
} from "../feataures/cart/cartSlice";

function ProductDetailScreen() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { product } = useSelector((state) => state.productDetails);
  const { cartItems } = useSelector((state) => state.cart);

  const findQty = cartItems.find((x) => x.id === product._id);
  const quantity = Object(findQty).qty;

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

  

  const handleIncrement = (product) => {
    dispatch(incrementQty({ product }));
  };

  const handleDecrement = (product) => {
    dispatch(decrementQty({ product }));
  };

  useEffect(() => {
    dispatch(productDetails(id));
  }, [dispatch, id]);

  return (
    <div className="mt-10">
      <p className="text-2xl text-slate-500 font-bold py-4">Product details</p>
      <div className="md:flex justify-center gap-3">
        <div className="md:border-r-[1px] md:border-b-0 border-b-[1px] p-4">
          <img src={product.image} alt="" />
        </div>
        <div className="flex flex-col gap-8 md:ml-4 mt-4">
          <p className="text-xl">{product.name}</p>
          <div className="flex items-center gap-3">
            <div className="text-yellow-500 flex">
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
            </div>
            <div className="text-sm">6 Reviews</div>
          </div>
          <p className="text-green-600 text-xl font-bold">${product.price}</p>
          <p>{product.description}</p>
          <div>
            <p>Color</p>
            <div className="flex gap-2 mt-4">
              <div className="bg-orange-300 w-4 h-4 rounded-full"></div>
              <div className="bg-teal-300 w-4 h-4 rounded-full"></div>
              <div className="bg-blue-300 w-4 h-4 rounded-full"></div>
              <div className="bg-indigo-300 w-4 h-4 rounded-full"></div>
            </div>
          </div>
          <div>
            <p>Size</p>
            <div className="flex gap-2 text-slate-500 text-sm mt-4">
              <p className="border-[1px] w-10 h-10 p-2 rounded-full">SM</p>
              <p className="border-[1px] w-10 h-10 p-2 text-center rounded-full">
                L
              </p>
              <p className="border-[1px] w-10 h-10 p-2 text-center rounded-full">
                XL
              </p>
              <p className="border-[1px] w-10 h-10 p-2 text-center rounded-full">
                XXL
              </p>
            </div>
          </div>
          <div className="flex justify-between gap-2 py-4">
            {cartItems.find((x) => x.id === product._id) ? (
              <div className="flex items-center gap-4 border-[1px] text-md font-light">
                <button
                  onClick={() => handleDecrement(product._id)}
                  className="bg-orange-400 px-4"
                >
                  -
                </button>
                {quantity}
                <button
                  disabled={quantity >= product.countInStock}
                  onClick={() => handleIncrement(product._id)}
                  className="bg-orange-400 px-4 disabled:bg-slate-300 disabled:text-slate-600 disabled:cursor-not-allowed"
                >
                  +
                </button>
              </div>
            ) : (
              <button
                onClick={handleAddToCart}
                className={
                  !product.countInStock
                    ? "hidden"
                    : "bg-slate-800 text-white px-8 py-2"
                }
              >
                add to cart
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailScreen;
