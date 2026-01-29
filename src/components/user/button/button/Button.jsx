import Link from "next/link";
import React from "react";

const Button = ({
  title,
  link,
  onClick,
  wfull,
  fg,
  bg,
  pd,
  margins,
  disabled,
}) => {
  const className = wfull ? "w-full" : "w-fit";
  const disabled_class = `cursor-not-allowed bg-red-500 opacity-90`;
  const baseStyles = `${pd || "px-4 py-1.5"} ${
    bg || "hover:bg-orange-600 bg-orange-500"
  } ${fg || "text-white font-semibold"} ${margins && margins} rounded-lg text-center transition duration-300`;
  return link ? (
    <Link
      href={!disabled ? link : `#`}
      className={`${className} ${disabled && disabled_class} ${baseStyles} `}
    >
      {title}
    </Link>
  ) : (
    <button onClick={onClick} className={`${className} ${baseStyles}`}>
      {title}
    </button>
  );
};

export default Button;
