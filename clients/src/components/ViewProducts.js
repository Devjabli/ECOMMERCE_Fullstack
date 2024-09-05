import React from "react";
import { data } from "../data";

import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";

function ViewProducts() {
  const scrollLeft = () => {
    document.getElementById("content").scrollLeft -= 370;
  };

  const scrollRight = () => {
    document.getElementById("content").scrollLeft += 370;
  };

  return (
    <div className="mt-10">
      <div className="">
        <p className="text-slate-400 text-2xl font-bold">
          <span className="text-slate-700">Discover more.</span> Good things are
          waiting for you
        </p>
        <div className="flex gap-4 w-full justify-end md:mt-0 mt-10">
          <button
            onClick={scrollLeft}
            className="text-2xl border-2 disabled:hidden border-slate-400 text-slate-400 rounded-full p-2 hover:text-slate-600 hover:border-slate-600"
          >
            <AiOutlineArrowLeft />
          </button>
          <button
            onClick={scrollRight}
            className="text-2xl border-2 border-slate-400 text-slate-400 rounded-full p-2 hover:text-slate-600 hover:border-slate-600"
          >
            <AiOutlineArrowRight />
          </button>
        </div>
        <div
          id="content"
          className="mt-8 carousel p-4 flex gap-2 items-center justify-start overflow-x-auto scroll-smooth no-scrollbar"
        >
          {data.map((item) => (
            <div key={item.id}>
              <div
                className={`flex gap-3 p-4 w-[350px] h-[200px] border-[1px] rounded-md ${item.bgCl} `}
              >
                <div className="flex flex-col justify-between">
                  <div>
                    <p className="text-xs text-slate-700 pb-2">
                      Digital gift cards
                    </p>
                    <p className="text-xl">Give the gift of choice</p>
                  </div>
                  <button className="text-left text-sm bg-white w-fit p-2 rounded-3xl">
                    Show me all
                  </button>
                </div>
                <img src={item.image} alt="" className="w-[50%]" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ViewProducts;
