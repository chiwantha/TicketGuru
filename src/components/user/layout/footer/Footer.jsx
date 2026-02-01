import WidthFitter from "@/components/common/layout/widthFitter/WidthFitter";
import Image from "next/image";
import Link from "next/link";
import { FaFacebookF, FaTiktok, FaInstagram, FaYoutube } from "react-icons/fa";

const social = [
  {
    media: "facebook",
    icon: <FaFacebookF />,
  },
  {
    media: "tiktok",
    icon: <FaTiktok />,
  },
  {
    media: "instagram",
    icon: <FaInstagram />,
  },
  {
    media: "youtube",
    icon: <FaYoutube />,
  },
];

const links = [
  { title: "HomePage", path: "/events" },
  { title: "View Events", path: "/events" },
  { title: "About Us", path: "/events" },
  { title: "Contact Us", path: "/events" },
  { title: "Event Gallery", path: "/gallery" },
];

const contact = [
  { title: "Phone", value: "+44 7448 553020" },
  { title: "Phone2", value: "+94 78 880 6670" },
  { title: "email", value: "sam@ticketguru.uk" },
  { title: "website", value: "www.ticketguru.uk" },
  { title: "address", value: "No.38, Lee Park, London" },
];

const Footer = () => {
  return (
    <div className="flex flex-col">
      {/* top strip */}
      <div className="border-t-2 border-orange-600 py-12 bg-white">
        <WidthFitter>
          <div className="text-center grid grid-cols-2 sm:grid-cols-4 space-y-2 sm:space-y-0">
            <div className="text-center text-2xl text-gray-600 font-black uppercase border-r border-gray-200 sm:border-none">
              <span>easy</span>
            </div>
            <div className="text-center text-2xl text-gray-600 font-black uppercase">
              <span>fast</span>
            </div>
            <div className="text-center text-2xl text-gray-600 font-black uppercase border-r border-gray-200 sm:border-none">
              <span>secure</span>
            </div>
            <div className="text-center text-2xl text-gray-600 font-black uppercase">
              <span>Smart</span>
            </div>
          </div>
        </WidthFitter>
      </div>
      {/* middle strip */}
      <div className=" bg-linear-to-b sm:bg-linear-to-r from-orange-600 via-orange-500 to-orange-600 ">
        <WidthFitter>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 border-t border-t-orange-700 py-12 items-center">
            <div
              className="bg-white rounded-lg grid-cols-1 sm:col-span-2 shadow-md p-6 flex flex-col items-center justify-center space-y-4
            hover:scale-105 transition-transform duration-300"
            >
              <div className="relative aspect-video w-[60%] sm:w-[40%]">
                <Image
                  src={`/logo/LogoDark.png`}
                  alt="logoDark"
                  fill
                  className="object-center object-contain"
                />
              </div>
              <hr className="border-orange-200 w-full" />
              <p className="text-gray-600 text-center text-lg">
                Your gateway to live events and unforgettable experiences, from
                local shows to world-class performances
              </p>
              <hr className="border-orange-200 w-full" />
              <div className="grid grid-cols-4 w-full gap-2">
                {social.map((so, index) => (
                  <div
                    className="flex items-center justify-center text-2xl text-orange-500 hover:scale-125 transition-transform duration-300"
                    aria-label={so.media}
                    key={index}
                  >
                    {so.icon}
                  </div>
                ))}
              </div>
            </div>

            {/* web links */}
            <div className="flex-col flex items-end space-y-2 lg:border-r border-white/30 lg:pr-6">
              <h2 className="text-orange-100 text-4xl font-bold">WEB LINKS</h2>
              <div className="flex-col flex items-end ">
                {links.map((link, index) => (
                  <Link href={link.path} key={index}>
                    <span className="md:text-xl  hover:font-bold transition-all duration-300 text-white ">
                      {link.title} -
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            {/* contact links */}
            <div className="flex-col flex items-start space-y-2">
              <h2 className="text-orange-100 text-4xl font-bold">CONTACT US</h2>
              <div className="flex-col flex items-start">
                {contact.map((con, index) => (
                  <span
                    className="md:text-xl hover:font-bold transition-all duration-300 text-white "
                    key={index}
                  >
                    - {con.value}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </WidthFitter>
      </div>
      {/* bottom strip */}
      <div className="py-4 text-center flex flex-col  text-muted-foreground bg-orange-600 text-white">
        <span>© 2026. All Rights Reserved.</span>
        <span>
          Designed & Developed by{" "}
          <span className="font-medium">K-Chord Pvt Ltd</span>
        </span>
      </div>
    </div>
  );
};

export default Footer;
