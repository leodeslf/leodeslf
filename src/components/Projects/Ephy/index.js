import { Vec2 } from "@leodeslf/vec.js";
import { color, margin, side } from "../index";

const halfSide = side * .5;
const p = 41;
const q = 40;
const k = p / q;
const revolution = Math.PI * 2;
const totalRevolutions = revolution * q;
const orbitRotationSpeed = 0.005;
const outerRotationSpeed = orbitRotationSpeed * (k + 1);
let stepsPerFrame = 21;
let ephyCanvas;
let ephyContext;
let raf;
let currentRevolution;
let orbitPosition = new Vec2();
let outerPosition = new Vec2();

function drawCycloid() {
  for (let i = 0; i < stepsPerFrame; i++) {
    // ephyContext.strokeStyle = `hsl(${Vec2.add(
    //   orbitPosition, outerPosition
    // ).angleX / Math.PI * 180}, 100%, 50%)`;

    ephyContext.beginPath();
    ephyContext.moveTo(...Vec2.add(orbitPosition, outerPosition));
    outerPosition.rotateZ(-outerRotationSpeed);
    orbitPosition.rotateZ(-orbitRotationSpeed);
    currentRevolution += orbitRotationSpeed;

    if (currentRevolution >= totalRevolutions) {
      ephyContext.closePath();
      ephyCanvas.classList.remove('project__draw--drawing');
      return cancelAnimationFrame(raf);
    }

    ephyContext.lineTo(...Vec2.add(orbitPosition, outerPosition));
    ephyContext.closePath();
    ephyContext.stroke();
  }

  raf = requestAnimationFrame(drawCycloid);
}

const outerRadius = (halfSide - margin) / (k + 2);
const innerRadius = outerRadius * k;
const orbitRadius = innerRadius + outerRadius;

function resetEphy() {
  cancelAnimationFrame(raf);
  ephyContext.clearRect(-halfSide, -halfSide, side, side);
  currentRevolution = 0;
  orbitPosition = new Vec2(orbitRadius, 0);
  outerPosition = new Vec2(-outerRadius, 0);
  drawCycloid();
  ephyCanvas.classList.add('project__draw--drawing');
}

function slowDownEphy() {
  stepsPerFrame *= .1;
}

function speedUpEphy() {
  stepsPerFrame *= 10;
}

let initialized = false;

function initPreview(_ephyCanvas) {
  if (initialized) return;

  initialized = true;
  ephyCanvas = _ephyCanvas;
  ephyContext = ephyCanvas.getContext('2d');
  ephyContext.translate(halfSide, halfSide);
  ephyContext.strokeStyle = color;
  ephyContext.lineWidth = .25;
  resetEphy();
}

export {
  initPreview,
  resetEphy,
  slowDownEphy,
  speedUpEphy
};
