import React, { useEffect, useState } from "react";
import VideoCard from "./videoCard";
import { Button, Label, Modal, TextInput } from "flowbite-react";

const Videos = () => {
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const [userId, setUserId] = useState("");
  const [currentUserId, setCurrentUserId] = useState(() => {
    return sessionStorage.getItem("currentUserId") || "";
  });

  useEffect(() => {
    if (!currentUserId) {
      setOpenLoginModal(true);
    } else {
      setOpenLoginModal(false);
      sessionStorage.setItem("currentUserId", currentUserId);
    }
  }, [currentUserId]);

  const [videos, setVideos] = useState([]);

  useEffect(() => {
    console.log("currentUserId", currentUserId);
    const getvideos = async () => {
      const res = await fetch(
        `https://take-home-assessment-423502.uc.r.appspot.com/api/videos?user_id=${currentUserId}`
      );
      const data = await res.json();
      console.log("data.videos", data.videos);
      setVideos(data.videos);
    };
    if (currentUserId) {
      getvideos();
    }
  }, [currentUserId]);

  return (
    <>
      <div className="flex flex-col mt-4">
        {videos.map((video) => (
          <VideoCard key={video.id} video={video}></VideoCard>
        ))}
      </div>
      <Modal
        show={openLoginModal}
        size="md"
        onClose={() => setOpenLoginModal(false)}
        theme={{
          content: {
            inner:
              "relative flex max-h-[90dvh] flex-col rounded-xl bg-white shadow",
          },
        }}
      >
        <Modal.Body>
          <div className="space-y-6 pt-4">
            <h3 className="text-xl font-medium text-stone-700 dark:text-white">
              Enter your user ID to continue..
            </h3>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="userId" value="Your User Id" />
              </div>
              <TextInput
                id="userId"
                placeholder="eg. john_doe"
                value={userId}
                onChange={(event) => setUserId(event.target.value)}
                required
              />
            </div>

            <div className="flex w-full justify-center">
              <Button
                className="rounded-xl"
                disabled={!userId}
                onClick={() => {
                  setCurrentUserId(userId);
                  setOpenLoginModal(false);
                }}
              >
                Submit
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Videos;
