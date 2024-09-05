import React, {useState,  useEffect } from 'react'
import { Link } from 'react-router-dom'


function ProductReportList() {
  const [report, setReport] = useState([])
  useEffect(() => {
    fetch('/api/products/reports/')
    .then(response => response.json())
    .then(data => setReport(data))
    .catch(error => error)
  },[])
  return (
    <div>
    <div className="p-8 border-b-[1px]">
      <p className="text-3xl">Report Users:</p>
    </div>
    <div className="p-6 flex flex-col">
      <div className="flex justify-between gap3 text-[13px] p-3">
        <p className="w-[80px]">#ID</p>
        <p className="w-[150px]">Email</p>
        <p className="w-[80px]">Date</p>
        <p className="p-3">Details</p>
      </div>
      {report.map((item) => (
        <div className="flex justify-between gap-3 text-[13px] font-light p-3 hover:bg-white" key={item._id}>
          <p className="w-[80px]">{item._id}</p>
          <p className="w-[150px]">{item.User.email}</p>
          <p className="w-[80px]">{item.createdAt.substring(0, 10)}</p>  
          <Link to={`/orders/details/${item._id}`} className="bg-teal-600 text-white p-2 font-bold rounded-lg">Details</Link>
        
        </div>
      ))}
    </div>
  </div>
  )
}

export default ProductReportList