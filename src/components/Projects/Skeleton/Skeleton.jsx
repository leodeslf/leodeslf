import Draw from '../Draw';
import { initPreview } from './index';
import { useEffect, useRef } from 'react';

export default function Skeleton() {
  const canvas = useRef(null);

  useEffect(() => {
    initPreview(canvas.current);
  }, []);

  return (
    <Draw
      id="skeleton"
      ref={canvas}
      title="Click/Arrastre para mover el objetivo."
    />
  );
}
