export default function createTimer(update) {

    function run() {
        update();
        requestAnimationFrame(run);
    }


    function start() {
        run();
    }


    return {
        start: start
    }


}