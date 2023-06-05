

function Model()
{
	this.tx = 0;
	this.ty = 0;
	this.dest_x = 100;
	this.dest_y = 100;
}

Model.prototype.update = function()
{
	if(this.tx < this.dest_x)
		this.tx++;
	else if(this.tx > this.dest_x)
		this.tx--;
	if(this.ty < this.dest_y)
		this.ty++;
	else if(this.ty > this.dest_y)
		this.ty--;
};

Model.prototype.setDestination = function(x, y)
{
	this.dest_x = x;
	this.dest_y = y;
};





function View(model)
{
	this.model = model;
	this.canvas = document.getElementById("myCanvas");
	this.turtle = new Image();
	this.turtle.src = "turtle.png";

}

View.prototype.update = function()
{
	let ctx = this.canvas.getContext("2d");
	ctx.clearRect(0, 0, 1000, 500);
	ctx.drawImage(this.turtle, this.model.tx, this.model.ty);
};





function Controller(model, view)
{
	this.model = model;
	this.view = view;
	let self = this;
	view.canvas.addEventListener("click", function(event) { self.onClick(event); });
}

Controller.prototype.onClick = function(event)
{
	this.model.setDestination(event.pageX - this.view.canvas.offsetLeft, event.pageY - this.view.canvas.offsetTop);
};





function Game()
{
	this.model = new Model();
	this.view = new View(this.model);
	this.controller = new Controller(this.model, this.view);
}

Game.prototype.onTimer = function()
{
	this.model.update();
	this.view.update();
};



let game = new Game();
let timer = setInterval(function() { game.onTimer(); }, 40);
