function GameManager(size, InputManager, Actuator, ScoreManager) {
  this.size         = size; // Size of the grid
  this.inputManager = new InputManager;
  this.scoreManager = new ScoreManager;
  this.actuator     = new Actuator;

  this.startTiles   = 2;
  //alert('乖乖，我爱你，嘿嘿')
  this.inputManager.on("move", this.move.bind(this));
  this.inputManager.on("restart", this.restart.bind(this));
  this.inputManager.on("keepPlaying", this.keepPlaying.bind(this));

  this.setup();
}

// Restart the game
GameManager.prototype.restart = function () {
  this.actuator.continue();
  this.setup();
};

// Keep playing after winning
GameManager.prototype.keepPlaying = function () {
  this.keepPlaying = true;
  this.actuator.continue();
};

GameManager.prototype.isGameTerminated = function () {
  if (this.over || (this.won && !this.keepPlaying)) {
    return true;
  } else {
    return false;
  }
};

// Set up the game
GameManager.prototype.setup = function () {
  this.grid        = new Grid(this.size);
  this.score       = 0;
  this.over        = false;
  this.won         = false;
  this.keepPlaying = false;

  // Add the initial tiles
  this.addStartTiles();

  // Update the actuator
  this.actuate();
};

// Set up the initial tiles to start the game with
GameManager.prototype.addStartTiles = function () {
  for (var i = 0; i < this.startTiles; i++) {
    this.addRandomTile();
  }
};

// Adds a tile in a random position
GameManager.prototype.addRandomTile = function () {
  if (this.grid.cellsAvailable()) {
    var value = Math.random() < 0.9 ? 2 :4;
    var tile = new Tile(this.grid.randomAvailableCell(), value);

    this.grid.insertTile(tile);
  }
};

// Sends the updated grid to the actuator
GameManager.prototype.actuate = function () {
  if (this.scoreManager.get() < this.score) {
    this.scoreManager.set(this.score);
  }

  this.actuator.actuate(this.grid, {
    score:      this.score,
    over:       this.over,
    won:        this.won,
    bestScore:  this.scoreManager.get(),
    terminated: this.isGameTerminated()
  });

};

// Save all tile positions and remove merger info
GameManager.prototype.prepareTiles = function () {
  this.grid.eachCell(function (x, y, tile) {
    if (tile) {
      tile.mergedFrom = null;
      tile.savePosition();
    }
  });
};

// Move a tile and its representation
GameManager.prototype.moveTile = function (tile, cell) {
  this.grid.cells[tile.x][tile.y] = null;
  this.grid.cells[cell.x][cell.y] = tile;
  tile.updatePosition(cell);
};

