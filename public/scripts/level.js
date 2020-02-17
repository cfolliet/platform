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
    const best = {
        time: Number.MAX_VALUE,
        history: []
    };
    let history = [];
    const ghost = {
        historyIndex: 0,
        pos: { x: -1000, y: -1000 }
    };

    function update(deltaTime, player) {
        time += deltaTime;

        if (time < best.time) {
            const record = [];
            record.push(time);
            record.push(player.pos.x);
            record.push(player.pos.y);
            history.push(record);

            if (best.time < Number.MAX_VALUE) {
                let record;
                do {
                    record = best.history[ghost.historyIndex];
                    ghost.historyIndex++;
                } while (record[0] < time)

                ghost.pos.x = record[1];
                ghost.pos.y = record[2];
            }
        }

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

            if (time < best.time) {
                best.time = time;
                best.history = history.slice();
            }

            time = 0;
            history = [];
            ghost.historyIndex = 0;
            ghost.pos.x = -1000;
            ghost.pos.y = -1000;
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

        const text = `Best Time: ${best.time | 0} || Current Time: ${time | 0}`;
        context.font = '18px serif';
        context.fillStyle = '#f7ebeb';
        context.fillText(text, 32, 32);

        context.strokeStyle = '#f7ebeb';
        context.strokeRect(ghost.pos.x, ghost.pos.y, 8, 24);
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