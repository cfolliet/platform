export default function createRenderer(canvas) {
    const context = canvas.getContext('2d');

    function draw(level, player) {

        function clearBoard(context) {
            context.fillStyle = 'black';
            context.fillRect(0, 0, context.canvas.width, context.canvas.height);
        }

        clearBoard(context);
        level.draw(context);
        player.draw(context);
    }

    return {
        draw: draw
    }
}
