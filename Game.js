function Game (sizeOfX, sizeOfY){
	this.left=false;
	this.pos = new Array(new Array());
	this.right=false;
	this.sizeOfX = sizeOfX;
	this.sizeOfY = sizeOfY;

	this.eraseScreen = eraseScreen;
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
			}
			screen = screen + "'></div>";
		}
		screen = screen + "</div>";
	}	
	return screen;
}

function run(){
	if (this.left && !this.right){
		this.blocks.left();
	} else 	if (!this.left && this.right){
		this.blocks.right();
	}
	if (!this.blocks.fall()){
		this.blocks.spawn();
	}
	this.eraseScreen();
	this.loadBlocks();

	$("#gameScreen").html(this.show());
}

function eraseScreen(){
	for (x=0;x<this.sizeOfX;x++){	
		for (y=0;y<this.sizeOfY;y++){
			this.pos[x][y]=0;
		}
	}
}
function loadBlocks(){
	for (block=0;block<this.blocks.pos.length;block++){
		for(pixel=0;pixel<this.blocks.pos[block].length;pixel++){
			this.pos[this.blocks.pos[block][pixel]["x"]][this.blocks.pos[block][pixel]["y"]]=1;
		}
	}	
}