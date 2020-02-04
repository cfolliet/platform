import createPlayer from './player.js'
import createRenderer from './renderer.js'
import createTimer from './timer.js'
import { createPhysics, createJump } from './traits.js'
import createLevel from './level.js'
import mapKeyboard from './keyboard.js'

import { playerPosOnClick } from './debug.js'


const renderer = createRenderer(document.getElementById('canvas'));
const level = createLevel();
const player = createPlayer();
player.addTrait(createPhysics(player, level));
player.addTrait(createJump(player));

mapKeyboard(player);

function update(deltaTime) {
    player.update(deltaTime);
    renderer.draw(level, player);
}
const timer = createTimer(update);
timer.start();

// debug
playerPosOnClick(player);