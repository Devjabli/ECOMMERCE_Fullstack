import React from "react";
import ShippingAddress from "./formshipping/ShippingAddress";
import ShippingPayment from "./formshipping/ShippingPayment";

function FormShipping() {
  return (
    <div className="flex flex-col gap-6">
      <ShippingAddress/>
      <ShippingPayment/>
    </div>
  );
}

export default FormShipping;
