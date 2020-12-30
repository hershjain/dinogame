const nointernet = document.getElementById('nointernet');
const dino = document.getElementById('dino');
const num = document.querySelector('#num');
const game = document.querySelector('.game');
let mvright = 0;
let mvleft = 0;
let obTop = -60;
var score = 0;
var gameIsRunning = true;



//------------------------------------------------------------------------------//

function fadeout() {
  nointernet.classList.add("fadeout");
  nointernet.style.opacity = "0";
}

function dinodrop(){
  dino.classList.add("dinodrop");
  document.getElementById('dino').style.backgroundImage = "url('img/dino-blank.png')";
  document.getElementById('dino').style.top = "450px";
}

function moveright(){
  document.getElementById('dino').style.backgroundImage = "url('img/dino-blank.png')";
  let rightval = parseInt(window.getComputedStyle(dino).getPropertyValue("left"));
  if (rightval < 884){
    mvright = rightval += 5;
    // console.log("mvright:" + mvright);
    document.getElementById('dino').style.left = `${mvright}px`;
    mvright = 0;
  }
}

function moveleft(){
  document.getElementById('dino').style.backgroundImage = "url('img/dino-blank-l.png')";
  let leftval = parseInt(window.getComputedStyle(dino).getPropertyValue("left"));
  if (leftval > -324) {
    mvleft = leftval -= 5;
    // console.log("mvleft" + mvleft);
    document.getElementById('dino').style.left = `${mvleft}px`;
    mvleft = 0;
  }
}

function meteor(size, speed) {
  this.size = size;
  this.speed = speed;
}

function score_timer(collision){
  while(collision){
    num.innerHTML =  score.toString();
    console.log(score);
    setTimeout(function(){
      score++;
    },3000);
  }
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

function inRange(num1, num2, val){
  if (val >= num1 && val <= num2){
    return true;
  } else {
    return false;
  }
}

function endGame(){
  nointernet.style.backgroundImage = "url('img/gameover.png')";
  nointernet.style.backgroundSize ="420px 50px";
  nointernet.opacity = 100;
}

function generate_obstacles(){
  let randomTime = Math.random() * 4000;
  let obstaclePos = getRandomInt(0,1220);

  const ob = document.createElement('div');
  ob.classList.add('obstacle');
  game.appendChild(ob);
  ob.style.left = `${obstaclePos}px`;

  let timerId = setInterval(function(){
    obMove = ob.offsetTop += 10;
    ob.style.top = obMove + "px";
    console.log(ob.offsetTop);
    if (ob.offsetTop == 700){
      ob.remove();
    }

    let dinolefty = dino.offsetLeft-49;
    let dinorighty = dino.offsetLeft+49;
    if (inRange(dinolefty,dinorighty,ob.offsetLeft) && ob.offsetTop >= 570 && ob.offsetTop <= 630){
      gameIsRunning = false;
      endGame();
    }
  },500);
}

//this is the start function where the program will run
//------------------------------------------------------------------------------//

function start(){
  document.addEventListener("keydown", function(e){
    if(e.keyCode == 37){
      moveleft();
    } else if(e.keyCode == 39){
        moveright();
      }
  });

  let timerId = setTimeout(function(){
    setInterval(generate_obstacles, 2000);
  }, 5000);

  // generate_obstacles();

  let score_timerId = setTimeout(function(){
    setInterval(function(){
        if(gameIsRunning){
          num.innerHTML =  score.toString();
          // console.log(score);
          score++;
        }
    }, 100);
  }, 4000);

if(!generate_obstacles){
  clearInterval(timerId);
}


}

//------------------------------------------------------------------------------//

//this function is to start the game using the spacebar
document.body.onkeyup = function(e){
  if(e.keyCode == 32){
    setTimeout(function(){
      dinodrop();
      document.getElementById('background').style.visibility = "visible";
    }, 1000);
    fadeout();
    start();
  }
}; //full spacebar
