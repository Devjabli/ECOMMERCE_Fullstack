import React from "react";
import { AiOutlineClose, AiOutlineSearch} from "react-icons/ai";
import {BsFacebook, BsYoutube, BsTwitter} from 'react-icons/bs'
function SideBar({setOpen}) {
  return (
    <div className="flex flex-col gap-20 text-xl h-[100vh] text-slate-500 px-4 py-8 bg-slate-200">
      <div className="flex justify-between">
        <p className="font-bold text-2xl text-slate-600">
          <span className="text-teal-500">E</span>
          shop.
        </p>
        <button className="text-2xl hover:scale-110" onClick={ () => setOpen(false)}>
          <AiOutlineClose />
        </button>
      </div>
      <div>
        <p className="text-left w-[60%] text-[16px]">
          Discover the most outstanding articles on all topics of life. Write
          your stories and share them
        </p>
        <div className="flex gap-5 text-4xl mt-4">
          <BsFacebook/>
          <BsYoutube/>
          <BsTwitter/>

        </div>
        <div className="flex justify-between bg-slate-100 md:w-[50%] p-2 mt-6 text-slate-900 rounded-md">
          <input type="text" className="bg-slate-100 w-[90%] outline-none text-sm"/>
          <div className="bg-slate-100 text-2xl cursor-pointer">
            <AiOutlineSearch/>
          </div>
        </div>
      </div>
      <b>Men</b>
      <b>Women</b>
      <b>Beauty</b>
      <b>Sport</b>
    </div>
  );
}

export default SideBar;
