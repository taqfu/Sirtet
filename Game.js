//unrelated blocks are being deleted.

function Game (sizeOfX, sizeOfY){
	this.down=false;
	this.fallRate = 1;
	this.left=false;
	this.pos = new Array(new Array());
	this.right=false;
	this.sizeOfX = sizeOfX;
	this.sizeOfY = sizeOfY;

	this.checkLines = checkLines;
	this.checkPosition = checkPosition;

	this.erasePlayer = erasePlayer;
	this.eraseWorld = eraseWorld;
	this.fall = fall;
	this.loadBlocks = loadBlocks;
	this.moveDirection = moveDirection;
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
	//console.log(location, direction, units);
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

	//console.log(direction, leftOrRight, upOrDown);
	if (!leftOrRight && upOrDown){
		//console.log("X");
		x=location["x"];
		y=upOrDown;
	} else if (!upOrDown && leftOrRight){
		//console.log("Y");
		x=leftOrRight;
		y=location["y"];
	} else if (leftOrRight && upOrDown){
		console.log("BOTH");
		x=leftOrRight;
		y=upOrDown;
	}
//	console.log(location["x"], location["y"], direction, x,y);
	return this.pos[x][y];
}
function eraseWorld(){
	for (x=0;x<this.sizeOfX;x++){
		for (y=0;y<this.sizeOfY;y++){
			this.pos[x][y]=0;
		}
	}
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

function moveDirection(location, direction, units){
	leftOrRight=false;
	upOrDown=false;
	if (direction===0){
		return location;
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

	//console.log(direction, leftOrRight, upOrDown);
	if (!leftOrRight && upOrDown){
		//console.log("X");
		x=location["x"];
		y=upOrDown;
	} else if (!upOrDown && leftOrRight){
		//console.log("Y");
		x=leftOrRight;
		y=location["y"];
	} else if (leftOrRight && upOrDown){
		console.log("BOTH");
		x=leftOrRight;
		y=upOrDown;
	}
//	console.log(location["x"], location["y"], direction, x,y);
	return {x:x, y:y};
}

function run(){
	this.erasePlayer();
	if (this.right){
		this.moveRight();
	} else if (this.left){
		this.moveLeft();
	}

	if (!this.fall(this.down)){
		this.blocks.check();
		this.tetrimos();
		this.eraseWorld();

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
			} else if (this.pos[x][y]==3){
				screen = screen + " green"
			} else if (this.pos[x][y]==4){
				screen = screen + " yellow"
			} else if (this.pos[x][y]==5){
				screen = screen + " grey"
			} else if (this.pos[x][y]==6){
				screen = screen + " orange"
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
	var blockColor=this.blocks.color[player];
	blockX=this.blocks.pos[player][0]["x"];
	blockY=this.blocks.pos[player][0]["y"];
	var horizontalLine = this.checkLines("horizontal", this.blocks.pos[player][0], blockColor);
	var verticalLines = new Array();
  for (horizontalTile in horizontalLine["tiles"]){
    verticalLines.push(this.checkLines("vertical", horizontalLine["tiles"][horizontalTile], blockColor));
  }

  if (horizontalLine["distance"] === 1){
	    if (verticalLines[0]["distance"]===2 && verticalLines[0]["end"]==="up"){
  	      bottomHorizontalLine = this.checkLines("horizontal", verticalLines[0]["tiles"][1], blockColor);
  	      if (bottomHorizontalLine["distance"]===2){
              verticalLine = this.checkLines("vertical", bottomHorizontalLine["tiles"][1], blockColor);
              //unfinished
  	      } else if (bottomHorizontalLine["center"] && bottomHorizontalLine["distance"]===3){
            this.blocks.delete(this.blocks.which(horizontalLine["tiles"][0]));
            for(tile=0;tile<bottomHorizontalLine["tiles"].length;tile++){
                this.blocks.delete(this.blocks.which(bottomHorizontalLine["tiles"][tile]));
            }
  	        console.log("middle triple tetrimo DELETED");
  	      } else if (bottomHorizontalLine["end"] && bottomHorizontalLine["distance"]===3){
            this.blocks.delete(this.blocks.which(horizontalLine["tiles"][0]));
            for(tile=0;tile<bottomHorizontalLine["tiles"].length;tile++){
                this.blocks.delete(this.blocks.which(bottomHorizontalLine["tiles"][tile]));
            }
  	        console.log("l tetrimo DELETED");
  	      }
		  } else if (verticalLines[0]["distance"]===3  && verticalLines[0]["end"]==="up"){
    			bottomHorizontalLine = this.checkLines("horizontal", verticalLines[0]["tiles"][2], blockColor);
    	    if (bottomHorizontalLine["distance"]==2){
              for(tile=0;tile<verticalLines[0]["tiles"].length;tile++){
                  this.blocks.delete(this.blocks.which(verticalLines[0]["tiles"][tile]));
              }
              for(tile=0;tile<bottomHorizontalLine["tiles"].length;tile++){
                  this.blocks.delete(this.blocks.which(bottomHorizontalLine["tiles"][tile]));
              }
      				console.log("standing L");
    			}
	    } else if (verticalLines[0]["distance"]==4){
          for(tile=0;tile<verticalLines[0]["tiles"].length;tile++){
              this.blocks.delete(this.blocks.which(verticalLines[0]["tiles"][tile]));
          }
		  console.log("STANDING UP I DELETED");
	    }
    } else if (horizontalLine["distance"] === 2){
        //There's an issue where one of the STANDING L's facing rigth when placed against the farthest left wall aren't registering.
    		if (verticalLines[0]["distance"]===1 && verticalLines[1]["distance"]==3 && verticalLines[1]["end"]){
            this.blocks.delete(this.blocks.which(verticalLines[0]["tiles"][0]));
            for(tile=0;tile<verticalLines[1]["tiles"].length;tile++){
                this.blocks.delete(this.blocks.which(verticalLines[1]["tiles"][tile]));
            }
            console.log("STANDING L 0 DELETED?");
        } else if (verticalLines[1]["distance"]===1 && verticalLines[0]["distance"]==3 && verticalLines[0]["end"]){
            this.blocks.delete(this.blocks.which(verticalLines[1]["tiles"][0]));
            for(tile=0;tile<verticalLines[0]["tiles"].length;tile++){
                this.blocks.delete(this.blocks.which(verticalLines[0]["tiles"][tile]));
            }
      			console.log("STANDING L 1 DELETED?");
    		} else if (verticalLines[0]["distance"]==2 && verticalLines[1]["distance"]==2){
    			for (lineNum=0;lineNum<2;lineNum++){
    				for(tile=0;tile<verticalLines[lineNum]["tiles"].length;tile++){
    					this.blocks.delete(this.blocks.which(verticalLines[lineNum]["tiles"][tile]));
    				}
    			}
    			console.log("SQUARE DELETED");
    		} else if ((verticalLines[0]["distance"]===1 && verticalLines[1]["distance"]===2)
    				|| (verticalLines[1]["distance"]===1 && verticalLines[0]["distance"]===2)){
          console.log( horizontalLine["STANDING Z"]);
          otherVerticalLine = this.checkLines("vertical", horizontalLine["tiles"][1], blockColor);
          console.log("d:2 v:2 then other", otherVerticalLine["distance"]);
    	  } else if ((verticalLines[0]["distance"]===1 && verticalLines[1]["distance"]>2 && verticalLines[1]["center"])
    			  || (verticalLines[1]["distance"]===1 && verticalLines[0]["distance"]>2 && verticalLines[0]["center"])){
              //Don't think this actually works.
    	  		console.log("MIDDLE TRIPLE TETRIMO");
    		}

	} else if (horizontalLine["distance"] === 3){
    for (horizontalTile in horizontalLine["tiles"]){
      var horizontalPos = this.checkLines("horizontal", horizontalLine["tiles"][horizontalTile], blockColor);
      var verticalLine = this.checkLines("vertical", horizontalLine["tiles"][horizontalTile], blockColor);
      if (horizontalPos["center"]){
        if (verticalLine["distance"]==2){
          for(tile=0;tile<verticalLine["tiles"].length;tile++){
            this.blocks.delete(this.blocks.which(verticalLine["tiles"][tile]));
          }
          for(tile=0;tile<horizontalLine["tiles"].length;tile++){
            this.blocks.delete(this.blocks.which(horizontalLine["tiles"][tile]));
          }
          console.log("MIDDLE TRIPLE TETRIMO");
        }
      } else if (horizontalPos["end"]){
        //Not sure if this is possible.
        if (verticalLine["distance"]===2){
          for(tile=0;tile<verticalLine["tiles"].length;tile++){
            this.blocks.delete(this.blocks.which(verticalLine["tiles"][tile]));
          }
          for(tile=0;tile<horizontalLine["tiles"].length;tile++){
            this.blocks.delete(this.blocks.which(horizontalLine["tiles"][tile]));
          }
          console.log("L TETRIMO DELETED. (Not possible)");
        }
      }
    }
	} else if (horizontalLine["distance"] === 4){
  		for(tile=0;tile<horizontalLine["tiles"].length;tile++){
  			this.blocks.delete(this.blocks.which(horizontalLine["tiles"][tile]));
  		}

  		console.log("LAID DOWN I DELETED");
	} else if (horizontalLine["distance"] > 4){

	}
}

function checkLines(axis, location, color){

	var directionCaptions = new Array();
	if (axis === "horizontal"){
		directionCaptions[0] = "left";
		directionCaptions[1] = "right";
	} else if (axis === "vertical"){
		directionCaptions[0] = "up";
		directionCaptions[1] = "down";
	}
	var directionNumbers = [2, 2];
	var tiles = [location];

	for (direction in directionNumbers){
		while (this.checkPosition(location, directionCaptions[direction], directionNumbers[direction])===color){
			tiles.push (this.moveDirection(location, directionCaptions[direction], directionNumbers[direction]));
			directionNumbers[direction]+=2;
		}
		directionNumbers[direction] = (directionNumbers[direction] / 2 ) - 1;
	}
	var distance = directionNumbers[0] + directionNumbers[1] + 1;
	var end = false;
	if (directionNumbers[0]!==0 && directionNumbers[1]===0 ){
		end = directionCaptions[1];
	} else 	if (directionNumbers[0]===0 && directionNumbers[1]!==0 ){
			end = directionCaptions[0];
	}
	var center = (directionNumbers[0]===directionNumbers[1] ) ;
	return {tiles:tiles, distance:distance, end:end, center:center};
}
