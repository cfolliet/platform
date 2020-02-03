export function createGravity(entity) {
    function update(){
        entity.pos.y += 10;
    }
    return {
        update: update
    }
}