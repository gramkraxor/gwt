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
	{name:"Isaac Zaman", role:"Driving"},
	{name:"Justin Garza", role:"Ninja"},
	{name:"Colemen \"CJ\" Johnson", role:"Unknown"},
	{name:"Panya Xiong", role:"Pizza"}
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
var timer = 0;

var clunk = //*
true;
/*/
false
//*/

function getRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min)) + min;
}

function getRandomInt2(min, max, x) {
	min = Math.ceil(min / x);
	max = Math.floor(max / x);
	return (Math.floor(Math.random() * (max - min)) + min) * x;
}

function getRandomBoolean() {
	return Math.floor(Math.random() * 2) == 1;
}

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
	
	$("#footer").append(" | " + authorList);
	$("canvas").appendTo("#page");
	
	konamiCode = [UP_ARROW, UP_ARROW, DOWN_ARROW, DOWN_ARROW, LEFT_ARROW, RIGHT_ARROW, LEFT_ARROW, RIGHT_ARROW, 66, 65];
	
	// main character
	charMain = new Sprite(0, 0, 64, 64, loadImage("img/char-main.png"), S_PLAYER);
	charMain.gotoCenter(width / 2, height / 2),
	charMain.enclose = true;
	
	imgGonzalo = loadImage("img/char-main.png");
	imgAntonio = loadImage("img/char-main.png");
	
	imgMap = loadImage("img/bg-beach.png");
	imgLvl1 = loadImage("img/bg-lvl1.png");
	imgLvl2 = loadImage("img/bg-beach.png");
	imgLvl3 = loadImage("img/bg-beach.png");
	
	konamiImg = loadImage("img/konami.png");
	
	// background
	setMap(2048, 1280, imgMap);
	
	level = new Level(1);
}

/**
 * p5 loop
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
		if (clunk) {
			speed *= timer % 4 == 0 ? 4 : 0;
		}
		
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
		if (charMain.getBottom() > height) {
			charMain.y -= charMain.height * 3;
		}
		
		if (charMap.y == 0) {
			charMap.gotoY(height - charMap.height);
		}
		
	} else {
		var speed = 4;
		if (clunk) {
			speed *= timer % 4 == 0 ? 4 : 0;
		}
		
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
	$("#title").html(konamiProgress);
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
