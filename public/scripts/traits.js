export function createPhysics(entity, level) {
    const GRAVITY = 1;

    function collideY(tiles, entity) {
        tiles.forEach(tile => {
            const tileTop = tile.pos.y * level.tileHeight;
            const tileLeft = tile.pos.x * level.tileWidth;
            const tileRight = tile.pos.x * level.tileWidth + level.tileWidth;

            if (entity.right() > tileLeft && entity.left() < tileRight && entity.bottom() > tileTop) {
                entity.pos.y = tileTop - entity.size.y / 2;
                entity.vel.y = 0;
            }
        });
    }

    function update(deltaTime) {
        entity.vel.y += GRAVITY * deltaTime;

        entity.pos.y += entity.vel.y;
        if (entity.vel.y) {
            collideY(level.tiles, entity)
        }

        entity.pos.x += entity.vel.x;
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