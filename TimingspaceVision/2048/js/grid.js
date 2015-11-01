function Grid(size) {
  this.size = size;

  this.cells = [];

  this.build();
}

// Build a grid of the specified size
Grid.prototype.build = function () {
  for (var x = 0; x < this.size; x++) {
    var row = this.cells[x] = [];

    for (var y = 0; y < this.size; y++) {
      row.push(null);
    }
  }
};

// Find the first available random position
Grid.prototype.randomAvailableCell = function () {
  var cells = this.availableCells();

  if (cells.length) {
    return cells[Math.floor(Math.random() * cells.length)];
  }
};

Grid.prototype.availableCells = function () {
  var cells = [];

  this.eachCell(function (x, y, tile) {
    if (!tile) {
      cells.push({ x: x, y: y });
    }
  });

  return cells;
};

// Call callback for every cell
Grid.prototype.eachCell = function (callback) {
  for (var x = 0; x < this.size; x++) {
    for (var y = 0; y < this.size; y++) {
      callback(x, y, this.cells[x][y]);
    }
  }
};

// Check if there are any cells available
Grid.prototype.cellsAvailable = function () {
  return !!this.availableCells().length;
};

// Check if the specified cell is taken
Grid.prototype.cellAvailable = function (cell) {
  return !this.cellOccupied(cell);
};

Grid.prototype.cellOccupied = function (cell) {
  return !!this.cellContent(cell);
};

Grid.prototype.cellContent = function (cell) {
  if (this.withinBounds(cell)) {
    return this.cells[cell.x][cell.y];
  } else {
    return null;
  }
};

// Inserts a tile at its position
Grid.prototype.insertTile = function (tile) {
  this.cells[tile.x][tile.y] = tile;
  if(this.cells[tile.x][tile.y].value==2)
  {
    a=Math.random() ;
    this.cells[tile.x][tile.y].value=a < 0.2 ? '李树' :a<0.4?'朱焱伟':a<0.6?'王志峰':a<0.8?'陈玺':'李勇奇';
    //this.cells[tile.x][tile.y].value='dd';
  }
  else if(this.cells[tile.x][tile.y].value==4)
  {
    a=Math.random() ;
    this.cells[tile.x][tile.y].value=a < 0.5 ? '张会' :'王鹤霖';
    //this.cells[tile.x][tile.y].value='dd';
  }
  else if(this.cells[tile.x][tile.y].value==8)
  {
    a=Math.random() ;
    this.cells[tile.x][tile.y].value=a < 0.25 ? '王继民' :a<0.5?'孙旭':a<0.75?'韩新承':'宁静';
    //this.cells[tile.x][tile.y].value='dd';
  }
  else if(this.cells[tile.x][tile.y].value==16)
  {
    a=Math.random() ;
    this.cells[tile.x][tile.y].value=a < 0.25 ? '王香伟' :a<0.5?'杜明晓':'熊峰';
    //this.cells[tile.x][tile.y].value='dd';
  }
  else if(this.cells[tile.x][tile.y].value==32)
  {
    a=Math.random() ;
    this.cells[tile.x][tile.y].value=a < 0.25 ? '高硕' :a<0.5?'王韩彬':a<0.75?'马嘶鸣':'陈仲洋';
    //this.cells[tile.x][tile.y].value='dd';
  }
  else if(this.cells[tile.x][tile.y].value==64)
  {
    a=Math.random() ;
    this.cells[tile.x][tile.y].value='宗文豪';
    //this.cells[tile.x][tile.y].value='dd';
  }
  else if(this.cells[tile.x][tile.y].value==128)
  {
    a=Math.random() ;
    this.cells[tile.x][tile.y].value=a<0.5?'王悦':'尹小川';
    //this.cells[tile.x][tile.y].value='dd';
  }
  else if(this.cells[tile.x][tile.y].value==256)
  {
    a=Math.random() ;
    this.cells[tile.x][tile.y].value='孙妍';
    //this.cells[tile.x][tile.y].value='dd';
  }
  else if(this.cells[tile.x][tile.y].value==512)
  {
    a=Math.random() ;
    this.cells[tile.x][tile.y].value=a<0.5?'刘师姐':'马老师';
    //this.cells[tile.x][tile.y].value='dd';
  }
  else if(this.cells[tile.x][tile.y].value==1024)
  {
    a=Math.random() ;
    this.cells[tile.x][tile.y].value='陈老师';
    //this.cells[tile.x][tile.y].value='dd';
  }

};

Grid.prototype.removeTile = function (tile) {
  this.cells[tile.x][tile.y] = null;
};

Grid.prototype.withinBounds = function (position) {
  return position.x >= 0 && position.x < this.size &&
         position.y >= 0 && position.y < this.size;
};