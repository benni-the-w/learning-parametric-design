const jscad = require("@jscad/modeling");

const {
  line,
  arc,
  circle,
  ellipse,
  rectangle,
  cube,
  sphere,
  cylinder,
  cuboid,
  roundedCuboid,
  geodesicSphere,
  ellipsoid,
  roundedCylinder,
  cylinderElliptic,
  torus,
  polygon,
  polyhedron,
} = jscad.primitives;
const { extrudeRectangular, extrudeLinear, extrudeRotate } = jscad.extrusions;
const { colorize, colorNameToRgb } = jscad.colors;
const { union, subtract, intersect, scission } = jscad.booleans;
const { translate, rotate, scale, center, align } = jscad.transforms;
const { degToRad, radToDeg } = jscad.utils;
const { vec3 } = jscad.maths;
const { bezier } = jscad.curves;
const { measureVolume } = jscad.measurements;

const { random, sin, cos, PI, abs } = Math;

// Parameter der einzelnen Polyhedren
const LINE_JAGGEDNESS_HORIZONTAL = 5;
const LINE_JAGGEDNESS_VERTICAL = 3;
const POLYHEDRON_HEIGHT = 10;
const POLYHEDRON_LENGTH = 1.5;

// Parameter der Verteilung
const POLYHEDRON_DISTANCE = 20;
const POLYHEDRON_SCALE = 0.4;
const INNER_POLYHEDRON_COUNT = 20;

const SPIRAL_STEP_SIZE = 0.1;
const OUTER_STEP_SIZE = 0.01;

const getParameterDefinitions = () => {
  // here we return the definitions of our parameters
  return [{ name: "size", caption: "Size:", type: "float", initial: 5 }];
};

// Generiert eine Zufallszahl zwischen min und max
const random_in_range = (min, max) => {
  return random() * (max - min) + min;
};

// Generiert die Punkte für die obere Linie
const get_upper_points = () => {
  let line_points = [];
  for (let i = -2; i <= 2; i++) {
    line_points.push([
      random_in_range(-LINE_JAGGEDNESS_HORIZONTAL, LINE_JAGGEDNESS_HORIZONTAL),
      i * 7,
      POLYHEDRON_HEIGHT +
        random_in_range(-LINE_JAGGEDNESS_VERTICAL, LINE_JAGGEDNESS_VERTICAL),
    ]);
  }
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
    all_faces.push([0, i + 1, ((i + 1) % l) + 1]);
  }

  // Verbindung der inneren Punkte der oberen Linie mit den darunter liegenden Punkten
  all_faces.push([l + 2, 1, 24]);
  all_faces.push([l + 3, 2, 1]);
  all_faces.push([l + 4, 3, 2]);

  all_faces.push([l + 4, 12, 11]);
  all_faces.push([l + 3, 13, 12]);
  all_faces.push([l + 2, 14, 13]);
  all_faces.push([l + 1, 15, 14]);

  // Verbindung der Endpunkte der oberen Linie mit dern darunter liegenden Punkten
  for (let i = 4; i < 12; i++) {
    all_faces.push([l + 5, i, i - 1]);
  }

  for (let i = 15; i < 25; i++) {
    all_faces.push([l + 1, i, i - 1]);
  }

  // Verbindung der Punkte der oberen Linie
  all_faces.push([l + 1, l + 2, 24]);
  all_faces.push([l + 2, l + 1, 14]);

  all_faces.push([l + 2, l + 3, 1]);
  all_faces.push([l + 3, l + 2, 13]);

  all_faces.push([l + 3, l + 4, 2]);
  all_faces.push([l + 4, l + 3, 12]);

  all_faces.push([l + 4, l + 5, 3]);
  all_faces.push([l + 5, l + 4, 11]);

  return polyhedron({
    points: all_points,
    faces: all_faces,
    orientation: "inward",
  });
};

// Berechnet Spiralformel (https://en.wikipedia.org/wiki/Logarithmic_spiral)
const spiral = (phi, k) => {
  const a = 15;
  //const k = 0.15
  const x = a * Math.exp(k * phi) * cos(phi);
  const y = a * Math.exp(k * phi) * sin(phi);
  return [x, -y, 0];
};

