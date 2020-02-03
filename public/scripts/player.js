export default function createPlayer() {
    const pos = { x: 100, y: 100 }
    const traits = [];

    function addTrait(trait) {
        traits.push(trait)
    }

    function draw(context) {
        context.fillStyle = 'red';
        context.fillRect(pos.x, pos.y, 10, 10);
    }

    function update() {
        traits.forEach(trait => trait.update());
    }

    return {
        pos: pos,
        addTrait: addTrait,
        update, update,
        draw: draw
    }
}