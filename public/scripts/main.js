import createPlayer from './player.js'
import createRenderer from './renderer.js'
import createTimer from './timer.js'
import { createPhysics } from './traits.js'
import createLevel from './level.js'

import { playerPosOnClick } from './debug.js'


const renderer = createRenderer(document.getElementById('canvas'));
const level = createLevel();
const player = createPlayer();
player.addTrait(createPhysics(player, level));

function update(deltaTime) {
    player.update(deltaTime);
    renderer.draw(level, player);
}

const timer = createTimer(update);
timer.start();

// debug
playerPosOnClick(player);