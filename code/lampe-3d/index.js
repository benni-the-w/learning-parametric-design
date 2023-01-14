const jscad = require('@jscad/modeling')

const {line, arc, circle, ellipse, rectangle, cube, sphere, cylinder, cuboid, roundedCuboid, geodesicSphere, ellipsoid, roundedCylinder, cylinderElliptic, torus, polygon} = jscad.primitives;
const {extrudeRectangular, extrudeLinear, extrudeRotate} = jscad.extrusions;
const {colorize, colorNameToRgb} = jscad.colors;
const {union, subtract, intersect, scission} = jscad.booleans;
const {translate, rotate, scale, center, align} = jscad.transforms;
const {degToRad} = jscad.utils;

const {random, sin, cos} = Math;

const getParameterDefinitions = () => {
  // here we return the definitions of our parameters
  return [
    {name: 'size', caption: 'Size:', type: 'float', initial: 5},
  ];
};

const random_in_range = (min, max) => {
  return random() * (max - min) + min;
}

const base_polygon = () => {
  let base_points = [];
  for(let angleFrac = 0; angleFrac < 360; angleFrac += 15) {
    const radiusFrac = random_in_range(15, 20);
    const x = radiusFrac * cos(degToRad(angleFrac));
    const y = radiusFrac * sin(degToRad(angleFrac)) * 1.5;
    base_points.push([x,y]);
  }
  return polygon({points: base_points});
}

const main = (parameters) => {
  return base_polygon();
};

module.exports = { main, getParameterDefinitions };