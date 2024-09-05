import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaTruck, FaFileInvoiceDollar } from "react-icons/fa";

function OrderTracking() {
  const [order, setOrder] = useState([]);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    fetch(`/api/orders/${id}/`)
      .then((response) => response.json())
      .then((data) => setOrder(data))
      .catch((error) => {
        if (error) {
          navigate('/orders/list')
        }
      });
  }, [id, navigate]);

  const handleDeliver = (id) => {
    fetch(`/api/orders/${id}/deliver/`, {
      method: "PUT",
    });
    const updatedData = { ...order, isDelivered: true };
    setOrder(updatedData);
  };

  const handleDeliverCancel = (id) => {
    fetch(`/api/orders/${id}/deliver/cancel/`, {
      method: "PUT",
    });

    const updatedData = { ...order, isDelivered: false };
    setOrder(updatedData);
  };

  return (
    <div className="max-w-5xl">
      <div className="border-b-[1px] p-8">
        <p className="text-3xl">Order Tracking</p>
        <p className="text-sm font-light">Details for Order ID: {order._id}</p>
      </div>
      <div className="flex justify-center gap-20 border-b py-4">
        <div className="flex flex-col items-center gap-2 relative">
          <div className="bg-teal-600 z-40 text-white text-2xl p-5 rounded-full w-fit">
            <FaShoppingCart />
          </div>
          <p className="w-20 text-center">Confirmed Order</p>
          <p className="absolute top-8 left-10 z-0 w-20 h-[5px] bg-teal-600"></p>
        </div>
        <div className="flex flex-col items-center gap-2 relative">
          <div
            className={
              order.isPaid
                ? "bg-teal-600 text-white z-10 text-2xl p-5 rounded-full w-fit"
                : "bg-slate-200 text-slate-400 z-10 text-2xl p-5 rounded-full w-fit"
            }
          >
            <FaFileInvoiceDollar />
          </div>
          <p className="w-20 text-center">Payment valid</p>
          <p
            className={
              order.isPaid
                ? "absolute top-8 right-10 z-0 w-20 h-[5px] bg-teal-600"
                : "absolute top-8 right-10 z-0 w-20 h-[5px] bg-slate-200 border-[1px]"
            }
          ></p>
          <p
            className={
              order.isPaid
                ? "absolute top-8 left-10 z-0 w-20 h-[5px] bg-teal-600"
                : "absolute top-8 left-10 z-0 w-20 h-[5px] bg-slate-200 border-[1px]"
            }
          ></p>
        </div>
        <div className="flex flex-col items-center gap-2 relative">
          <div
            className={
              order.isDelivered
                ? "bg-teal-600 text-white z-10 text-2xl p-5 rounded-full w-fit transition ease-in-out duration-[1s]"
                : "bg-slate-200 text-slate-400 z-10 text-2xl p-5 rounded-full w-fit"
            }
          >
            <FaTruck />
          </div>
          <p className="w-20 text-center">Delivered Order</p>
          <p
            className={
              order.isDelivered
                ? "absolute top-8 right-10 z-0 w-20 h-[5px] bg-teal-600 transition ease-in-out duration-[800]"
                : "absolute top-8 right-10 z-0 w-20 h-[5px] bg-slate-200 border-[1px]"
            }
          ></p>
          { order.isDelivered ? (
            <button
              onClick={() => handleDeliverCancel(order._id)}
              className="bg-red-200 hover:bg-red-300 text-red-600 p-2 rounded-md"
            >
              Cancel
            </button>
          ) : (
            <button
              onClick={() => handleDeliver(order._id)}
              className={!order.isPaid ? " hidden" : "bg-teal-600 hover:bg-teal-500 text-white p-2 rounded-md"}
            >
              Deliver
            </button>
          )}
        </div>
      </div>
      <div className="flex justify-center">
        <div className="md:flex justify-center gap-20 text-center text-sm mt-20 text-slate-600">
          <div className="md:mb-0 mb-8">
            <p className="text-xl font-bold p-2">Customer</p>
            <p>{order.User?.first_name + ", " + order.User?.last_name}</p>
            <p>{order.User?.email}</p>
            <p>{order.shippingAddress?.cellPhone}</p>
          </div>
          <div className="md:mb-0 mb-8">
            <p className="text-xl font-bold p-2">Order info</p>
            <p>{order.paymentMethod}</p>
            <p>Status: {order.isPaid ? "paid" : "pending"}</p>
          </div>
          <div className="md:mb-0 mb-8 p-2">
            <p className="text-xl font-bold">Deliver to</p>
            <p>
              {order.shippingAddress?.city +
                ", " +
                order.shippingAddress?.country}
            </p>
            <p>{order.shippingAddress?.address}</p>
            <p>{order.shippingAddress?.postalCode}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderTracking;
