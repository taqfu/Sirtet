function Blocks (sizeOfX, sizeOfY){	
	this.color = new Array();
	this.move = moveBlock;
	this.pos = new Array();
	this.sizeOfX = sizeOfX;
	this.sizeOfY = sizeOfY;
	
	this.check = checkIntegrity;
	this.last = lastBlock;
	this.spawn = dropBlock;	
}

function checkIntegrity(){	
	player=this.last();		
//	console.log(this.pos[player][0]["y"]%2);
	if (this.pos[player][0]["y"]%2===0){
		console.log("ADJ1");
		this.move(player, "down", 1);			
	} 
	if (player>0){
		for (block=0;block<player;block++){		
			
			if (this.pos[block][1]["y"]-this.pos[player][0]["y"]===2){
				console.log("ADJ2");
				this.move(player, "down", 1);			
			}
		}
	}
}
function dropBlock(){	
	x= Math.floor(this.sizeOfX/2);
	y= 0;
	this.pos.push([{x:x, y:y}, {x:x, y:y-1}, {x:x+1, y:y}, {x:x+1, y:y-1}]);
	this.color.push(randomNumber(1,2));
}

function lastBlock(){
	return (this.pos.length-1);
}

function moveBlock(block, direction, rateOfChange){
	for (pixel=0;pixel<4;pixel++){
		if (direction==="left"){
			this.pos[block][pixel]["x"]-=rateOfChange;
		} else if (direction==="down"){
			this.pos[block][pixel]["y"]+=rateOfChange;
		} else if (direction==="right"){
			this.pos[block][pixel]["x"]+=rateOfChange;
		}
	}
}

function whichBlock(){

	
}

