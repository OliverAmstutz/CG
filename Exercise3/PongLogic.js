var ball = {
    x: 0,
    y: 0,
    xDir: 1,
    yDir: 0,
    scaleX: 0.1,
    scaleY: 0.1,
    speed: 0.1,
    size: 10,
};

paddle1 = {
    x: -375,
    y: 0,
    scaleX: 0.1,
    scaleY: 0.5,
    speed: 0.01,
    height: 50,
    width: 10
};

var paddle2 = {
    x: 375,
    y: 0,
    scaleX: 0.1,
    scaleY: 0.5,
    speed: 0.01,
    height: 50,
    width: 10
};

function checkGameLogic() {
    checkBounceOff();
}

function checkBounceOff() {
    if (ball.xDir > 0) {
        if (ball.x + ball.size / 2 > paddle2.x - paddle2.width / 2 && ball.y < paddle2.y + (paddle2.height / 2) && ball.y > paddle2.y - (paddle2.height / 2)) {
            ball.xDir = -ball.xDir;
            ball.yDir = -ball.yDir; //this is not correct yet
        } else if (ball.x >= 400) {
            console.log("player 1 won");
            location.reload();
        }
    } else {
        if (ball.x - ball.size / 2 < paddle1.x + paddle1.width / 2 && ball.y < paddle1.y + (paddle1.height / 2) && ball.y > paddle1.y - (paddle1.height / 2)) {
            ball.xDir = -ball.xDir;
            ball.yDir = -ball.yDir; //this is not correct yet
        } else if (ball.x <= -400) {
            console.log("player 2 won");
            location.reload();
        }
    }
}