import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const FoodPartnerProfile = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const [videos, setVideos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/food-partner/${id}`, { withCredentials: true })
      .then((res) => {
        setProfile(res.data.foodPartner);
        setVideos(res.data.foodPartner.foodItems);
      })
      .catch((err) => console.error(err));
  }, [id]);

  if (!profile) return <div className="text-white p-4">Loading...</div>;

  return (
    <main className="w-full max-w-xl mx-auto p-8 bg-black text-white min-h-screen">
      {/* PROFILE TOP */}
      <section className="flex flex-col items-center mt-6 mb-6 px-4">
        <img
          className="w-32 h-32 rounded-full object-cover border-2 border-gray-300 shadow-md"
          src="https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg"
          alt="avatar"
        />
        <h1 className="text-2xl font-bold mt-4 tracking-wide">{profile.name}</h1>
        <p className="text-gray-400 text-base max-w-[90%] text-center mt-1">{profile.address}</p>

        <button
          className="mt-4 px-5 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg shadow-md"
          onClick={() => navigate("/create-food")}
        >
          + Add Food
        </button>
      </section>

      <div className="border-b border-neutral-800 my-6"></div>

      {/* FOOD GRID */}
      <section className="grid grid-cols-3 gap-[2px]">
        {videos.map((v) => (
          <div
            key={v._id}
            className="aspect-square bg-black overflow-hidden cursor-pointer"
            onClick={() => navigate("/order-food", { state: { ...v, partnerId: profile._id } })}
          >
            <video
              className="w-full h-full object-cover"
              src={v.video}
              muted
              loop
              autoPlay
            />
          </div>
        ))}
      </section>
    </main>
  );
};

export default FoodPartnerProfile;
