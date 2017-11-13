class Exhaust {
	constructor() {
		this.particles = [];
	}
	update() {
		for (let i = this.particles.length-1; i >= 0; i--) {
			if (this.particles[i].alpha > 0) {
				this.particles[i].x -= this.particles[i].dx;
				this.particles[i].y -= this.particles[i].dy;
				this.particles[i].alpha -= 10;
				this.particles[i].r -= 0.5;
			} else {
				this.particles.splice(i, 1);
			}
		}
	}
	draw() {
		noStroke();
		for (let i = 0; i < this.particles.length; i++) {
			fill(color(255, this.particles[i].alpha, 0, this.particles[i].alpha));
			ellipse(this.particles[i].x, this.particles[i].y, this.particles[i].r, this.particles[i].r);
		}
	}
}