import React, { useState } from "react";
import { FaCcPaypal, FaCreditCard, FaMoneyCheck } from "react-icons/fa";

import { useDispatch, useSelector } from "react-redux";
import { cartPaymentMethod } from "../../feataures/cart/cartSlice";

function ShippingPayment() {

  const {paymentMethod} = useSelector(state => state.cart)

  const dispatch = useDispatch();

  const [payment, setPayment] = useState('');


  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(cartPaymentMethod({
      payment
    }))
  }


  return (
    <div className="bg-slate-100 rounded-md border-[1px] p-4">

<p className="pb-6 text-xs text-slate-700">Shipping Payment</p>


       {
        !paymentMethod.payment ? (

          
          <form onSubmit={handleSubmit} className="flex flex-col gap-2 text-sm">
        <div className="text-4xl w-full text-teal-600 flex gap-2">
          <label
            required
            className="cursor-pointer w-2/4 required:bg-red-600 border-2 border-slate-300 rounded-lg"
            >
            <input
              type="radio"
              name="payment"
              value="Paypal"
              required
              onChange={(e) => setPayment(e.target.value)}
              className="peer sr-only"
              />
            <div className="w-full h-20 flex rounded-md bg-white p-5 text-gray-600 ring-2 ring-transparent transition-all hover:shadow peer-checked:text-teal-600 peer-checked:ring-teal-400 peer-checked:ring-offset-2">
              <div className="w-full flex justify-between items-center gap-10">
                <div className="text-6xl">
                  <FaCcPaypal />
                  <div />
                </div>
                <div className="flex items-end justify-between">
                  <p className="text-3xl font-bold">
                    <FaMoneyCheck />
                  </p>
                </div>
              </div>
            </div>
          </label>
          <label className="cursor-pointer w-2/4 border-2 border-slate-300 rounded-lg">
            <input
              type="radio"
              name="payment"
              value="Stripe"
              onChange={(e) => setPayment(e.target.value)}
              className="peer sr-only"
              />
            <div className="w-full h-20 flex rounded-md bg-white p-5 text-gray-600 ring-2 ring-transparent transition-all hover:shadow peer-checked:text-teal-600 peer-checked:ring-teal-400 peer-checked:ring-offset-2">
              <div className="w-full flex justify-between items-center gap-10">
                <div className="text-6xl">
                  <FaCreditCard />
                  <div />
                </div>
                <div className="flex items-end justify-between">
                  <p className="text-3xl font-bold">
                    <FaMoneyCheck />
                  </p>
                </div>
              </div>
            </div>
          </label>
        </div>
        <button type="submit" className="bg-teal-600 text-white p-3">save payment</button>
      </form>
   ) : (
    <div>
      <div className="text-6xl text-teal-700">{paymentMethod.payment === 'Paypal' && <FaCcPaypal/>}</div>
      <div className="text-6xl text-teal-700">{paymentMethod.payment === 'Stripe' && <FaCreditCard/>}</div>
    </div>
   )}
   
  {/** 
  */}
    </div>
    );
  }

export default ShippingPayment;
