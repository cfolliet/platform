
export default function mapKeyboard(player) {
    document.addEventListener('keydown', (event) => {
        map(event.key, 1)
    });
    document.addEventListener('keyup', (event) => {
        map(event.key, 0)
    });

    function map(key, state){
        if (key == 'z') {
            player.jump = state;
        } else if (key == 'd') {
            player.moveRight = state;
        } else if (key == 'q') {
            player.moveLeft = state;
        }
    }
}