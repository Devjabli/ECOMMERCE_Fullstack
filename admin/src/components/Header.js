import React from "react";
import { MdNotifications, MdLanguage } from "react-icons/md";
import { BiUser } from "react-icons/bi";

function Header() {
  
  return (
    <div className="bg-white sticky top-0">
      <div className="flex justify-between items-center py-4">
        <div>
          
        </div>
        {/*
      */}
        
        <div className="flex items-center gap-6 mr-4">
          <div>
            <div className="relative">
              <div className="text-2xl text-slate-500">
                <MdNotifications />
              </div>
              <div className="bg-red-600 text-white text-xs rounded-full w-[16px] h-[16px] flex justify-center items-center absolute top-[-4px] left-4">
                0
              </div>
            </div>
          </div>
          <div>
            <div className="text-2xl text-slate-500">
              <MdLanguage />
            </div>
          </div>
          <div>
            <div className="text-2xl text-slate-500">
              <BiUser />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
