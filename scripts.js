const nointernet = document.getElementById('nointernet');
const dino = document.getElementById('dino');
const num = document.querySelector('#num');
const game = document.querySelector('.game');
const end = document.getElementById('end');
const obst = document.getElementsByClassName('obstacle');
const refr = document.getElementById('refresh');
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

function refreshPage(){
    location.reload();
}

function endGame(){
  deleteDivs("obstacle");
  end.style.visibility = "visible";
  refr.style.visibility = "visible";
}

function deleteDivs(className){
    var elements = document.getElementsByClassName(className);
    while(elements.length > 0){
        elements[0].parentNode.removeChild(elements[0]);
    }
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
    // console.log(ob.offsetTop);
    if (ob.offsetTop == 700){
      ob.remove();
    }

    let dinolefty = dino.offsetLeft-49;
    let dinorighty = dino.offsetLeft+49;
    if (inRange(dinolefty,dinorighty,ob.offsetLeft) && ob.offsetTop >= 570 && ob.offsetTop <= 630){
      gameIsRunning = false;
      // ob.parentNode.removeChild(ob);
      endGame();
    }
  },250);
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
    let gentimer = setInterval(generate_obstacles, 2000);
    setInterval(function(){
      if (!gameIsRunning){
        clearInterval(gentimer);
      }
    }, 100);
  }, 5000);

  // generate_obstacles();

  let score_timerId = setTimeout(function(){
    setInterval(function(){
        if(gameIsRunning){
          num.innerHTML =  score.toString();
          score++;
        }
    }, 100);
  }, 4000);
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
    console.log(gameIsRunning);
    start();
  }
}; //full spacebar
