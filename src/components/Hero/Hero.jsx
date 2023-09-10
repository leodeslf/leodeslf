import { useEffect, useRef } from "react";
import initHero from ".";

export default function Hero() {
  const canvas = useRef(null);

  useEffect(() => {
    initHero();
  }, []);

  return (
    <canvas
      className="hero"
      ref={canvas}
    ></canvas>
  );
}
