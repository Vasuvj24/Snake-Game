var lastTime = 0; //last render time
var Speed = 4; //speed variable
var SnakeBody = [{ x: 10, y: 11 }]; //body of array in form of arrays
var board = document.getElementById("board"); //board ko id leke fir use krenge
//will be needing to maintain a last input direction
let lastinputd = { x: 0, y: 0 }; // update it as per need
let inputd = { x:0, y:0 }; //input direction 0 initially
var food=randomposiongrid();
console.log(food)
let increase=1;//mtlb vo food khane k bad kitna grow krega
let expandvariable=0;//this variable is for if snake increases than how much does it increase
// let rv=0;
let scores=00;
// console.log(board);
// in this kind of request animation we handle the movements

function major(Timing) {//recursion calling a function
  document.getElementById("score").textContent="Scores: "+scores
  window.requestAnimationFrame(major);
  var TimeSinceLastRender = (Timing - lastTime) / 1000;
  if (TimeSinceLastRender < 1 / Speed) {
    return;
  }
  // console.log("inside major");
  lastTime = Timing;
  update();
  draw();
}
function foodposi(){//setting the food position randomly
  let newfoodposi;
  while(newfoodposi ==null||onsnake(newfoodposi)){
    newfoodposi = randomposiongrid();
  }
  return newfoodposi;
}
function randomposiongrid(){
  return{
    x:Math.floor(Math.random()*21)+1,
    y:Math.floor(Math.random()*21)+1
  }
}

function update(){
  updatemove();
  updatefood();
}
function draw(){
  board.innerHTML='';
  drawsnake();
  drawfood();
}
window.requestAnimationFrame(major);
// console.log(board);
function drawsnake() {
  // console.log(SnakeBody.length);
  // board.innerHTML = "";
  SnakeBody.forEach(points => {
    var snakeElement = document.createElement("div"); //mtlb ek div bnanna h
    //yha uske css m change krenge or us row m isse start krenge
    snakeElement.style.gridRowStart = points.y; //grid row start m row ki konse line m krna h
    snakeElement.style.gridColumnStart = points.x; //grid column start m column ki konse line m krna h
    snakeElement.classList.add("snakecolor");
    board.appendChild(snakeElement);
    // drawfood();
  });
}
function updatemove() {
  snaketiles();
  var inputd=inputdir();
  for (let i = SnakeBody.length - 2; i >= 0; i--) {
    SnakeBody[i + 1] = SnakeBody[i]; //length -2 kra or last third p sa or phit last second wale ko l-2 ki posn p lado
  }
  // console.log("x: " + inputd.x + "y: " + inputd.y);
  //now changing the variables
  //yha p head change kra or usme  kra
  SnakeBody[0].x =SnakeBody[0].x+ inputd.x;
  SnakeBody[0].y =SnakeBody[0].y+ inputd.y;
  // updatefood();
}
function drawfood(){
  // console.log("inside draw food")
  var foodposn = document.createElement("div"); 
  foodposn.style.gridRowStart = food.y; 
  foodposn.style.gridColumnStart = food.x; 
  foodposn.classList.add("foodcolor");
  // console.log(foodposn);
  board.appendChild(foodposn);
}
function updatefood(){
  // console.log("inside update food")
  if(onsnake(food)){
    scores++;
    document.getElementById("score").textContent="Scores: "+scores
    expandsnake(increase);
    // food={x:10,y:11};
    food=foodposi();
  }
}
function expandsnake(amount){
  expandvariable += amount;//ye expand snake variable ko incresase krega if onsnake function is true
}
function onsnake(position){
  return SnakeBody.some(points=>{
    // console.log("inside on snake func"+points.x+" "+points.y)
    return equalposition(position,points);//yha posints and position gye h ab ye dono compare honge 
  })
}
function equalposition(posn1,posn2){
  return posn1.x==posn2.x && posn1.y==posn2.y;
}
function snaketiles(){
  // console.log(SnakeBody.length+" snake body l");
  // console.log("inside snaketile");
  for(i=0;i<expandvariable;i++){
    SnakeBody.push({...SnakeBody[SnakeBody.length-1]});
  }
  expandvariable=0;
  // console.log(expandvariable+" expand variable");
}
//arrow keys
window.addEventListener('keydown',e=>{
    switch(e.key){
        case 'ArrowUp':
            console.log("arrow up")
            if(lastinputd.y !==0)break;
            inputd={x:0,y:-1};
            break;
        case 'ArrowDown':
          console.log("arrow down");
          if(lastinputd.y !==0)break;
            inputd={x:0,y:+1};
            break;
        case 'ArrowRight':
          console.log("arrow left");
          if(lastinputd.x !==0)break;
            inputd={x:+1,y:0};
            break;
        case 'ArrowLeft':
          console.log("arrow right");
          if(lastinputd.x !==0)break;  
          inputd={x:-1,y:0};
            break;
    }
})
//now asking for inpuut direction
function inputdir() {
  lastinputd = inputd; //storing the last input direction
  return inputd;
}



