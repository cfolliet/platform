import createPlayer from './player.js'
import createRenderer from './renderer.js'
import createTimer from './timer.js'
import { createGravity, createLevelCollider } from './traits.js'
import createLevel from './level.js'

import { playerPosOnClick } from './debug.js'


const renderer = createRenderer(document.getElementById('canvas'));
const level = createLevel();
const player = createPlayer();
player.addTrait(createGravity(player));
player.addTrait(createLevelCollider(player, level));

function update() {
    player.update();
    renderer.draw(level, player);
}

const timer = createTimer(update);
timer.start();

// debug
playerPosOnClick(player);