/**
 * Calculus AB / Great World Texts: The Tempest
 * 
 * Tempest, a game by:
 * @author Justin Garza
 * @author Owen Graham
 * @author Colemen Johnson
 * @author Panya Xiong
 * @author Isaac Zaman
 */

/**
 * persons which have taken part in creating this finest of games
 */
var AUTHORS = [
	{name:"Justin Garza", role:"Audio"},
	{name:"Owen Graham", role:"Project Director"},
	{name:"Colemen \"CJ\" Johnson", role:"Code Management"},
	{name:"Panya Xiong", role:"Graphics"},
	{name:"Isaac Zaman", role:"Sorcery"}
];

/**
 * authors in string
 */
var authorList = (function() {
	var r = "";
	for (var i = 0; i < AUTHORS.length; i++) {
		r += AUTHORS[i].name;
		r += (i < AUTHORS.length - 1) ? ", " : "";
	}
	return r;
})();

/**
 * p5 setup
 * use as start function
 */
function setup() {
	createCanvas(1024, 640);
	
	$("#footer").append(" | " + authorList);
	$("canvas").appendTo("#page");
	
	// main character
	charMain = new Sprite(0, 0, 32, 32, loadImage("graphics/char-main.png"));
	charMain.gotoCenter(width / 2, height / 2),
	charMain.enclose = true;
	
	// background
	charMap = new Sprite(-(width / 2), -(height / 2), 2048, 1280, loadImage("graphics/bg-beach.png"));
	charMap.move = function(x, y) {
		if (this.x + this.width + x >= width && this.x + x <= 0)
			this.x += x;
		if (this.y + this.height + y >= height && this.y + y <= 0)
			this.y += y;
	}
}

/**
 *  p5 loop
 */
function draw() {
	background(255);
	
	charMap.display();
	charMain.display();
	
	var speed = 6;
	
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
}

/**
 * sprite
 */
function Sprite(x, y, w, h, img) {
	
	this.centerX = function() {
		return this.x + this.width / 2;
	}
	this.centerY = function() {
		return this.y + this.height / 2;
	}
	
	this.gotoX = function(x) {
		this.x = x;
	}
	this.gotoY = function(y) {
		this.y = y;
	}
	this.goto = function(x, y) {
		this.gotoX(x);
		this.gotoY(y);
	}
	
	this.gotoCenterX = function(x) {
		this.x = x - this.width / 2;
	}
	this.gotoCenterY = function(y) {
		this.y = y - this.height / 2;
	}
	this.gotoCenter = function(x, y) {
		this.gotoCenterX(x);
		this.gotoCenterY(y);
	}
	
	this.move = function(x, y) {
		if ((this.x + x + this.width <= width && this.x + x >= 0) || !this.enclose)
			this.x += x;
		if ((this.y + y + this.height <= height && this.y + y >= 0) || !this.enclose)
			this.y += y;
	}
	
	this.display = function() {
		try {
			image(this.img, this.x, this.y, this.width, this.height);
		} catch (e) {
		}
	}
	
	this.img = img;
	this.enclose = false;
	this.width = w;
	this.height = h;
	this.goto(x, y);
	
}