import React, { useEffect, useState } from "react";
import { MdOutlineModeEdit, MdDelete, MdSearch } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";
import PaginateProducts from "../components/paginators/PaginateProducts";

function ProductScreen() {
  const [product, setProduct] = useState([]);
  const [open, setOpen] = useState(false);

  const [pages, setPages] = useState(1);
  const [keyword, setKeyword] = useState("");

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const page = searchParams.get("page") || 1;

  useEffect(() => {
    fetch(`/api/products/?keyword=${keyword}&page=${page}`)
      .then((response) => response.json())
      .then((data) => {
        const { products, pages } = data;
        setProduct(products);
        setPages(pages);
      })
      .catch((error) => error);
  }, [page, keyword]);

  const handleDelete = (id) => {
    fetch(`/api/products/${id}/`, {
      method: "DELETE",
    });
    const updateProduct = product.filter((prd) => prd._id !== id);
    setProduct(updateProduct);
    setOpen(!open);
  };

  return (
    <div className="bg-white mx-4">
      <div className="md:flex justify-between gap-2 w-full  items-center my-9">
        <div className="bg-slate-100 md:w-[70%] px-4 py-2 flex justify-between gap-3 rounded-full">
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className="bg-slate-100 outline-none text-xs w-full"
            placeholder="Search for product by name"
          />
          <div className="text-2xl text-slate-400">
            <MdSearch />
          </div>
        </div>
        <div className="px-4 py-2 bg-slate-400 text-sm hover:bg-slate-600 text-slate-100 md:mt-0 mt-4 rounded-full md:w-[30%]">
          <Link to="/product/create">Create product +</Link>
        </div>
      </div>
      <div className=" flex flex-col bg-white">
        {product.map((item) => (
          <div
            key={item._id}
            className={
              item.countInStock > 0
                ? "flex justify-between items-center bg-slate-100 my-1 py-1 px-2 rounded-xl border-[1px]"
                : "flex justify-between items-center bg-slate-100 my-1 py-1 rounded-3xl opacity-40"
            }
          >
            {open && (
              <>
                <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                  <div className="relative w-auto my-6 mx-auto max-w-3xl">
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white p-4 outline-none focus:outline-none">
                      <p className="py-2">
                        Are you sure you want to delete this product
                      </p>
                      <div className="flex gap-2">
                        <button
                          onClick={() => setOpen(false)}
                          className="bg-slate-200 px-4 py-2 rounded-md"
                        >
                          cancel
                        </button>
                        <button
                          onClick={() => handleDelete(item._id)}
                          className="bg-red-200 text-red-600 px-4 py-2 rounded-md"
                        >
                          delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
              </>
            )}
            <div className="md:flex items-center">
              <img
                src={item.image}
                alt={item._id}
                className={
                  item.countInStock > 0
                    ? "w-14 h-14 bg-gray-200 p-2 rounded-full"
                    : "w-14 p-2 animate-ping"
                }
              />
              <p className="w-[140px] font-light md:pl-3 md:mt-0 text-xs mt-2">
                {item.name}
              </p>
            </div>
            <p className="text-xs text-slate-600">${item.price}</p>
            <p className="text-xs md:text-sm text-slate-600">
              {item.createdAt.substring(0, 10)}
            </p>
            <div className="flex gap-1 items-start">
              <Link
                to={`/Product/update/${item._id}`}
                className="bg-slate-400 text-white text-xs flex items-center hover:bg-teal-600 gap-2 md:px-2 px-2 py-1 rounded-md"
              >
                <MdOutlineModeEdit />
                <p className="md:visible md:relative invisible absolute">
                  Edit
                </p>
              </Link>
              <button
                onClick={() => setOpen(!open)}
                className="bg-slate-300 text-slate-500 hover:bg-red-200 hover:shadow-sm hover:shadow-red-200 text-xs flex items-center gap-2 px-2 py-1 rounded-md"
              >
                <MdDelete />
                <p className="md:visible md:relative invisible absolute">
                  Delete
                </p>
              </button>
            </div>
          </div>
        ))}
        <PaginateProducts page={page} pages={pages} />
      </div>
    </div>
  );
}

export default ProductScreen;
