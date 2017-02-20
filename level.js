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
 * Level constructor
 * Also used for cutscenes
 * 
 * @param l Level ID (int)
 */ 
function Level(l) {
	
	this.id = l;
	
	this.ending = function() {
		return false;
	}
	
	this.next = function() {
		charList = [];
	}
	
	charList = [];
	timer = 0;
	
	if (this.id == 1) { // Level 1
		charList = [];
		
		var charAntonio = new Sprite(0, 0, 32, 32, imgAntonio);
		charAntonio.gotoCenter(width / 2 + 128, height / 2);
		
		var charGonzalo = new Sprite(0, 0, 32, 32, imgGonzalo);
		charGonzalo.gotoCenter(width / 2 - 128, height / 2);
		
		charList.push(charAntonio);
		charList.push(charGonzalo);
		
		setMap(1024, 1280, imgLvl1);
		charMap.display = function() {
			image(this.img, this.getImgLeft(), this.getImgTop(), this.imgWidth, this.imgHeight / 2);
			image(this.img, this.getImgLeft(), this.getImgTop() + this.imgHeight / 2, this.imgWidth, this.imgHeight / 2);
		}
		
		this.ending = function() {
			if (charMain.x < 64)
				return true;
			return false;
		}
		this.next = function() {
			level = new Level(101);
		}
		
	} else if (this.id == 101) {
		var charBob = new Sprite(0, 0, 32, 32, imgAntonio);
		charBob.gotoMap(144, 144);
		charList.push(charBob);
	} else {
		setMap(2048, 1280, imgMap);
	}
}
