export function createPhysics(entity) {
    const GRAVITY = 1;
    function update(deltaTime) {
        entity.pos.x += entity.vel.x;
        entity.pos.y += entity.vel.y;

        entity.vel.y += GRAVITY * deltaTime;
    }
    return {
        update: update
    }
}

export function createLevelCollider(entity, level) {
    function update() {
        level.tiles.forEach(tile => {
            const tileTop = tile.pos.y * level.tileHeight;
            const tileLeft = tile.pos.x * level.tileWidth;
            const tileRight = tile.pos.x * level.tileWidth + level.tileWidth;

            if (entity.right() > tileLeft && entity.left() < tileRight && entity.bottom() > tileTop) {
                entity.pos.y = tileTop - entity.size.y / 2;
            }
        });
    }
    return {
        update: update
    }
}