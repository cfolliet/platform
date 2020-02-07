export default function generateLevel(width, height) {
    const minBlocks = 15
    const maxBlocks = 50;
    const maxBlockWidth = 20;
    const maxBlockHeight = 5;
    const level = []

    for (let x = 0; x < width; x++) {
        level.push({ pos: { x: x, y: 0 } });
        level.push({ pos: { x: x, y: height - 1 } });
    }
    for (let y = 0; y < width; y++) {
        level.push({ pos: { x: 0, y: y } });
        level.push({ pos: { x: width - 1, y: y } });
    }

    const nbBlock = Math.max(minBlocks, Math.random() * maxBlocks | 0);
    for (let index = 0; index < nbBlock; index++) {
        const blockWidth = Math.random() * maxBlockWidth | 0;
        const blockHeight = Math.random() * maxBlockHeight | 0;
        const posX = Math.random() * width | 0;
        const posY = Math.random() * height | 0;

        for (let x = posX; x < posX + blockWidth; x++) {
            for (let y = posY; y < posY + blockHeight; y++) {
                if (!level.some(l => l.pos.x == x && l.pos.y == y)) {
                    level.push({ pos: { x: x, y: y } });
                }
            }
        }
    }

    return level;
};
