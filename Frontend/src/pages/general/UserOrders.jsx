import React, { useEffect, useState } from "react";
import axios from "axios";

const UserOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get("/api/order/user", { withCredentials: true })
      .then(res => setOrders(res.data.orders))
      .catch(err => console.error("Error fetching orders:", err));
  }, []);

  return (
    <div className="bg-[#0D0D0D] text-white min-h-screen p-6 pb-24">
      <h1 className="text-3xl font-bold mb-6 text-orange-500">My Orders</h1>
      {orders.length === 0 ? (
        <p className="text-gray-400">You haven't placed any orders yet.</p>
      ) : (
        <div className="grid gap-4">
          {orders.map(order => (
            <div key={order._id} className="bg-[#111827] p-5 rounded-xl border border-gray-800">
              <div className="flex justify-between items-start mb-2">
                <h2 className="text-xl font-bold">{order.title}</h2>
                <span className={`px-3 py-1 rounded text-sm font-bold capitalize
                  ${order.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' : 
                    order.status === 'accepted' ? 'bg-green-500/20 text-green-400' : 
                    order.status === 'delivered' ? 'bg-blue-500/20 text-blue-400' : 'bg-red-500/20 text-red-400'}`}>
                  {order.status}
                </span>
              </div>
              <p className="text-gray-400">Qty: <span className="text-white font-semibold">{order.qty}</span></p>
              <p className="text-gray-400">Total: <span className="text-orange-400 font-bold">₹{order.totalBill}</span></p>
              
              {order.status === 'accepted' && order.deliveryTime && (
                <div className="mt-4 p-3 bg-green-900/20 border border-green-800 rounded-lg">
                  <p className="text-green-400 font-medium flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Expected Delivery: {order.deliveryTime}
                  </p>
                </div>
              )}
              {order.status === 'delivered' && (
                <div className="mt-4 p-3 bg-blue-900/20 border border-blue-800 rounded-lg">
                  <p className="text-blue-400 font-medium flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Delivered! Enjoy your food.
                  </p>
                </div>
              )}
              {order.status === 'rejected' && (
                <div className="mt-4 p-3 bg-red-900/20 border border-red-800 rounded-lg">
                  <p className="text-red-400 font-medium text-sm">
                    Unfortunately, the partner was unable to accept this order.
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserOrders;
