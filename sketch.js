var ball;
var database, dbposition;
function setup(){
    createCanvas(500,500);

    database=firebase.database();

    //Ball sprite with position 250,250
    ball = createSprite(250,250,10,10);
    ball.shapeColor = "red";

    //Read the value from DB
    //.ref() is used to create refrence to the location of DB valueis
   var ballP = database.ref("Ball/position");
   //.on() is used to create listener which keeps listenening to the changes in the DB value
   ballP.on("value",readPosition)
}

function draw(){
    background("white");
    if(keyDown(LEFT_ARROW)){
        changePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        changePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        changePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        changePosition(0,+1);
    }
    drawSprites();
}


function changePosition(x,y){
    //writing back to DB
    //Refering the node
   database.ref("Ball/position").set({
       x:dbposition.x+x,
       y:dbposition.y+y
   })
}

function readPosition(data){
    //.val() is used to retrieve data from the database
    dbposition =  data.val();
    //dbposition- 200,200 database value
    ball.x=dbposition.x;
    ball.y=dbposition.y;
}
