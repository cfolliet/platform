export default function generateLevel(width, height) {
    const tileSize = 16;
    const minBlocks = 15
    const maxBlocks = 50;
    const maxBlockWidth = 20 * tileSize;
    const maxBlockHeight = 5 * tileSize;
    const level = []

    level.push({ pos: { x: 0, y: 0 }, size: { x: width, y: tileSize * 2 } });
    level.push({ pos: { x: 0, y: height - tileSize * 2 }, size: { x: width, y: tileSize * 2 } });

    level.push({ pos: { x: 0, y: 0 }, size: { x: tileSize * 2, y: height } });
    level.push({ pos: { x: width - tileSize * 2, y: 0 }, size: { x: tileSize * 2, y: height } });

    function roundToSize(n, size) {
        return Math.ceil(n / size) * size;
    }

    const nbBlock = Math.max(minBlocks, Math.random() * maxBlocks | 0);
    for (let index = 0; index < nbBlock; index++) {
        const x = roundToSize(Math.random() * width | 0, tileSize);
        const y = roundToSize(Math.random() * height | 0, tileSize);
        const w = Math.max(tileSize * 2, roundToSize(Math.random() * maxBlockWidth | 0, tileSize));
        const h = Math.max(tileSize * 2, roundToSize(Math.random() * maxBlockHeight | 0, tileSize));

        level.push({ pos: { x: x, y: y }, size: { x: w, y: h } });
    }

    return level;
};
