export function createPhysics(entity, level) {
    const GRAVITY = 2000;

    function collideY(tiles, entity) {
        tiles.forEach(tile => {
            const tileTop = tile.pos.y;
            const tileBottom = tile.pos.y + tile.size.y;
            const tileLeft = tile.pos.x;
            const tileRight = tile.pos.x + tile.size.x;

            if (tileLeft < entity.right() && tileRight > entity.left() &&
                tileTop < entity.bottom() && tileBottom > entity.top()) {
                entity.pos.y = entity.vel.y >= 0 ? tileTop - entity.size.y / 2 : tileBottom + entity.size.y / 2;
                entity.vel.y = 0;
            }
        });
    }

    function collideX(tiles, entity) {
        tiles.forEach(tile => {
            const tileTop = tile.pos.y;
            const tileBottom = tile.pos.y + tile.size.y;
            const tileLeft = tile.pos.x;
            const tileRight = tile.pos.x + tile.size.x;

            if (tileLeft < entity.right() && tileRight > entity.left() &&
                tileTop < entity.bottom() && tileBottom > entity.top()) {
                entity.pos.x = entity.vel.x >= 0 ? tileLeft - entity.size.x / 2 : tileRight + entity.size.x / 2;
                entity.vel.x = 0;
            }
        });
    }

    function touch(tiles, entity) {
        let touch = false;
        tiles.forEach(tile => {
            const tileTop = tile.pos.y;
            const tileBottom = tile.pos.y + tile.size.y;
            const tileLeft = tile.pos.x;
            const tileRight = tile.pos.x + tile.size.x;


            const rightDist = entity.right() - tileLeft;
            const leftDist = tileRight - entity.left()
            if (tileTop < entity.bottom() && tileBottom > entity.top()
                && (0 <= rightDist && rightDist <= 8
                    || 0 <= leftDist && leftDist <= 8)) {
                touch = true;
            }
        });
        return touch;
    }

    function update(deltaTime) {
        if (entity.vel.y > 0 && touch(level.tiles, entity)) {
            entity.vel.y += GRAVITY * deltaTime / 10;
        } else {
            entity.vel.y += GRAVITY * deltaTime;
        }

        if (entity.vel.y) {
            entity.pos.y += entity.vel.y * deltaTime;
            collideY(level.tiles, entity)
        }
        if (entity.vel.x) {
            entity.pos.x += entity.vel.x * deltaTime;
            collideX(level.tiles, entity)
        }
    }
    return {
        update: update
    }
}

export function createJump(entity, level) {
    const JUMP_VELOCITY = 500;
    const SPEED_BOOST = 0.25;
    entity.jump = false;

    function touch(tiles, entity) {
        let touch = 0;
        tiles.forEach(tile => {
            const tileTop = tile.pos.y;
            const tileBottom = tile.pos.y + tile.size.y;
            const tileLeft = tile.pos.x;
            const tileRight = tile.pos.x + tile.size.x;


            const rightDist = tileLeft - entity.right();
            const leftDist = entity.left() - tileRight;
            if (tileTop < entity.bottom() && tileBottom > entity.top()) {
                console.log(rightDist)
                if (0 <= rightDist && rightDist <= entity.size.x) {
                    touch = -1;
                } else if (0 <= leftDist && leftDist <= entity.size.x) {
                    touch = 1;
                }
            }
        });
        return touch;
    }


    function update() {
        if (entity.jump == 1) {
            if (entity.vel.y == 0) {
                entity.vel.y -= JUMP_VELOCITY + Math.abs(entity.vel.x) * SPEED_BOOST;
                entity.jumpCombo = 1.25
            }
            else {
                const touchX = touch(level.tiles, entity);
                if (touchX) {
                    entity.vel.x += touchX * 1000;
                    entity.vel.y = 0;
                    entity.vel.y -= JUMP_VELOCITY / entity.jumpCombo;
                    entity.jumpCombo += 0.25;
                }
            }

            entity.jump = false;
        }
    }
    return {
        update: update
    }
}

export function createMove(entity) {
    const FRICTION = 15;
    const ACCELERATION = 6000;
    entity.moveRight = false;
    entity.moveLeft = false;

    function update(deltaTime) {
        let direction = 0;
        direction -= entity.moveLeft;
        direction += entity.moveRight;

        if (direction) {
            entity.vel.x += ACCELERATION * direction * deltaTime;
        };

        entity.vel.x -= entity.vel.x * FRICTION * deltaTime;
    }
    return {
        update: update
    }
}

export function createLoop(entity, level) {

    function update() {
        const output = level.output;
        const yMargin = output.size.y / 2;
        const xMargin = output.size.x / 2;
        const top = output.pos.y;
        const bottom = output.pos.y + output.size.y;
        const left = output.pos.x;
        const right = output.pos.x + output.size.x;

        if (entity.top() >= top - yMargin && entity.bottom() <= bottom + yMargin && entity.left() >= left - xMargin && entity.right() <= right + xMargin) {
            const input = level.input;
            entity.pos.x = input.pos.x + level.input.size.x / 2;
            entity.pos.y = input.pos.y + input.size.y / 2;
            entity.vel.x = 0;
            entity.vel.y = 0;
        }
    }

    return {
        update: update
    }
}