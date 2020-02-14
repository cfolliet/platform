import generateLevel from './levelGenerator.js'

export default function createLevel(canvas, resources) {
    const tileWidth = 16;
    const tileHeight = 16;
    const level = generateLevel(canvas.width, canvas.height);
    const tiles = level.tiles;
    const input = level.input;
    const output = level.output;
    const background = resources.get('/images/background.jpg');

    function draw(context) {
        context.strokeStyle = '#62757c';
        tiles.forEach(tile => {
            const x = tile.pos.x;
            const y = tile.pos.y;
            const w = tile.size.x;
            const h = tile.size.y;

            context.strokeRect(x, y, w, h);
            context.drawImage(background, x, y, w, h, x, y, w, h);
        });

        context.fillStyle = '#4f900d';
        context.strokeStyle = '#f7ebeb';
        context.fillRect(input.pos.x, input.pos.y, input.size.x, input.size.y)
        context.strokeRect(input.pos.x, input.pos.y, input.size.x, input.size.y);
        
        context.fillStyle = '#890729';
        context.strokeStyle = '#f7ebeb';
        context.fillRect(output.pos.x, output.pos.y, output.size.x, output.size.y)
        context.strokeRect(output.pos.x, output.pos.y, output.size.x, output.size.y);
    }

    return {
        tileWidth: tileWidth,
        tileHeight: tileHeight,
        tiles: tiles,
        input: input,
        draw: draw
    }
}