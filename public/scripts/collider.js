export function collide(a, b) {
    if (a.left() < b.right() && a.right() > b.left() &&
        a.top() < b.bottom() && a.bottom() > b.top()) {
        return true;
    }
    return false;
}