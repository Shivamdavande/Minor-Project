import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const FoodPartnerProfile = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const [videos, setVideos] = useState([]);
  const navigate = useNavigate();

  const [selectedVideo, setSelectedVideo] = useState(null);

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
    <main className="w-full max-w-xl mx-auto p-8 bg-black text-white min-h-screen relative">
      {/* LOGOUT BUTTON (TOP RIGHT) */}
      <button
        className="absolute top-6 right-6 px-4 py-2 bg-red-600/80 hover:bg-red-700 text-white text-sm font-semibold rounded-lg shadow-md transition-colors"
        onClick={async () => {
          try {
            await axios.get("http://localhost:3000/api/auth/food-partner/logout", { withCredentials: true });
            window.location.href = "/food-partner/login";
          } catch (err) {
            console.error(err);
            window.location.href = "/food-partner/login";
          }
        }}
      >
        Logout
      </button>

      {/* PROFILE TOP */}
      <section className="flex flex-col items-center mt-6 mb-6 px-4">
        <img
          className="w-32 h-32 rounded-full object-cover border-2 border-gray-300 shadow-md"
          src="https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg"
          alt="avatar"
        />
        <h1 className="text-2xl font-bold mt-4 tracking-wide">{profile.name}</h1>
        <p className="text-gray-400 text-base max-w-[90%] text-center mt-1">{profile.address}</p>

        <div className="flex gap-4 mt-4">
          <button
            className="px-5 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg shadow-md transition-colors"
            onClick={() => navigate("/create-food")}
          >
            + Add Food
          </button>
          <button
            className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition-colors"
            onClick={() => navigate("/food-partner/orders")}
          >
            Manage Orders
          </button>
        </div>
      </section>

      <div className="border-b border-neutral-800 my-6"></div>

      {/* FOOD GRID */}
      <section className="grid grid-cols-3 gap-[2px]">
        {videos.map((v) => (
          <div
            key={v._id}
            className="aspect-square bg-black overflow-hidden cursor-pointer relative group"
            onClick={() => setSelectedVideo(v)}
          >
            <video
              className="w-full h-full object-cover pointer-events-none"
              src={v.video}
              muted
              playsInline
              preload="metadata"
            />
            <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
              <svg className="w-8 h-8 text-white opacity-80" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
        ))}
      </section>

      {/* VIDEO MODAL */}
      {selectedVideo && (
        <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
          <button
            className="absolute top-4 right-4 text-white z-50 p-2 bg-neutral-800 rounded-full hover:bg-neutral-700"
            onClick={() => setSelectedVideo(null)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <video
            className="w-full max-h-screen"
            src={selectedVideo.video}
            controls
            autoPlay
            playsInline
          />
        </div>
      )}
    </main>
  );
};

export default FoodPartnerProfile;
