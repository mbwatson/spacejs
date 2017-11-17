class Exhaust extends Array {
	update() {
		for (let i = this.length-1; i >= 0; i--) {
			if (this[i].alpha > 0) {
				this[i].x -= this[i].dx + random(-1,1) / 2;
				this[i].y -= this[i].dy + random(-1,1) / 2;
				this[i].alpha -= 20*random();
				this[i].r -= random();
			} else {
				this.splice(i, 1);
			}
		}
	}
	draw() {
		noStroke();
		for (var particle of this) {
			fill(color(255, particle.alpha, 0, particle.alpha));
			ellipse(particle.x, particle.y, particle.r, particle.r);
		}
	}
}

class Particle {
	constructor(x, y, angle) {
		this.x = x - 2*cos(angle);
		this.y = y - 2*sin(angle);
		this.dx = cos(angle);
		this.dy = sin(angle);
		this.r = 10;
		this.alpha = 255;
	}
}