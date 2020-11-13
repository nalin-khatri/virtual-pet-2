//Create variables here
var dog, dogImg1, dogImg2;

var foodS = 0;

var FoodStock;

var fedTime, lastFed;

var foodObj;

var feed, addFood;

var database;

function preload()
{
  //load images here
  dogImg1 = loadImage("images/dogImg.png");
  dogImg2 = loadImage("images/dogImg1.png");
}

function setup() {
  createCanvas(900, 500);
  database = firebase.database();
  
  //create bodies here
  dog = createSprite(600,300,30,10);
  dog.addImage("dogImage",dogImg1);
  dog.addImage("happyDog",dogImg2);
  dog.scale = 0.2;

  foodObj = new Milk();
 
  feed = createButton("Feed the Dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);
}

function draw() {  
  background(rgb(46, 138, 87));

  foodObj.display();

  fedTime = database.ref('FeedTime');

  fedTime.on("value",(data)=>{
    lastFed = data.val();
  })

  fill(255,255,254);
  textSize(15);

  if(lastFed>=12){
    text("Last Feed: " + lastFed%12 + " PM", 350,30);
  } else if(lastFed==0){
    text("Last Feed: 12 AM",350,30)
  } else{
    text("Last Feed: " + lastFed + " AM", 350,30)
  }

  drawSprites();
}

function feedDog(){
  dog.changeImage("happyDog",dogImg2);

  var FoodstockRef = database.ref('Food');

  FoodstockRef.on("value",(data)=>{
    foodObj.foodStock = data.val();
  });

  foodObj.foodStock -= 1;
  foodObj.updateFoodStock(foodObj.foodStock);

  database.ref('/').update({
    FeedTime: hour()
  });
  
  // console.log(foodObj.foodStock);
}

function addFoods(){
  foodS++;
  
  foodObj.foodStock = foodS;

  database.ref('/').update({
    Food: foodS
  })
}









