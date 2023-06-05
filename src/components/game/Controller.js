


function Controller(model, view) {
  this.model = model;
  this.view = view;
  let self = this;
  view.canvas.addEventListener("click", function(event) {
    self.onClick(event);
  });
  view.canvas.addEventListener("right click", function(event) {
    self.onContextMenu(event);
  });
}

Controller.prototype.onClick = function (event) {
  this.model.onClick();
};

Controller.prototype.onContextMenu = function (event) {
  this.model.sendChuck();
};
