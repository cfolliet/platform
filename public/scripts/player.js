export default function createPlayer() {
    const pos = { x: 100, y: 100 }

    function draw(context) {
        context.fillStyle = 'red';
        context.fillRect(pos.x, pos.y, 10, 10);
    }

    return {
        pos: pos,
        draw: draw
    }
}