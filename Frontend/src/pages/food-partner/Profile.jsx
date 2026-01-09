import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const Profile = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const [videos, setVideos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/food-partner/${id}`, {
        withCredentials: true,
      })
      .then((response) => {
        setProfile(response.data.foodPartner);
        setVideos(response.data.foodPartner.foodItems);
      });
  }, [id]);

  return (<main className="w-full max-w-xl mx-auto p-8 bg-black text-white min-h-screen">


    {/* ---------------- PROFILE TOP ---------------- */}
    <section className="flex flex-col items-center mt-6 mb-6  px-4">

      {/* Avatar */}
      <img
        className="w-32 h-32 rounded-full object-cover border-2 border-gray-300 shadow-md"
        src="https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?cs=srgb&dl=pexels-chanwalrus-958545.jpg&fm=jpg"
        alt="avatar"
      />

      {/* Name */}
      <h1 className="text-2xl font-bold mt-4 tracking-wide">
        {profile?.name}
      </h1>

      {/* Address */}
      <p className="text-gray-400 text-base max-w-[90%] text-center mt-1">
        {profile?.address}
      </p>

      {/* Stats */}
      <div className="flex justify-center gap-10 text-center mt-5">

        <div className="flex flex-col">
          <p className="text-lg font-semibold text-white">50</p>
          <p className="text-xs text-gray-400 uppercase tracking-wide">Meals</p>
        </div>

        <div className="w-px bg-gray-700"></div> {/* Divider */}

        <div className="flex flex-col">
          <p className="text-lg font-semibold text-white">1k</p>
          <p className="text-xs text-gray-400 uppercase tracking-wide">Customers</p>
        </div>

      </div>

    </section>


    <div className="border-b border-neutral-800 my-6"></div>

    {/* ---------------- GRID ---------------- */}
    <section className="grid grid-cols-3 gap-[2px]">
      {videos.map((v) => (
        <div
          key={v._id}
          className="aspect-square bg-black overflow-hidden"
        >
          <video
            className="w-full h-full object-cover"
            src={v.video}
            muted
            loop
            autoPlay
          ></video>
        </div>
      ))}
    </section>
  </main>


  );
};

export default Profile;
