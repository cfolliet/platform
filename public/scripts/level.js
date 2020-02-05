import generateLevel from './levelGenerator.js'

export default function createLevel(canvas) {
    const tileWidth = 16;
    const tileHeight = 16;
    const width = canvas.width / tileWidth;
    const height =canvas.height / tileHeight;
    const tiles = generateLevel(width, height);

    function draw(context) {
        context.fillStyle = 'violet';
        tiles.forEach(tile => {
            context.fillRect(tile.pos.x * tileWidth, tile.pos.y * tileHeight, tileWidth, tileHeight);    
        });        
    }

    return {
        tileWidth: tileWidth,
        tileHeight: tileHeight,
        tiles: tiles,
        draw: draw
    }
}