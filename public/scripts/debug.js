export function playerPosOnClick(player) {

    canvas.addEventListener('click', (event) => {
        player.pos.x = event.clientX;
        player.pos.y = event.clientY;
    });
}