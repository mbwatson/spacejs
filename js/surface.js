class Surface {
	constructor(x1, y1, x2, y2) {
		this.top = y1;
		this.bottom = y2;
		this.left = x1;
		this.right = x2;
		this.bgColor = color(255, 255, 255)
		this.borderColor = color(0, 0, 0);
	}

	decorate() {
		background(game.field.bgColor);
	  noFill();
	  stroke(200);
	  // line(width / 2, 0, width / 2, height);
	  dottedLine(width / 2, 0, width / 2, height, 20, 1);
	  rectMode(CORNER);
	  rect(0,0,width-1,height-1);
	}
}

class Torus extends Surface {
	constructor(x1, y1, x2, y2) {
		super(x1, y1, x2, y2);
	}
	topEdge(ship) {
		ship.y = ship.maxY; 
		return(ship);
	}
	bottomEdge(ship) {
		ship.y = ship.minY; 
		return(ship);
	}
	leftEdge(ship) {
		ship.x = ship.maxX;
		return(ship);
	}
	rightEdge(ship) {
		ship.x = ship.minX; 
		return(ship);
	}
	draw(x, y, s = 80) {
		noStroke();
		textAlign(CENTER);
		rectMode(CENTER);
		text("Torus", x, y - s/2 - 10);
		noFill();
		stroke(0);
		rect(x, y, s, s);
		arrow(x-s/2, y, 'up');
		arrow(x+s/2, y, 'up');
		arrow(x-4, y-s/2, 'right');
		arrow(x+4, y-s/2, 'right');
		arrow(x-4, y+s/2, 'right');
		arrow(x+4, y+s/2, 'right');
	}
}

class ProjectivePlane extends Surface {
	constructor(x1, y1, x2, y2) {
		super(x1, y1, x2, y2);
	}
	topEdge(ship) {
		ship.x = ship.maxX - ship.x;
		ship.y = ship.maxY;
		ship.dx *= -1;
		return(ship);
	}
	bottomEdge(ship) {
		ship.x = ship.maxX - ship.x;
		ship.y = ship.minY;
		ship.dx *= -1;
		return(ship);
	}
	leftEdge(ship) {
		ship.x = ship.maxX;
		ship.y = ship.maxY - ship.y;
		ship.dy *= -1;
		return(ship);
	}
	rightEdge(ship) {
		ship.x = ship.minX;
		ship.y = ship.maxY - ship.y;
		ship.dy *= -1;
		return(ship);
	}
	draw(x, y, s = 80) {
		noStroke();
		textAlign(CENTER);
		rectMode(CENTER);
		text("Projective Plane", x, y - s/2 - 10);
		noFill();
		stroke(0);
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

	fill(0);
	beginShape();
	for (let i = 0; i < vertices.length; i++) {
		vertex(vertices[i].x, vertices[i].y);
	}
	endShape();
}
