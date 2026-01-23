import Link from "next/link";
import React from "react";

const Button = ({ title, link, onClick, wfull, fg, bg, pd, margins }) => {
  const className = wfull ? "w-full" : "";
  const baseStyles = `${pd || "px-4 py-1.5"} ${
    bg || "hover:bg-orange-600 bg-orange-500"
  } ${fg || "text-white font-semibold"} ${margins && margins} rounded-lg text-center transition duration-300`;
  return link ? (
    <Link href={link} className={`${className} ${baseStyles}`}>
      {title}
    </Link>
  ) : (
    <button onClick={onClick} className={`${className} ${baseStyles}`}>
      {title}
    </button>
  );
};

export default Button;
