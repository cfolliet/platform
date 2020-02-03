export default function generateGrid() {
    const maxX = 800 / 16;
    const grid = [];
    for (let x = 10; x < maxX - 15; x++) {
        grid.push({ pos: { x: x, y: 30 } });
    }
    return grid;
}