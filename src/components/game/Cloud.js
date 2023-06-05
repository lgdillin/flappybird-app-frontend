
  // Cloud
  function Cloud() {
    this.x_pos = 575;
    this.y_pos = 0;
    this.random = 0;
    try {
      if(cloud_image === null) {
        cloud_image = new Image();
        cloud_image.src = "cloud.png";
      }
    } catch (e) {
      e.printStackTrace(System.err);
    }
  }

  // Return false because a "Cloud" isn't a "Tube"
  Cloud.prototype.isTube = function () { return false; };

  // Return x_pos or y_pos
  Cloud.prototype.xPos = function() { return x_pos; };
  Cloud.prototype.yPos = function() { return y_pos; };

  Cloud.prototype.update = function () {
    x_pos = x_pos - 2;

    if(x_pos < -501) {
      x_pos = 501;
      y_pos = randomint + 50; // FIx
    }
  };
