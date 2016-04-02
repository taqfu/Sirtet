function Game (sizeOfX, sizeOfY){
	this.down=false;
	this.fallRate = 1;
	this.left=false;
	this.pos = new Array(new Array());
	this.right=false;
	this.sizeOfX = sizeOfX;
	this.sizeOfY = sizeOfY;
	

	this.checkPosition = checkPosition;
	this.eraseScreen = eraseScreen;
	this.fall = fall;
	this.hitDown = hitDown;
	this.hitLeft = hitLeft;
	this.hitRight = hitRight;
	this.left = goLeft;
	this.right = goRight;
	this.loadBlocks = loadBlocks;
	this.run = run;
	this.show = show;
	
	for (x=0;x<this.sizeOfX;x++){
		this.pos.push([]);
		for (y=0;y<this.sizeOfY;y++){
			this.pos[x].push(0);
		}
	}
	this.blocks = new Blocks(this.sizeOfX, this.sizeOfY);
	this.blocks.spawn();
	
}
function checkPosition(location, direction, units){	
	if (direction===0){
		return this.pos[location["x"]][location["y"]];
	} else if(direction==="down"){
		return this.pos[location["x"]][location["y"]+units];
	}
}

function eraseScreen(){
	for (x=0;x<this.sizeOfX;x++){	
		for (y=0;y<this.sizeOfY;y++){
			this.pos[x][y]=0;
		}
	}
}

function fall(faster){
	
	this.fallRate = faster
	  ? 2
	  : 1;	  
	var player = this.blocks.last();
	if (this.checkPosition(this.blocks.pos[player][0], "down", this.fallRate)===0 
	  && this.checkPosition(this.blocks.pos[player][1], "down", this.fallRate)===0){
		moveBlock(player, "down", this.fallRate);
	}
	/*
	if (this.pos[block][0]["y"]<this.sizeOfY-this.fallRate && this.pos[block][1]["y"]<this.sizeOfY-this.fallRate 
	  && !hitABlockGoingDown){
		for(pixel=0;pixel<4;pixel++){
			this.pos[block][pixel]["y"]+=this.fallRate;
		}
	} else if (this.pos[block][0]["y"]>=this.sizeOfY-this.fallRate || this.pos[block][1]["y"]>=this.sizeOfY-this.fallRate 
	  || hitABlockGoingDown){
		return false;
	}*/
	return true;
}


function run(){
	/*	
	if (this.left && !this.right){
		this.blocks.left();
	} else 	if (!this.left && this.right){
		this.blocks.right();
	} 
	*/
	if (!this.fall(this.down)){
		this.blocks.spawn();
	}
	this.eraseScreen();
	this.loadBlocks();

	$("#gameScreen").html(this.show());
}


function show(){
	screen = "";
	for (y=0;y<this.sizeOfY;y++){
		screen = screen + "<div class='row'>";
		for (x=0;x<this.sizeOfX;x++){
			screen = screen + "<div class='cell"
			if (this.pos[x][y]==0){
				screen = screen + " neutral"
			} else if (this.pos[x][y]==1){
				screen = screen + " red"
			} else if (this.pos[x][y]==1){
				screen = screen + " blue"
			}
			screen = screen + "'></div>";
		}
		screen = screen + "</div>";
	}	
	return screen;
}







function goLeft(){	
	block=this.pos.length-1;
	var hitABlockGoingLeft = this.hitLeft();
	if (this.pos[block][0]["x"]>0 && !hitABlockGoingLeft){
		
		for(pixel=0;pixel<4;pixel++){
			this.pos[block][pixel]["x"]--;
			this.pos[block][pixel]["x"]--;
		}
		return true;
	} else if (this.pos[block]["x"]==0 && hitABlockGoingLeft){
		return false;
	}
}


function goRight(){		
	block=this.pos.length-1;
	var hitABlockGoingRight = this.hitLeft();
	if (this.pos[block][0]["x"]<this.sizeOfX-2 && !hitABlockGoingRight){
		for(pixel=0;pixel<4;pixel++){
			this.pos[block][pixel]["x"]++;
			this.pos[block][pixel]["x"]++;
		}
		return true;
	} else if (this.pos[block]["x"]<=this.sizeOfX-2 && hitABlockGoingRight){
		return false;
	}
}


function hitDown(){

	if (this.pos.length<2){
		return false;
	}
	for (blockHit=0;blockHit<this.pos.length-1;blockHit++){
		for (otherPixel=0;otherPixel<4;otherPixel+=this.fallRate){
			for (pixel=0;pixel<4;pixel+=this.fallRate){
				if (this.pos[blockHit][otherPixel]["x"]===this.pos[this.pos.length-1][pixel]["x"] 
				  && this.pos[blockHit][otherPixel]["y"]===this.pos[this.pos.length-1][pixel]["y"]+this.fallRate){
					 console.log(this.pos[blockHit][otherPixel]["y"]-this.pos[this.pos.length-1][pixel]["y"], pixel, otherPixel);
					return true;
				}
			}			
		}
	}	
	return false;
}


function hitLeft(){

	if (this.pos.length<2){
		return false;
	}
	for (blockHit=0;blockHit<this.pos.length-1;blockHit++){
		for (otherPixel=0;otherPixel<4;otherPixel++){
			for (pixel=0;pixel<4;pixel++){
				if (this.pos[blockHit][otherPixel]["x"]-this.fallRate===this.pos[this.pos.length-1][pixel]["x"] 
				  && this.pos[blockHit][otherPixel]["y"]+this.fallRate===this.pos[this.pos.length-1][pixel]["y"]){
					return true;
				}
			}			
		}
	}
	return false;
}


function hitRight(){

	if (this.pos.length<2){
		return false;
	}
	for (blockHit=0;blockHit<this.pos.length-1;blockHit++){
		for (otherPixel=0;otherPixel<4;otherPixel++){
			for (pixel=0;pixel<4;pixel++){
				if (this.pos[blockHit][otherPixel]["x"]===this.pos[this.pos.length-1][pixel]["x"]+this.fallRate
				  && this.pos[blockHit][otherPixel]["y"]===this.pos[this.pos.length-1][pixel]["y"]+this.fallRate){
					return true;
				}
			}			
		}
	}
	return false;
}
function loadBlocks(){
	for (block=0;block<this.blocks.pos.length;block++){
		for(pixel=0;pixel<this.blocks.pos[block].length;pixel++){
			this.pos[this.blocks.pos[block][pixel]["x"]][this.blocks.pos[block][pixel]["y"]]=this.blocks.color[block];
		}
	}	
}