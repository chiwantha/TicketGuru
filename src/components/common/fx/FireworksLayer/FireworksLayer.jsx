"use client";

import { useEffect, useState } from "react";
import "./FireworksLayer.css";

const PARTICLES = 20; // keep small for performance

export default function FireworksLayer() {
  const [bursts, setBursts] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setBursts((prev) => [
        ...prev.slice(-4), // max 4 fireworks at once
        {
          id: crypto.randomUUID(),
          left: Math.random() * 100,
          top: Math.random() * 55,
        },
      ]);
    }, 1600);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fireworks-layer">
      {bursts.map((b) => (
        <div
          key={b.id}
          className="firework-burst"
          style={{
            left: `${b.left}%`,
            top: `${b.top}%`,
          }}
        >
          {Array.from({ length: PARTICLES }).map((_, i) => (
            <span
              key={i}
              className="firework-particle"
              style={{
                "--i": i,
              }}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
