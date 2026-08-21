import React, { useEffect, useState } from 'react'
import axios from 'axios';
import '../../styles/reels.css'
import ReelFeed from '../../components/ReelFeed'

const Home = () => {
    const [ videos, setVideos ] = useState([])
    // Autoplay behavior is handled inside ReelFeed

    useEffect(() => {
        axios.get("/api/food", { withCredentials: true })
            .then(response => {

                console.log(response.data);

                setVideos(response.data.foodItems)
            })
            .catch(() => { /* noop: optionally handle error */ })
    }, [])


    async function likeVideo(item) {

        const response = await axios.post("/api/food/like", { foodId: item._id }, {withCredentials: true})

        if(response.data.like){
            console.log("Video liked");
            setVideos((prev) => prev.map((v) => v._id === item._id ? { ...v, likeCount: v.likeCount + 1, isLiked: true } : v))
        }else{
            console.log("Video unliked");
            setVideos((prev) => prev.map((v) => v._id === item._id ? { ...v, likeCount: v.likeCount - 1, isLiked: false } : v))
        }
        
    }

    async function saveVideo(item) {
        const response = await axios.post("/api/food/save", { foodId: item._id }, { withCredentials: true })
        
        if(response.data.save){
            setVideos((prev) => prev.map((v) => v._id === item._id ? { ...v, savesCount: v.savesCount + 1, isSaved: true } : v))
        }else{
            setVideos((prev) => prev.map((v) => v._id === item._id ? { ...v, savesCount: v.savesCount - 1, isSaved: false } : v))
        }
    }

    return (
        <div className="relative w-full h-full">
            <button
                className="absolute top-6 right-4 z-50 p-3 bg-black/40 backdrop-blur-md border border-white/20 hover:bg-black/60 text-white rounded-full shadow-[0_4px_12px_rgba(0,0,0,0.2)] transition-all hover:scale-105 active:scale-95 flex items-center justify-center"
                title="Logout"
                aria-label="Logout"
                onClick={async () => {
                    try {
                        await axios.get("/api/auth/user/logout", { withCredentials: true });
                        window.location.href = "/user/login";
                    } catch (err) {
                        console.error(err);
                        window.location.href = "/user/login";
                    }
                }}
            >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.5))' }}>
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                    <polyline points="16 17 21 12 16 7" />
                    <line x1="21" y1="12" x2="9" y2="12" />
                </svg>
            </button>
            <ReelFeed
                items={videos}
                onLike={likeVideo}
                onSave={saveVideo}
                emptyMessage="No videos available."
            />
        </div>
    )
}

export default Home