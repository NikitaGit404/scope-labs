import React from "react";
import { useNavigate } from "react-router-dom";

const VideoCard = ({ video }) => {
  const navigate = useNavigate();
  console.log("video", video);
  const handleVideoClick = () => {
    navigate(`/video/${video.id}`, { state: { video } });
    // window.open(`/video/${video.id}`, "_blank", "noopener,noreferrer");
  };
  return (
    <div className="w-3/4 mx-auto pb-4 cursor-pointer">
      <div
        onClick={handleVideoClick}
        className="flex flex-col items-center lg:flex-row w-full bg-white border border-gray-200 shadow hover:bg-stone-100"
      >
        <div className="w-full lg:w-1/2 h-40 lg:h-48">
          <video className="object-cover w-full h-full" controls>
            <source src={video.video_url} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <div className="flex flex-col p-4 leading-normal w-full lg:w-1/2 h-30 lg:h-48 overflow-x-auto">
          <h5 className="mb-2 text-2xl font-bold font-serif tracking-tight text-stone-600">
            {video.title}
          </h5>
          <p className="mb-3 font-normal font-serif text-stone-500">
            {video.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
