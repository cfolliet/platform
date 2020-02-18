export default function createGhost() {
    let pos;
    let size = { x: 8, y: 24 };
    let history = [];
    let historyIndex;
    let time;
    let duration;

    function update(deltaTime) {
        time += deltaTime;

        if (time < duration && duration < Number.MAX_VALUE) {
            let record = history[historyIndex];
            while (record[0] < time) {
                historyIndex++;
                record = history[historyIndex];
            }

            pos.x = record[1];
            pos.y = record[2];
        } else {
            pos = { x: -1000, y: -1000 };
        }
    }

    function draw(context) {
        context.strokeStyle = '#f7ebeb';
        context.strokeRect(pos.x - size.x / 2, pos.y - size.y / 2, size.x, size.y);
    }

    function reset() {
        pos = { x: -1000, y: -1000 };
        historyIndex = 0;
        time = 0;
        duration = history.length ? history[history.length - 1][0] : Number.MAX_VALUE;
    }

    function getDuration() {
        return duration;
    }

    function setHistory(histo) {
        history = histo;
    }

    reset();

    return {
        update, update,
        draw: draw,
        reset: reset,
        getDuration: getDuration,
        setHistory: setHistory
    }
}