import generateLevel from './levelGenerator.js'

export default function createLevel() {
    const tileWidth = 16;
    const tileHeight = 16;
    const tiles = generateLevel();

    function draw(context) {
        context.fillStyle = 'violet';
        tiles.forEach(tile => {
            context.fillRect(tile.pos.x * tileWidth, tile.pos.y * tileHeight, tileWidth, tileHeight);    
        });        
    }

    return {
        draw: draw
    }
}