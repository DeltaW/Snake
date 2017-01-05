// created by Dennis Wiest
// on 12/21/16
// last update: 12/23/16


var fenster = 512; //only multiples of 2
fenster += 1;

var scoretxt;
var nametxt;
var Highscore = 0;
var Leader;
var pause;

var s;
var playertwo;

var scl = 16; //as in scale
var food = [];

var textfield;
var name = "Player";

function preload() {
    scoretxt = loadStrings("score.txt");
    nametxt = loadStrings("name.txt");
}

function setup() {
    createCanvas(fenster, fenster);

    s = new Snake();
    //playertwo = new Snake();
    frameRate(10);
    //food = createVector(floor(random(width / scl)), floor(random(height / scl)));
    //food.mult(scl);
    //pickLocation(); /////////////////////////////////////////////////////////////////////////////////////////////////
    for (var i = 0; i < 5; i++) {
        food.push(new Food());
        food[i].pickLocation();
    }


    textfield = createInput("Name");
    textfield.input(newTyping);
    Highscore = scoretxt[0];
    Leader = nametxt[0];
    document.getElementById("Highscore").innerHTML = "Highscore von " + Leader + " mit einer Länge von " + Highscore + ".";

}

/*function sortarray() {
    console.log('scoretxt:' + scoretxt + ' nameetxt:' + nametxt);
    //scoretxt =[-1,4,6,9,4,5,9,7,1,13,2,87,6,6,9,59,12,64,10,10,15,90,55,25,100];
    //scoretxt = [12, 9, 15, 5, 10, 45, 18, 13,11, 19, 47, 6]
    for (var i = 0; i < scoretxt.length; i++) {
        //console.log('scoretxt:' + scoretxt + ' nameetxt:' + nametxt);
        console.log(scoretxt[i]);
        if (scoretxt[i] > Highscore) {
            Highscore = scoretxt[i];
            //Leader = nametxt[i];
            console.log('Highscore:' + Highscore + ' Leader:' + Leader);
        }
    }
}*/

function newTyping() {
    name = textfield.value(); //"" + output.html(textfield.value());
}

function mousePressed() {
    //s.total++;
}

function draw() {
    background(51)

    //the grid
    for (var i = 0; i < fenster; i += scl) {
        for (var j = 0; j < fenster; j += scl) {
            fill(51); //(162);
            rect(j, i, j + scl, i + scl);

            ellipse(j + (scl / 2), i + (scl / 2), scl, scl);
        } //the row
    } //all rows
    //s.death();
    //s.update();
    //s.show();
    //playertwo.death();
    //playertwo.update();
    //playertwo.show();
    for (var q = 0; q < food.length; q++) {
        if (s.eat(food[q].pos)) {
            food[q].pickLocation();
        }
        food[q].show();
    }

    s.death();
    s.update();
    s.show();

}

function keyPressed() {

    if (keyCode === UP_ARROW) {
        if (s.current_y > s.last_y) {
            console.log('not happenin!');
        } else {
            s.dir(0, -1);
            pause = 0;
        }
    } else if (keyCode === DOWN_ARROW) {
        if (s.current_y < s.last_y) {
            console.log('not happenin!');
        } else {
            s.dir(0, 1);
            pause = 0;
        }
    } else if (keyCode === RIGHT_ARROW) {
        if (s.current_x < s.last_x) {
            console.log('not happenin!');
        } else {
            s.dir(1, 0);
            pause = 0;
        }
    } else if (keyCode === LEFT_ARROW) {
        if (s.current_x > s.last_x) {
            console.log('not happenin!');
        } else {
            s.dir(-1, 0);
            pause = 0;
        }
    }
}
