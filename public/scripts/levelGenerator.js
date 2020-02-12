export default function generateLevel(width, height) {
    const minBlocks = 15
    const maxBlocks = 50;
    const maxBlockWidth = 20;
    const maxBlockHeight = 5;
    const level = []
    const tileSize = 16;

    level.push({ pos: { x: 0, y: 0 }, size: { x: width, y: tileSize * 2 } });
    level.push({ pos: { x: 0, y: height - tileSize * 2 }, size: { x: width, y: tileSize * 2 } });

    level.push({ pos: { x: 0, y: 0 }, size: { x: tileSize * 2, y: height } });
    level.push({ pos: { x: width - tileSize * 2, y: 0 }, size: { x: tileSize * 2, y: height } });

    const nbBlock = Math.max(minBlocks, Math.random() * maxBlocks | 0);
    for (let index = 0; index < nbBlock; index++) {
        const x = Math.random() * width | 0;
        const y = Math.random() * height | 0;
        const w = Math.max(tileSize, Math.random() * maxBlockWidth * tileSize | 0);
        const h = Math.max(tileSize, Math.random() * maxBlockHeight * tileSize | 0);

        level.push({ pos: { x: x, y: y }, size: { x: w, y: h } });
    }

    return level;
};
