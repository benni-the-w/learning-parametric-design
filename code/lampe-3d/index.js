const jscad = require('@jscad/modeling')

const { line, arc, circle, ellipse, rectangle, cube, sphere, cylinder, cuboid, roundedCuboid, geodesicSphere, ellipsoid, roundedCylinder, cylinderElliptic, torus, polygon, polyhedron } = jscad.primitives;
const { extrudeRectangular, extrudeLinear, extrudeRotate } = jscad.extrusions;
const { colorize, colorNameToRgb } = jscad.colors;
const { union, subtract, intersect, scission } = jscad.booleans;
const { translate, rotate, scale, center, align } = jscad.transforms;
const { degToRad, radToDeg } = jscad.utils;
const { vec3 } = jscad.maths;
const { bezier } = jscad.curves;

const { random, sin, cos } = Math;



// Parameter der einzelnen Polyhedren
const LINE_JAGGEDNESS_HORIZONTAL = 5;
const LINE_JAGGEDNESS_VERTICAL = 3;
const POLYHEDRON_HEIGHT = 10;
const POLYHEDRON_LENGTH = 1.5;

// Parameter der Verteilung
const POLYHEDRON_DISTANCE = 20;
const POLYHEDRON_SCALE = 0.4;
const INNER_POLYHEDRON_COUNT = 30;



const SPIRAL_STEP_SIZE = 0.01;
const OUTER_STEP_SIZE = 0.01;

const getParameterDefinitions = () => {
  // here we return the definitions of our parameters
  return [
    { name: 'size', caption: 'Size:', type: 'float', initial: 5 },
  ];
};

// Generiert eine Zufallszahl zwischen min und max
const random_in_range = (min, max) => {
  return random() * (max - min) + min;
}

// Generiert die Punkte für die obere Linie
const get_upper_points = () => {
  let line_points = [];
  for (let i = -2; i <= 2; i++) {
    line_points.push([
      random_in_range(-LINE_JAGGEDNESS_HORIZONTAL, LINE_JAGGEDNESS_HORIZONTAL),
      i * 7,
      POLYHEDRON_HEIGHT + random_in_range(-LINE_JAGGEDNESS_VERTICAL, LINE_JAGGEDNESS_VERTICAL),
    ]);
  };
  return line_points;
};

// Generiert die Punkte für die untere Fläche
const get_lower_points = () => {
  let base_points = [];
  for (let angleFrac = 0; angleFrac < 360; angleFrac += 15) {
    const radiusFrac = random_in_range(15, 20);
    const x = radiusFrac * cos(degToRad(angleFrac));
    const y = radiusFrac * sin(degToRad(angleFrac)) * POLYHEDRON_LENGTH;
    base_points.push([x, y, 0]);
  }
  return base_points;
};

// Generiert ein einzelnes Polyhedron
const base_polyhedron = () => {
  // Mittelpunkt der unteren Fläche
  const center_point = [0, 0, 0];
  // Außenpunkte der unteren Fläche
  const lower_points = get_lower_points();
  // Anzahl der Punkte der unteren Fläche
  const l = lower_points.length;
  // Punkte der oberen Linie
  const upper_points = get_upper_points();

  // alle Punkte
  const all_points = [center_point].concat(lower_points).concat(upper_points);

  // Verbindung aller Punkte der unteren Fläche mit dem unteren Mittelpunkt
  const all_faces = [];
  for (let i = 0; i < l; i++) {
    all_faces.push([0, i + 1, ((i + 1) % l) + 1])
  }

  // Verbindung der inneren Punkte der oberen Linie mit den darunter liegenden Punkten
  all_faces.push([l + 2, 1, 24])
  all_faces.push([l + 3, 2, 1])
  all_faces.push([l + 4, 3, 2])

  all_faces.push([l + 4, 12, 11])
  all_faces.push([l + 3, 13, 12])
  all_faces.push([l + 2, 14, 13])
  all_faces.push([l + 1, 15, 14])

  // Verbindung der Endpunkte der oberen Linie mit dern darunter liegenden Punkten
  for (let i = 4; i < 12; i++) {
    all_faces.push([l + 5, i, i - 1])
  }

  for (let i = 15; i < 25; i++) {
    all_faces.push([l + 1, i, i - 1])
  }

  // Verbindung der Punkte der oberen Linie
  all_faces.push([l + 1, l + 2, 24])
  all_faces.push([l + 2, l + 1, 14])

  all_faces.push([l + 2, l + 3, 1])
  all_faces.push([l + 3, l + 2, 13])

  all_faces.push([l + 3, l + 4, 2])
  all_faces.push([l + 4, l + 3, 12])

  all_faces.push([l + 4, l + 5, 3])
  all_faces.push([l + 5, l + 4, 11])

  return polyhedron({
    points: all_points,
    faces: all_faces,
    orientation: 'inward'
  });
};

