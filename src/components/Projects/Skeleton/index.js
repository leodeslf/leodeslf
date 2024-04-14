import Module from '@leodeslf/skeleton';
import { Vec2 } from '@leodeslf/vec.js';
import { color, margin, side } from '../index';

const canvasOffset = new Vec2();
const margin2 = margin * 2;
const amountOfSegments = 10;
const moduleLength = side * .75;
const module = new Module(
  amountOfSegments,
  moduleLength,
  new Vec2(side - margin2, margin2),
  new Vec2(margin2, side - margin2)
);
const target = module.target.clone();

function setTarget(event) {
  switch (event.type) {
    case 'mousemove':
      target.xy = [
        event.offsetX,
        event.offsetY
      ];
      break;
    case 'touchmove':
      target.xy = [
        event.changedTouches[0].clientX - canvasOffset.x,
        event.changedTouches[0].clientY - canvasOffset.y
      ];
      break;
  }
}

let skeletonContext;
const speed = 16;
const { PI } = Math;
const PI2 = PI * 2;

function updateAndDrawModule() {
  const stepToTarget = Vec2
    .subtract(target, module.target)
    .normalize()
    .scale(speed);

  if (Vec2.distance(target, Vec2.add(module.target, stepToTarget)) > speed) {
    // Get closer, not reaching the target (yet).
    module.target.add(stepToTarget);
  } else {
    // It's close enough, reach the target.
    module.target.copy(target);
  }

  skeletonContext.clearRect(0, 0, side, side);

  // Target.
  skeletonContext.fillStyle = color;
  skeletonContext.beginPath();
  skeletonContext.arc(...target, 7.5, 0, PI2);
  skeletonContext.fill();
  skeletonContext.closePath();
  skeletonContext.beginPath();
  skeletonContext.fillStyle = 'white';
  skeletonContext.arc(...target, 5, 0, PI2);
  skeletonContext.fill();
  skeletonContext.closePath();
  skeletonContext.beginPath();
  skeletonContext.fillStyle = color;
  skeletonContext.arc(...target, 2.5, 0, PI2);
  skeletonContext.fill();
  skeletonContext.closePath();

  // Anchor.
  skeletonContext.fillStyle = color;
  skeletonContext.beginPath();
  skeletonContext.fillRect(module.anchor.x - 4, module.anchor.y - 4, 8, 8);
  skeletonContext.fill();
  skeletonContext.closePath();

  // Segments.
  skeletonContext.strokeStyle = color;
  for (let i = 0; i < amountOfSegments - 1; i++) {
    const { tail, tip } = module.segments[i];
    skeletonContext.beginPath();
    skeletonContext.moveTo(...tail);
    skeletonContext.lineTo(...tip);
    skeletonContext.closePath();
    skeletonContext.stroke();
    skeletonContext.beginPath();
    skeletonContext.arc(...tail, 2.5, 0, PI2);
    skeletonContext.closePath();
    skeletonContext.fill();
  }

  // Target segment.
  const lastSegmentTip = module.segments[amountOfSegments - 1].tip;
  const arrow = Vec2.subtract(
    lastSegmentTip,
    module.segments[amountOfSegments - 2].tip
  );
  arrow.magnitude = moduleLength / amountOfSegments;
  skeletonContext.fillStyle = color;
  skeletonContext.save();
  skeletonContext.translate(...lastSegmentTip);
  skeletonContext.beginPath();
  skeletonContext.moveTo(0, 0);
  skeletonContext.translate(-arrow.x, -arrow.y);
  skeletonContext.lineTo(-arrow.y * .35, +arrow.x * .35);
  skeletonContext.lineTo(+arrow.y * .35, -arrow.x * .35);
  skeletonContext.translate(...arrow);
  skeletonContext.lineTo(0, 0);
  skeletonContext.closePath();
  skeletonContext.fill();
  skeletonContext.restore();

  module.updatePositions();
  requestAnimationFrame(updateAndDrawModule);
}

// To prevent double animations and event assignment.
let initialized = false;

function initPreview(skeletonCanvas) {
  if (initialized) return;

  initialized = true;
  skeletonContext = skeletonCanvas.getContext('2d');
  skeletonCanvas.addEventListener('mousedown', event => {
    target.xy = [
      event.offsetX,
      event.offsetY
    ];
    skeletonCanvas.addEventListener('mousemove', setTarget);
    window.addEventListener('mouseup', () => {
      skeletonCanvas.removeEventListener('mousemove', setTarget);
    });
  });
  skeletonCanvas.addEventListener('touchstart', event => {
    event.preventDefault();
    const { x, y } = skeletonCanvas.getBoundingClientRect();
    canvasOffset.x = x;
    canvasOffset.y = y;
    target.xy = [
      event.touches[0].clientX - canvasOffset.x,
      event.touches[0].clientY - canvasOffset.y
    ];
    skeletonCanvas.addEventListener('touchmove', setTarget, { passive: false });
    window.addEventListener('touchend', () => {
      skeletonCanvas.removeEventListener('touchmove', setTarget);
    }, { passive: false });
  }, { passive: false });
  module.updatePositions();
  requestAnimationFrame(updateAndDrawModule);
}

export { initPreview };
