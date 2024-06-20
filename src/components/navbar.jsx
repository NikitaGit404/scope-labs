import React from "react";
import { Link } from "react-router-dom";
import CreateVideo from "./createVideo";

const Navbar = () => {
  return (
    <>
      <nav className="bg-stone-200 border-stone-400">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link
            to={"/"}
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img src="/FULL_LOGO_COLOR.png" className="h-10" alt="Logo" />
          </Link>
          <CreateVideo />
        </div>
      </nav>
    </>
  );
};

export default Navbar;
