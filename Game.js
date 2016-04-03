function Game (sizeOfX, sizeOfY){
	this.down=false;
	this.fallRate = 1;
	this.left=false;
	this.pos = new Array(new Array());
	this.right=false;
	this.sizeOfX = sizeOfX;
	this.sizeOfY = sizeOfY;
	

	this.checkPosition = checkPosition;
	this.erasePlayer = erasePlayer;
	this.fall = fall;
	this.loadBlocks = loadBlocks;
	this.moveLeft = moveLeft;
	this.moveRight = moveRight;
	this.run = run;
	this.show = show;
	this.tetrimos = tetrimos;
	
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

	leftOrRight=false;
	upOrDown=false;
	if (direction===0){	
		return this.pos[location["x"]][location["y"]];
	} else if(direction.indexOf("left")>-1){
		if (location["x"]-units<0){
			return false;
		}
		leftOrRight = location["x"]-units;
	} else if(direction.indexOf("right")>-1){
		leftOrRight = location["x"]+units;
	}
	
	if(direction.indexOf("down")>-1){		
		if (location["y"]+units>=this.sizeOfY){
			return false;
		}
		upOrDown = location["y"]+units;
	}  else if(direction.indexOf("up")>-1){
		if (location["y"]-units<0){
			return false;
		}
		upOrDown = location["y"]-units;
	} 
	
	console.log(direction, leftOrRight, upOrDown);
	if (!leftOrRight){
		console.log("X");
		x=location["x"];
	} else if (!upOrDown){
		console.log("Y");
		y=location["y"];
	}
	
	if (leftOrRight && upOrDown){
		console.log("BOTH");
		x=leftOrRight;
		y=upOrDown;
	} 
	console.log(x,y);
	return this.pos[x][y];
}

function erasePlayer(){
	player = this.blocks.last();
	for (pixel=0;pixel<4;pixel++){
		this.pos[this.blocks.pos[player][pixel]["x"]][this.blocks.pos[player][pixel]["y"]]=0;
	}
}

function fall(faster){	
	this.fallRate = faster
	  ? 2
	  : 1;	  
	var player = this.blocks.last();
	if (this.checkPosition(this.blocks.pos[player][0], "down", this.fallRate)===0 
	  && this.checkPosition(this.blocks.pos[player][1], "down", this.fallRate)===0){
		this.blocks.move(player, "down", this.fallRate);
	} else if (this.checkPosition(this.blocks.pos[player][0], "down", this.fallRate)!==0 
	  || this.checkPosition(this.blocks.pos[player][1], "down", this.fallRate)!==0){
		return false;
	}	
	return true;
}

function loadBlocks(){
	for (block=0;block<this.blocks.pos.length;block++){
		for(pixel=0;pixel<this.blocks.pos[block].length;pixel++){
			this.pos[this.blocks.pos[block][pixel]["x"]][this.blocks.pos[block][pixel]["y"]]=this.blocks.color[block];
		}
	}	
}

function moveLeft(){
	if (this.checkPosition(this.blocks.pos[player][0], "left", 1)===0){
		this.blocks.move(player, "left", 2);
	} 
}

function moveRight(){
	if (this.checkPosition(this.blocks.pos[player][2], "right", 1)===0){
		this.blocks.move(player, "right", 2);
	} 
}

function run(){
	this.erasePlayer();
	if (this.right){
		this.moveRight();
	} else if (this.left){
		this.moveLeft();
	}	
	
	if (!this.fall(this.down)){
		//this.tetrimos();
		this.blocks.check();
		this.blocks.spawn();
	}

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
			} else if (this.pos[x][y]==2){
				screen = screen + " blue"
			}
			screen = screen + "'></div>";
		}
		screen = screen + "</div>";
	}	
	return screen;
}

function tetrimos(){
	num=0;
	player = this.blocks.last();	
	blockColor=this.blocks.color[player];
	blockX=this.blocks.pos[player][0]["x"];
	blockY=this.blocks.pos[player][0]["y"];	
	distance=2;	
	left=0;
	right=0;
	

		
	while(this.checkPosition(this.blocks.pos[player][0], "down", distance) === blockColor){		
	
		distance+=2;
	}
	
	verticalBlocks = distance/2;
	console.log(verticalBlocks);
	if (verticalBlocks>=4){
		console.log("standingI");
	}
	distance=2;
	while(this.checkPosition(this.blocks.pos[player][0], "left", distance) === blockColor){		
		distance+=2;
	}
	horizontalBlocks = distance/2;
	console.log(horizontalBlocks);
	if (verticalBlocks>=4){
		console.log("horizontalI");
	}
}


