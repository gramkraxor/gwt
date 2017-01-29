/**
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
	charMain = new Sprite(0, 0, 32, 32, loadImage("graphics/char-main.png"));
	charMain.gotoCenter(width / 2, height / 2),
	charMain.enclose = true;
	
	imgGonzalo = loadImage("graphics/char-main.png");
	imgAntonio = loadImage("graphics/char-main.png");
	
	level = new Level(1);
	
	// background
	charMap = new Sprite(-(width / 2), -(height / 2), 2048, 1280, loadImage("graphics/bg-beach.png"));
	charMap.move = function(x, y) {
		if (this.x + this.width + x >= width && this.x + x <= 0) {
			this.x += x;
			for (var i = 0; i < charList.length; i++) {
				charList[i].x += x;
			}
		}
		if (this.y + this.height + y >= height && this.y + y <= 0) {
			this.y += y;
			for(var i = 0; i < charList.length; i++){
				charList[i].y += y;
			}
		}
	}
}

/**
 *	p5 loop
 */
function draw() {
	background(255);
	
	if (level.ending()) {
		level.next();
	}
	
	var speed = 4;
	for(var i = 0; i < charList.length; i++ ){
		charList[i].ai();
	}
	
	// W
	if (keyIsDown(87)) {
		if (charMain.centerY() > height / 2 || charMap.y + speed > 0) {
			charMain.move(0, -speed);
		} else {
			charMap.move(0, speed);
		}
	}
	// A
	if (keyIsDown(65)) {
		if (charMain.centerX() > width / 2 || charMap.x + speed > 0) {
			charMain.move(-speed, 0);
		} else {
			charMap.move(speed, 0);
		}
	}
	// S
	if (keyIsDown(83)) {
		if (charMain.centerY() < height / 2 || charMap.y + charMap.height - speed < height) {
			charMain.move(0, speed);
		} else {
			charMap.move(0, -speed);
		}
	}
	// D
	if (keyIsDown(68)) {
		if (charMain.centerX() < width / 2 || charMap.x + charMap.width - speed < width) {
			charMain.move(speed, 0);
		} else {
			charMap.move(-speed, 0);
		}
	}
	
	charMap.display();
	charMain.display();
	for(var i = 0; i < charList.length; i++ ){
		charList[i].display();
	}
	
}
