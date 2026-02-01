"use client";
import React, { useState, useEffect } from "react";
import Button from "../../button/button/Button";
import Link from "next/link";
import Image from "next/image";
import cn from "classnames";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollToFooter = (e) => {
    e.preventDefault(); // prevent default instant jump
    const footer = document.getElementById("footer");
    if (footer) {
      footer.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div
      className={cn(
        "fixed top-0 left-0 right-0 h-15 flex items-center z-50 transition-all duration-300",
        scrolled
          ? "bg-black/10 backdrop-blur-md"
          : "bg-transparent backdrop-blur-none",
      )}
    >
      <div className="w-full max-w-7xl mx-auto flex items-center justify-between px-4">
        <Link href="/" className="relative h-12.5 w-20">
          <Image
            src="/logo/logo.png"
            alt="logo.png"
            className="object-center object-contain"
            fill
          />
        </Link>

        <div>
          {/* Using next/link but with custom onClick */}
          <Link href="#footer" onClick={handleScrollToFooter} scroll={false}>
            <Button title="CONTACT" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
