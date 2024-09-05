import React, { useState } from "react";
import { BsFillCloudCheckFill, BsCloudUpload } from "react-icons/bs";

function CreateScreen() {

  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState(0);
  const [countInStock, setCountInStock] = useState(0);
  const [image, setImage] = useState(null);

  const [message, setMessage] = useState("");
  const [error, setError] = useState();



  

  const handleSubmit = (e) => {
    e.preventDefault();

    const form_data = new FormData();
    form_data.append("image", image);
    form_data.append("name", name);
    form_data.append("brand", brand);
    form_data.append("description", description);
    form_data.append("category", category);
    form_data.append("price", price);
    form_data.append("countInStock", countInStock);

    fetch('/api/products/', {
      method: "POST",
      body: form_data,
    })
      .then((response) => {
        if (response.status===201) {
          setMessage("PRODUCT CREATED SUCCESSFULLY")
          setName("")
          setBrand("")
          setCategory("")
          setPrice(0)
          setCountInStock(0)
          setDescription("")
          setImage(null)
        }
      })
  };
  return (
    <div>
      <div className="p-8 w-full">
        {message && (
          <p className="text-green-700 bg-green-300 p-4">message</p>
        )}

        <form
          onSubmit={handleSubmit}
          className="bg-white p-4 flex flex-col gap-4 w-full"
          >
            <div className="flex justify-between">

          <button type="submit" className="bg-teal-700 flex justify-center text-white w-fit h-fit p-3 rounded-md">
            Publish
          </button>
          {image && <img src={URL.createObjectURL(image)} alt="Upload" className="w-[30%]"/>}
            </div>
          <div>
            <p className="text-sm mb-2">Product name</p>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-slate-100 p-4 text-xs w-full outline-none"
              placeholder="Type here"
            />
          </div>
          <div className="flex gap-4">
            <div className="w-full">
              <p className="text-sm mb-2">Price</p>
              <input
                type="text"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="bg-slate-100 p-4 text-xs w-full outline-none"
                placeholder="Type here"
              />
            </div>
            <div className="w-full">
              <p className="text-sm mb-2">Count In Stock</p>
              <input
                type="text"
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
                className="bg-slate-100 p-4 text-xs w-full outline-none"
                placeholder="Type here"
              />
            </div>
            <div className="w-full">
              <p className="text-sm mb-2">Categories</p>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="bg-slate-100 p-4 text-xs w-full outline-none"
                required
              >
                <option value="">Choose</option>
                <option value="SH">SHOES</option>
                <option value="TT">TSHIRT</option>
                <option value="BG">BAG</option>
                <option value="HA">HAT</option>
                <option value="HO">HOODIE</option>
                <option value="PH">PHONE</option>
                <option value="JA">JACKETS</option>
              </select>
            </div>
          </div>
          <div>
            <p className="text-sm mb-2">Brand</p>
            <input
              type="text"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              className="bg-slate-100 p-4 text-xs w-full outline-none"
              placeholder="Type here"
            />
          </div>
          <div className="w-full">
            <p className="text-sm mb-2">Description</p>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="5"
              className="bg-slate-100 text-sm w-full outline-none p-3"
              placeholder="Type here"
            ></textarea>
          </div>
          
          {!image ? (
            <label className="border-[1px] border-indigo-800 rounded-sm cursor-pointer bg-gray-50">
              <div className="flex gap-2 items-center justify-center p-2 text-gray-500 text-center">
                <BsCloudUpload fontSize={30} />
                <p className="text-xs text-gray-500">UPLOAD IMAGE</p>
              </div>
              <input
                id="dropzone-file"
                type="file"
                className="hidden"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </label>
          ) : (
            <label className="border-[1px] border-green-800 rounded-sm cursor-pointer bg-green-400">
              <div className="flex gap-2 items-center justify-center p-2 text-green-900 text-center">
                <BsFillCloudCheckFill fontSize={30} />
                <p className="text-xs">UPLOAD IS READY</p>
              </div>
              <input
                id="dropzone-file"
                type="file"
                className="hidden"
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

export default CreateScreen;
