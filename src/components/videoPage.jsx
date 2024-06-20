import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { useGlobalStore } from "../zustand/store";
import { MdEdit } from "react-icons/md";

const VideoPage = () => {
  const { id } = useParams();
  const location = useLocation();
  const [video, setVideo] = useState(location.state?.video || null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [buttonContent, setButtonContent] = useState("Add Comment");
  const { currentUserId } = useGlobalStore();

  useEffect(() => {
    if (!video) {
      // Fetch video data based on ID if not passed through state
      fetch(
        `https://take-home-assessment-423502.uc.r.appspot.com/api/videos/${id}`
      )
        .then((response) => response.json())
        .then((data) => setVideo(data));
    }

    getComments();
  }, [id, video]);

  const getComments = async () => {
    const res = await fetch(
      `https://take-home-assessment-423502.uc.r.appspot.com/api/videos/comments?video_id=${video.id}`
    );
    const data = await res.json();
    setComments(data.comments);
  };

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    const strMinutes = minutes < 10 ? "0" + minutes : minutes;
    const strTime =
      date.getMonth() +
      "/" +
      date.getDate() +
      "/" +
      date.getFullYear() +
      " at " +
      hours +
      ":" +
      strMinutes +
      " " +
      ampm;
    return strTime;
  };

  const addNewComment = async () => {
    const res = await fetch(
      "https://take-home-assessment-423502.uc.r.appspot.com/api/videos/comments",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          video_id: video.id,
          content: newComment,
          user_id: currentUserId,
        }),
      }
    );
    const data = await res.json();
    if (data.success) {
      getComments();
    }

    setNewComment("");
    setButtonContent("Add Comment");
  };

  const editDetails = async () => {
    const newTitle = prompt("Enter new title", video.title);
    const newDescription = prompt("Enter new description", video.description);

    if (newTitle && newDescription) {
      const res = await fetch(
        "https://take-home-assessment-423502.uc.r.appspot.com/api/videos",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            video_id: video.id,
            title: newTitle,
            description: newDescription,
          }),
        }
      );
      const data = await res.json();
      if (data.success) {
        setVideo({ ...video, title: newTitle, description: newDescription });
      }
    }
  };

  if (!video) return <div>Loading...</div>;

  return (
    <div className="flex flex-col lg:flex-row h-[90vh] px-4 pt-4">
      <div className="w-full lg:w-3/4 mb-4 lg:mb-0">
        <video className="w-full" controls>
          <source src={video.video_url} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      <div className="w-full lg:w-1/4 bg-white lg:ml-2 flex flex-col">
        <div className="border-stone-200 border rounded-xl p-2 h-1/5 overflow-y-auto">
          <div className="flex flex-row justify-between">
            <span className="text-2xl font-semibold text-stone-600 mb-2 hover:text-yellow-400">
              {video.title}
            </span>
            <MdEdit
              className="size-5 mx-1 hover:size-10"
              onClick={() => {
                editDetails();
              }}
            />
          </div>
          <p className="text-stone-500">{video.description}</p>
        </div>
        <div className="border-stone-200 bg-stone-200 border rounded-xl p-2 mt-4 h-[70vh] flex flex-col overflow-y-auto">
          <div className="text-2xl font-semibold text-stone-600 mb-4">
            Comments
          </div>
          <div className="flex-grow overflow-y-auto">
            {comments.map((comment) => (
              <div
                key={comment.id}
                className="border-white border bg-white rounded-xl p-2 mb-2 overflow-y-auto"
              >
                <div className="flex flex-row justify-between">
                  <span className="text-teal-600 font-semibold">
                    {comment.user_id}
                  </span>
                  <span className="text-yellow-400 font-light text-xs">
                    {formatDate(comment.created_at)}
                  </span>
                </div>

                <p className="text-stone-500">{comment.content}</p>
              </div>
            ))}
          </div>
          <div className="flex flex-row h-20 w-full gap-2 mt-auto pb-2 pt-4">
            <input
              className="w-2/3 h-full border-stone-200 border rounded-xl p-2"
              placeholder="Comment something..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            ></input>
            <button
              className="bg-teal-600 w-1/3 text-white rounded-xl"
              onClick={() => {
                setButtonContent(
                  <div role="status">
                    <svg
                      aria-hidden="true"
                      className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"
                      />
                    </svg>
                    <span className="sr-only">Loading...</span>
                  </div>
                );
                addNewComment();
              }}
            >
              {buttonContent}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPage;
