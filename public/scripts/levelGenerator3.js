import createRect from './rect.js'
import { collide } from './collider.js'

function roundToSize(n, size) {
    return Math.ceil(n / size) * size;
}

function getInput(height, tileSize) {
    return createRect(0, Math.max(tileSize * 5, Math.min(height - tileSize * 3, roundToSize(Math.random() * height | 0, tileSize))), tileSize, tileSize * 2);
}

function getPaths(width, height, input, tileSize) {
    const maxWidth = width / 5;
    const maxHeight = height / 2;
    const paths = [];

    let lastPath = input;
    let processing = true;
    let horUp = false;
    let verUp = true;

    while (processing) {
        const isVertical = paths.length % 2;
        const w = isVertical ? tileSize * 3 : Math.max(tileSize * 3, Math.random() * maxWidth | 0);
        const h = isVertical ? Math.max(tileSize * 3, Math.random() * maxHeight | 0) : tileSize * 3;
        const x = lastPath.right();
        let y = 0;

        if (!isVertical) {
            y = horUp ? lastPath.top() - h + tileSize * 3 : lastPath.bottom() - tileSize * 3;
            horUp = ! horUp;
        } else {
            y = verUp ? lastPath.top() - h + tileSize * 3 : lastPath.bottom() - tileSize * 3;
            verUp = ! verUp;
        }

        const path = createRect(x, y, w, h)
        if (path.right() >= width) {
            processing = false;
            path.size.x = width - tileSize - path.pos.x;
        }
        paths.push(path);
        lastPath = path;
    }

    return paths;
}

export default function generateLevel(width, height, tileSize = 16) {
    let tiles = [];

    tiles.push({ pos: { x: 0, y: 0 }, size: { x: width, y: tileSize * 4 } });
    tiles.push({ pos: { x: 0, y: height - tileSize * 2 }, size: { x: width, y: tileSize * 2 } });

    const input = getInput(height, tileSize);
    const paths = getPaths(width, height, input, tileSize);
    const lastPath = paths[paths.length - 1];
    const output = createRect(lastPath.right(), lastPath.top(), tileSize, tileSize * 2);

    tiles = tiles.concat(paths);

    return {
        tiles: tiles,
        input: input,
        output: output
    };
};
