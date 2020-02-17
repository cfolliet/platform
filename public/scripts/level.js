import generateLevel from './levelGenerator.js'

export default function createLevel(canvas, resources) {
    const tileWidth = 16;
    const tileHeight = 16;
    const level = generateLevel(canvas.width, canvas.height);
    const tiles = level.tiles;
    const input = level.input;
    const output = level.output;
    const background = resources.get('/images/background.jpg');
    let time = 0;
    let bestTime = Number.MAX_VALUE;

    function update(deltaTime, player) {
        time += deltaTime;

        const output = level.output;
        const yMargin = output.size.y / 2;
        const xMargin = output.size.x / 2;
        const top = output.pos.y;
        const bottom = output.pos.y + output.size.y;
        const left = output.pos.x;
        const right = output.pos.x + output.size.x;

        if (player.top() >= top - yMargin && player.bottom() <= bottom + yMargin && player.left() >= left - xMargin && player.right() <= right + xMargin) {
            const input = level.input;
            player.pos.x = input.pos.x + level.input.size.x / 2;
            player.pos.y = input.pos.y + input.size.y / 2;
            player.vel.x = 0;
            player.vel.y = 0;
            bestTime = Math.min(time, bestTime);
            time = 0;
        }
    }

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

        context.fillStyle = '#27291e';
        context.fillRect(0, 0, 300, 16 * 4);

        const text = `Best Time: ${bestTime | 0} || Current Time: ${time | 0}`;
        context.font = '18px serif';
        context.fillStyle = '#f7ebeb';
        context.fillText(text, 32, 32);
    }

    return {
        tileWidth: tileWidth,
        tileHeight: tileHeight,
        tiles: tiles,
        input: input,
        output: output,
        update: update,
        draw: draw
    }
}