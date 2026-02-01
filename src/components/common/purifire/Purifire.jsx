"use client";

import { useEffect, useState } from "react";
import DOMPurifyModule from "dompurify";

const Purifire = ({ description }) => {
  const [sanitizedHTML, setSanitizedHTML] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      // create DOMPurify instance
      const DOMPurify = DOMPurifyModule.default || DOMPurifyModule;
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSanitizedHTML(DOMPurify.sanitize(description));
    }
  }, [description]);

  return (
    <div
      className="font-light text-lg md:text-xl"
      dangerouslySetInnerHTML={{ __html: sanitizedHTML }}
    />
  );
};

export default Purifire;
