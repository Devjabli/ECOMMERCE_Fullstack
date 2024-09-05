import React from "react";
import {
  MdOutlineHome,
  MdOutlineShoppingBag,
  MdOutlineShoppingCart,
  MdOutlineFeedback,
  MdOutlineSupervisedUserCircle,
  MdOutlineReportGmailerrorred
} from "react-icons/md";
import { Link } from "react-router-dom";



function SideBar() {

  return (
    <div className="bg-slate-100 h-[100vh] sticky top-0">
      <div className="p-4">
        <div className="p-2 my-4 text-orange-600 font-bold text-3xl ">SHOP</div>
        <div className="flex flex-col gap-4">
          <Link to='/' className="flex gap-3 text-slate-500 bg-green-200 w-[170px] p-3 rounded-md">
            <p className="text-2xl">
              <MdOutlineHome />
            </p>
            <p className="text-sm">Dashboard</p>
          </Link>
          <Link to='/product/list/?keyword=&page=1' className="flex items-center gap-3 text-slate-500 w-[170px] p-3 hover:bg-slate-200 rounded-md">
            <p className="text-2xl">
              <MdOutlineShoppingBag />
            </p>
            <p className="text-sm">Products</p>
          </Link>
         
          <Link to='/orders/list/?keyword=&page=1' className="flex items-center gap-3 text-slate-500 w-[170px] p-3 hover:bg-slate-200 rounded-md">
            <p className="text-2xl">
              <MdOutlineShoppingCart />
            </p>
            <p className="text-sm">Orders</p>
          </Link>
          <div className="flex items-center gap-3 text-slate-500 w-[170px] p-3 hover:bg-slate-200 rounded-md">
            <p className="text-2xl">
              <MdOutlineSupervisedUserCircle />
            </p>
            <p className="text-sm">Customers</p>
          </div>
          <div className="flex items-center gap-3 text-slate-500 w-[170px] p-3 hover:bg-slate-200 rounded-md">
            <p className="text-2xl">
              <MdOutlineFeedback />
            </p>
            <p className="text-sm">Feedbacks</p>
          </div>
          <Link to='/product/list/report' className="flex items-center gap-3 text-slate-500 w-[170px] p-3 hover:bg-slate-200 rounded-md">
            <p className="text-2xl">
              <MdOutlineReportGmailerrorred />
            </p>
            <p className="text-sm">Reports</p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SideBar;
