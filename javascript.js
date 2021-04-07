var flag = true;
var oldmove;
var i = 0; //it is the initial value  where snake started
var ele = 15;
var f = 3+ele ;
console.log(f);
var idcount = 0;
var length = 1;
var interval = 500;
var ip;

window.onload = function restart() {
  id("start").addEventListener("click", startgame);
};
function startgame() {
  i++;
  f++;
  ip = i;
  var board;
  lives = 3;
  Scores = 0;
  id("scores").textContent = "Score: 00";
  id("lives").textContent = "Lives: " + lives;
  clearprevious();
  generateboard(board);
  foodposn();
  snake();
}
function snake() {
  var arr = [ip,ip+1];
  console.log("ip is " + ip);
  var z = 0;
  while (z < length) {
    let tiles = qsa(".tile");
    console.log(tiles[arr[z]]);
    tiles[arr[z]].classList.add("snakeposn");
    z++;
  }
}
function leftkey() {
  if (oldmove !== "right" || oldmove !== "left") {
    console.log("in left");
    var left = setInterval(() => {
      console.log("left pressed: " + oldmove);
      let tiles = document.querySelectorAll(".tile");
      tiles[ip].classList.remove("snakeposn");
      ip -= 1;
      if ((ip + 1) % 32 == 0) {
        ip = ip + 32;
        lives--;
        id("lives").textContent = "Lives: " + lives;
        if (lives == 0) {
          id("lives").textContent = "You Lose!";
        }
      }
      tiles[ip].classList.add("snakeposn");
      if(ip==f){
        tiles[ip].classList.remove("food");
        foodposn();
      }
    }, interval);
  }
  console.log("update");
  oldmove = "left";
  console.log(oldmove);
}
function rightkey() {
  if (oldmove !== "left" || oldmove !== "right") {
    var right = setInterval(() => {
      console.log("right pressed: " + oldmove);
      let tiles = document.querySelectorAll(".tile");
      tiles[ip].classList.remove("snakeposn");
      ip = ip + 1;
      if (ip % 32 == 0) {
        ip = ip - 32;
        lives--;
        id("lives").textContent = "Lives: " + lives;
        if (lives == 0) {
          id("lives").textContent = "You Lose!";
        }
      }if(ip==f){
        // console.log("inside the right key food");
        tiles[ip].classList.remove("food");
        foodposn();
      }
      tiles[ip].classList.add("snakeposn");
    }, interval);
    oldmove = "right";
  }
  console.log("inside right" + oldmove);
}
function upkey() {
  if (oldmove !== "down" || oldmove !== "up") {
    var up = setInterval(() => {
      var tiles = document.querySelectorAll(".tile");
      console.log("up pressed: " + oldmove);
      tiles[ip].classList.remove("snakeposn");
      ip = ip - 32;
      if (ip == -32) {
        ip = 480;
        lives--;
        if (lives == 0) {
          id("lives").textContent = "You Lose!";
        }
      }
      if (ip < 0 && ip != -32) {
        ip = 512 + ip;
        lives--;
        id("lives").textContent = "Lives: " + lives;
        if (lives == 0) {
          id("lives").textContent = "You Lose!";
        }
      }
      tiles[ip].classList.add("snakeposn");
      if(ip==f){
        tiles[ip].classList.remove("food");
        foodposn();
      }
    }, interval);
    oldmove = "up";
  }
  console.log(oldmove);
}
function downkey() {
  if (oldmove !== "up" || oldmove != "down") {
    var down = setInterval(() => {
      console.log("down pressed: " + oldmove);
      let tiles = document.querySelectorAll(".tile");
      tiles[ip].classList.remove("snakeposn");
      ip = ip + 32;
      if (ip == 543) {
        ip = 31;
        lives--;
        if (lives == 0) {
          id("lives").textContent = "You Lose!";
        }
      }
      if (ip > 511 && ip != 543) {
        ip = ip - 512;
        lives--;
        if (lives != 0) id("lives").textContent = "Lives: " + lives;
        if (lives == 0) {
          id("lives").textContent = "You Lose!";
        }
      }
      tiles[ip].classList.add("snakeposn");
      if(ip==f){
        tiles[ip].classList.remove("food");
        foodposn();
      }
    }, interval);
    oldmove = "down";
  }
  console.log("inside down" + oldmove);
}
window.onkeydown = function (event) {
  switch (event.keyCode) {
    case 37:
      console.log("leftkey");
      leftkey();
      break;
    case 38:
      console.log("upkey");
      upkey();
      break;
    case 39:
      console.log("rightkey");
      rightkey();
      break;
    case 40:
      console.log("downkey");
      downkey();
      break;
  }
};
function foodposn() {
  console.log("inside food posn "+(f+ele));
  let tiles = document.querySelectorAll(".tile");
  f==3+ele;
  // console.log("value of "+f);
  tiles[f].classList.add("food");
  ele +=10;
  console.log("element posn is "+ele);
}
function generateboard(board) {
  for (let j = 0; j < 512; j++) {
    var tile = document.createElement("p"); //created a tile as paragraph
    tile.id = idcount;
    idcount++;
    tile.textContent = tile.id;
    tile.classList.add("tile");
    id("board").appendChild(tile);
  }
}
function clearprevious() {
  flag = true;
  let tiles = qsa(".tile");
  for (let i = 0; i < tiles.length; i++) {
    tiles[i].remove("snakeposn");
    tiles[i].remove("food");
  }
  idcount = 0;
}
function qs(selector) {
  return document.querySelector(selector);
}
function qsa(selector) {
  return document.querySelectorAll(selector);
}
function id(id) {
  return document.getElementById(id);
}
