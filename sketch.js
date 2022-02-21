var sky,skyImg;
var dragonImg,dragon,endDragonImg;
var monsterImg,monster,monsterGroup;
var heartImg,heart;
var fireBallImg,fireBall;
var gameoverImg,gameOver;
var obstacle1Img,obstacle2Img,obstacle3Img;
var upObstacleGroup,midObstacleGroup,downObstacleGroup;
var upObstacle,midObstacle,downObstacle;
var score = 0;
var PLAY = 1;
var END = 0;
var gameState = 1;
var sparkelLine;
var line;

function preload(){
 skyImg = loadImage("assests/combinedsky.png");
 dragonImg = loadAnimation("assests/Dragon1.png","assests/Dragon2.png","assests/Dragon3.png");
 monsterImg = loadAnimation("assests/enemy1.png","assests/enemy2.png");
 heartImg = loadImage("assests/points.png");
 fireBallImg = loadImage("assests/fire.png");
 gameoverImg =  loadImage("assests/gameover.png");
 obstacle1Img = loadImage("assests/obstacle1.png");
 obstacle2Img = loadImage("assests/obstacle2.png");
 obstacle3Img = loadImage("assests/obstacle3.png");
 endDragonImg = loadAnimation("assests/dragon4.png");
 sparkelLine = loadImage("assests/sparkel_line.png");
 
}

function setup() {
  createCanvas(800,400);

  sky = createSprite(400, 200, 50, 50);
  sky.addImage(skyImg);
  sky.scale = 0.7;

  
  

  dragon = createSprite(70, 200, 50, 50);
  dragon.addAnimation("flyingDragon",dragonImg);
  dragon.addAnimation("end_dragon",endDragonImg);

  line = createSprite(130,200,2,400);
  line.addImage(sparkelLine);
  line.scale = 0.5;

  upObstacleGroup = new Group();
  midObstacleGroup = new Group();
  downObstacleGroup = new Group();
  heartGroup = new Group();
  monsterGroup = new Group();

  gameOver = createSprite(400,200,60,20);
  gameOver.addImage(gameoverImg);
  gameOver.visible = false;

  dragon.setCollider("circle",0,0,20);
//  dragon.debug = true;


console.log(monsterGroup);

}

function draw() {
  background("black"); 

  if(gameState===PLAY){

    if(keyDown("UP_ARROW")){
      dragon.y -= 5;
    }
  
    if(keyDown("DOWN_ARROW")){
      dragon.y += 5;
    }
  
    if(sky.x <= 250){
      sky.x = width/2;
    }
  
    sky.velocityX = -3;
  
    if(heartGroup.isTouching(dragon)){
      heartGroup.destroyEach();
      score = score+1;
    }

    if(fireBall){
    if(monsterGroup.isTouching(fireBall)){
      monsterGroup.destroyEach();
      fireBall.destroy();
      score = score + 5
    }
  }
    spawnHearts(); 
    spawnUpObstacle();
    spawnMonster();

    if(monsterGroup != undefined){
    if(upObstacleGroup.isTouching(dragon) ||monsterGroup.isTouching(line)){
      gameState = END;
    }
  }

    if(keyWentDown("SPACE")){
      fireBall = createSprite(70, dragon.y, 50, 50);
      fireBall.addImage(fireBallImg);
      fireBall.velocityX = 5

    }
     console.log(monsterGroup[0])
   // if()
  }

  



  // if(dragon.y >height/2){
  //   dragon.velocityY += 0.1; 
  // }else{
  //   dragon.velocitY -= 0.1;
  // }

 

  


  
  
  drawSprites();

  

  stroke("black");
  fill("white");
  textSize(20);
  text("Score:"+score,350,35);

  if(gameState===END){
    dragon.changeAnimation("end_dragon",endDragonImg);

    sky.velocityX = 0;
    dragon.velocityX = 0;
    dragon.velocityY = 0; 

    upObstacleGroup.setVelocityXEach(0);
    midObstacleGroup.setVelocityXEach(0);
    downObstacleGroup.setVelocityXEach(0);
    heartGroup.setVelocityXEach(0);

    gameOver.visible = true;
    
    monsterGroup.destroyEach();

    // stroke("black");
    // fill("red");
    // text("(Press R to restart the game)",270,300);

    if(keyIsDown(82)){
      reset();
    }
  }

}
  function spawnHearts(){
    if(frameCount % 250===0){
      heart = createSprite(850,random(80,275));
      heart.addImage(heartImg);
      heart.velocityX = -3;
      gameOver.depth = heart.depth+1;
      // if(fireBall)
      // fireBall.depth = heart.depth + 1;
      heartGroup.add(heart);
    }
  }

  function spawnUpObstacle(){

    if(frameCount % 200===0){
      
      upObstacle = createSprite(850,80,70,100);
      upObstacle.velocityX = -3;
      
      

      var rand = Math.round(random(1,3));

      if(rand === 1){
        upObstacle.y = 80;
        upObstacle.addImage(obstacle1Img);
        upObstacle.scale = 1.65;
        upObstacle.setCollider("rectangle",0,20,70,30);
        
      } else if(rand === 2){
        upObstacle.y = Math.round(random(150,250));
        upObstacle.addImage(obstacle3Img);
        upObstacle.scale = 2;
        upObstacle.setCollider("rectangle",0,0,60,30);
      } else{
        upObstacle.y = 275;
        upObstacle.addImage(obstacle2Img);
        upObstacle.scale = 1.65;
        upObstacle.setCollider("rectangle",0,-15,70,40);
      }
      
     // upObstacle.debug = true;
     gameOver.depth = upObstacle.depth+1;
     
     //fireBall.depth = upObstacle.depth + 1;
      upObstacleGroup.add(upObstacle);
      dragon.depth += upObstacle.depth;
    }
  }

  function spawnMonster(){
    if(frameCount % 250===0){
      monster = createSprite(850,random(80,275));
      monster.addAnimation("flying_monster",monsterImg);
      monster.velocityX = -5;
      monster.scale = 0.3;
      gameOver.depth = monster.depth+1;
      //if(fireBall)
      //fireBall.depth = monster.depth + 1;
      monsterGroup.add(monster);
    }
  }

  function reset(){
    gameState = PLAY;
    score = 0;
    upObstacleGroup.destroyEach();
    downObstacleGroup.destroyEach();
    midObstacleGroup.destroyEach();
    heartGroup.destroyEach();
    gameOver.visible = false;
    dragon.changeAnimation("flyingDragon",dragonImg)
  }
  
