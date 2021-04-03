var flag;
var arr;
var oldmove;
var i = 0; //it is the initial value  where snake started
var ele = 27;
var f = 3 + ele;
var idcount = 0;
var movc = 0;

// var incrpos=tile.id[i];
window.onload = function restart() {
  id("start").addEventListener("click", startgame);
};
function startgame() {
  i++;
  f++;
  //   console.log("hello");
  var board = arr;
  lives = 3;
  Scores = 0;
  id("scores").textContent = "Score: 00";
  id("lives").textContent = "Lives: " + lives;
  clearprevious();
  generateboard(board);
  foodposn();
  // snakeposn();
  let tiles = document.querySelectorAll(".tile");
  tiles[i].classList.add("snakeposn");
  updatemove();
}
function foodposn() {
  //   console.log("inside food psn");
  let tiles = document.querySelectorAll(".tile");
  tiles[f].classList.add("food");
  ele--;
}
// function snakelength(){
//     let tiles=document.querySelectorAll(".tile");
//    if(oldmove==left){
//        var snakel=tiles.slice(tiles[initialposi],tiles[initialposi+1]);
//        snakel.classList.add("snakeposn");
//    }
// }
function endgame() {
  flag = false;
}
function clearmovements() {
  // if(oldmove==down)
  clearTimeout(oldmove);
}

function updatemove() {
  var initialposi = i;
  oldmove = null;
  if ((flag = true)) {
    window.addEventListener("keydown", (e) => {
      switch (e.key) {
        case "ArrowLeft":
          console.log("left pressed: " + oldmove);
          // str = 'Left Key pressed!';
          // console.log(oldmove+"oldmove done");
          clearmovements();
          if (oldmove !== "right") {
            console.log("in left");
            var left = setInterval(() => {
              // console.log("leftkey");
              // console.log(initialposi);
              let tiles = document.querySelectorAll(".tile");
              // console.log(tiles);
              // console.log(initialposi);
              tiles[initialposi].classList.remove("snakeposn");
              initialposi -= 1;
              // console.log(tiles[initialposi]);
              // if(document.addEventListener('none',function(){
              if ((initialposi + 1) % 9 == 0) {
                initialposi = initialposi + 9;
                lives--;
                id("lives").textContent = "Lives: " + lives;
                if (lives == 0) {
                  id("lives").textContent = "You Lose!";
                  //   endgame();
                }
              }
              tiles[initialposi].classList.add("snakeposn");
              //adding snakeatefood fucn later in order to read it
            }, 300);
          }
          console.log("update");
          oldmove = "left";
          console.log(oldmove);
          break;

        case "ArrowUp":
          clearmovements();
          console.log("up pressed: " + oldmove);
          if (oldmove !== "down") {
            var up = setInterval(() => {
              // clearInterval(lk);
              // console.log("upkey");
              // console.log(initialposi);
              var tiles = document.querySelectorAll(".tile");
              tiles[initialposi].classList.remove("snakeposn");
              initialposi = initialposi - 9;
              // console.log("unread");
              if (initialposi == -9) {
                initialposi = 72;
                lives--;
                if (lives == 0) {
                  id("lives").textContent = "You Lose!";
                }
              }
              if (initialposi < 0 && initialposi != -9) {
                initialposi = 81 + initialposi;
                lives--;
                id("lives").textContent = "Lives: " + lives;
                if (lives == 0) {
                  id("lives").textContent = "You Lose!";
                }
              }
              // console.log("read");}
              // console.log("hello food here "+f);
              tiles[initialposi].classList.add("snakeposn");
              oldmove = "up";
            }, 300);
          }
          break;
        case "ArrowRight":
          clearmovements();
          console.log("right pressed: " + oldmove);
          if (oldmove !== "left") {
            //   console.log("execc");
            var right = setInterval(() => {
              // console.log("rightkey");
              let tiles = document.querySelectorAll(".tile");
              tiles[initialposi].classList.remove("snakeposn");
              initialposi = initialposi + 1;
              if (initialposi % 9 == 0) {
                // console.log(initialposi - 9);
                initialposi = initialposi - 9;
                lives--;
                id("lives").textContent = "Lives: " + lives;
                if (lives == 0) {
                  id("lives").textContent = "You Lose!";
                  //   endgame();
                }
              }
              tiles[initialposi].classList.add("snakeposn");
              oldmove = "right";
            }, 300);
            // clearInterval(rk);
          }
          break;

        case "ArrowDown":
          // str = 'Down Key pressed!';
          console.log("down pressed: " + oldmove);
          clearmovements();
          if (oldmove !== "up") {
            var down = setInterval(() => {
              let tiles = document.querySelectorAll(".tile");
              // console.log(tiles);
              // console.log(initialposi);
              tiles[initialposi].classList.remove("snakeposn");
              // console.log(tiles[initialposi]);
              // if(document.addEventListener('none',function(){
              initialposi = initialposi + 9;
              // console.log(initialposi);
              if (initialposi == 89) {
                initialposi = 8;
                lives--;
                if (lives == 0) {
                  id("lives").textContent = "You Lose!";
                  //   endgame();
                }
              }
              //   console.log("inside " + initialposi);
              if (initialposi > 80 && initialposi != 89) {
                initialposi = initialposi - 81;
                lives--;
                if (lives != 0) id("lives").textContent = "Lives: " + lives;
                if (lives == 0) {
                  id("lives").textContent = "You Lose!";
                  //   endgame();
                }
              }
              tiles[initialposi].classList.add("snakeposn");
              oldmove = "down";
            }, 300);
          }
          break;
      }
    });
  }
}

function generateboard(board) {
  for (let j = 0; j < 81; j++) {
    var tile = document.createElement("p"); //created a tile as paragraph
    tile.id = idcount;
    idcount++;
    tile.textContent = tile.id;
    tile.classList.add("tile");
    id("board").appendChild(tile);
  }
}
//display board
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
