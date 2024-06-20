import React, { useEffect, useState } from "react";
import { RiVideoAddFill } from "react-icons/ri";
import { Button, Label, Modal, TextInput } from "flowbite-react";
import { useGlobalStore } from "../zustand/store";
import { Link } from "react-router-dom";
import { Toast } from "flowbite-react";
import { HiCheck } from "react-icons/hi";

const Navbar = () => {
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { currentUserId, setCurrentUserId } = useGlobalStore();
  const [userId, setUserId] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [video_url, setVideoUrl] = useState("");
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    if (!currentUserId) {
      console.log("currentUserId", currentUserId);
      setOpenLoginModal(true);
    } else {
      setOpenLoginModal(false);
    }
  }, []);

  const createVideo = async () => {
    const res = await fetch(
      "https://take-home-assessment-423502.uc.r.appspot.com/api/videos",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: currentUserId,
          description: description,
          video_url: video_url,
          title: title,
        }),
      }
    );

    const data = await res.json();
    if (data.success) {
      window.location.reload();
      setShowToast(true);
    }
    setTitle("");
    setDescription("");
    setVideoUrl("");
  };
  return (
    <>
      <nav className="bg-stone-200 border-stone-400">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link
            to={"/"}
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img src="FULL_LOGO_COLOR.png" className="h-10" alt="Logo" />
          </Link>
          <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            <button
              type="button"
              onClick={() => {
                if (!currentUserId) {
                  setOpenLoginModal(true);
                  return;
                }
                setIsModalOpen(true);
              }}
              className="text-white font-medium bg-teal-600 hover:bg-yellow-400 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-xl text-sm px-4 py-2 text-center "
            >
              <span className="flex flex-row gap-1">
                Create Video <RiVideoAddFill className="my-auto w-5 h-5" />
              </span>
            </button>
          </div>
        </div>
      </nav>
      <Modal
        show={isModalOpen}
        size="md"
        onClose={() => setIsModalOpen(false)}
        popup
      >
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-stone-700 dark:text-white">
              Enter details to create a video
            </h3>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="userId" value="Your User Id" />
              </div>
              <TextInput
                id="userId"
                placeholder="eg. john_doe"
                value={currentUserId}
                disabled
                required
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="title" value="Video Title" />
              </div>
              <TextInput
                id="title"
                type="text"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                placeholder="My Example First Video"
                required
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="description" value="Description" />
              </div>
              <TextInput
                id="description"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                placeholder="This is my first video which showcases..."
                type="text"
                required
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="videoUrl" value="Video URL" />
              </div>
              <TextInput
                id="videoUrl"
                type="text"
                value={video_url}
                onChange={(event) => setVideoUrl(event.target.value)}
                placeholder="https://examplevideo.com"
                required
              />
            </div>

            <div className="flex w-full justify-center">
              <Button
                className="rounded-xl"
                disabled={
                  !currentUserId || !title || !description || !video_url
                }
                onClick={() => {
                  setIsModalOpen(false);
                  createVideo();
                }}
              >
                Create
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      <Modal
        show={openLoginModal}
        size="md"
        onClose={() => setOpenLoginModal(false)}
        popup
      >
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6">
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
      {showToast ? (
        <Toast>
          <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200">
            <HiCheck className="h-5 w-5" />
          </div>
          <div className="ml-3 text-sm font-normal">
            Video created successfully.
          </div>
          <Toast.Toggle onClick={() => setShowToast(false)} />
        </Toast>
      ) : null}
    </>
  );
};

export default Navbar;
