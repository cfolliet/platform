import createRect from './rect.js'
import { collide } from './collider.js'

function roundToSize(n, size) {
    return Math.ceil(n / size) * size;
}

function getInput(height, tileSize) {
    return createRect(tileSize * 2, Math.max(tileSize * 5, Math.min(height - tileSize * 6, roundToSize(Math.random() * height | 0, tileSize))), tileSize, tileSize * 2);
}

function getBlocks(width, height, tileSize) {
    const blocksOnX = 5;
    const blocksOnY = 3;
    const blocks = [];
    for (let x = 0; x < blocksOnX; x++) {
        for (let y = 0; y < blocksOnY; y++) {
            blocks.push(createRect(x * width / blocksOnX, y * height / blocksOnY, width / blocksOnX, height / blocksOnY));
        }
    }
    return blocks;
}

function getTile(block) {
    const x = block.left() + block.size.x / 3;
    const y = block.top() + block.size.y / 3;
    const w = block.size.x / 3;
    const h = block.size.y / 3;
    return { pos: { x: x, y: y }, size: { x: w, y: h } };
}

function getTiles(width, height, tileSize) {
    const tiles = [];

    const blocks = getBlocks(width, height, tileSize);

    blocks.forEach(block => {
        tiles.push(getTile(block));
    });

    return tiles;
}

export default function generateLevel(width, height, tileSize = 16) {
    let tiles = [];

    tiles.push({ pos: { x: 0, y: 0 }, size: { x: width, y: tileSize * 4 } });
    tiles.push({ pos: { x: 0, y: height - tileSize * 2 }, size: { x: width, y: tileSize * 2 } });

    tiles.push({ pos: { x: 0, y: 0 }, size: { x: tileSize * 2, y: height } });
    tiles.push({ pos: { x: width - tileSize * 2, y: 0 }, size: { x: tileSize * 2, y: height } });

    const input = getInput(height, tileSize);
    const output = createRect(width - tileSize * 3, height - input.top(), tileSize, tileSize * 2);

    tiles = tiles.concat(getTiles(width, height, tileSize));

    return {
        tiles: tiles,
        input: input,
        output: output
    };
};
