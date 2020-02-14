export default function createTimer(update, step = 1 / 60) {
    let lastTime = 0;
    let accumulator = 0;

    function run(time) {
        let deltaTime = (time - lastTime) / 1000;
        accumulator += deltaTime;

        if (accumulator > 1) {
            accumulator = 1;
        }

        while (accumulator >= step) {
            update(step);
            accumulator -= step;
        }

        lastTime = time;

        requestAnimationFrame(run);
    }

    function start() {
        requestAnimationFrame(run);
    }


    return {
        start: start
    }


}