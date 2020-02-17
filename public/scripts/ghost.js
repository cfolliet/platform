export default function createGhost() {
    let pos;
    let size = { x: 8, y: 24 };
    let history;
    let historyIndex;
    let time;
    let duration;

    function update(deltaTime) {
        time += deltaTime;

        if (time < duration && duration < Number.MAX_VALUE) {
            let record;
            do {
                record = history[historyIndex];
                historyIndex++;
            } while (record[0] < time)

            pos.x = record[1];
            pos.y = record[2];
        }
    }

    function draw(context) {
        context.strokeStyle = '#f7ebeb';
        context.strokeRect(pos.x - size.x / 2, pos.y - size.y / 2, size.x, size.y);
    }

    function reset(histo = []) {
        pos = { x: -1000, y: -1000 };
        history = histo;
        historyIndex = 0;
        time = 0;
        duration = history.length ? history[history.length - 1][0] : Number.MAX_VALUE;
    }

    reset();

    return {
        update, update,
        draw: draw,
        reset: reset,
        duration: duration
    }
}