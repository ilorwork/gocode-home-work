function detectCollision(objects, point) {
  //   console.log(...objects);
  //   console.log();
  //   console.log(...objects[1]);

  // for (let i = 0; i < objects.length; i++) {
  //   let object = objects[i];
  //   if (
  //     point.x >= object.x &&
  //     point.x <= object.x + object.width &&
  //     point.y >= object.y &&
  //     point.y <= object.y + object.height
  //   )
  //     return object;
  // }

  objects.forEach(({ x, y, width, height }) => {
    if (
      point.x >= x &&
      point.x <= x + width &&
      point.y >= y &&
      point.y <= y + height
    )
      return { x, y, width, height };
  });
  return "none";
}

const myObjects = [
  { x: 10, y: 20, width: 30, height: 30 },
  { x: -40, y: 20, width: 30, height: 30 },
  { x: 0, y: 0, width: 10, height: 5 },
];

console.log(detectCollision(myObjects, { x: 10, y: 20 }));
