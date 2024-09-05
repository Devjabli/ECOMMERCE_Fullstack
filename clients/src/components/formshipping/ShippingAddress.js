import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  cartShippingAddress,
  emptyShippingAddress,
} from "../../feataures/cart/cartSlice";

import { FaUser } from "react-icons/fa";
import {
  MdOutlineLocationOn,
  MdOtherHouses,
  MdModeEditOutline,
  MdLocalPhone,
} from "react-icons/md";

function ShippingAddress() {
  const dispatch = useDispatch();

  const { shippingAddress } = useSelector((state) => state.cart);

  const [country, setCountry] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [appartment, setAppartment] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [cellPhone, setCellPhone] = useState("");

  const [open, setOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      cartShippingAddress({
        firstName,
        lastName,
        appartment,
        country,
        city,
        address,
        postalCode,
        cellPhone,
      })
    );
    setOpen(!open);
  };

  return (
    <div className="bg-slate-100 rounded-md border-[1px] p-4">
      {open && (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <form
              onSubmit={handleSubmit}
              className="relative w-auto my-6 mx-auto max-w-3xl bg-white text-xs pb-3 px-4 rounded-md"
            >
              <div className="flex justify-between items-center">
                <p className="py-3">Shipping Address</p>
                <button
                  onClick={() => setOpen(!open)}
                  className="w-6 h-6 flex justify-center rounded-full border-[1px] text-slate-600 text-sm"
                >
                  x
                </button>
              </div>
              {/* FIRST NAME AND LAST NAME FORMS */}
              <div className="flex gap-2">
                <div className="bg-slate-100 flex items-center px-2 border text-slate-400 rounded-sm">
                  <FaUser />
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="bg-slate-100 p-2 outline-none"
                    placeholder="First Name"
                  />
                </div>
                <div className="bg-slate-100 flex items-center px-2 border text-slate-400 rounded-sm">
                  <FaUser />
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="bg-slate-100 p-2 outline-none"
                    placeholder="Last Name"
                  />
                </div>
              </div>
              {/* ADDRESS FORMS */}
              <div className="bg-slate-100 flex items-center px-2 border text-slate-400 rounded-sm mt-2">
                <MdOutlineLocationOn fontSize={16} />
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="bg-slate-100 p-2 outline-none w-full"
                  placeholder="Address"
                />
              </div>
              {/* OPTIONAL ADDRESS APPARTMENT FORMS */}
              <div className="bg-slate-100 flex items-center px-2 border text-slate-400 rounded-sm mt-2">
                <MdOtherHouses fontSize={16} />
                <input
                  type="text"
                  value={appartment}
                  onChange={(e) => setAppartment(e.target.value)}
                  className="bg-slate-100 p-2 outline-none w-full"
                  placeholder="Appartment suit, etc (optional)"
                />
              </div>
              {/* CITY AND COUNTRY FORMS */}
              <div className="flex gap-2 mt-2">
                <div className="bg-slate-100 flex items-center px-2 border text-slate-400 rounded-sm">
                  <MdModeEditOutline />
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="bg-slate-100 p-2 outline-none"
                    placeholder="City"
                  />
                </div>
                <div className="bg-slate-100 flex items-center px-2 border text-slate-400 rounded-sm">
                  <MdModeEditOutline />
                  <input
                    type="text"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="bg-slate-100 p-2 outline-none"
                    placeholder="Country"
                  />
                </div>
              </div>
              {/* CODEPOSTAL AND PHONE FORMS */}
              <div className="flex gap-2 mt-2">
                <div className="bg-slate-100 flex items-center px-2 border text-slate-400 rounded-sm">
                  <MdModeEditOutline />
                  <input
                    type="text"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    className="bg-slate-100 p-2 outline-none"
                    placeholder="Code Postal"
                  />
                </div>
                <div className="bg-slate-100 flex items-center px-2 border text-slate-400 rounded-sm">
                  <MdLocalPhone />
                  <input
                    type="text"
                    value={cellPhone}
                    onChange={(e) => setCellPhone(e.target.value)}
                    className="bg-slate-100 p-2 outline-none"
                    placeholder="Phone"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="bg-indigo-500 hover:bg-indigo-600 w-full p-2 text-white mt-4 rounded-md"
              >
                Save The Address
              </button>
            </form>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      )}
      <p className="pb-6 text-xs text-slate-700">Shipping Address</p>
      {Object.keys(shippingAddress).length === 0 ? (
        <button
          onClick={() => setOpen(!open)}
          className="flex flex-col justify-center items-center gap-2 mt-2 border-dashed border-blue-900 border-[1px] p-5 w-fit bg-white"
        >
          <p className="bg-slate-100 w-fit px-2 border-[1px]">+</p>
          <p className="text-[10px]">Add New Address</p>
        </button>
      ) : (
        <div className="p-2">
          <button
            onClick={() => setOpen(!open)}
            className="text-[10px] text-blue-700 py-3"
          >
            + Add New Address
          </button>
          <div className="relative text-[11px] border-[1px] border-slate-300 w-[140px] p-3 rounded-md">
            <button
              onClick={() => dispatch(emptyShippingAddress())}
              className="mt-0 absolute right-2 top-0 font-bold text-md"
            >
              x
            </button>
            <h1 className="font-bold">Home</h1>
            <div className="text-slate-700">
              <p>{shippingAddress.cellPhone}</p>
              <p>{shippingAddress.address}</p>
              <p>{shippingAddress.city}</p>
              <p>{shippingAddress.postalCode}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ShippingAddress;
