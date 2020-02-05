export default function generateLevel(width, height) {
    const maxLength = 20;
    let maxTunnels = 20;

    let level = [];
    let currentRow = Math.random() * width | 0;
    let currentColumn = Math.random() * height | 0;
    let allowedDirections = [[-1, 0], [1, 0], [0, -1], [0, 1]];
    let lastDirection = [];
    let randomDirection = null;

    while (maxTunnels) {
        do {
            randomDirection = allowedDirections[Math.random() * allowedDirections.length | 0];
        } while ((randomDirection[0] === -lastDirection[0] && randomDirection[1] === -lastDirection[1]) ||
            (randomDirection[0] === lastDirection[0] && randomDirection[1] === lastDirection[1]));

        let randomLength = Math.random() * maxLength | 0;
        let tunnelLength = 0;

        while (tunnelLength < randomLength) {
            if (((currentRow === 0) && (randomDirection[0] === -1)) ||
                ((currentColumn === 0) && (randomDirection[1] === -1)) ||
                ((currentRow === width - 1) && (randomDirection[0] === 1)) ||
                ((currentColumn === height - 1) && (randomDirection[1] === 1))) {
                break;
            } else {
                level.push({ pos: { x: currentRow, y: currentColumn } });
                currentRow += randomDirection[0];
                currentColumn += randomDirection[1];
                tunnelLength++;
            }
        }

        if (tunnelLength) {
            lastDirection = randomDirection;
            maxTunnels--;
        }
    }

    return level;
}