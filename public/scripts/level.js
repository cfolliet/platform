import generateLevel from './levelGenerator.js'

export default function createLevel(canvas, resources) {
    const tileWidth = 16;
    const tileHeight = 16;
    const width = canvas.width / tileWidth;
    const height = canvas.height / tileHeight;
    const tiles = generateLevel(width, height);
    const background = resources.get('/images/background.jpg');

    function draw(context) {
        context.strokeStyle = '#62757c';
        tiles.forEach(tile => {
            const x = tile.pos.x * tileWidth;
            const y = tile.pos.y * tileHeight;
            const w = tileWidth;
            const h = tileHeight;

            context.strokeRect(x, y, w, h);
            context.drawImage(background, x, y, w, h, x, y, w, h);
        });
    }

    return {
        tileWidth: tileWidth,
        tileHeight: tileHeight,
        tiles: tiles,
        draw: draw
    }
}