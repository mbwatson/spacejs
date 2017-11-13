class Ship {
	constructor(x, y) {
		this.x = x;
		this.y = y;
		this.dx = 0;
		this.dy = 0;
		this.ddx = 0;
		this.ddy = 0;
		this.angle = -PI/2;
		this.thrustAcceleration = 0.002;
		this.fireAcceleration = 0.0015;
		this.lastShot = 0;
		this.shotDelay = 200; // in milliseconds
		this.bullets = new Bullets();
		this.exhaust = new Exhaust();
	}
	shipShape() {

	}
	update() {
		if (keyIsDown(LEFT_ARROW)) {
			this.angle -= 0.1;
		}
		if (keyIsDown(RIGHT_ARROW)) {
			this.angle += 0.1;
		}
		if (keyIsDown(UP_ARROW)) {
			this.thrust();
		} else {
			this.ddx = 0;
			this.ddy = 0;
		}
		if (keyIsDown(32)) { // Spacebar
			this.ddx += -this.fireAcceleration * cos(this.angle);
			this.ddy += -this.fireAcceleration * sin(this.angle);
			if (this.millisSinceLastShot() > this.shotDelay) {
				this.bullets.push(new Bullet(this.x + 10*cos(this.angle), this.y + 10*sin(this.angle), this.angle));
				this.lastShot = millis();
			}
		}
		this.dx += this.ddx;
		this.dy += this.ddy;
		this.x += this.dx + 0.5*this.ddx;
		this.y += this.dy + 0.5*this.ddy;
		this.bullets.update();
		this.exhaust.update();
	}
	draw() {
		stroke(255);
		fill(255);
		strokeWeight(1);
		beginShape();
		vertex(this.x + 15*cos(this.angle), this.y + 15*sin(this.angle));
		vertex(this.x + 5*cos(this.angle - PI/2), this.y + 5*sin(this.angle - PI/2));
		vertex(this.x + 5*cos(this.angle + PI/2), this.y + 5*sin(this.angle + PI/2));
		endShape(CLOSE);
		this.bullets.draw();
		this.exhaust.draw();
	}
	speed() {
		return(sqrt(this.dx**2 + this.dy**2));
	}
	millisSinceLastShot() {
		return(millis() - this.lastShot);
	}
	thrust() {
		this.ddx += this.thrustAcceleration * cos(this.angle);
		this.ddy += this.thrustAcceleration * sin(this.angle);
		this.exhaust.particles.push({
			'x': this.x - 5*cos(this.angle),
			'y': this.y - 5*sin(this.angle),
			'dx': cos(this.angle),
			'dy': sin(this.angle),
			'r': 10,
			'alpha': 255
		});
	}
}

