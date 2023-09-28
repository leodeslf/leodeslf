import { simplex3D } from '@leodeslf/simplex-noise';
import { Vec2 } from '@leodeslf/vec.js';
import { side } from '../index';

const skinData = new Uint8ClampedArray(256 * 4);
const previousTarget = new Vec2();

function drag(event) {
  const difference = new Vec2();

  switch (event.type) {
    case 'mousemove':
      difference.xy = [
        event.movementX,
        event.movementY
      ];
      break;
    case 'touchmove':
      event.preventDefault();
      var target = new Vec2(
        event.touches[0].pageX,
        event.touches[0].pageY
      );
      difference.copy(Vec2.subtract(target, previousTarget));
      previousTarget.copy(target);
      break;
    default: return;
  }

  noiseOffset.subtract(difference);
}

const pixelSize = 2;
const noiseOffset = new Vec2();
const scale = 1 / side;
const u = x => (x + noiseOffset.x) * scale;
const v = y => (y + noiseOffset.y) * scale;
const pixelData = [0, 0, 0];
const noiseImageData = new ImageData(side, side);
let noiseContext;
let raf = 0;

function generateNoiseImage() {
  for (let y = 0; y < side; y += pixelSize) {
    for (let x = 0; x < side; x += pixelSize) {
      let frequencyK = 1;
      let amplitudeK = 1.25;
      let noise = 0;

      for (let k = 0; k < 2; k++, frequencyK *= 2, amplitudeK *= .5) {
        noise += simplex3D(
          (u(x) + k) * frequencyK,
          (v(y) + k) * frequencyK,
          raf * .003 // Time slowed down.
        ) * amplitudeK;
      }

      let skinIndex = Math.round(noise * 128 + 128) * 4;
      pixelData[0] = skinData[skinIndex + 0];
      pixelData[1] = skinData[skinIndex + 1];
      pixelData[2] = skinData[skinIndex + 2];
      pixelData[3] = skinData[skinIndex + 3];

      for (let subY = 0; subY < pixelSize; subY++) {
        for (let subX = 0; subX < pixelSize; subX++) {
          let pixelIndex = ((y + subY) * side + x + subX) * 4;
          noiseImageData.data[pixelIndex + 0] = pixelData[0];
          noiseImageData.data[pixelIndex + 1] = pixelData[1];
          noiseImageData.data[pixelIndex + 2] = pixelData[2];
          noiseImageData.data[pixelIndex + 3] = pixelData[3];
        }
      }
    }
  }

  noiseContext.clearRect(0, 0, side, side);
  noiseContext.putImageData(noiseImageData, 0, 0);
  raf = requestAnimationFrame(generateNoiseImage);
}

let initialized = false;

function initPreview(noiseCanvas, skinCanvas) {
  if (initialized) return;

  initialized = true;
  noiseContext = noiseCanvas.getContext('2d');
  let skinContext = skinCanvas.getContext('2d', { willReadFrequently: true });
  const skinImageData = new Image(256, 1);
  skinImageData.src = '/assets/tfp-skin.png';
  skinImageData.onload = () => {
    skinContext.clearRect(0, 0, 256, 1);
    skinContext.drawImage(skinImageData, 0, 0);
    skinData.set(skinContext.getImageData(0, 0, 256, 1).data);
  }
  noiseCanvas.addEventListener('mousedown', () => {
    window.addEventListener('mousemove', drag);
    window.addEventListener('mouseup', () => {
      window.removeEventListener('mousemove', drag);
    });
  });
  noiseCanvas.addEventListener('touchstart', event => {
    previousTarget.xy = [
      event.touches[0].pageX,
      event.touches[0].pageY
    ];
    window.addEventListener('touchmove', drag, { passive: false });
    window.addEventListener('touchend', () => {
      window.removeEventListener('touchmove', drag);
    }, { passive: false });
  }, { passive: false });
  raf = requestAnimationFrame(generateNoiseImage);
}

export { initPreview };