// Addiert zwei Vektoren
const add_vec = (a, b) => {
  return [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
};

// Subtrahiert zwei Vektoren
const sub_vec = (a, b) => {
  return [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
};

// Skaliert einen Vektor
const scale_vec = (a, x) => {
  return [a[0] * x, a[1] * x, a[2] * x];
};

const main = (parameters) => {
  // Punkte
  let points = [];

  // Laufvariablen
  // letzter Punkt
  let last_point = [0, 0, 0];
  // Anzahl gesetzter Polyhedren
  let n = 0;
  // Parameter der Spiralformel
  let i = 0;

  let last_polyhedron = sphere();

  // Polyhederen
  let polyhedra = [last_polyhedron];
  let polyhedra_union = last_polyhedron;

  let last_angle = 0;
  let total_angle = 0;

  {
    // Loop für die inneren Polyhedren
    while (n < INNER_POLYHEDRON_COUNT) {
      // Berechne Punkt mit der Spiralformel
      const point = spiral(i, 0.15);

      console.log("n", n);
      console.log("i", i);

      const current_scale = 0.1 + abs(POLYHEDRON_SCALE * sin((PI * i) / 32));

      const ding = scale(
        [current_scale, current_scale, current_scale],
        base_polyhedron()
      );

      const angle = vec3.angle(point, [1, 0, 0]);

      let test_polyhedron = translate(
        point,
        rotate([0, 0, point[1] < 0 ? -angle : angle], ding)
      );

      //const intersect_volume = measureVolume(intersect(test_polyhedron, union(polyhedra)));
      const intersect_volume = measureVolume(intersect(test_polyhedron, last_polyhedron));

      if (intersect_volume == 0) {
        // Füge Punkt zur Liste hinzu
        points.push(point);

        total_angle += radToDeg(vec3.angle(last_point, point));

        console.log("total_angle:\t", total_angle);

        // Füge Polyhedron zu Liste hinzu
        last_polyhedron = test_polyhedron;
        polyhedra.push(last_polyhedron);
        polyhedra_union = union(polyhedra_union, last_polyhedron);

        // aktualisiere Laufvariablen
        n += 1;
        last_point = point;
      }
      i += SPIRAL_STEP_SIZE;
    }
  }






  let max_angle = total_angle;
  let max_i = i;


  


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
    destination_point,
  ]);

  const full_distance = vec3.distance(last_point, destination_point);

  // Loop für die äußeren Polyhedren
  for (let i = 0; i < 1; i += OUTER_STEP_SIZE) {
    // Berechne Punkt mit der Bezierfunktion
    let point = bezier.valueAt(i, b);
    // Berechne Distanz zu vorherigem Punkt
    let d = vec3.distance(last_point, point);

    // Prüfe, ob Zieldistanz erreicht wurde
    if (d > POLYHEDRON_DISTANCE) {
      // Füge Polyhedron zu Liste hinzu

      const ding = scale(
        [POLYHEDRON_SCALE, POLYHEDRON_SCALE, POLYHEDRON_SCALE],
        base_polyhedron()
      );

      const angle_scale =
        vec3.distance(point, destination_point) / full_distance;
      const angle = vec3.angle(point, [1, 0, 0]) * angle_scale;

      polyhedra.push(
        translate(point, rotate([0, 0, point[1] < 0 ? -angle : angle], ding))
      );

      // aktualisiere Laufvariable
      last_point = point;
    }
  }



  

  polyhedra_union = rotate([0,0,degToRad(180)], polyhedra_union);


  // Laufvariablen
  // letzter Punkt
  last_point = [0, 0, 0];
  // Anzahl gesetzter Polyhedren
  n = 0;
  // Parameter der Spiralformel
  i = 0;


  last_angle = 0;
  total_angle = 0;

  // Loop für die inneren Polyhedren
  while (total_angle < (max_angle - 180)) {
    // Berechne Punkt mit der Spiralformel
    const point = spiral(i, 0.15);

    // Berechne Distanz zu vorherigem Punkt
    let d = vec3.distance(last_point, point);

    console.log("n", n);
    console.log("i", i);

    const current_scale = 0.08 + abs(POLYHEDRON_SCALE * sin((PI * i) / 32));    

    const ding = scale(
      [current_scale, current_scale, current_scale],
      base_polyhedron()
    );

    const angle = vec3.angle(point, [1, 0, 0]);

    let test_polyhedron = translate(
      point,
      rotate([0, 0, point[1] < 0 ? -angle : angle], ding)
    );

    const intersect_volume = measureVolume(
      intersect(test_polyhedron, polyhedra_union)
    );

    if (intersect_volume == 0) {
      // Füge Punkt zur Liste hinzu
      points.push(point);

      total_angle += radToDeg(vec3.angle(last_point, point));

      // Füge Polyhedron zu Liste hinzu
      last_polyhedron = test_polyhedron;
      polyhedra.push(last_polyhedron);
      polyhedra_union = union(polyhedra_union, last_polyhedron);

      // aktualisiere Laufvariablen
      n += 1;
      last_point = point;
    }
    i += SPIRAL_STEP_SIZE * 2;
  }










    // Laufvariablen
  // letzter Punkt
  last_point = [0, 0, 0];
  // Anzahl gesetzter Polyhedren
  n = 0;
  // Parameter der Spiralformel
  i = 0;

  // Loop für die inneren Polyhedren
  while (i < max_i) {
    // Berechne Punkt mit der Spiralformel
    const point = spiral(i, 0.06);

    // Berechne Distanz zu vorherigem Punkt
    let d = vec3.distance(last_point, point);

    console.log("n", n);
    console.log("i", i);

    const current_scale = 0.06 + abs(POLYHEDRON_SCALE * sin((PI * n) / 64));

    const ding = scale(
      [current_scale, current_scale, current_scale],
      base_polyhedron()
    );

    const angle = vec3.angle(point, [1, 0, 0]);

    let test_polyhedron = translate(
      point,
      rotate([0, 0, point[1] < 0 ? -angle : angle], ding)
    );

    const intersect_volume = measureVolume(
      intersect(test_polyhedron, union(polyhedra))
    );

    if (intersect_volume == 0) {
      // Füge Punkt zur Liste hinzu
      points.push(point);

      // Füge Polyhedron zu Liste hinzu
      last_polyhedron = test_polyhedron;
      polyhedra.push(last_polyhedron);

      // aktualisiere Laufvariablen
      n += 1;
      last_point = point;
    }
    i += SPIRAL_STEP_SIZE * 4;
  }













  return polyhedra_union;
};

module.exports = { main, getParameterDefinitions };