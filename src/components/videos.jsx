import React, { useEffect, useState } from "react";
import VideoCard from "./videoCard";
import { useGlobalStore } from "../zustand/store";

const Videos = () => {
  const { currentUserId } = useGlobalStore();
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    if (currentUserId) {
      getvideos();
    }
  }, [currentUserId]);

  const getvideos = async () => {
    const res = await fetch(
      `https://take-home-assessment-423502.uc.r.appspot.com/api/videos?user_id=${currentUserId}`
    );
    const data = await res.json();
    setVideos(data.videos);
  };
  return (
    <div className="flex flex-col mt-4">
      {videos.map((video) => (
        <VideoCard key={video.id} video={video}></VideoCard>
      ))}
    </div>
  );
};

export default Videos;
