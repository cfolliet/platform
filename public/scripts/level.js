//import generateLevel from './levelGenerator2.js'
import generateLevel from './levelGenerator4.js'

export default function createLevel(canvas, resources, player, ghost) {
    const tileWidth = 16;
    const tileHeight = 16;
    const level = generateLevel(canvas.width, canvas.height);
    const tiles = level.tiles;
    const input = level.input;
    const output = level.output;
    const background = resources.get('/images/background.jpg');
    const recordingStep = 1 / 30;
    let time = 0;
    let history = [];
    let bestTime = null;
    let step = recordingStep;

    function update(deltaTime) {
        time += deltaTime;
        step += deltaTime;

        if (time < ghost.getDuration() && step >= recordingStep) {
            step = 0;
            const record = [];
            record.push(time);
            record.push(player.pos.x);
            record.push(player.pos.y);
            history.push(record);
        }

        const output = level.output;
        const yMargin = output.size.y / 2;
        const xMargin = output.size.x / 2;
        const top = output.pos.y;
        const bottom = output.pos.y + output.size.y;
        const left = output.pos.x;
        const right = output.pos.x + output.size.x;

        if (player.top() >= top - yMargin && player.bottom() <= bottom + yMargin && player.left() >= left - xMargin && player.right() <= right + xMargin) {
            if (time < ghost.getDuration()) {
                bestTime = time;
                ghost.setHistory(history.slice());
            }

            reset();
        }
    }

    function reset() {
        const input = level.input;
        player.pos.x = input.pos.x + level.input.size.x / 2;
        player.pos.y = input.pos.y + input.size.y / 2;
        player.vel.x = 0;
        player.vel.y = 0;

        time = 0;
        history = [];

        ghost.reset();
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
        context.fillRect(0, 0, 350, 16 * 4);

        const text = `Best Time: ${(bestTime || 0).toFixed(2)} | Current Time: ${time.toFixed(2)}`;
        context.font = '18px serif';
        context.fillStyle = '#f7ebeb';
        context.fillText(text, 32, 32);
    }

    return {
        tileWidth: tileWidth,
        tileHeight: tileHeight,
        tiles: tiles,
        player: player,
        ghost: ghost,
        input: input,
        output: output,
        update: update,
        reset: reset,
        draw: draw
    }
}