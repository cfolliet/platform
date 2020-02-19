export default function createRect(x, y, w, h) {
    function top() {
        return x;
    }

    function bottom() {
        return x + h;
    }

    function left() {
        return y;
    }

    function right() {
        return y + w;
    }

    return {
        top: top,
        right: right,
        bottom: bottom,
        left: left
    }
}