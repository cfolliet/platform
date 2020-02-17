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
    const level = createLevel(canvas, resources);
    const player = createPlayer({ x: level.input.pos.x + level.input.size.x / 2, y: level.input.pos.y + level.input.size.y / 2 });
    const ghost = createGhost();
    player.addTrait(createJump(player, level));
    player.addTrait(createMove(player));
    player.addTrait(createPhysics(player, level));

    mapKeyboard(player);

    function update(deltaTime) {
        player.update(deltaTime);
        ghost.update(deltaTime);
        level.update(deltaTime, player, ghost);
        renderer.draw(level, player, ghost);
    }
    const timer = createTimer(update);
    timer.start();

    // debug
    playerPosOnClick(player);
}

const canvas = document.getElementById('canvas');
main(canvas);