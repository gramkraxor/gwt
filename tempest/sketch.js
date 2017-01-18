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

var charMain;

/**
 * p5 setup
 * use as start function
 */
function setup() {
	createCanvas(1024, 640);
	
	$("#footer").append(" | " + authorList);
	$("canvas").appendTo("#page");
	
	charMain = new Sprite(width / 2, height / 2, 24, 48,
			function() {
				fill(255, 0, 0);
				noStroke();
				rectMode(CENTER);
				rect(this.x, this.y, this.width, this.height);
			});
}

/**
 *  p5 loop
 */
function draw() {
	background(255);
	
	charMain.render();
	
	// W
	if (keyIsDown(87)) {
		charMain.move(0, -6);
	}
	// A
	if (keyIsDown(65)) {
		charMain.move(-6, 0);
	}
	// S
	if (keyIsDown(83)) {
		charMain.move(0, 6);
	}
	// D
	if (keyIsDown(68)) {
		charMain.move(6, 0);
	}
}

/**
 * sprite
 * 
 * @param render; rendering function
 */
function Sprite(x, y, w, h, render) {
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
	this.move = function(x, y) {
		//if (this.x + x <= width && this.x + x >= 0)
			this.x += x;
		//if (this.y + y <= height && this.y + y >= 0)
			this.y += y;
	}
	
	this.width = w;
	this.height = h;
	this.render = render;
	this.goto(x, y);
}