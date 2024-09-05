import React, { useState } from "react";
import {
  AiOutlineShoppingCart,
  AiOutlineUser,
  AiOutlineMenu,
  AiOutlineLogin,
  AiOutlineLogout,
  AiOutlineOrderedList
} from "react-icons/ai";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import SideBar from "./SideBar";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { logOut } from "../feataures/users/authUserSlice";
import { useDispatch } from "react-redux";

function Header() {
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();

  const { cartItems } = useSelector((state) => state.cart);
  const { itemList } = useSelector((state) => state.wish);
  const { userInfo } = useSelector((state) => state.authUser);

  return (
    <div className="flex justify-between items-center px-4 py-8 max-w-7xl mx-auto bg-white top-0 z-10 sticky border-b mb-8">
      <div
        className={`lg:hidden z-20 text-center absolute top-0 ease-out transition-all duration-500 w-full left-0 ${
          open ? "left-0" : "left-[-100%]"
        }`}
      >
        <SideBar setOpen={setOpen} />
      </div>
      <button
        className="lg:invisible visible text-2xl lg:absolute hover:text-slate-500 hover:scale-105"
        onClick={() => setOpen(!open)}
      >
        <AiOutlineMenu />
      </button>
      <Link to="/" className="flex justify-between">
        <p className="font-bold text-2xl text-slate-600">
          <span className="text-teal-500">E</span>
          shop.
        </p>
      </Link>
      <div className="flex lg:gap-20 gap-10 lg:visible lg:relative invisible absolute">
        <p>Men</p>
        <p>Women</p>
        <p>Beauty</p>
        <p>Sport</p>
      </div>
      <div className="flex gap-3 text-3xl">
        {userInfo && userInfo.email ? (
          <div className="flex gap-3">
            <button className="flex flex-col items-start" onClick={() => dispatch(logOut())}>
              <AiOutlineLogout />
              <p className="text-sm">logout</p>
            </button>
            <div>
              <AiOutlineUser />
              <p className="text-sm">{userInfo.first_name}</p>
            </div>
            <Link to='/order'>
              <AiOutlineOrderedList/>
              <p className="text-sm">my orders</p>
            </Link>
          </div>
        ) : (
          <Link to="/login">
            <AiOutlineLogin />
            <p className="text-sm">login</p>
          </Link>
        )}
        <Link to="/wish_list" className="relative flex flex-col items-center">
          <MdOutlineFavoriteBorder />
          <p className="absolute top-[-6px] left-3 border-2 border-white bg-blue-400 text-white flex items-center justify-center text-xs w-[20px] h-[20px] rounded-full">
            {itemList.length}
          </p>
          <div className="text-sm">like</div>
        </Link>
        <Link to="/cart" className="relative">
          <div className="flex flex-col justify-start items-center">
            <AiOutlineShoppingCart />
            <p className="absolute top-[-6px] left-3 border-2 border-white bg-blue-400 text-white flex items-center justify-center text-xs w-[20px] h-[20px] rounded-full">
              {cartItems.length}
            </p>
            <div className="text-sm">cart</div>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Header;
