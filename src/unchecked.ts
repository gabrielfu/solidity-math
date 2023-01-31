export var _UNCHECKED: Boolean = false;

class Unchecked {
    enter() {
        _UNCHECKED = true;
    }

    exit() {
        _UNCHECKED = false;
    }
}