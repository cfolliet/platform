export function playerPosOnClick(player) {

    canvas.addEventListener('click', (event) => {
        player.vel = { x: 0, y: 0 };
        player.pos.x = event.clientX;
        player.pos.y = event.clientY;
    });
}