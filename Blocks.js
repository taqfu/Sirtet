function Blocks (sizeOfX, sizeOfY){	
	this.color = new Array();
	this.pos = new Array();
	this.sizeOfX = sizeOfX;
	this.sizeOfY = sizeOfY;
	
	this.last = lastBlock;
	this.spawn = dropBlock;	
}


function dropBlock(){	
	x= Math.floor(this.sizeOfX/2);
	y= 0;
	this.pos.push([{x:x, y:y}, {x:x, y:y-1}, {x:x+1, y:y}, {x:x+1, y:y-1}]);
	this.color.push(1);
	console.log("DROP", this.pos.length);
}

function lastBlock(){
	return this.pos.length-1;
}

function moveBlock(block, direction, rateOfChange){
	console.log(this.pos.length, block, direction, rateOfChange);
	for (pixel=0;pixel<4;pixel++){
		if (direction==="left"){
			this.pos[block][pixel]["x"]-=rateOfChange;
		} else if (direction==="down"){
			console.log (this.pos);
			//this.pos[block][pixel]["y"]+=rateOfChange;
		} else if (direction==="right"){
			this.pos[block][pixel]["x"]+=rateOfChange;
		}
	}
}

function whichBlock(){

	
}

