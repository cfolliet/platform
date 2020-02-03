import createPlayer from './player.js'
import createRenderer from './renderer.js'
import createTimer from './timer.js'
import { createGravity } from './traits.js'

import { playerPosOnClick } from './debug.js'

function update() {
    player.update();
    renderer.draw(player);
}

const player = createPlayer();
player.addTrait(createGravity(player));
const renderer = createRenderer(document.getElementById('canvas'));
const timer = createTimer(update);
timer.start();

playerPosOnClick(player);