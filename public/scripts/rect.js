export default function createRect(x, y, w, h) {
    const pos = {
        x: x,
        y: y
    }
    const size = {
        x: w,
        y: h
    }

    function top() {
        return pos.y;
    }

    function bottom() {
        return pos.y + size.y;
    }

    function left() {
        return pos.x;
    }

    function right() {
        return pos.x + size.x;
    }

    return {
        pos: pos,
        size: size,
        top: top,
        right: right,
        bottom: bottom,
        left: left
    }
}