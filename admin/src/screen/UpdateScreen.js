import React, { useEffect, useState } from "react";
import { BsFillCloudCheckFill, BsCloudUpload } from "react-icons/bs";
import { useParams } from "react-router-dom";

function UpdateScreen() {
  const [product, setProduct] = useState({});
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [countInStock, setCountInStock] = useState("");
  const [image, setImage] = useState(null);

  const [message, setMessage] = useState("");
  const { id } = useParams();

  const handleSubmit = (e) => {
    e.preventDefault();

    const form_data = new FormData();

    countInStock && form_data.append("countInStock", countInStock);
    description && form_data.append("description", description);
    name && form_data.append("name", name);
    category && form_data.append("category", category);
    brand && form_data.append("brand", brand);
    image && form_data.append("image", image);
    price && form_data.append("price", price);

    fetch(`/api/products/${id}/`, {
      method: "PATCH",
      body: form_data,
    })
      .then(() => {
        setImage(null);
      })
      .then(() => setMessage("PRODUCT CREATED SUCCESSFULLY"))
      .catch((error) => error);
  };

  useEffect(() => {
    fetch(`/api/products/${id}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => setProduct(data))
      .catch((error) => error);
  }, [id]);

  return (
    <div>
      <div className="p-8">
        {message && (
          <p className="text-green-700 bg-green-300 w-full p-4">updated</p>
        )}
        <form
          key={product._id}
          onSubmit={handleSubmit}
          className="bg-white p-4 flex flex-col gap-4"
        >
          <div className="flex justify-between items-center">
            <button
              type="submit"
              className="bg-teal-700 hover:bg-teal-800 flex justify-center text-white w-fit p-3 rounded-md"
            >
              Update
            </button>
            <p>product ID: {product._id}</p>
          </div>
          <div>
            <p className="text-sm mb-2">Product name</p>
            <input
              type="text"
              onChange={(e) => setName(e.target.value)}
              className="bg-slate-100 p-2 font-bold text-md w-full outline-none"
              placeholder={product.name}
            />
          </div>
          <div className="flex gap-4">
            <div className="w-full">
              <p className="text-sm mb-2">Price</p>
              <input
                type="text"
                onChange={(e) => setPrice(e.target.value)}
                className="bg-slate-100 p-2 font-bold text-md w-full outline-none"
                placeholder={product.price}
              />
            </div>
            <div className="w-full">
              <p className="text-sm mb-2">Count In Stock</p>
              <input
                type="text"
                onChange={(e) => setCountInStock(e.target.value)}
                className="bg-slate-100 p-2 font-bold text-md w-full outline-none"
                placeholder={product.countInStock}
              />
            </div>
            <div className="w-full">
              <p>category</p>
              <p className="bg-slate-100 p-4 text-xs w-full outline-none">
                {product.category === "BG" && "BAG"}
                {product.category === "SH" && "SHOES"}
                {product.category === "TT" && "TSHIRT"}
                {product.category === "HA" && "HAT"}
                {product.category === "HO" && "HOODIE"}
                {product.category === "PH" && "PHONES"}
                {product.category === "JA" && "JACKETS"}
                {product.category === "PA" && "PANTS"}

              </p>
            </div>
          </div>
          <div>
            <p className="text-sm mb-2">Brand</p>
            <input
              type="text"
              onChange={(e) => setBrand(e.target.value)}
              className="bg-slate-100 p-2 font-bold text-md w-full outline-none"
              placeholder={product.brand}
            />
          </div>
          <div className="flex gap-4">
            <div className="w-full">
              <p className="text-sm mb-2">Description</p>
              <textarea
                onChange={(e) => setDescription(e.target.value)}
                rows="5"
                className="bg-slate-100 p-2 font-bold text-md w-full outline-none"
                placeholder={product.description}
              ></textarea>
            </div>
            <img
              src={image || product.image}
              alt=""
              className="w-40 bg-slate-100 p-4"
            />
          </div>
          {!image ? (
            <label class="border-[1px] border-indigo-800 rounded-sm cursor-pointer bg-gray-50">
              <div class="flex gap-2 items-center justify-center p-2 text-gray-500 text-center">
                <BsCloudUpload fontSize={30} />
                <p class="text-xs text-gray-500">UPLOAD IMAGE</p>
              </div>
              <input
                id="dropzone-file"
                type="file"
                class="hidden"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </label>
          ) : (
            <label class="border-[1px] border-green-800 rounded-sm cursor-pointer bg-green-400">
              <div class="flex gap-2 items-center justify-center p-2 text-green-900 text-center">
                <BsFillCloudCheckFill fontSize={30} />
                <p class="text-xs">UPLOAD IS READY</p>
              </div>
              <input
                id="dropzone-file"
                type="file"
                class="hidden"
                onChange={(e) => setImage(e.target.files[0])}
                required
              />
            </label>
          )}
        </form>
      </div>
    </div>
  );
}

export default UpdateScreen;
