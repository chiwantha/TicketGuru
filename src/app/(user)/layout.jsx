import Navbar from "@/components/user/layout/navbar/Navbar";
import React from "react";

const layout = ({ children }) => {
  return (
    <div className="scroll-smooth ">
      <Navbar />
      {children}
    </div>
  );
};

export default layout;
