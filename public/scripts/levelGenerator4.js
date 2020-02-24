import createRect from './rect.js'
import { collide } from './collider.js'

function roundToSize(n, size) {
    return Math.ceil(n / size) * size;
}

function getInput(height, tileSize) {
    return createRect(tileSize * 2, Math.max(tileSize * 5, Math.min(height - tileSize * 6, roundToSize(Math.random() * height | 0, tileSize))), tileSize, tileSize * 2);
}

function getBlocks(width, height, tileSize) {
    const blocksOnX = 8;
    const blocksOnY = 6;
    const blocks = [];
    for (let x = 0; x < blocksOnX; x++) {
        for (let y = 0; y < blocksOnY; y++) {
            blocks.push(createRect(x * width / blocksOnX, y * height / blocksOnY, width / blocksOnX, height / blocksOnY));
        }
    }
    return blocks;
}

function getTile(block) {
    const w = Math.max(block.size.x / 4, Math.random() * block.size.x);
    const x = block.left() + Math.random() * block.size.x / 3;
    const y = block.top() + block.size.y / 3;
    const h = Math.max(block.size.y / 4, Math.random() * block.size.y);
    return createRect(x, y, w, h);
}

function getTiles(width, height, tileSize, input, output) {
    const tiles = [];

    const blocks = getBlocks(width, height, tileSize);

    blocks.forEach(block => {
        const tile = getTile(block, input, output);
        if (!collide(tile, input) && !collide(tile, output)) {
            tiles.push(tile);
        }
    });

    return tiles;
}

export default function generateLevel(width, height, tileSize = 16) {
    let tiles = [];

    tiles.push(createRect(0, 0, width, tileSize * 4));
    tiles.push(createRect(0, height - tileSize * 2, width, tileSize * 2));

    tiles.push(createRect(0, 0, tileSize * 2, height));
    tiles.push(createRect(width - tileSize * 2, 0, tileSize * 2, height));

    const input = getInput(height, tileSize);
    const output = createRect(width - tileSize * 3, height - input.top(), tileSize, tileSize * 2);

    tiles = tiles.concat(getTiles(width, height, tileSize, input, output));

    return {
        tiles: tiles,
        input: input,
        output: output
    };
};
