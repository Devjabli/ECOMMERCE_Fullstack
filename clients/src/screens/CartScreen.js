import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
  incrementQty,
  decrementQty,
} from "../feataures/cart/cartSlice";
import emptyCart from "../svg/undraw_empty_cart_co35.svg";
import { Link } from "react-router-dom";
import { BsFillCartXFill } from "react-icons/bs";

function CartScreen() {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);
  const { itemList } = useSelector((state) => state.wish);

  // DISPATCHING ACTION TO REMOVE PRODUCT FROM STATE BY ID
  const handleRemoveFromCart = (id) => {
    dispatch(removeFromCart(id));
  };

  // DISPATCHING ACTION TO INCREMENT QUANTITY OF PRODUCT IN STATE
  const handleIncrement = (product) => {
    dispatch(incrementQty({ product }));
  };

  // DISPATCHING ACTION TO DECREMENT QUANTITY OF PRODUCT IN STATE
  const handleDecrement = (product) => {
    dispatch(decrementQty({ product }));
  };

  // SUBTOTAL OF PRODUCT IN CART
  const subTotal = cartItems.reduce((acc, val) => acc + val.price * val.qty, 0);

  // TAX ESTIAMTE TOTAL
  const taxEstimate = cartItems
    .reduce((acc, val) => acc + val.qty * 0.2, 0)
    .toFixed(2);
  // SHIPPING PRICE PER EACH PRODUCT $5
  const shippingPrice = cartItems
    .reduce((acc, val) => acc + val.qty * 5, 0)
    .toFixed(2);

  // ORDER TOTAL
  const totalPrice =
    Number(subTotal) + Number(taxEstimate) + Number(shippingPrice);

  return (
    <div>
      <div>
        <div>
          <p
            className={!cartItems.length ? "hidden" : "text-2xl text-slate-500"}
          >
            My Cart
          </p>
          <div className="md:flex justify-between gap-10">
            <div className="md:w-[60%] mx-auto">
              {cartItems.length === 0 ? (
                <div className=" flex flex-col items-center gap-4 text-3xl font-light mt-20">
                  <p className="font-thin">Cart is empty</p>
                  <img src={emptyCart} alt="" className="w-[50%]" />
                </div>
              ) : (
                cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between border-b-[1px] py-4"
                  >
                    <div className="flex">
                      <Link to={`/product/${item.id}`}>
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-[100px] bg-slate-200 p-3"
                        />
                      </Link>
                      <div className="w-[250px] h-[100px] pl-6 text-sm flex flex-col justify-between">
                        <div>
                          <b>{item.name}</b>
                          <p>color | 2xl</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleDecrement(item.id)}
                            className="w-[30px] h-[30px] disabled:cursor-not-allowed disabled:border-slate-300 disabled:text-slate-300 flex justify-center items-center border-[1px] border-slate-500 font-thin rounded-full text-2xl"
                          >
                            -
                          </button>
                          {item.qty}
                          <button
                            disabled={item.countInStock <= item.qty}
                            onClick={() => handleIncrement(item.id)}
                            className="w-[30px] h-[30px] flex justify-center disabled:cursor-not-allowed disabled:border-slate-300 disabled:text-slate-300 items-center border-[1px] border-slate-500 font-thin rounded-full text-xl"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col justify-between w-[40px]">
                      <p className="w-full text-right border-slate-500 text-sm pb-1">
                        ${item.price}
                      </p>
                      <button
                        onClick={() => handleRemoveFromCart(item.id)}
                        className="text-teal-700 hover:text-white hover:bg-teal-700 gap-2 w-[40px] transition-all p-2 rounded-full text-xl border-[1px]"
                      >
                        <BsFillCartXFill />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
            {cartItems.length > 0 && (
              <div className="md:w-[40%] h-fit p-4 text-sm font-light text-slate-00 rounded-lg">
                <p className="text-2xl text-slate-600 font-bold py-4">
                  Order Summary
                </p>
                <div className="flex justify-between py-4 border-b-[1px]">
                  <p>Subtotal</p>
                  <p className="font-bold">${subTotal}</p>
                </div>
                <div className="flex justify-between py-4 border-b-[1px]">
                  <p>Shipping estimate</p>
                  <p className="font-bold">${shippingPrice}</p>
                </div>
                <div className="flex justify-between py-4 border-b-[1px]">
                  <p>Shipping estimate</p>
                  <p className="font-bold">${taxEstimate}</p>
                </div>
                <div className="flex justify-between py-4 border-b-[1px] font-bold">
                  <p>Order total</p>
                  <p className="font-bold">${totalPrice}</p>
                </div>
                <Link to="/placeorder">
                  <button className="bg-teal-600 text-white w-full font-bold text-md border-[1px] hover:border-slate-700 transition-all py-2 rounded-md">
                    Checkout
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
      <div
        className={
          cartItems.length === 0 || itemList.length === 0
            ? "hidden"
            : "mt-6 pt-4 border-t-2"
        }
      >
        <p className="text-xl py-4">Your favourite items</p>
        <div className="flex">
          {itemList.map((item) => (
            <div key={item.id} className="border-r-[1px]">
              <Link to={`/product/${item.id}`}>
                <div className="w-40 h-40">
                  <img src={item.image} alt={item._id} className="p-3" />
                </div>
              </Link>
              <p className="text-sm text-center text-slate-600">{item.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CartScreen;
