
export default function mapKeyboard(player) {
    document.addEventListener('keydown', (event) => {
        if(event.key == 'z'){
            player.jump = true;
        }
    });
}