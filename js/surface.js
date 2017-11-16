class Surface {
	constructor(x1, y1, x2, y2) {
		this.top = y1;
		this.bottom = y2;
		this.left = x1;
		this.right = x2;
		this.bgColor = color(0, 0, 10)
		this.borderColor = color(0, 0, 0);
	}

	decorate() {
		background(this.bgColor);
	}
}

class Torus extends Surface {
	constructor(x1, y1, x2, y2) {
		super(x1, y1, x2, y2);
	}
	topEdge(object) {
		object.y = MAXY; 
		return(object);
	}
	bottomEdge(object) {
		object.y = MINY; 
		return(object);
	}
	leftEdge(object) {
		object.x = MAXX;
		return(object);
	}
	rightEdge(object) {
		object.x = MINX; 
		return(object);
	}
	draw(x, y, s = 80) {
		noStroke();
		textAlign(CENTER);
		rectMode(CENTER);
		text("Torus", x, y - s/2 - 10);
		noFill();
		stroke(127);
		rect(x, y, s, s);
		arrow(x-s/2, y, 'up');
		arrow(x+s/2, y, 'up');
		arrow(x-4, y-s/2, 'right');
		arrow(x+4, y-s/2, 'right');
		arrow(x-4, y+s/2, 'right');
		arrow(x+4, y+s/2, 'right');
	}
}

class KleinBottle extends Surface {
	constructor(x1, y1, x2, y2) {
		super(x1, y1, x2, y2);
	}
	topEdge(object) {
		object.x = MAXX - object.x;
		object.y = MAXY;
		object.dx *= -1;
		object.angle = PI - object.angle;
		return(object);
	}
	bottomEdge(object) {
		object.x = MAXX - object.x;
		object.y = MINY;
		object.dx *= -1;
		object.angle = PI - object.angle;
		return(object);
	}
	leftEdge(object) {
		object.x = MAXX;
		return(object);
	}
	rightEdge(object) {
		object.x = MINX; 
		return(object);
	}
	draw(x, y, s = 80) {
		noStroke();
		textAlign(CENTER);
		rectMode(CENTER);
		text("Klein Bottle", x, y - s/2 - 10);
		noFill();
		stroke(127);
		rect(x, y, s, s);
		arrow(x-s/2, y, 'up');
		arrow(x+s/2, y, 'up');
		arrow(x-4, y-s/2, 'right');
		arrow(x+4, y-s/2, 'right');
		arrow(x-4, y+s/2, 'left');
		arrow(x+4, y+s/2, 'left');
	}
}

class ProjectivePlane extends Surface {
	constructor(x1, y1, x2, y2) {
		super(x1, y1, x2, y2);
	}
	topEdge(object) {
		object.x = MAXX - object.x;
		object.y = MAXY;
		object.dx *= -1;
		object.angle = PI - object.angle;
		return(object);
	}
	bottomEdge(object) {
		object.x = MAXX - object.x;
		object.y = MINY;
		object.dx *= -1;
		object.angle = PI - object.angle;
		return(object);
	}
	leftEdge(object) {
		object.x = MAXX;
		object.y = MAXY - object.y;
		object.dy *= -1;
		object.angle = -object.angle;
		return(object);
	}
	rightEdge(object) {
		object.x = MINX;
		object.y = MAXY - object.y;
		object.dy *= -1;
		object.angle = -object.angle;
		return(object);
	}
	draw(x, y, s = 80) {
		noStroke();
		textAlign(CENTER);
		rectMode(CENTER);
		text("Projective Plane", x, y - s/2 - 10);
		noFill();
		stroke(127);
		rect(x, y, s, s);
		arrow(x-s/2, y, 'up');
		arrow(x+s/2, y, 'down');
		arrow(x-4, y-s/2, 'right');
		arrow(x+4, y-s/2, 'right');
		arrow(x-4, y+s/2, 'left');
		arrow(x+4, y+s/2, 'left');
	}
}

function arrow(a, b, dir) {
	let h = 8;
	let w = 8;
	let vertices = [];
	switch(dir) {
		case "up":
			vertices.push({ 'x': a, 'y': b - h/2 })
			vertices.push({ 'x': a + w/2, 'y': b + h/2 })
			vertices.push({ 'x': a - w/2, 'y': b + h/2 })
			break;
		case "down":
			vertices.push({ 'x': a, 'y': b + h/2 })
			vertices.push({ 'x': a + w/2, 'y': b - h/2 })
			vertices.push({ 'x': a - w/2, 'y': b - h/2 })
			break;
		case "left":
			vertices.push({ 'x': a - h/2, 'y': b })
			vertices.push({ 'x': a + h/2, 'y': b - w/2 })
			vertices.push({ 'x': a + h/2, 'y': b + w/2 })
			break;
		case "right":
			vertices.push({ 'x': a + h/2, 'y': b })
			vertices.push({ 'x': a - h/2, 'y': b - w/2 })
			vertices.push({ 'x': a - h/2, 'y': b + w/2 })
			break;
		default:
			break;
	}

	fill(127);
	beginShape();
	for (let i = 0; i < vertices.length; i++) {
		vertex(vertices[i].x, vertices[i].y);
	}
	endShape();
}