// Berechnet Spiralformel (https://en.wikipedia.org/wiki/Logarithmic_spiral)
const spiral = (phi) => {
  const a = 15
  const k = 0.15
  const x = a * Math.exp(k * phi) * cos(phi)
  const y = a * Math.exp(k * phi) * sin(phi)
  return [x, y, 0]
}

// Addiert zwei Vektoren
const add_vec = (a, b) => {
  return [
    a[0] + b[0],
    a[1] + b[1],
    a[2] + b[2]
  ]
}

// Subtrahiert zwei Vektoren
const sub_vec = (a, b) => {
  return [
    a[0] - b[0],
    a[1] - b[1],
    a[2] - b[2]
  ]
}

// Skaliert einen Vektor
const scale_vec = (a, x) => {
  return [
    a[0] * x,
    a[1] * x,
    a[2] * x,
  ]
}

// Generiert ein skaliertes, verschobenes und gedrehtes Polyhedron
const scaled_polyhedron = (position, angle) => {
  return translate(position, scale([POLYHEDRON_SCALE, POLYHEDRON_SCALE, POLYHEDRON_SCALE], rotate(angle, base_polyhedron())))
}

const main = (parameters) => {
  // Punkte
  let points = [];
  // Polyhederen
  let polyhedra = [];

  // Laufvariablen
  // letzter Punkt
  let last_point = [0, 0, 0];
  // Anzahl gesetzter Polyhedren
  let n = 0;
  // Parameter der Spiralformel
  let i = 0;

  // Loop für die inneren Polyhedren
  while (n < INNER_POLYHEDRON_COUNT) {
    // Berechne Punkt mit der Spiralformel
    let point = spiral(i)
    // Berechne Distanz zu vorherigem Punkt
    let d = vec3.distance(last_point, point);

    // Prüfe, ob Zieldistanz erreicht wurde
    if (d > POLYHEDRON_DISTANCE) {
      // Füge Punkt zur Liste hinzu
      points.push(point);
      // Füge Polyhedron zu Liste hinzu
      // TODO: Winkel berechnen
      polyhedra.push(scaled_polyhedron(point, [0, 0, 0]));

      // aktualisiere Laufvariablen
      n += 1;
      last_point = point;
    }
    i += SPIRAL_STEP_SIZE;
  }

  // vorletzter Punkt
  const second_last_point = points[points.length - 2];
  // Richtingsvektor vom vorletzten Punkt zum letzten Punkt
  const bezier_vector = sub_vec(last_point, second_last_point);
  // Zielpunkt des äußeren Schweifes  
  const destination_point = add_vec(last_point, scale_vec(bezier_vector, 8));
  const destination_bezier_point = scale_vec(destination_point, 0.7);

  // Erstelle Bezierkurve
  const b = bezier.create([
    last_point,
    scale_vec(add_vec(last_point, scale_vec(bezier_vector, 8)), 0.8),
    destination_bezier_point,
    destination_point
  ]);

  // Loop für die äußeren Polyhedren
  for (let i = 0; i < 1; i += OUTER_STEP_SIZE) {
    // Berechne Punkt mit der Bezierfunktion
    let point = bezier.valueAt(i, b);
    // Berechne Distanz zu vorherigem Punkt
    let d = vec3.distance(last_point, point);

    // Prüfe, ob Zieldistanz erreicht wurde
    if (d > POLYHEDRON_DISTANCE) {
      // Füge Polyhedron zu Liste hinzu
      // TODO: Winkel berechnen
      polyhedra.push(scaled_polyhedron(point, [0, 0, 0]));

      // aktualisiere Laufvariable
      last_point = point;
    }
  }

  return polyhedra;
};

module.exports = { main, getParameterDefinitions };