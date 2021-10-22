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
        ctx.cubeRotationSpeed = ctx.cubeRotationSpeed * -1;
    }

    if (event.keyCode == key.RIGHT) {
        ctx.cubeRotationSpeed = ctx.cubeRotationSpeed * -1;
    }
    if (event.keyCode == key.UP) {
        ctx.cubeRotationSpeed = ctx.cubeRotationSpeed * 1.2;
    }

    if (event.keyCode == key.DOWN) {
        ctx.cubeRotationSpeed = ctx.cubeRotationSpeed / 1.2;
    }
}

function onKeyup(event) {
    delete key._pressed[event.keyCode];
}