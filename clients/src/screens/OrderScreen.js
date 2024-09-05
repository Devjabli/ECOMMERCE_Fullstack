import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { myOrderList } from "../feataures/order/listOrderSlice";

function OrderScreen() {
  const dispatch = useDispatch();
  const { order } = useSelector((state) => state.orderUser);

  useEffect(() => {
    dispatch(myOrderList());
  }, [dispatch]);

  return (
    <div>
      <p className="underline text-xl">My Orders</p>
      <div className="flex flex-wrap gap-2">
        {order.map((item) => (
          <div key={item._id} className="">
            <p>Id order: {item._id}</p>
            <div className="flex">
              {item.orderItems.map((x,key) => (
                <div key={key} className="bg-slate-300 p-2">
                  <div className="flex items-center gap-2">
                    <img
                      src={x.image}
                      alt=""
                      className="w-14 h-14 bg-white rounded-full"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OrderScreen;
