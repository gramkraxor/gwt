/*
 * Calculus AB / Great World Texts: The Tempest
 * 
 * Tempest, a game by:
 * @author Owen Graham
 * @author Isaac Zaman
 * @author Justin Garza
 * @author Panya Xiong
 * @author Colemen Johnson
 */

/**
 * Level constructor
 * Also used for cutscenes
 * 
 * @param l Level ID (int)
 */ 
function Level(l) { // Letter L, level ID
	
	this.id = l;
	
	this.draw = function() { return this; }
	
	this.ending = function() { // When is the level over?
		return false;
	}
	
	this.next = function() { // What's after this level?
		charList = [];
		return this;
	}
	
	// Initialize empty variable for += and .push()
	charList = [];
	timer = 0;
	
	setMap(2048, 1280, imgMap);
	
	if (l == 0) { // Title sequence
		
		// Create the animation sprites
		charBg = new Sprite(0, 0, 1024, 640, imgLvl0, S_A113);
		charTitle = new Sprite(0, 0, 440, 280, imgTitle, S_A113).gotoCenter(width / 2, 280);
		
		this.draw = function() {
			// Draw the sprites
			charBg.display();
			charTitle.display();
			
			// Press start 2 p, but blink, but only if bg can render
			if (timer % 64 < 32 && charBg.img.width > 1) {
				textSize(32);
				textFont("Ubuntu Mono");
				textAlign(CENTER);
				fill(255);
				text("PRESS START TO PLAY", width / 2, 480);
				
			}
			
			return this;
		}
		
		this.ending = function() {
			return keyIsPressed;
		}
		
		this.next = function() {
			level = new Level(1);
		}
		
	} else if (l == 1) { // Level 1
		charList = [];
		
		// Summon 2 sprites for fun
		
		charList.push(new Sprite(0, 0, 48, 64, imgFerdF, S_NPC).gotoCenter(width / 2 + 128, height / 2));
		charList.push(new Sprite(0, 0, 48, 64, imgFerdF, S_NPC).gotoCenter(width / 2 - 128, height / 2));
		
		// change the map to lvl1 configuration
		setMap(1024, 1280, imgLvl1);
		charMap.display = function() {
			image(this.img, this.getImgLeft(), this.getImgTop(), this.imgWidth, this.imgHeight / 2);
			image(this.img, this.getImgLeft(), this.getImgTop() + this.imgHeight / 2, this.imgWidth, this.imgHeight / 2);
		}
		
		this.draw = function() {
			if ((lvlProgress % 128) == 0) {
				var amount = getRandomInt(1, 4); // How many sprites to load?
				var poss = []; // Positions
				/*for (var i = 0; i < amount; i++) {
					var v = getRandomInt2(256, width - 256 - 64, 64);
					var b = false;
					for (var j = 0; j < amount; j++) {
					}
					if (b) {
						poss.push(v);
					}
				}*/
				
				// Generate sprites at 32px intervals above the canvas, between x=256 and x=768
				charList.push(new Sprite(getRandomInt2(256, width - 256 - 64, 64), -64, 64, 64, imgBarrel, S_BARREL));
				charList.push(new Sprite(getRandomInt2(256, width - 256 - 64, 64), -64, 64, 64, imgCrate, S_CRATE));
				
				for (var i = charList.length - 1; i >= 0; i--) {
					var ch = charList[i];
					if (ch.y > height * 2) { // Is the sprite too far down?
						charList.splice(i, 1); // Take it out
					}
				}
			}
			//$("#title").html(timer + " % 64 = " + (timer % 64));
			
			return this;
		}
		
		this.ending = function() {
			if (charMain.x < 64) {
				return true;
			}
			return false;
		}
		this.next = function() {
			level = new Level(101);
			return this;
		}
		
	} else if (z == 101) { // Cutscene 1
		this.ending = function() {
			return true;
		}
		this.next = function() {
			level = new Level(2);
			return this;
		}
	} else if (l == 2) { // Level 2
		var charBob = new Sprite(0, 0, 48, 64, imgFerdF, S_NPC);
		charBob.gotoMap(144, 144);
		charList.push(charBob);
	} else { // Default
	}
	
}
