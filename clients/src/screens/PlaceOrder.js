import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import FormShipping from "../components/FormShipping";
import { createOrder } from "../feataures/order/createOrderSlice";
import { emptyFromCart } from "../feataures/cart/cartSlice";
import { useNavigate } from "react-router-dom";

function PlaceOrder() {
  const dispatch = useDispatch();
  const { cartItems, shippingAddress, paymentMethod } = useSelector(
    (state) => state.cart
  );

  const { userInfo } = useSelector((state) => state.authUser);

  const navigate = useNavigate();
  // SUBTOTAL OF PRODUCT IN CART
  const subTotal = cartItems
    .reduce((acc, val) => acc + val.price * val.qty, 0)
    .toFixed(2);

  // SHIPPING PRICE PER EACH PRODUCT $5
  const shippingPrice = cartItems
    .reduce((acc, val) => acc + val.qty * 5, 0)
    .toFixed(2);

  // ORDER TOTAL
  const totalPrice = (Number(subTotal) + Number(shippingPrice)).toFixed(2);

  const taxPrice = cartItems
    .reduce((acc, val) => acc + val.qty * 0.8, 0)
    .toFixed(2);

  // TOTAL PRODUCT QTY
  const totalProductQty = cartItems.reduce((acc, val) => acc + val.qty, 0);

  const handleSubmit = () => {
    dispatch(
      createOrder({
        orderItems: cartItems,
        shippingAddress: shippingAddress,
        paymentMethod: paymentMethod.payment,
        shippingPrice: shippingPrice,
        totalPrice: totalPrice,
        taxPrice: taxPrice,
      })
    );
    if (userInfo && createOrder) {
      dispatch(emptyFromCart());
      navigate("/order");
    }
  };

  useEffect(() => {
    if (!userInfo) {
      navigate("/cart");
    } else if (cartItems.length === 0) {
      navigate("/cart");
    }
  }, [userInfo, navigate, cartItems]);

  return (
    <div className="md:flex gap-10 mt-10">
      <div className="md:w-[70%]">
        <FormShipping />
      </div>
      <div className="md:w-[30%] border-[1px] h-fit p-4 text-xs font-light text-slate-00 rounded-lg bg-slate-100">
        <p className="text-md font-semibold text-slate-600 pb-2 border-b-[1px]">
          Order Summary
        </p>
        <div className="flex justify-between py-2">
          <p>Total Products ({totalProductQty})</p>
          <p className="">${subTotal}</p>
        </div>
        <div className="flex justify-between py-2">
          <p>Shipping estimate</p>
          <p className="">${shippingPrice}</p>
        </div>
        <div className="flex justify-between text-sm py-4 border-b-[1px]">
          <p>Total</p>
          <p className="text-sm font-bold">${totalPrice}</p>
        </div>
        <button
          onClick={handleSubmit}
          className="bg-teal-600 text-white w-full text-md border-[1px] hover:border-slate-700 transition-all py-2 rounded-md"
        >
          confirm order
        </button>
      </div>
    </div>
  );
}

export default PlaceOrder;
