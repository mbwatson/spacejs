class Ship {
	constructor(x, y) {
		this.x = x;
		this.y = y;
		this.dx = 0;
		this.dy = 0;
		this.ddx = 0;
		this.ddy = 0;
		this.angle = -PI/2;
		this.dangle = 0.075;
		this.thrustAcceleration = 0.0010;
		this.fireAcceleration = 0.0009;
		this.lastShot = 0;
		this.shotDelay = 150; // in milliseconds
		this.bullets = new Bullets();
		this.exhaust = new Exhaust();
	}
	speed() {
		return(sqrt(this.dx**2 + this.dy**2));
	}
	update() {
		if (keyIsDown(LEFT_ARROW)) {
			this.angle -= this.dangle;
		}
		if (keyIsDown(RIGHT_ARROW)) {
			this.angle += this.dangle;
		}
		if (keyIsDown(32)) { // Spacebar
			this.shoot();
		}
		if (keyIsDown(UP_ARROW)) {
			this.thrust();
		} else {
			this.ddx = 0;
			this.ddy = 0;
		}
		this.dx += this.ddx;
		this.dy += this.ddy;
		this.x += this.dx + 0.5*this.ddx;
		this.y += this.dy + 0.5*this.ddy;
		this.bullets.update();
		this.exhaust.update();
		this.angle %= 2*PI;
	}
	draw() {
		stroke(255);
		fill(255);
		strokeWeight(1);
		beginShape();
		vertex(this.x + 20*cos(this.angle), this.y + 20*sin(this.angle));
		vertex(this.x + 8*cos(this.angle - PI/2), this.y + 8*sin(this.angle - PI/2));
		vertex(this.x + 3*cos(this.angle), this.y + 3*sin(this.angle));
		vertex(this.x + 8*cos(this.angle + PI/2), this.y + 8*sin(this.angle + PI/2));
		endShape();
		this.bullets.draw();
		this.exhaust.draw();
	}
	offTopEdge() { return(this.y + this.dy <= MINY && this.dy < 0); }
	offBottomEdge() { return(this.y + this.dy >= MAXY && this.dy > 0); }
	offLeftEdge() { return(this.x + this.dx <= MINX && this.dx < 0); }
	offRightEdge() { return(this.x + this.dx >= MAXX && this.dx > 0); }
	speed() {
		return(sqrt(this.dx**2 + this.dy**2));
	}
	millisSinceLastShot() {
		return(millis() - this.lastShot);
	}
	thrust() {
		this.ddx += this.thrustAcceleration * cos(this.angle);
		this.ddy += this.thrustAcceleration * sin(this.angle);
		this.exhaust.push({
			'x': this.x - 5*cos(this.angle),
			'y': this.y - 5*sin(this.angle),
			'dx': cos(this.angle),
			'dy': sin(this.angle),
			'r': 10,
			'alpha': 255
		});
	}
	shoot() {
		this.ddx += -this.fireAcceleration * cos(this.angle);
		this.ddy += -this.fireAcceleration * sin(this.angle);
		if (this.millisSinceLastShot() > this.shotDelay) {
			this.bullets.push(new Bullet(this.x + 12*cos(this.angle), this.y + 12*sin(this.angle), this.speed(), this.angle));
			this.lastShot = millis();
		}
	}
}