// Move tiles on the grid in the specified direction
GameManager.prototype.move = function (direction) {
  // 0: up, 1: right, 2:down, 3: left
  var self = this;

  if (this.isGameTerminated()) return; // Don't do anything if the game's over

  var cell, tile;

  var vector     = this.getVector(direction);
  var traversals = this.buildTraversals(vector);
  var moved      = false;

  // Save the current tile positions and remove merger information
  this.prepareTiles();

  // Traverse the grid in the right direction and move tiles
  traversals.x.forEach(function (x) {
    traversals.y.forEach(function (y) {
      cell = { x: x, y: y };
      tile = self.grid.cellContent(cell);

      if (tile) {
        var positions = self.findFarthestPosition(cell, vector);
        var next      = self.grid.cellContent(positions.next);
        var a=0,b=0;
        // Only one merger per row traversal?
        if (next&&(next.value == '李树'||next.value == '朱焱伟'||next.value == '王志峰'||next.value == '陈玺'||next.value == '李勇奇')){
          a=2;} 
        else if (next&&(next.value == '张会'||next.value == '王鹤霖')){
          a=4;} 
        else if (next&&(next.value == '孙旭'||next.value == '王继民'||next.value == '韩新承'||next.value == '宁静')){
          a=8;} 
        else if (next&&(next.value == '王香伟'||next.value == '杜明晓'||next.value == '熊峰')){
          a=16;} 
        else if (next&&(next.value == '高硕'||next.value == '王韩彬'||next.value == '马嘶鸣'||next.value == '陈仲洋')){
          a=32;} 
        else if (next&&(next.value == '宗文豪')){
          a=64;} 
        else if (next&&(next.value == '王悦'||next.value == '尹小川')){
          a=128;}
        else if (next&&(next.value == '孙妍')){
          a=256;} 
        else if (next&&(next.value == '刘师姐'||next.value == '马老师')){
          a=512;}
        else if (next&&(next.value == '陈老师')){
          a=1024;}

        if (tile.value == '李树'||tile.value == '朱焱伟'||tile.value == '王志峰'||tile.value == '陈玺'||tile.value == '李勇奇'){
          b=2;} 
        else if (tile&&(tile.value == '张会'||tile.value == '王鹤霖')){
          b=4;} 
        else if (tile&&(tile.value == '孙旭'||tile.value == '王继民'||tile.value == '韩新承'||tile.value == '宁静')){
          b=8;} 
        else if (tile&&(tile.value == '王香伟'||tile.value == '杜明晓'||tile.value == '熊峰')){
          b=16;} 
        else if (tile&&(tile.value == '高硕'||tile.value == '王韩彬'||tile.value == '马嘶鸣'||tile.value == '陈仲洋')){
          b=32;} 
        else if (tile&&(tile.value == '宗文豪')){
          b=64;} 
        else if (tile&&(tile.value == '王悦'||tile.value == '尹小川')){
          b=128;}
        else if (tile&&(tile.value == '孙妍')){
          b=256;} 
        else if (tile&&(tile.value == '刘师姐'||tile.value == '马老师')){
          b=512;}
        else if (tile&&(tile.value == '陈老师')){
          b=1024;}
        else{b=tile.value};
        if((next&&tile.value == '王香伟'&&next.value == '张会')||(next&&next.value == '王香伟'&&tile.value == '张会')) 
        {
          a=64;b=64;
        } 
        if (next && a===b && !next.mergedFrom) {
          var merged = new Tile(positions.next, a * 2);
          merged.mergedFrom = [tile, next];

          self.grid.insertTile(merged);
          self.grid.removeTile(tile);

          // Converge the two tiles' positions
          tile.updatePosition(positions.next);

          // Update the score
          self.score += a*2;

          // The mighty 2048 tile
          //alert(merged.value);
          if (merged.value=='陈老师') self.won = true;
        } else {
          self.moveTile(tile, positions.farthest);
        }
        if (!self.positionsEqual(cell, tile)) {
          moved = true; // The tile moved from its original cell!
        }
      }
    });
  });

  if (moved) {
    this.addRandomTile();

    if (!this.movesAvailable()) {
      this.over = true; // Game over!
    }

    this.actuate();
  }
};

// Get the vector representing the chosen direction
GameManager.prototype.getVector = function (direction) {
  // Vectors representing tile movement
  var map = {
    0: { x: 0,  y: -1 }, // up
    1: { x: 1,  y: 0 },  // right
    2: { x: 0,  y: 1 },  // down
    3: { x: -1, y: 0 }   // left
  };

  return map[direction];
};

// Build a list of positions to traverse in the right order
GameManager.prototype.buildTraversals = function (vector) {
  var traversals = { x: [], y: [] };

  for (var pos = 0; pos < this.size; pos++) {
    traversals.x.push(pos);
    traversals.y.push(pos);
  }

  // Always traverse from the farthest cell in the chosen direction
  if (vector.x === 1) traversals.x = traversals.x.reverse();
  if (vector.y === 1) traversals.y = traversals.y.reverse();

  return traversals;
};

GameManager.prototype.findFarthestPosition = function (cell, vector) {
  var previous;

  // Progress towards the vector direction until an obstacle is found
  do {
    previous = cell;
    cell     = { x: previous.x + vector.x, y: previous.y + vector.y };
  } while (this.grid.withinBounds(cell) &&
           this.grid.cellAvailable(cell));

  return {
    farthest: previous,
    next: cell // Used to check if a merge is required
  };
};

GameManager.prototype.movesAvailable = function () {
  return this.grid.cellsAvailable() || this.tileMatchesAvailable();
};

// Check for available matches between tiles (more expensive check)
GameManager.prototype.tileMatchesAvailable = function () {
  var self = this;

  var tile;

  for (var x = 0; x < this.size; x++) {
    for (var y = 0; y < this.size; y++) {
      tile = this.grid.cellContent({ x: x, y: y });

      if (tile) {
        for (var direction = 0; direction < 4; direction++) {
          var vector = self.getVector(direction);
          var cell   = { x: x + vector.x, y: y + vector.y };

          var other  = self.grid.cellContent(cell);

          if (other && other.value === tile.value) {
            return true; // These two tiles can be merged
          }
        }
      }
    }
  }

  return false;
};

GameManager.prototype.positionsEqual = function (first, second) {
  return first.x === second.x && first.y === second.y;
};