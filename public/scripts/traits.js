export function createPhysics(entity, level) {
    const GRAVITY = 1;

    function collideY(tiles, entity) {
        tiles.forEach(tile => {
            const tileTop = tile.pos.y * level.tileHeight;
            const tileBottom = tile.pos.y * level.tileHeight + level.tileHeight;
            const tileLeft = tile.pos.x * level.tileWidth;
            const tileRight = tile.pos.x * level.tileWidth + level.tileWidth;

            if (tileLeft < entity.right() && tileRight > entity.left() &&
                tileTop < entity.bottom() && tileBottom > entity.top()) {
                entity.pos.y = entity.vel.y >= 0 ? tileTop - entity.size.y / 2 : tileBottom + entity.size.y / 2;
                entity.vel.y = 0;
            }
        });
    }

    function collideX(tiles, entity) {
        tiles.forEach(tile => {
            const tileTop = tile.pos.y * level.tileHeight;
            const tileBottom = tile.pos.y * level.tileHeight + level.tileHeight;
            const tileLeft = tile.pos.x * level.tileWidth;
            const tileRight = tile.pos.x * level.tileWidth + level.tileWidth;

            if (tileLeft < entity.right() && tileRight > entity.left() &&
                tileTop < entity.bottom() && tileBottom > entity.top()) {
                entity.pos.x = entity.vel.x >= 0 ? tileLeft - entity.size.x / 2 : tileRight + entity.size.x / 2;
                entity.vel.x = 0;
            }
        });
    }

    function update(deltaTime) {
        entity.vel.y += GRAVITY * deltaTime;

        if (entity.vel.y) {
            entity.pos.y += entity.vel.y;
            collideY(level.tiles, entity)
        }
        if (entity.vel.x) {
            entity.pos.x += entity.vel.x;
            collideX(level.tiles, entity)
        }
    }
    return {
        update: update
    }
}

export function createJump(entity) {
    const JUMP_VELOCITY = 14;
    entity.jump = false;

    function update() {
        if (entity.jump == 1 && entity.vel.y == 0) {
            const RUN_FACTOR = (1 * Math.abs(entity.vel.x) / 3); 
            entity.vel.y -= JUMP_VELOCITY + RUN_FACTOR;
        }
        entity.jump = false;
    }
    return {
        update: update
    }
}

export function createMove(entity) {
    const FRICTION = 0.6;
    const MAX_VEL_X = 15;
    const ACCELERATION = 1.5;
    entity.moveRight = false;
    entity.moveLeft = false;

    function update(deltaTime) {
        let vel = 0;
        vel -= entity.moveLeft;
        vel += entity.moveRight;

        if (vel) {
            entity.vel.x = Math.max(Math.min((entity.vel.x + vel * deltaTime) * ACCELERATION, MAX_VEL_X), -MAX_VEL_X);
        };

        entity.vel.x = entity.vel.x * FRICTION * deltaTime;
    }
    return {
        update: update
    }
}