import React, { useEffect, useState } from "react";
import { FaDollarSign, FaTruck, FaTshirt, FaUsers } from "react-icons/fa";
import BarChart from "../Charts/BarChart";
import DoughnutChart from "../Charts/DoughnutChart";

function HomeScreen() {

  const [product, setProduct] = useState([]);
  const [order, setOrder] = useState([]);
  const [users, setUsers] = useState([])
  useEffect(() => {
    // FETCH PRODUCTS
    fetch("/api/products/list/")
      .then((response) => response.json())
      .then((data) => setProduct(data))
      .catch(error =>error)
    // FETCH ORDERS
    fetch("/api/orders/list/")
      .then((response) => response.json())
      .then((data) => setOrder(data))
      .catch(error =>error)

    // FETCH USERS
    fetch('/api/users/')
      .then((response) => response.json())
      .then((data) => setUsers(data))  
      .catch(error =>error)

  }, []);



  return (
    <div className="mt-20 mx-8">
      <div className="lg:flex flex-wrap gap-10 border-b-2 pb-10">
        <div className="flex gap-4 border-[1px] p-4 lg:w-fit rounded-md mb-6 lg:mb-0 bg-white">
          <div className="text-xl bg-green-200 text-slate-500 rounded-full h-fit p-3">
            <FaDollarSign />
          </div>
          <div>
            <p>Revenue</p>
            <p className="text-2xl font-bold text-slate-500">
              {order.reduce(
                (acc, value) => acc + value.isPaid * value.totalPrice,
                0
              ) || undefined}{" "}
              $
            </p>
            <p className="text-xs font-light w-40">
              Shipping fees are not included{" "}
            </p>
          </div>
        </div>
        <div className="flex gap-4 border-[1px] p-4 lg:w-fit rounded-md mb-6 lg:mb-0 bg-white">
          <div className="text-xl bg-green-200 text-slate-500 rounded-full h-fit p-3">
            <FaTruck />
          </div>
          <div>
            <p>Orders</p>
            <p className="text-2xl font-bold text-slate-500">{order.length || undefined}</p>
            <p className="text-xs font-light w-40">
              Excluding orders in transit{" "}
            </p>
          </div>
        </div>
        <div className="flex gap-4 border-[1px] p-4 lg:w-fit rounded-md mb-6 lg:mb-0 bg-white">
          <div className="text-xl bg-green-200 text-slate-500 rounded-full h-fit p-3">
            <FaTshirt />
          </div>
          <div>
            <p>Products</p>
            <p className="text-2xl font-bold text-slate-500">
              {product.length || undefined}
            </p>
            <p className="text-xs font-light w-40">In 19 Categories</p>
          </div>
        </div>
        <div className="flex gap-4 border-[1px] p-4 lg:w-fit rounded-md mb-6 lg:mb-0 bg-white">
          <div className="text-xl bg-green-200 text-slate-500 rounded-full h-fit p-3">
            <FaUsers />
          </div>
          <div>
            <p>Users</p>
            <p className="text-2xl font-bold text-slate-500">{users.length || undefined}</p>
            <p className="text-xs font-light w-40">Costumers in store</p>
          </div>
        </div>
      </div>
      <div className="md:flex gap-10 w-full">
        <BarChart/>
        <DoughnutChart/>
      </div>
    </div>
  );
}

export default HomeScreen;
