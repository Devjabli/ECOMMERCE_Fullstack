import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { MdSearch } from "react-icons/md";
import PaginateOrders from "../components/paginators/PaginateOrders";

function OrderListScreen() {
  const [order, setOrder] = useState([]);
  const [pages, setPages] = useState(1);
  const [keyword, setKeyword] = useState("");


  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const page = searchParams.get("page");


  useEffect(() => {
    fetch(`/api/orders/?keyword=${keyword}&page=${page}`)
      .then((response) => response.json())
      .then((data) => {
        const { orders, pages } = data;
        setOrder(orders);
        setPages(pages);
      });
  }, [keyword, page]);

  return (
    <div className="bg-white">
      <div className="p-4">
        <p className="text-2xl text-slate-500">Order Lists:</p>
      </div>
      <div className="bg-slate-100 md:w-fit px-4 mx-4 py-2 flex justify-between gap-3 rounded-full">
        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className="bg-slate-100 outline-none text-xs w-full"
          placeholder="Search for product by name"
        />
        <button className="text-2xl text-slate-400">
          <MdSearch />
        </button>
      </div>
      <div className="p-6 flex flex-col">
        <div className="flex justify-between gap-3">
          <p className="w-[20px]">id</p>
          <p className="w-[150px]">email</p>
          <p className="w-[140px]">total price</p>
          <p className="w-[80px]">Date created</p>
          <p className="p-2">status</p>
          <p className=""></p>
        </div>
        {order.map((item) => (
          <div
            className="flex justify-between items-center gap-3 bg-slate-100 border-[1px] rounded-lg my-1 text-[13px] font-light px-2 hover:bg-white"
            key={item._id}
          >
            <p className="w-[20px]">{item._id}</p>
            <p className="w-[150px]">{item.User.email}</p>
            <p className="w-[140px]">${item.totalPrice}</p>
            <p className="w-[80px]">{item.createdAt.substring(0, 10)}</p>
            <p
              className={
                item.isPaid
                  ? "font-bold text-green-600"
                  : "font-bold text-yellow-600"
              }
            >
              {item.isPaid ? "Received" : "Pending"}
            </p>
            <Link
              to={`/orders/details/${item._id}`}
              className="bg-teal-600 text-white p-2 font-bold rounded-lg"
            >
              Details
            </Link>
          </div>
        ))}
      </div>
      <PaginateOrders pages={pages} page={page} />
    </div>
  );
}

export default OrderListScreen;
