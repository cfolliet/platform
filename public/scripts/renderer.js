export default function createRenderer(canvas) {
    const context = canvas.getContext('2d');

    function clearBoard(context) {
        context.fillStyle = '#27291e';
        context.fillRect(0, 0, context.canvas.width, context.canvas.height);
    }

    function draw(level, player, ghost) {
        clearBoard(context);
        level.draw(context);
        player.draw(context);
        ghost.draw(context);
    }

    return {
        draw: draw
    }
}
