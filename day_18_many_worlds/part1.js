const inputs = {
  simple: `#########
#b.A.@.a#
#########`,
};

const findEntrance = (ordinates) => {
  for (const ordinate in ordinates) {
    if (ordinates[ordinate] === "@") {
      return ordinate;
    }
  }
};

const isKey = (key) => /^[a-z]$/.test(key);
const isDoor = (door) => /^[A-Z]$/.test(door);

const bfs = (ordinates) => {
  let count = 0;
  const entrance = findEntrance(ordinates);
  const queue = [[entrance, 0]];
  const visited = { [entrance]: true };

  const directions = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
  ];

  while (queue.length > 0) {
    const [pos, steps] = queue.shift();
    count = Math.max(count, steps);
    const [x, y] = pos.split(",").map(Number);

    for (const [dx, dy] of directions) {
      const next = `${x + dx},${y + dy}`;

      if (isDoor(ordinates[next])) {
      }

      if (
        ordinates[next] !== undefined &&
        ordinates[next] !== "#" && !isDoor(ordinates[next]) &&
        !visited[next]
      ) {
        visited[next] = true;
        queue.push([next, steps + 1]);
      }
    }
  }
  console.log("minutes", count);
};

const isDoor = (key) => {
  const specialChars = ".,#@";

  return !specialChars.includes(key) && key.toUpperCase() === key;
};

const getMapDetails = (map) => {
  const mapDetails = {};

  for (let row = 0; row < map.length; row++) {
    for (let clmn = 0; clmn < map[row].length; clmn++) {
      const key = [row, clmn];
      mapDetails[key] = map[row][clmn];
    }
  }

  return mapDetails;
};

const createRobot = () => {
  return {
    position: [0, 0],
    lastMove: 0,
    target: [0, 0],
    ordinateDetails: { "0,0": 1 },
  };
};

const parseData = (data) => {
  return data.split("\n");
};

const part1 = (data) => {
  const parsedData = parseData(data);
  const mapDetails = getMapDetails(parsedData);
  bfs(mapDetails);
  console.log(mapDetails);
};

part1(inputs.simple);
