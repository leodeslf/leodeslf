import { initPreview, resetEphy, slowDownEphy, speedUpEphy } from './index';
import { useEffect, useRef } from 'react';
import Draw from '../Draw';

export default function Ephy() {
  const canvas = useRef(null);

  useEffect(() => {
    initPreview(canvas.current);
  }, []);

  return (
    <Draw
      id="ephy"
      onClick={resetEphy}
      onMouseLeave={slowDownEphy}
      onMouseOver={speedUpEphy}
      onTouchEnd={slowDownEphy}
      onTouchStart={speedUpEphy}
      ref={canvas}
      title={`Click/Tap to redraw.
Hover/Hold to speed up.`}
    />
  );
}
