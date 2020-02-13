function roundToSize(n, size) {
    return Math.ceil(n / size) * size;
}

function getTiles(width, height, tileSize) {
    const minBlocks = 15
    const maxBlocks = 50;
    const maxBlockWidth = 20 * tileSize;
    const maxBlockHeight = 5 * tileSize;
    const tiles = [];

    tiles.push({ pos: { x: 0, y: 0 }, size: { x: width, y: tileSize * 2 } });
    tiles.push({ pos: { x: 0, y: height - tileSize * 2 }, size: { x: width, y: tileSize * 2 } });

    tiles.push({ pos: { x: 0, y: 0 }, size: { x: tileSize * 2, y: height } });
    tiles.push({ pos: { x: width - tileSize * 2, y: 0 }, size: { x: tileSize * 2, y: height } });

    const nbBlock = Math.max(minBlocks, Math.random() * maxBlocks | 0);
    for (let index = 0; index < nbBlock; index++) {
        const x = roundToSize(Math.random() * width | 0, tileSize);
        const y = roundToSize(Math.random() * height | 0, tileSize);
        const w = Math.max(tileSize * 2, roundToSize(Math.random() * maxBlockWidth | 0, tileSize));
        const h = Math.max(tileSize * 2, roundToSize(Math.random() * maxBlockHeight | 0, tileSize));

        tiles.push({ pos: { x: x, y: y }, size: { x: w, y: h } });
    }

    return tiles;
}

function getEmptyPosition(width, height, tiles, tileSize) {
    let point = null;
    let collide = false;

    do {
        point = {
            pos: {
                x: roundToSize(Math.random() * width | 0, tileSize),
                y: roundToSize(Math.random() * height | 0, tileSize)
            },
            size: {
                x: tileSize,
                y: tileSize * 2
            }
        }

        const posTop = point.pos.y;
        const posBottom = point.pos.y + point.size.x;
        const posLeft = point.pos.x;
        const posRight = point.pos.x + point.size.y;

        collide = tiles.some(tile => {
            const tileTop = tile.pos.y;
            const tileBottom = tile.pos.y + tile.size.y;
            const tileLeft = tile.pos.x;
            const tileRight = tile.pos.x + tile.size.x;

            if (tileLeft < posRight && tileRight > posLeft &&
                tileTop < posBottom && tileBottom > posTop) {
                return true;
            }
            return false;
        });
    } while (collide);
    return point;
}

export default function generateLevel(width, height, tileSize = 16) {
    const tiles = getTiles(width, height, tileSize);
    const input = getEmptyPosition(width, height, tiles, tileSize);
    const output = getEmptyPosition(width, height, tiles, tileSize);

    return {
        tiles: tiles,
        input: input,
        output: output
    };
};
