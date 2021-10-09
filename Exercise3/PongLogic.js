var ball = {
    x: 0,
    y: 0,
    xDir: 1,
    yDir: 1.07,
    scaleX: 0.1,
    scaleY: 0.1,
    speed: 0.2,
    size: 10,
};

paddle1 = {
    x: -375,
    y: 0,
    scaleX: 0.1,
    scaleY: 0.5,
    speed: 0.5,
    height: 50,
    width: 10,
    directionThreshold: 20,
    yDir: 0
};

var paddle2 = {
    x: 375,
    y: 0,
    scaleX: 0.1,
    scaleY: 0.5,
    speed: 0.3,
    height: 50,
    width: 10,
    directionThreshold: 20,
    yDir: 0
};

function checkGameLogic() {
    reflectFromWalls();
    checkBounceOffPaddle();
    playerPaddleLogic();
    enemyPaddleLogic();
}

function checkBounceOffPaddle() {
    if (ball.xDir > 0) {
        if (ball.x + ball.size / 2 > paddle2.x - paddle2.width / 2 && ball.y < paddle2.y + (paddle2.height / 2) && ball.y > paddle2.y - (paddle2.height / 2)) {
            if (Math.abs(ball.y - paddle2.y) > paddle2.directionThreshold) {
                //add to ball direction
                ball.xDir = -1.25 * ball.xDir;
            } else {
                //reflect
                ball.xDir = -ball.xDir;
            }
        } else if (ball.x >= 400) {
            console.log("player 1 won");
            location.reload();
        }
    } else {
        if (ball.x - ball.size / 2 < paddle1.x + paddle1.width / 2 && ball.y < paddle1.y + (paddle1.height / 2) && ball.y > paddle1.y - (paddle1.height / 2)) {
            if (Math.abs(ball.y - paddle1.y) > paddle1.directionThreshold) {
                //add to ball direction
                ball.xDir = -1.25 * ball.xDir;
            } else {
                //reflect
                ball.xDir = -ball.xDir;
            }
        } else if (ball.x <= -400) {
            console.log("player 2 won");
            location.reload();
        }
    }
}

function enemyPaddleLogic() {
    if (ball.y > paddle2.y + paddle2.height / 2) {
        paddle2.yDir = 1;
    } else if (ball.y < paddle2.y - paddle2.height / 2) {
        paddle2.yDir = -1;
    } else {
        paddle2.yDir = 0;
    }

}

function playerPaddleLogic() {

}

function reflectFromWalls() {
    if (ball.yDir > 0) {
        if (ball.y + ball.size / 2 >= 300) {
            ball.yDir = -ball.yDir
        }
    } else {
        if (ball.y - ball.size / 2 <= -300) {
            ball.yDir = -ball.yDir
        }
    }
}