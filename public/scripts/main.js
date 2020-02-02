import createPlayer from './player.js'
import createRenderer from './renderer.js'
import createTimer from './timer.js'

import { playerPosOnClick } from './debug.js'

function update() {
    renderer.draw(player);
}

const player = createPlayer();
const renderer = createRenderer(document.getElementById('canvas'));
const timer = createTimer(update);
timer.start();

playerPosOnClick(player);