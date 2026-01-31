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
  { title: "Home", path: "/events" },
  { title: "Events", path: "/events" },
  { title: "About", path: "/events" },
  { title: "Contact", path: "/events" },
  { title: "Gallery", path: "/gallery" },
];

const Footer = () => {
  return (
    <div className="flex flex-col">
      {/* top strip */}
      <div className="border-t-2 border-orange-600 py-12 bg-white">
        <WidthFitter>
          <div className="text-center grid grid-cols-2 sm:grid-cols-4 space-y-2">
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
      <div className=" bg-gray-100 ">
        <WidthFitter>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 border-t border-t-orange-700 py-12 items-center">
            <div className=" rounded-lg shadow-md p-6 flex flex-col items-center justify-center space-y-4">
              <div className="relative aspect-video w-[60%]">
                <Image
                  src={`/logo/LogoDark.png`}
                  alt="logoDark"
                  fill
                  className="object-center object-contain"
                />
              </div>
              <hr className="border-orange-200 w-full" />
              <p className="text-gray-600 text-center text-lg">
                Your gateway to live events and unforgettable experience
              </p>
              <hr className="border-orange-200 w-full" />
              <div className="grid grid-cols-4 w-full gap-2">
                {social.map((so, index) => (
                  <div
                    className="flex items-center justify-center text-2xl text-orange-600"
                    aria-label={so.media}
                    key={index}
                  >
                    {so.icon}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex-col flex items-end space-y-2">
              <h2 className="text-orange-600 text-4xl font-bold">LINKS</h2>
              <div className="flex-col flex items-end space-y-1">
                {links.map((link, index) => (
                  <Link href={link.path} key={index}>
                    <span className="text-2xl font-medium hover:font-bold">
                      {link.title} -
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </WidthFitter>
      </div>
      {/* bottom strip */}
      <div className=""></div>
    </div>
  );
};

export default Footer;
