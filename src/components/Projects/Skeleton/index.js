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
let context;

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
        event.changedTouches[0].pageX - canvasOffset.x,
        event.changedTouches[0].pageY - canvasOffset.y
      ];
      break;
  }
}

const speed = 16;
const { PI } = Math;
const PI2 = PI * 2;

function updateAndDrawModule() {
  const stepToTarget = Vec2
    .subtract(target, module.target)
    .normalize()
    .scale(speed);

  if (Vec2.distance(target, Vec2.add(module.target, stepToTarget)) > speed) {
    // Get closer, not reaching the target.
    module.target.add(stepToTarget);
  } else {
    // It's close enough, reach the target.
    module.target.copy(target);
  }

  context.clearRect(0, 0, side, side);

  // Target.
  context.fillStyle = 'red';
  context.beginPath();
  context.arc(...target, 7.5, 0, PI2);
  context.fill();
  context.closePath();
  context.beginPath();
  context.fillStyle = 'white';
  context.arc(...target, 5, 0, PI2);
  context.fill();
  context.closePath();
  context.beginPath();
  context.fillStyle = 'red';
  context.arc(...target, 2.5, 0, PI2);
  context.fill();
  context.closePath();

  // Anchor.
  context.fillStyle = color;
  context.beginPath();
  context.fillRect(module.anchor.x - 4, module.anchor.y - 4, 8, 8);
  context.fill();
  context.closePath();

  // Segments.
  context.strokeStyle = color;
  for (let i = 0; i < amountOfSegments - 1; i++) {
    const { tail, head } = module.segments[i];
    context.beginPath();
    context.moveTo(...tail);
    context.lineTo(...head);
    context.closePath();
    context.stroke();
    context.beginPath();
    context.arc(...tail, 2.5, 0, PI2);
    context.closePath();
    context.fill();
  }

  // Target segment.
  const lastSegmentHead = module.segments[amountOfSegments - 1].head;
  const arrow = Vec2.subtract(
    lastSegmentHead,
    module.segments[amountOfSegments - 2].head
  );
  arrow.magnitude = moduleLength / amountOfSegments;
  context.fillStyle = color;
  context.save();
  context.translate(...lastSegmentHead);
  context.beginPath();
  context.moveTo(0, 0);
  context.translate(-arrow.x, -arrow.y);
  context.lineTo(-arrow.y * .35, +arrow.x * .35);
  context.lineTo(+arrow.y * .35, -arrow.x * .35);
  context.translate(...arrow);
  context.lineTo(0, 0);
  context.closePath();
  context.fill();
  context.restore();

  module.updatePositions();
  requestAnimationFrame(updateAndDrawModule);
}

let initialized = false;

function initPreview(skeletonCanvas) {
  if (initialized) return;

  initialized = true;
  context = skeletonCanvas.getContext('2d');
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
    canvasOffset.xy = [
      skeletonCanvas.offsetLeft,
      skeletonCanvas.offsetTop
    ];
    target.xy = [
      event.touches[0].pageX - canvasOffset.x,
      event.touches[0].pageY - canvasOffset.y
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
