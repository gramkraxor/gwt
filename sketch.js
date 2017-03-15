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
	{name:"Owen Graham", role:"A Stick Named Paris"},
	{name:"Isaac Zaman", role:"Sorcery & Other Things"},
	{name:"Justin Garza", role:"A Hot Set of Wheels"},
	{name:"Colemen \"CJ\" Johnson", role:"Icy Driveways"},
	{name:"Panya Xiong", role:"Cheeseburger Sliders"}
];

// Put AUTHORS into a string
var authorList = (function() {
	var r = "";
	for (var i = 0; i < AUTHORS.length; i++) {
		r += AUTHORS[i].name;
		r += (i < AUTHORS.length - 1) ? ", " : "";
	}
	return r;
})();

var charList = []; // Array of map-dependent sprites
var timer = 0; // Counts game ticks defined by loops of draw()

var clunk = false; // Will the game use 8-bit movement?

// Randomizers //

function getRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min)) + min;
}

function getRandomInt2(min, max, x) { // Random int with interval
	min = Math.ceil(min / x);
	max = Math.floor(max / x);
	return (Math.floor(Math.random() * (max - min)) + min) * x;
}

function getRandomBoolean() {
	return Math.floor(Math.random() * 2) == 1;
}

var blowback = 0;  // Barrel blowback
var blowforth = 0; // Escapes trappednesses
var blowaside = 0; // See above

// Konami code functionality //

var ytId = "QH2-TGUlwu4"; // Nyan Cat
var ytT = 4;
var ytUrl = "http://www.youtube.com/embed/" + ytId + "?autoplay=1&disablekb=1&rel=0&controls=0&start=" + ytT;

var konamiCode;
var konamiImg;
var konamiProgress = 0;
var konamiTime;
var konamiDuration = 8
var NEVER   = 0; // Never Gonna Give You Up
var NYAN    = 1; // Nyan Cat
var YOUTUBE = 2; // Youtube embed
var konamiMode = YOUTUBE;
function konami() {
	if (konamiMode == NEVER) {
		var url = "http://youtu.be/dQw4w9WgXcQ?t=42"; // Never Gonna Give You Up
		$(location).attr("href", url);
	} else if (konamiMode == NYAN) {
		image(konamiImg, 0, 0, width, height);
	} else if (konamiMode == YOUTUBE) {
		$("canvas").remove();
		$("iframe").remove();
		$("#page").append("<iframe style=\"height:" + height + "px;width:" + width + "px;\" src=\"" + ytUrl + "\"></iframe>");
	}
}

/**
 * p5 setup
 * Use as startup function
 * Load images here
 */
function setup() {
	createCanvas(1024, 640);
	
	$("#copyright").append(" | " + authorList);
	$("#alt div").html("Game resources unavailable.<br/>Is this page online?");
	$("canvas").appendTo("#page");
	$("#footer").appendTo("#page");
	//$("#alt").css({"height": (height + "px"), "width": (width + "px")});
	//$("canvas").append("<div id=\"alt\">404<br/>Game resources not found</div>");
	
	konamiCode = [UP_ARROW, UP_ARROW, DOWN_ARROW, DOWN_ARROW, LEFT_ARROW, RIGHT_ARROW, LEFT_ARROW, RIGHT_ARROW, 66, 65];
	
	// Load a couple graphics
	imgProspero = loadImage("img/char-prospero.png");
	imgGonzalo = loadImage("img/char-ferdinand.png");
	imgAntonio = loadImage("img/char-ferdinand.png");
	imgBarrel = loadImage("img/char-barrel.png");
	imgCrate  = loadImage("img/char-crate.png");
	imgMap = loadImage("img/bg-beach.png");
	imgLvl1 = loadImage("img/bg-lvl1.png");
	imgLvl2 = loadImage("img/bg-beach.png");
	imgLvl3 = loadImage("img/bg-beach.png");
	konamiImg = loadImage("img/konami.png");
	
	// Main character
	charMain = new Sprite(0, 0, 48, 64, imgProspero, S_PLAYER);
	charMain.gotoCenter(width / 2, height / 2),
	charMain.enclose = true;
	
	// Background
	setMap(2048, 1280, imgMap);
	
	level = new Level(1);
}

/**
 * p5 loop
 */
function draw() {
	
	//background(255, 0, 127);
	
	if (level.ending()) {
		level.next();
	}
	
	var l = level.id;
	
	for (var i = 0; i < charList.length; i++) {
		charList[i].ai();
	}
	
	if (l == 1) { // Level 1: downward scroll
		
		var speed = 4; // Player speed
		
		if (clunk) {
			var clunkiness = 4;
			speed *= timer % clunkiness == 0 ? clunkiness : 0;
		}
		
		// S // Down // Y++
		if (keyIsDown(83)) {
			charMain.move(0, speed);
		}
		// W // Up // Y--
		if (keyIsDown(87)) {
			charMain.move(0, -speed);
		}
		// D // Right // X++
		if (keyIsDown(68)) {
			charMain.move(speed, 0);
		}
		// A // Left // X--
		if (keyIsDown(65)) {
			charMain.move(-speed, 0);
		}
		
		speed = 2; // Map/running speed
		
		charMain.move(0, -speed);
		charMap.move(0, speed);
		if (charMap.y == 0) { // If map is on bottom, jump up
			charMap.gotoY(height - charMap.height);
		}
		
		if (charMain.getBottom() > height) { // If charMain us in danger, jump up
			//charMain.y -= charMain.height * 3;
			blowforth = 16;
			//blowaside = (32 - (charMain.getCenterX() % 64));
		}
		
		if (blowforth > 0) {
			charMain.y -= blowforth;
			blowforth--;
			blowback = 0;
		}
		/*if (blowaside != 0) {
			charMain.x += blowaside;
			blowaside -= blowaside > 0 ? 1 : -1; // Decrease abs(blowaside)
		}*/
		
		if (blowback > 0) { // Shoot backwards from barrel, decelerate
			charMain.move(0, blowback);
			blowback--;
		}
		
	} else {
		
		var speed = 4; // Player speed
		
		if (clunk) {
			var clunkiness = 4;
			speed *= timer % clunkiness == 0 ? clunkiness : 0;
		}
		
		// A // Left // X--
		if (keyIsDown(65)) {
			charMain.move(-speed, 0);
			if (!(charMain.getCenterX() > width / 2 || charMap.x + speed > 0)) { // Is the map on the edge of the canvas?
				charMap.move(speed, 0);                                          // If not, move the map and evrybody in charList[]
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
		
	level.draw();
	
	charMap.display();
	for (var i = 0; i < charList.length; i++ ) {
		charList[i].display();
	}
	charMain.display();
	
	// Konami code
	if (keyIsPressed) {
		if (keyIsDown(konamiCode[konamiProgress])) {
			konamiProgress++;
		} else if (keyIsDown(konamiCode[konamiProgress - 1])) {
			// nothing
		} else {
			konamiProgress = 0;
		}
	}
	//$("#title").html(konamiProgress);
	if (konamiProgress >= konamiCode.length) {
		if (konamiMode == NEVER || konamiMode == YOUTUBE) {
			konami();
		}
		konamiProgress = 0;
		konamiTime = timer + konamiDuration;
	}
	if (konamiMode == NYAN && konamiTime > timer) {
		konami();
	}
	
	timer++;
	
}

function setMap(x, y, img) {
	charMap = new Sprite(0, 0, x, y, img, S_MAP);
	charMap.gotoCenter(width / 2, height / 2);
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
}
