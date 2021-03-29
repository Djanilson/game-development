(function () {
  window.onload = function () {
    var stage = document.getElementById('stage');
    var ctx = stage.getContext("2d");

    let started = false;
    let speed = 10; //vel
    var speedX = 0; // vx
    var speedY = 0; // vy
    var piceHeigth = 20; // tp
    var piceAmount = 20; // qp
    var appleX = piceAmount / 2 + 5; // ax
    var appleY = piceAmount / 2 - 1; // ay
    var trail = [];
    var tail = 5;
    var posX = piceAmount / 2 - 1; //px
    var posY = piceAmount / 2 - 1; //py

    game();

    function calcSnakePosition() {
      // -1 prevents
      if (posX < 0) { // borda esquerda
        posX = piceAmount - 1;
      }

      if (posX > piceAmount - 1) { // borda direita
        posX = 0;
      }

      if (posY < 0) { // borda top
        posY = piceAmount - 1;
      }

      if (posY > piceAmount - 1) { // borda down
        posY = 0;
      }
    }

    function handleInput(event) {
      started = true;

      const pushs = {
        37: () => {// left
          speedX = -1;
          speedY = 0;
        },
        38: () => { // up
          speedX = 0;
          speedY = -1;
        },
        39: () => { // right
          speedX = 1;
          speedY = 0;
        },
        40: () => { // down
          speedX = 0;
          speedY = 1;
        }
      }

      if (pushs[event.keyCode]) {
        pushs[event.keyCode]();
      }
    }

    function drawSnake() {
      // Set color
      ctx.fillStyle = "lime";

      // print cells
      for (let idx = 0; idx < trail.length; idx++) {
        ctx.fillRect(trail[idx].x * piceAmount, trail[idx].y * piceAmount, piceAmount - 1, piceAmount - 1);

        // Verify collision
        if (trail[idx].x === posX && trail[idx].y === posY) {
          // alert('has colision');
          if (started) {
            tail = 5; // game over
            gameOver();
          }
        }
      }

      // get new Pos
      trail.push({ x: posX, y: posY });

      // clear
      while (trail.length > tail) {
        trail.shift();
      }
    }

    function game() {
      setTimeout(game, 1000 / speed);
      // console.log('game');
      posX += speedX;
      posY += speedY;

      calcSnakePosition();

      // Print Stage
      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, stage.width, stage.height);


      // print apple
      ctx.fillStyle = "red";
      ctx.fillRect(appleX * piceHeigth, appleY * piceHeigth, piceHeigth, piceHeigth);


      // print snake
      drawSnake();

      if (appleX === posX && appleY === posY) {
        tail++;
        if (tail > 10) {
          console.log('tail', tail);
          speed = speed + ((tail / 10) - 1);
        }
        appleX = Math.floor(Math.random() * piceAmount);
        appleY = Math.floor(Math.random() * piceAmount);
      }
    }

    function gameOver(params) {
      started = false;
      speed = 10; // vx
      speedX = 0; // vx
      speedY = 0; // vy
      piceHeigth = 20; // tp
      piceAmount = 20; // qp
      appleX = piceAmount / 2 + 5; // ax
      appleY = piceAmount / 2 - 1; // ay
      trail = [];
      tail = 5;
      posX = piceAmount / 2 - 1; //px
      posY = piceAmount / 2 - 1; //py

      alert('game over');

    }
    // events
    document.addEventListener('keydown', handleInput);
  }
}())