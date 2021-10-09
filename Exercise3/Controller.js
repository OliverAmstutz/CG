// Key Handling
var key = {
    _pressed: {},

    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40
};

function isDown(keyCode) {
    return key._pressed[keyCode];
}

function onKeydown(event) {
    key._pressed[event.keyCode] = true;
    if (event.keyCode == key.LEFT) {
        paddle1.yDir = 1;
    }

    if (event.keyCode == key.RIGHT) {
        paddle1.yDir = -1;
    }
}

function onKeyup(event) {
    paddle1.yDir = 0;
    delete key._pressed[event.keyCode];
}