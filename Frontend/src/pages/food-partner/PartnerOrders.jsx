import React, { useEffect, useState } from "react";
import axios from "axios";

const PartnerOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // We will update the backend to not require :id and use the token's ID.
    axios.get("http://localhost:3000/api/order/partner/me", { withCredentials: true })
      .then(res => setOrders(res.data.orders))
      .catch(err => console.error("Error fetching orders:", err));
  }, []);

  const handleStatusUpdate = async (orderId, status) => {
    let deliveryTime = undefined;
    if (status === "accepted") {
      deliveryTime = prompt("Enter estimated delivery time (e.g. 30 mins):");
      if (!deliveryTime) return; // User cancelled
    }
    
    try {
      await axios.put(`http://localhost:3000/api/order/status/${orderId}`, { status, deliveryTime }, { withCredentials: true });
      setOrders(orders.map(o => o._id === orderId ? { ...o, status, deliveryTime } : o));
    } catch (err) {
      console.error(err);
      alert("Failed to update status");
    }
  };

  return (
    <div className="bg-[#0D0D0D] text-white min-h-screen p-6 pb-24">
      <h1 className="text-3xl font-bold mb-6 text-orange-500">Manage Orders</h1>
      {orders.length === 0 ? (
        <p className="text-gray-400">No orders yet.</p>
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
              <p className="text-gray-400 mt-2">Address: <span className="text-white">{order.address}</span></p>
              
              {order.status === 'pending' && (
                <div className="flex gap-3 mt-4">
                  <button 
                    onClick={() => handleStatusUpdate(order._id, 'accepted')}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-2 rounded-lg transition-colors"
                  >
                    Accept
                  </button>
                  <button 
                    onClick={() => handleStatusUpdate(order._id, 'rejected')}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-2 rounded-lg transition-colors"
                  >
                    Reject
                  </button>
                </div>
              )}
              {order.status === 'accepted' && (
                 <div className="mt-4">
                   {order.deliveryTime && (
                     <p className="text-green-400 mb-3 font-medium flex items-center gap-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Estimated Delivery: {order.deliveryTime}
                     </p>
                   )}
                   <button 
                    onClick={() => handleStatusUpdate(order._id, 'delivered')}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-lg transition-colors"
                  >
                    Mark as Delivered
                  </button>
                 </div>
              )}
              {order.status === 'delivered' && (
                 <p className="text-blue-400 mt-3 font-medium flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Order Delivered Successfully
                 </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PartnerOrders;
