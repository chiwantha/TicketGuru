import React from "react";
import Button from "../../button/button/Button";
import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
  return (
    <div className="z-50 fixed top-0 right-0 left-0 bg-black/10 backdrop-blur-md h-15 flex items-center">
      <div className="w-full max-w-7xl mx-auto items-center flex justify-between px-4">
        <Link className="relative h-12.5 w-20 " href={"/"}>
          <Image
            src={"/logo/logo.png"}
            alt="logo.png"
            className="object-center object-contain"
            fill
          />
        </Link>
        <div className="">
          <Button title={"CONTACT"} />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
