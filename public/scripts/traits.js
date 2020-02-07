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
    entity.jump = false;

    function update() {
        if (entity.jump == 1 && entity.vel.y == 0) {
            entity.vel.y -= 15;
        }
        entity.jump = false;
    }
    return {
        update: update
    }
}

export function createMove(entity) {
    entity.moveRight = false;
    entity.moveLeft = false;

    function update() {
        let vel = 0;
        vel -= entity.moveLeft;
        vel += entity.moveRight;

        entity.vel.x = vel * 3;
    }
    return {
        update: update
    }
}