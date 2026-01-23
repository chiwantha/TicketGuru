import React from "react";
import Button from "../../button/button/Button";

const Navbar = () => {
  return (
    <div className="z-50 fixed top-0 right-0 left-0 bg-black/10 backdrop-blur-md h-15 flex items-center">
      <div className="w-full max-w-7xl mx-auto items-center flex justify-between px-2">
        <div className="font-bold text-4xl text-orange-500">TG</div>
        <div className="">
          <Button title={"CONTACT"} />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
