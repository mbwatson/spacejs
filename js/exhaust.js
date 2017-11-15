class Exhaust {
	constructor() {
		this.particles = [];
	}
	update() {
		for (let i = this.particles.length-1; i >= 0; i--) {
			if (this.particles[i].alpha > 0) {
				this.particles[i].x -= this.particles[i].dx + random();
				this.particles[i].y -= this.particles[i].dy + random();
				this.particles[i].alpha -= 20*random();
				this.particles[i].r -= random();
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