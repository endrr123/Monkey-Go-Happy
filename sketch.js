
var monkey, monkey_running
var banana, bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score = 0;
var ground;
var gameState = "PLAY";

function preload() {


  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png")

  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");


}



function setup() {
  createCanvas(500, 300);

  FoodGroup = new Group();
  obstacleGroup = new Group();
  monkey = createSprite(100, 225, 10, 10);
  monkey.addAnimation("monkeyrun", monkey_running);
  monkey.scale = 0.07;

  ground = createSprite(250, 250, 500, 10);
  ground.velocityX = -4;


}

function spawnFood() {
  if (frameCount % 95 === 0) {
    banana = createSprite(450, 100, 10, 10);
    banana.addImage("bananaa", bananaImage);
    banana.scale = 0.05;
    FoodGroup.add(banana);
    banana.velocityX = -4;
    banana.y = Math.round(random(120, 190));
    banana.lifetime = 100;
  }
}

function spawnObstacles() {
  if (frameCount % 180 === 0) {
    obstacle = createSprite(480, 235, 5, 5);
    obstacle.addImage("ob", obstacleImage);
    obstacle.scale = 0.06;
    obstacleGroup.add(obstacle);
    obstacle.velocityX = -4;
    obstacle.lifetime = 120;
    obstacle.setCollider("rectangle", 0, 0, obstacle.width, obstacle.height);
  }
}


function draw() {
  background("white");
  text("Survival Time: " + score, 250, 80);
  if (gameState === "PLAY") {





    if (FoodGroup.isTouching(monkey)) {
      FoodGroup.destroyEach();
    }

    if (frameCount % 4 === 0) {
      score = score + 1;
    }

    if (keyDown("space") && monkey.y > 222) {
      monkey.velocityY = -10;
    }

    if (ground.x < 200) {
      ground.x = ground.width / 2;
    }
    monkey.velocityY = monkey.velocityY + 0.7;
    monkey.collide(ground);

    if (obstacleGroup.isTouching(monkey)) {
      gameState = "END";

    }

    spawnFood();
    spawnObstacles();

  }

  if (gameState === "END") {
    ground.destroy();
    score = 0;
    monkey.destroy();
    obstacleGroup.destroyEach();
    FoodGroup.destroyEach();
    background("black")
    fill("yellow")
    text("Press R to restart", 200, 200);
    fill("yellow")
    textSize(50);
    text("GAME OVER", 100, 150);

    if (keyDown("r")) {
      gameState = "PLAY";
      monkey = createSprite(100, 225, 10, 10);
      monkey.addAnimation("monkeyrun", monkey_running);
      monkey.scale = 0.07;

      ground = createSprite(250, 250, 500, 10);
      ground.velocityX = -4;
    }
  }


  drawSprites();
}






