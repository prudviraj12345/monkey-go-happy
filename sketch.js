//Global Variables
var monkey,monkey_running;
var ground,groundImage;
var bananaImage,bananagroup,banana;
var stoneImage,stonegroup;
var backImage,backgroundImage;
var score = 0;
var over;
var PLAY = 1;
var gameState = 1;
var END = 0;
var restart;

function preload(){
  
  
  monkey_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png", "Monkey_04.png", "Monkey_10.png", "Monkey_05.png","Monkey_06.png" ,"Monkey_07.png","Monkey_08.png","Monkey_09.png");

    groundImage = loadImage("ground.jpg");

  bananaImage = loadImage("Banana.png");
  
  backImage = loadImage("jungle.jpg");
  
  stoneImage = loadImage("stone.png");
  
  gameImage = loadImage("gameOver.png");
  
  restartImage = loadImage("restart.png");
  
}


function setup() {
  createCanvas(500,400);
  
  backgroundImage = createSprite(0,0,400,400);
  backgroundImage.addImage("griund",backImage);
  
  monkey = createSprite(80,320,20,20)
  monkey.addAnimation("monkey",monkey_running);
  monkey.scale = 0.1;
  
  textFont("Arial");
textSize(30);

  
  
  
  
  
  ground = createSprite(85,360,800,20);
  ground.x = ground.width/2;
  
  bananagroup = new Group();
  stonegroup = new Group();

}


function draw(){
 background(255); 
createEdgeSprites();
  
  
  text("Score: "+ score, 500, 50);
  


  
  
  ground.velocityX = -3;
  if(ground.x<0){
   ground.x = ground.width/2;
  }
    

  
  backgroundImage.velocityX = -3;
  if(backgroundImage.x<0){  
   backgroundImage.x = backgroundImage.width/2;
  }
  
  
  if (keyDown("space")&& monkey.y>=321) {
     monkey.velocityY = -15;
  }
  
  
  
  if (gameState===PLAY){
    score =score+ Math.round(getFrameRate()/60);
     banana();
    stone();
if (monkey.isTouching(bananagroup)) {
  bananagroup.destroyEach();
}
  }
  
    
  if(monkey.isTouching(stonegroup)){  
    gameState=END;
    gameover = createSprite(200,200);
    gameover.addImage("over",gameImage);
    restart = createSprite(300,300);
    restart.addImage("reset",restartImage);
     gameover.visible = true;
    restart.visible = true;
    
    
    gameover.scale = 1;
    stonegroup.destroyEach();
    stonegroup.velocityX = 0;
    monkey.destroy();
    backgroundImage.x = 0;   
    bananagroup.destroyEach();
    bananagroup.velocityX = 0;
  
  }
  
  
   if(mousePressedOver(restart)) {
    reset();
  }
  
  
  monkey.velocityY = monkey.velocityY+0.8;
  
  ground.visible = false;
  
 // console.log(monkey.y)
  
  monkey.collide(ground);
    
  drawSprites();
    text(score,250,100);
  
}

function banana()
{
 
  if(frameCount%110===0){
    var banana = createSprite(372,318,10,10);
    banana.addImage("banana",bananaImage);
    banana.scale = 0.1/1.4;
    banana.velocityX = -3;
    banana.y = random(280,320);

    banana.lifetime = 200;
    bananagroup.add(banana);

    switch(score){
        
      case 10: monkey.scale = 0.12;
              break;
              
      case 20: monkey.scale = 0.13;
              break;
              
      case 30: monkey.scale = 0.14;   
              break;
              
             default:break;
    }
  }
  
}

function stone(){
  if(frameCount%250===0){
  var stone = createSprite(400,342,10,10);
    stone.addImage("stone",stoneImage);
    stone.scale = 0.2;
    stone.velocityX = -5;
    stone.y= random(270,365);
    stonegroup.add(stone);
  }
  
}


function reset(){
  
  gameState=PLAY;
  
  gameover.visible = false;
  restart.visible = false;
  bananagroup.destroyEach();
  stonegroup.destroyEach();
  score = 0;
  monkey.addAnimation("monkey",monkey_running);
  
}
