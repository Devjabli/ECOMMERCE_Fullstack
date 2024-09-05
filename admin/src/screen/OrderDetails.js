import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { FaUser, FaPaypal } from "react-icons/fa";
import { MdLocationOn, MdPayment, MdDeleteForever } from "react-icons/md";
import { useNavigate } from "react-router-dom";

function OrderDetails() {
  const [order, setOrder] = useState([{}]);
  const [open, setOpen] = useState(false);
  const { id } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    fetch(`/api/orders/${id}/`)
      .then((response) => response.json())
      .then((data) => setOrder(data))
      .catch((error) => {
        if (error) {
          navigate("/orders/list/?keyword=&page=1");
        }
      });
  }, [id, navigate]);

  const HandleDelete = (id) => {
    fetch(`/api/orders/${id}/delete/`, {
      method: "DELETE",
    });
    navigate(`/orders/list/?keyword=&page=1`);
    setOpen(!open);
  };

  return (
    <div className="max-w-5xl">
        {open && (
          <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
              <div className="relative w-auto my-6 mx-auto max-w-3xl">
                <div className="border-0 rounded-lg shadow-lg relative flex items-center flex-col gap-4 w-full bg-white p-4 outline-none focus:outline-none">
                  <div className="text-4xl text-red-600">
                    <MdDeleteForever />
                  </div>
                  <p className="py-2">
                    Are you sure you want to delete this order?
                  </p>
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={() => setOpen(false)}
                      className="bg-slate-500 text-white px-4 py-2 rounded-md"
                    >
                      No, cancel
                    </button>
                    <button
                      onClick={() => HandleDelete(order._id)}
                      className="bg-red-500 text-white hover:bg-red-600 px-4 py-2 rounded-md"
                    >
                      Yes, I'm sure
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
          </>
        )}
        <div className="p-8 border-b-[1px]">
          <p className="text-3xl">Order detail</p>
          <p className="text-sm font-light">
            Details for Order ID: {order._id}
          </p>
        </div>
        <div className="flex justify-center">
          <div className="md:flex gap-8 p-6 border-b-[1px] mb-3 justify-center">
            <div className="flex gap-3 mb-10 md:mb-0">
              <div className="bg-green-200 text-green-900 h-fit w-fit p-4 text-2xl rounded-full">
                <FaUser />
              </div>
              <div className="text-[12px] text-slate-600">
                <p className="text-lg font-bold">Customer</p>
                <div className="p-2">
                  <p>{order.User?.first_name + " " + order.User?.last_name}</p>
                  <p>{order.User?.email}</p>
                  <p>{order.shippingAddress?.cellPhone}</p>
                </div>
              </div>
            </div>
            <div className="flex gap-3 mb-10 md:mb-0">
              <div className="bg-green-200 text-green-900 h-fit p-4 text-2xl rounded-full">
                <MdPayment />
              </div>
              <div className="text-[12px] text-slate-600">
                <p className="text-lg font-bold">Payment method</p>
                <div className="p-2">
                  {order.paymentMethod === "Paypal" && (
                    <p className="flex gap-2 items-end">
                      {" "}
                      <FaPaypal fontSize={30} /> Paypal
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div className="flex gap-3 mb-10 md:mb-0">
              <div className="bg-green-200 text-green-900 h-fit p-4 text-2xl rounded-full">
                <MdLocationOn />
              </div>
              <div className="text-[12px] text-slate-600">
                <p className="text-lg font-bold">Deliver to</p>
                <div className="p-2">
                  <p>
                    City:{" "}
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
        </div>
        <div className="p-4 w-full md:flex gap-14">
          <div className="md:w-[60%]">
            <div className="flex flex-col gap-3 w-full pb-4 border-b-[1px]">
              <div className="flex items-center justify-between text-sm font-bold text-slate-600">
                <p className="w-[160px]">Product</p>
                <p>Price unit</p>
                <p>Quantity</p>
                <p>Total</p>
              </div>
            </div>
            <div className="md:flex">
              <div className="flex flex-col gap-3 w-full border-b-2 pb-2">
                {order.orderItems?.map((item) => (
                  <div
                    key={item._id}
                    className="flex items-center justify-between text-xs"
                  >
                    <div className="flex items-center gap-2 w-[160px]">
                      <img
                        src={item.image}
                        alt=""
                        className="w-[60px] bg-slate-200 p-2"
                      />
                      <p className="w-[80px]">{item.name}</p>
                    </div>
                    <p className="">${item.price}</p>
                    <p>{item.qty}</p>
                    <p>${item.price * item.qty}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="text-xs md:w-[40%] md:mt-0 mt-8">
            <div className="flex flex-col gap-3 justify-end">
              <div className="flex justify-between">
                <p>Subtotal:</p>
                <p>${order.totalPrice}</p>
              </div>
              <div className="flex justify-between">
                <p>Shipping cost:</p>
                <p>$10.00</p>
              </div>
              <div className="flex justify-between">
                <p>Tax price:</p>
                <p>0.082</p>
              </div>
              <div className="flex justify-between">
                <p>Grand total: </p>
                <p className="font-bold text-sm">
                  ${Number(order.totalPrice) + 10}
                </p>
              </div>
              <div className="flex justify-between">
                <p>status: </p>
                <p
                  className={
                    order.isPaid
                      ? " bg-green-200 text-green-800 font-bold p-1 rounded-md"
                      : "bg-orange-200 text-orange-800 font-bold p-1 rounded-md"
                  }
                >
                  {order.isPaid ? "Payment done" : "Pending"}
                </p>
              </div>
              <Link
                to={`/orders/details/${id}/tracking`}
                className="bg-teal-600 text-white rounded-sm p-2 text-center"
              >
                View Order Tracking
              </Link>
              <button
                onClick={() => setOpen(!open)}
                className="bg-slate-200 text-slate-500 border-[1px] border-slate-400 rounded-sm p-2 font-bold"
              >
                Delete Order
              </button>
            </div>
          </div>
        </div>
    </div>
  );
}

export default OrderDetails;
