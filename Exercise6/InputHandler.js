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
    if (event.keyCode == 38) {
        playerL.ySpeed = 1;
        //ball.xSpeed = ball.xSpeed * 2;
    } else if (event.keyCode == key.DOWN) {
        //ball.xSpeed = ball.xSpeed / 2;

        playerL.ySpeed = -1;
    }
    key._pressed[event.keyCode] = true;
}

function onKeyup(event) {
    playerL.ySpeed = 0;
    delete key._pressed[event.keyCode];
}
