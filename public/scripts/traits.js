export function createGravity(entity) {
    function update() {
        entity.pos.y += 10;
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