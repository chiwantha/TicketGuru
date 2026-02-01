import Navbar from "@/components/user/layout/navbar/Navbar";
import React from "react";
import Newsletter from "../../components/user/sections/newsletter/Newsletter";
import Footer from "@/components/user/layout/footer/Footer";

const layout = ({ children }) => {
  return (
    <div className="scroll-smooth">
      <Navbar />
      {children}
      <Newsletter />
      <Footer />
    </div>
  );
};

export default layout;
