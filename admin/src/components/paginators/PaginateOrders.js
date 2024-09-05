import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { BsArrowLeftSquareFill, BsArrowRightSquareFill } from "react-icons/bs";
import {MdOutlineKeyboardDoubleArrowLeft, MdOutlineKeyboardDoubleArrowRight} from "react-icons/md"

function PaginateOrders({ page, pages, keyword = "" }) {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const currentPage = parseInt(searchParams.get("page")) || 1;

  const displayPages = 4;

  const pageButtons = [];
  let startPage = Math.max(0, currentPage - Math.floor(displayPages / 2));
  let endPage = Math.min(pages, startPage + displayPages - 1);

  if (endPage - startPage < displayPages - 1) {
    startPage = Math.max(0, endPage - displayPages + 1);
  }


  for (let i = startPage; i < endPage; i++) {
    pageButtons.push(i);
  }

  const previousPage = () => {
    if (currentPage > 1) {
      searchParams.set("page", currentPage - 1);
      navigate(`?${searchParams.toString()}`);
    }
  };

  const nextPage = () => {
    searchParams.set("page", currentPage + 1);
    navigate(`?${searchParams.toString()}`);
  };


  const start = () => {
    searchParams.set("page", 1);
    navigate(`?${searchParams.toString()}`)
  }

  const end = () => {
    searchParams.set("page", pages);
    navigate(`?${searchParams.toString()}`)
  }
  

  return (
    (pages > 1 && page < pages + 1) && (
      <div className="flex gap-2 mt-4 border-[1px] w-fit p-2 rounded-lg bg-slate-200">
        <button
          onClick={previousPage}
          disabled={page == 1}
          className="disabled:cursor-not-allowed disabled:text-slate-300 text-2xl text-slate-400 px-2"
        >
          <BsArrowLeftSquareFill />
        </button>
        <button onClick={start} disabled={page == 1} className="disabled:text-slate-400">
          <MdOutlineKeyboardDoubleArrowLeft/>
        </button>
        {pageButtons.map((x) => (
          <Link
            key={x + 1}
            to={`/orders/list/?keyword=${keyword}&page=${x + 1}`}
          >
            <p
              className={`${
                page == x + 1
                  ? "bg-teal-700 text-white rounded-full transition-all duration-700"
                  : "bg-none text-slate-900"
              } text-xs active:bg-slate-400 active:rounded-full  disabled:bg-slate-200 px-3 py-2 `}
            >
              {x + 1}
            </p>
          </Link>
        ))}
        <button onClick={end} disabled={page == pages} className="disabled:text-slate-500">
          <MdOutlineKeyboardDoubleArrowRight/>
        </button>
        <button
          onClick={nextPage}
          disabled={currentPage >= pages}
          className="disabled:cursor-not-allowed disabled:text-slate-300 text-slate-400 text-2xl px-2"
        >
          <BsArrowRightSquareFill />
        </button>
      </div>
    )
  );
}

export default PaginateOrders;