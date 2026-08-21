
import { useLocation } from "react-router-dom";
import { useState } from "react";

const OrderFood = () => {
  const { state: item } = useLocation();

  const [qty, setQty] = useState(1);
  const [address, setAddress] = useState("");


  const deliveryFee = 20;
  const itemTotal = qty * Number(item.price);
  const totalBill = itemTotal + deliveryFee;

  const handleclick = async () => {
    if (!address.trim()) return alert("Please enter a delivery address");
    try {
      const axios = (await import('axios')).default;
      const res = await axios.post("/api/order/create", {
        partnerId: item.foodPartner || item.partnerId,
        foodId: item._id,
        qty,
        totalBill,
        address,
        video: item.video,
        title: item.name || item.title
      }, { withCredentials: true });
      if (res.data.success) {
        alert("Order placed successfully!");
        window.location.href = "/orders"; // redirect to user orders page
      }
    } catch (err) {
      console.error(err);
      alert("Failed to place order.");
    }
  }

  return (
    <div className="bg-[#0D0D0D] text-white min-h-screen pb-24 p-4">

      <video
        src={item.video}  // backend se jo URL aaya hai
        className="w-full h-56 rounded-lg object-cover"
        controls
        autoPlay
        muted
        loop
        playsInline
      />

      {/* TITLE */}
      <h1 className="text-2xl font-bold mt-4">
        {item.title || "Food Item"}
      </h1>

      {/* DESCRIPTION */}
      <p className="text-gray-300 mt-1">{item.description}</p>

      {/* PRICE */}
      <p className="text-orange-400 text-xl font-bold mt-3">
        ₹{item.price}
      </p>

      {/* QUANTITY SECTION */}
      <div className="bg-[#111827] mt-6 p-4 rounded-xl flex items-center justify-between">
        <span className="text-lg">Quantity</span>

        <div className="flex gap-4">
          <button
            onClick={() => qty > 1 && setQty(qty - 1)}
            className="bg-[#1F2937] w-8 h-8 flex items-center justify-center rounded-full text-xl"
          >
            -
          </button>

          <span className="text-xl font-semibold">{qty}</span>

          <button
            onClick={() => setQty(qty + 1)}
            className="bg-orange-500 w-8 h-8 flex items-center justify-center rounded-full text-xl text-black"
          >
            +
          </button>
        </div>
      </div>

      {/* ADDRESS SECTION */}
      <div className="mt-6">
        <label className="text-lg">Delivery Address</label>
        <textarea
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="w-full bg-[#111827] text-white p-3 rounded-xl mt-2 h-24 outline-none resize-none"
          placeholder="Enter delivery address"
        />
      </div>

      {/* BILL SUMMARY */}
      <div className="bg-[#111827] mt-6 p-4 rounded-xl">
        <h2 className="text-xl font-semibold mb-3">Bill Summary</h2>

        <div className="flex justify-between text-gray-300">
          <span>Item Total</span>
          <span>₹{itemTotal}</span>
        </div>

        <div className="flex justify-between text-gray-300 mt-2">
          <span>Delivery Fee</span>
          <span>₹{deliveryFee}</span>
        </div>

        <div className="border-t border-gray-700 my-3"></div>

        <div className="flex justify-between text-orange-400 text-lg font-bold">
          <span>Total</span>
          <span>₹{totalBill}</span>
        </div>
      </div>

      {/* STICKY BOTTOM BUTTON */}
      <div className="fixed left-0 right-0 bottom-0 bg-[#0D0D0D] border-t border-gray-800 p-4">
        <button onClick={handleclick} className="w-full bg-orange-500 py-3 rounded-xl text-black font-bold text-lg">
          Place Order • ₹{totalBill}
        </button>
      </div>
    </div>
  );
};

export default OrderFood;
