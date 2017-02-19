/*
 * Calculus AB / Great World Texts: The Tempest
 * 
 * Tempest, a game by:
 * @author Owen Graham
 * @author Isaac Zaman
 * @author Justin Garza
 * @author Colemen Johnson
 * @author Panya Xiong
 */

var AUTHORS = [
	{name:"Owen Graham", role:"Lead Code"},
	{name:"Isaac Zaman", role:"Code"},
	{name:"Justin Garza", role:"Audio"},
	{name:"Colemen \"CJ\" Johnson", role:"Design"},
	{name:"Panya Xiong", role:"Graphics"}
];

var authorList = (function() {
	var r = "";
	for (var i = 0; i < AUTHORS.length; i++) {
		r += AUTHORS[i].name;
		r += (i < AUTHORS.length - 1) ? ", " : "";
	}
	return r;
})();

var charList = [];

var level;
var imgGonzalo;
var imgAntonio;

var timer = 0;

/**
 * p5 setup
 * Use as startup function
 * Load images here
 */
function setup() {
	createCanvas(1024, 640);
	
	$("#footer").append(" | " + authorList);
	$("canvas").appendTo("#page");
	
	// main character
	charMain = new Sprite(0, 0, 32, 32, loadImage("img/char-main.png"));
	charMain.gotoCenter(width / 2, height / 2),
	charMain.enclose = true;
	
	imgGonzalo = loadImage("img/char-main.png");
	imgAntonio = loadImage("img/char-main.png");
	
	imgMap = loadImage("img/bg-beach.png");
	imgLvl1 = loadImage("img/bg-lvl1.png");
	imgLvl2 = loadImage("img/bg-beach.png");
	imgLvl3 = loadImage("img/bg-beach.png");
	
	// background
	charMap = new Sprite(-width / 2, -height / 2, 2048, 1280, imgMap);
	charMap.move = function(x, y) {
		if (this.getRight() + x >= width && this.getLeft() + x <= 0) {
			this.x += x;
			for (var i = 0; i < charList.length; i++) {
				charList[i].x += x;
			}
			charMain.x += x;
		}
		if (this.getBottom() + y >= height && this.getTop() + y <= 0) {
			this.y += y;
			for (var i = 0; i < charList.length; i++) {
				charList[i].y += y;
			}
			charMain.y += y;
		}
	}
	
	level = new Level(1);
}

/**
 *	p5 loop
 */
function draw() {
	
	background(255, 0, 127);
	
	if (level.ending()) {
		level.next();
	}
	
	var l = level.id;
	
	for (var i = 0; i < charList.length; i++) {
		charList[i].ai();
	}
	
	if (l == 1) {
		var speed = 4;
		// A // Left // X--
		if (keyIsDown(65)) {
			charMain.move(-speed, 0);
		}
		// D // Right // X++
		if (keyIsDown(68)) {
			charMain.move(speed, 0);
		}
		// W // Up // Y--
		if (keyIsDown(87)) {
			charMain.move(0, -speed);
		}
		// S // Down // Y++
		if (keyIsDown(83)) {
			charMain.move(0, speed);
		}
		
		speed = 2;
		
		charMain.move(0, -speed);
		charMap.move(0, speed);
		
		if (charMap.y == 0) {
			charMap.gotoY(height - charMap.height);
		}
		
	} else {
		var speed = 4;
		// A // Left // X--
		if (keyIsDown(65)) {
			charMain.move(-speed, 0);
			if (!(charMain.getCenterX() > width / 2 || charMap.x + speed > 0)) {
				charMap.move(speed, 0);
			}
		}
		// D // Right // X++
		if (keyIsDown(68)) {
			charMain.move(speed, 0);
			if (!(charMain.getCenterX() < width / 2 || charMap.x + charMap.width - speed < width)) {
				charMap.move(-speed, 0);
			}
		}
		// W // Up // Y--
		if (keyIsDown(87)) {
			charMain.move(0, -speed);
			if (!(charMain.getCenterY() > height / 2 || charMap.y + speed > 0)) {
				charMap.move(0, speed);
			}
		}
		// S // Down // Y++
		if (keyIsDown(83)) {
			charMain.move(0, speed);
			if (!(charMain.getCenterY() < height / 2 || charMap.y + charMap.height - speed < height)) {
				charMap.move(0, -speed);
			}
		}
	}
	
	charMap.display();
	for (var i = 0; i < charList.length; i++ ) {
		charList[i].display();
	}
	charMain.display();
	
	timer++;
	
}
