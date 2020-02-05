import createPlayer from './player.js'
import createRenderer from './renderer.js'
import createTimer from './timer.js'
import { createPhysics, createJump, createMove } from './traits.js'
import createLevel from './level.js'
import mapKeyboard from './keyboard.js'

import { playerPosOnClick } from './debug.js'

const canvas = document.getElementById('canvas');
const renderer = createRenderer(canvas);
const level = createLevel(canvas);
const player = createPlayer();
player.addTrait(createJump(player));
player.addTrait(createMove(player));
player.addTrait(createPhysics(player, level));

mapKeyboard(player);

function update(deltaTime) {
    player.update(deltaTime);
    renderer.draw(level, player);
}
const timer = createTimer(update);
timer.start();

// debug
playerPosOnClick(player);