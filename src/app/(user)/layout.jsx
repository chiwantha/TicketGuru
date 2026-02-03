import Navbar from "@/components/user/layout/navbar/Navbar";
import NextTopLoader from "nextjs-toploader";
import Newsletter from "../../components/user/sections/newsletter/Newsletter";
import Footer from "@/components/user/layout/footer/Footer";

const layout = ({ children }) => {
  return (
    <div className="scroll-smooth">
      <NextTopLoader color="orange" />
      <Navbar />
      {children}
      <Newsletter />
      <Footer />
    </div>
  );
};

export default layout;
