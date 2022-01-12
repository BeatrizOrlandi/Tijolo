var ball;
var score = 0;
var lives = 3;
var gamestate = "serve";
var paddle;
var bricks;

function setup(){

    ball = createSprite(200,200,15,15);
    ball.shapeColor = "white";
    paddle = createSprite(200, 350, 120, 10);
    paddle.shapeColor = "blue";
    createEdgeSprites();
    bricks = createGroup();
}




function createBrickRow(y, color) {
  for(var c=0; c<6; c++)
  {
    var brick = createSprite(65+54*c,y,50, 25);
    brick.shapeColor = color;
    bricks.add(brick);
  }
}



function draw() {
  background("black");
  createBrickRow(65, "red");
  createBrickRow(65+29, "orange");
  createBrickRow(65+29+29, "green");
  createBrickRow(65+29+29+29, "yellow");
  textSize(20);
  text("Score: "+score,40,25);
  text("Lives: "+lives, 40, 45);
  
  if(gamestate == "serve"){
    text("Clique para lançar a bola.", 120,250);
    ball.velocityX =0;
    ball.velocityY =0;
    ball.x = 200;
    ball.y = 200;
  }
  else if(gamestate =="end") {
    text("Fim de Jogo", 150, 250);
    ball.remove;
  }
  else {
    gameplay();
  }
  
  drawSprites();
}

function mousePressed()
{
  ball.velocityX = 10;
  ball.velocityY = 6;
  
  if(gamestate == "serve"){
    gamestate = "play";
    ball.velocityY = -7;
    ball.velocityX = -7;
    bricks.setVelocityYEach(0.2);
  }
  
}

function brickHit(ball, brick) {
    
 brick.remove();
 score = score+5;
 
 if(ball.velocityY<10 && ball.velocityY>-10)
  { ball.velocityX *= 1.03;
    ball.velocityY *= 1.03;

  }
 
}

function lifeover(){
  lives = lives - 1;
  if(lives>=1) {
    gamestate = "serve";
  }
  else {
    gamestate = "end";
  }
}

function gameplay(){
  //paddle.x = World.mouseX;
  paddle.x = ball.x; //automatizar
  
  if(paddle.x < 60)
  {
    paddle.x = 60;
  }
    
  if(paddle.x > 340)
  {
    paddle.x = 340;
  }
  //rotation = rotation + 5;
  ball.bounceOff(topEdge);
  ball.bounceOff(leftEdge);
  ball.bounceOff(rightEdge);
  //ball.bounceOff(paddle);
  ball.bounceOff(bricks, brickHit);
  
  if(!bricks[0])
  {
    //console.log("Won");
    ball.velocityX = 0;
    ball.velocityY = 0;
    text("Bom Trabalho!!",150,200);
  }
  if(ball.isTouching(bottomEdge)) {
    lifeover();
  }
}
