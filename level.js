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
function Level(l) { // Letter L, not a one (Purpose of monospace fonts)
	
	this.id = l;
	
	this.draw = function() {}
	
	this.ending = function() { // When is the level over?
		return false;
	}
	
	this.next = function() { // What's after this level?
		charList = [];
	}
	
	// Initialize empty variable for += and .push()
	charList = [];
	timer = 0;
	
	var z = this.id;
	
	setMap(2048, 1280, imgMap);
	
	if (z == 1) { // Level 1
		charList = [];
		
		// Summon 2 sprites for fun
		
		var charAntonio = new Sprite(0, 0, 48, 64, imgAntonio, S_NPC);
		charAntonio.gotoCenter(width / 2 + 128, height / 2);
		
		var charGonzalo = new Sprite(0, 0, 48, 64, imgGonzalo, S_NPC);
		charGonzalo.gotoCenter(width / 2 - 128, height / 2);
		
		// Put those sprites into the game
		charList.push(charAntonio);
		charList.push(charGonzalo);
		
		// change the map to lvl1 configuration
		setMap(1024, 1280, imgLvl1);
		charMap.display = function() {
			image(this.img, this.getImgLeft(), this.getImgTop(), this.imgWidth, this.imgHeight / 2);
			image(this.img, this.getImgLeft(), this.getImgTop() + this.imgHeight / 2, this.imgWidth, this.imgHeight / 2);
		}
		
		this.draw = function() {
			if ((timer % 64) == 0) {
				var amount = getRandomInt(1, 4); // How many sprites to load?
				var poss = []; // Positions
				for (var i = 0; i < amount; i++) {
					var v = getRandomInt2(256, width - 256 - 64, 64);
					var b = false;
					for (var j = 0; j < amount; j++) {
					}
					if (b) {
						poss.push(v);
					}
				}
				// Generate sprites at 32px intervals above the canvas
				charList.push(new Sprite(getRandomInt2(256, width - 256 - 64, 64), -64, 64, 64, imgBarrel, S_BARREL));
				charList.push(new Sprite(getRandomInt2(256, width - 256 - 64, 64), -64, 64, 64, imgCrate, S_CRATE));
			}
			//$("#title").html(timer + " % 64 = " + (timer % 64));
		}
		
		this.ending = function() {
			if (charMain.x < 64)
				return true;
			return false;
		}
		this.next = function() {
			level = new Level(101);
		}
		
	} else if (z == 101) { // Cutscene 1
		this.ending = function() {
			return true;
		}
		this.next = function() {
			level = new Level(2);
		}
	} else if (z == 2) { // Level 2
		var charBob = new Sprite(0, 0, 48, 64, imgAntonio, S_NPC);
		charBob.gotoMap(144, 144);
		charList.push(charBob);
	} else { // Default
	}
	
}
