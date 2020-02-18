import createPlayer from './player.js'
import createGhost from './ghost.js'
import createRenderer from './renderer.js'
import createTimer from './timer.js'
import { createPhysics, createJump, createMove } from './traits.js'
import createLevel from './level.js'
import mapKeyboard from './keyboard.js'
import { loadImages } from './resourceLoader.js'

import { playerPosOnClick } from './debug.js'

async function main(canvas) {
    const resources = await loadImages();
    const renderer = createRenderer(canvas);
    const player = createPlayer();
    const ghost = createGhost();
    const level = createLevel(canvas, resources, player, ghost);
    player.addTrait(createJump(player, level));
    player.addTrait(createMove(player));
    player.addTrait(createPhysics(player, level));

    mapKeyboard(player, level);

    function update(deltaTime) {
        player.update(deltaTime);
        ghost.update(deltaTime);
        level.update(deltaTime);
        renderer.draw(level, player, ghost);
    }
    const timer = createTimer(update);
    level.reset();
    timer.start();

    // debug
    playerPosOnClick(player);
}

const canvas = document.getElementById('canvas');
main(canvas);