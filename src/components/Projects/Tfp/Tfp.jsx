import { useEffect, useRef } from 'react';
import { initPreview, skinWidth } from './index';
import Draw from '../Draw';

export default function Tfp() {
  const noiseCanvas = useRef(null);
  const skinCanvas = useRef(null);

  useEffect(() => {
    initPreview(noiseCanvas.current, skinCanvas.current);
  }, []);

  return (
    <>
      <Draw
        id="tfp"
        ref={noiseCanvas}
      />
      <canvas
        id="tfp-skin"
        ref={skinCanvas}
        style={{ display: 'none' }}
        width={skinWidth}
      />
    </>
  );
}
