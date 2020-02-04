export default function createPlayer() {
    const pos = { x: 200, y: 100 }
    const size = { x: 16, y: 32 }
    const vel = { x: 0, y: 0 }
    const traits = [];

    function top() {
        return pos.y - size.y / 2;
    }

    function right() {
        return pos.x + size.x / 2;
    }

    function bottom() {
        return pos.y + size.y / 2;
    }

    function left() {
        return pos.x - size.x / 2;
    }

    function addTrait(trait) {
        traits.push(trait)
    }

    function draw(context) {
        context.fillStyle = 'red';
        context.fillRect(pos.x - size.x / 2, pos.y - size.y / 2, size.x, size.y);
    }

    function update(deltaTime) {
        traits.forEach(trait => trait.update(deltaTime));
    }

    return {
        pos: pos,
        size: size,
        vel: vel,
        top: top,
        right: right,
        bottom: bottom,
        left: left,
        addTrait: addTrait,
        update, update,
        draw: draw
    }
}