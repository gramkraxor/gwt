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

/**
 * Sprite constructor
 * 
 * @param img Image loaded from setup()
 */
function Sprite(x, y, w, h, img) {
	
	this.img = img;
	this.enclose = false;
	// Relative positions to sprite's contact origin
	this.imgX = 0;
	this.imgY = 0;
	this.imgWidth = w;
	this.imgHeight = h;
	
	this.getImgLeft = function() {
		return this.x + this.imgX;
	}
	this.getImgRight = function() {
		return this.x + this.imgX + this.imgWidth;
	}
	this.getImgTop = function() {
		return this.y + this.imgY;
	}
	this.getImgBottom = function() {
		return this.y + this.imgY + this.imgHeight;
	}
	this.getCenterX = function() {
		return this.x + this.width / 2;
	}
	this.getCenterY = function() {
		return this.y + this.height / 2;
	}
	
	this.contact = false;
	this.width = w;
	this.height = h;
	this.getLeft = function() {
		return this.x;
	}
	this.getRight = function() {
		return this.x + this.width;
	}
	this.getTop = function() {
		return this.y;
	}
	this.getBottom = function() {
		return this.y + this.height;
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
	
	this.gotoMapX = function(x) {
		this.x = charMap.x + x;
	}
	this.gotoMapY = function(y) {
		this.y = charMap.y + y;
	}
	this.gotoMap = function(x, y) {
		this.gotoMapX(x);
		this.gotoMapY(y);
	}
	
	this.move = function(x, y) {
		var canMoveX = true;
		var canMoveY = true;
		
		// Keep sprite inside of canvas
		if (this.enclose) {
			if ((this.getLeft() + x < 0 || this.getRight() + x > width) && (this.getLeft() >= 0 && this.getRight() <= width)) {
				canMoveX = false;
			}
			if ((this.getTop() + y < 0 || this.getBottom() + y > height) && (this.getTop() >= 0 && this.getBottom() <= height)) {
				canMoveY = false;
			}
		}
		
		// Keep sprites from intersecting
		for (var i = 0; i < charList.length; i++) {
			var c = charList[i];
			
			// Note: This basic method of contact box movement will cause extremely thin objects to skip past each other
			
			// Determine whether the new position will be outside of the object
			var toLeft  = this.getRight()  + x <= c.getLeft();
			var toRight = this.getLeft()   + x >= c.getRight();
			var above   = this.getBottom() + y <= c.getTop();
			var below   = this.getTop()    + y >= c.getBottom();
			
			if (!(toLeft || toRight || above || below)) {
				canMoveX = false;
				canMoveY = false;
			}
			
		}
		
		this.x += canMoveX ? x : 0;
		this.y += canMoveY ? y : 0;
	}
	
	this.display = function() {
		try {
			image(this.img, this.getImgLeft(), this.getImgTop(), this.imgWidth, this.imgHeight);
		} catch (e) {
		}
	}
	
	this.ai = function() {}
	
	this.goto(x, y);
	
}
