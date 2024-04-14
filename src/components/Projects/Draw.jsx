import { forwardRef } from "react";
import { side } from "./index";

const Draw = forwardRef(function Draw(props, canvas) {
  return (
    <canvas
      className="project__draw"
      height={side}
      width={side}
      ref={canvas}
      {...props}
    />
  );
});

export default Draw;
