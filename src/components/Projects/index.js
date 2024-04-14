function capitalize(string) {
  return string[0].toUpperCase().concat(string.slice(1));
}

// Canvas vars.
const side = 180;
const margin = 9;
const color = '#000';

export {
  capitalize,
  color,
  margin,
  side,
};
