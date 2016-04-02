function Blocks (sizeOfX, sizeOfY){
	this.sizeOfX = sizeOfX;
	this.sizeOfY = sizeOfY;
	this.pos = new Array();
	
	this.fall = fall;
	this.hit = hit;
	this.left = goLeft;
	this.right = goRight;
	this.spawn = dropBlock;
	
}

function dropBlock(){	
	x= Math.floor(this.sizeOfX/2);
	y= 0;
	this.pos.push([{x:x, y:y}, {x:x, y:y-1}, {x:x+1, y:y}, {x:x+1, y:y-1}])
}
function goLeft(){	
	block=this.pos.length-1;
	
	if (this.pos[block][0]["x"]>0){
		
		for(pixel=0;pixel<4;pixel++){
			this.pos[block][pixel]["x"]--;			
		}
		return true;
	} else if (this.pos[block]["x"]==0){
		return false;
	}
}
function goRight(){		
	block=this.pos.length-1;
	if (this.pos[block][0]["x"]<this.sizeOfX-1){
		for(pixel=0;pixel<4;pixel++){
			this.pos[block][pixel]["x"]++;			
		}
		return true;
	} else if (this.pos[block]["x"]<=this.sizeOfX-1){
		return false;
	}
}
function fall(){

	block=this.pos.length-1;
	var landed = this.hit();
	if (this.pos[block][0]["y"]<this.sizeOfY-1 && !landed){
		for(pixel=0;pixel<4;pixel++){
			this.pos[block][pixel]["y"]++;
			
		}
	} else if (this.pos[block][0]["y"]>=this.sizeOfY-1 || landed){
		return false;
	}
	return true;
}

function hit(){

	if (this.pos.length<2){
		return false;
	}
	for (blockHit=0;blockHit<this.pos.length-1;blockHit++){
		for (otherPixel=0;otherPixel<4;otherPixel++){
			for (pixel=0;pixel<4;pixel++){
				if (this.pos[blockHit][otherPixel]["y"]===this.pos[this.pos.length-1][pixel]["y"]+1){
					return true;
				}
			}			
		}
	}
	return false;
}