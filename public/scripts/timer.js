export default function createTimer(update) {
    let lastTimestamp = null;
    
    function run(timestamp) {
        let deltaTime = 0;
        if(lastTimestamp){
            deltaTime = timestamp - lastTimestamp;
        }
        lastTimestamp = timestamp;

        update(deltaTime / (1000 / 60));
        requestAnimationFrame(run);
    }


    function start() {
        run();
    }


    return {
        start: start
    }


}