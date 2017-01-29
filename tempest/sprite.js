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

/**
 * Sprite constructor
 * 
 * @param img Image loaded from setup()
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
	
	this.ai = function() {}
	
	this.img = img;
	this.enclose = false;
	this.width = w;
	this.height = h;
	this.goto(x, y);
	
}
