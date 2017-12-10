/**
 *
 * THREE.Line - create a line
 * 
 * THREE.Mesh - create a surface
 * 
 */


/**
 * Drawing name space
 */

Drawing = {}


/**
 * Math
 */
Drawing.Math = {
	// set
	set: function (position, v) {
		position.x = v.x
		position.y = v.y
		position.z = v.z
	},
	
	// round number
	round: function (num) {    
	    return +(Math.round(num + "e+2")  + "e-2");
	}
}

/**
 * Vertex
 */
Drawing.Vertex = {
	// length of vector <v1, v2>
	// v1 - first vertex
	// v2 - second vertex
	lengthBetween: function (v1, v2) {
		var l = Math.sqrt(Math.pow(v2.x - v1.x, 2) + Math.pow(v2.y - v1.y, 2) + Math.pow(v2.z - v1.z, 2)) 
		return l
	},
	
	// create vertex with length 'l' from 'v1' and angle 'a' between X axis
	// v1 - vertex
	// a - angle in radians against X axis
	// l - length from v1
	withAngleBetweenX: function (v1, a, l) {
		var v2 = new THREE.Vector3( v1.x + l * Math.cos(a), v1.y + l * Math.sin(a), 0 ) // Z = 0
		return v2
	},
	
	// create vertex with length 'l' with angle 'b' to vector <v1, v2> 
	// v1 - first vertex
	// v2 - second vertex
	// l - length from v1
	// b - angle between <v1, v2> and <v2, v3> in radian
	withAngleBetweenVector: function (v1, v2, l, b) {
		var a = Drawing.Angle.betweenX(v1, v2) + b
		var v3 = this.withAngleBetweenX(v2, a, l)
		return v3
	},
	
	// create vertex with length 'l' perpendicular to vector <v1, v2> 
	// v1 - first vertex
	// v2 - second vertex
	// l - length from v1
	perpendicularToVector: function (v1, v2, l) {
		var b = Math.PI / 2
		var v3 = this.withAngleBetweenVector(v1, v2, l, b)
		return v3
	},
	
	fromVector: function (v, l) {
		var a = v.angleBetweenX()
		var v2 = this.withAngleBetweenX(v.v1, a, l)
		return v2
	}
}


/**
 * Angle
 */
Drawing.Angle = {
	// convert angle in degree to radian 
	// degree - angle in degree
	toRadian: function (degree) {
		var radian = degree * Math.PI / 180
		return radian
	},
	
	// convert angle in radian to degree 
	// radian - angle in radian
	toDegree: function (radian) {
		var degree = radian * 180 / Math.PI
		return degree
	},
	
	// angle in radian between 2 vertices and X axis
	// v1 - first vertex
	// v2 - second vertex
	betweenX: function (v1, v2) {
		var v = new THREE.Vector3(v2.x - v1.x, v2.y - v1.y, v2.z - v1.z)
		var a = v.angleTo(new THREE.Vector3(1, 0, 0))
		return v1.y > v2.y ? 2*Math.PI - a : a
	},
	
	// angle in radian between 2 vectors (angle C)
	// A - first vertex
	// B - second vertex
	// C - third vertex
	betweenVectors: function (A, B, C) {
		var a = Drawing.Vertex.lengthBetween(B, C)
		var b = Drawing.Vertex.lengthBetween(A, C)
		var c = Drawing.Vertex.lengthBetween(A, B)
		var cosg = ((Math.pow(a, 2) + Math.pow(b, 2)) - Math.pow(c, 2)) / (2 * a * b)
		return Math.acos(cosg)
	}
}


/**
 * Print
 */
Drawing.Print = {
	angleBetweenX: function (v1, v2) {
		var radian = Drawing.Angle.betweenX(v1, v2)
		var degree = Drawing.Angle.toDegree(radian)
		var rounded = Drawing.Math.round(degree)
		return "<" + rounded
	},
	
	angleBetweenVectors: function (A, B, C) {
		var radian = Drawing.Angle.betweenVectors(A, B, C)
		var degree = Drawing.Angle.toDegree(radian)
		var rounded = Drawing.Math.round(degree)
		return "<" + rounded
	},
	
	lengthBetween: function (v1, v2) {
		var length = Drawing.Vertex.lengthBetween(v1, v2)
		var rounded = Drawing.Math.round(length)
		return rounded
	}
}

/**
 * Scene
 */
Drawing.Scene = {
	// create a scene
	// containerId - id of the wrapper where canvas will be placed
	// world - function that populates scene with objects
	create: function (containerId, world) {
		var container;
		var camera, scene, renderer;

		container = document.getElementById(containerId);
				
		scene = new THREE.Scene();

		camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
		camera.position.set(0, 0, 45);

		renderer = new THREE.WebGLRenderer();
		renderer.setSize(450, 450);
		renderer.setClearColor(0xffffff, 1); // white scene
		container.appendChild(renderer.domElement);

		var render = world(scene, camera, renderer); // populate scene with objects from the world

		if (typeof(render) == "function") {
			function animate() {
				requestAnimationFrame(animate);
				render();
				renderer.render(scene, camera); // render the scene with the camera
			}
			animate(); // let's go baby
		} else if ((typeof(render) == "boolean") && render == true) {
		    var controls = new THREE.TrackballControls(camera, renderer.domElement);
		    
		    function animate() {
				requestAnimationFrame(animate);
				controls.update();
				renderer.render(scene, camera); // render the scene with the camera
			}
			animate(); // let's go baby
		} else {
			renderer.render(scene, camera); // render the scene with the camera
		}
	},
	
	setAllImagesSource: function (url) {
		var images = document.getElementsByTagName("img")
		for (i = 0; i < images.length; i++) {
			images[i].setAttribute("src", url);
		}
	},
	
	// cache of all scenes
	scenes: [],
	
	// create/destroy scene
	createDestroy: function (containerId, world) {
		for (i = 0; i < this.scenes.length; i++) {
			if (this.scenes[i].containerId == containerId) {
				// destroy scene
				this.scenes.splice(i, 1)
				var container = document.getElementById(containerId);
				for (j = 0; j < container.children.length; j++) {
					container.children[j].remove()
				}
				
				return false
			}
		}
		
		// create scene
		this.scenes.push({containerId: containerId, visible: true})
		this.create(containerId, world)
		
		return false
	},
	
	// show/hide scene
	showHide: function (containerId, world) {
		for (i = 0; i < this.scenes.length; i++) {
			if (this.scenes[i].containerId == containerId) {
				// hide/show scene
				var container = document.getElementById(containerId);
				container.setAttribute('class', (this.scenes[i].visible ? 'hidden' : 'visible'));
				this.scenes[i].visible = !this.scenes[i].visible
				
				return false
			}
		}
		
		// create scene
		this.scenes.push({containerId: containerId, visible: true})
		Drawing.Scene.create(containerId, world)
		
		return false
	},
	
	// handle create/destroy OR show/hode scene
	render: function (containerId, world) {
		return this.createDestroy(containerId, world)
	}
}


/**
 * Material
 */
Drawing.Material = {
	Black: function () { return new THREE.MeshBasicMaterial({color: 0x000000, transparent:true, opacity:0.8, side: THREE.DoubleSide}) },
	Blue:  function () { return new THREE.MeshBasicMaterial({color: 0x0000ff, transparent:true, opacity:0.8, side: THREE.DoubleSide}) },
	Red:  function () { return new THREE.MeshBasicMaterial({color: 0xff0000, transparent:true, opacity:0.8, side: THREE.DoubleSide}) },
	Green:  function () { return new THREE.MeshBasicMaterial({color: 0x00ff00, transparent:true, opacity:0.8, side: THREE.DoubleSide}) }
}


/**
 * Axis
 */
Drawing.Axis = {
	X: new THREE.Vector3(1, 0, 0).normalize(),
	Y: new THREE.Vector3(0, 1, 0).normalize(),
	Z: new THREE.Vector3(0, 0, 1).normalize()
}


/**
 * Vector
 */

// create vector with material
// material - material
Drawing.Vector = function (material) {
	this.material = material
}

Drawing.Vector.prototype = {
	constructor: Drawing.Vector,
	
	// angle between X axis in radian
	angleBetweenX: function () {
		return Drawing.Angle.betweenX(this.v1, this.v2)
	},
	
	// length
	length: function () {
		return Drawing.Vertex.lengthBetween(this.v1, this.v2)
	},
	
	// ##constructor##
	// create vector <v1, v2>
	// v1 - first vertex
	// v2 - second vertex
	fromVertices: function (v1, v2) {
		this.v1 = v1
		this.v2 = v2
		
		var geometry = new THREE.Geometry();
		geometry.vertices.push(this.v1, this.v2);
		this.geometry = geometry
		
		var vector = new THREE.Line(this.geometry, this.material);
		this.vector = vector
		
		return this
	},
	
	// ##constructor##
	// create vector <v1, v2> with length 'l'
	// v1 - first vertex
	// v2 - second vertex
	// l - length
	fromVerticesWithLength: function (v1, v2, l) {
		var a = Drawing.Angle.betweenX(v1, v2)
		return this.fromVertexWithAngleBetweenX(v1, a, l)
	},
	
	// ##constructor##
	// create vector with length 'l' from 'v1' and direction 'a' 
	// v1 - vertex
	// a - angle in radians against X axis
	// l - length from v1
	fromVertexWithAngleBetweenX: function (v1, a, l) {
		var v2 = Drawing.Vertex.withAngleBetweenX(v1, a, l)
		return this.fromVertices(v1, v2)
	},
	
	// ##factory-constructor##
	newVectorStartingFrom: function (v3) {
		var a = this.angleBetweenX()
		var l = this.length()
		
		var vector = new Drawing.Vector(this.material)
			.fromVertexWithAngleBetweenX(v3, a, l)
		return vector
	},
	
	// ##factory-constructor##
	newVectorWithAngleBetween: function (l, b) {
		var v3 = Drawing.Vertex.withAngleBetweenVector(this.v1, this.v2, l, b)
		
		var vector = new Drawing.Vector(this.material)
			.fromVertices(this.v2, v3)	
		vector.v0 = this.v1 // preserve parent vertex
		
		var a = Drawing.Angle.betweenX(this.v1, this.v2) + b
		vector.a = a // preserve construction angle
		
		return vector
	},
	
	// ##factory-constructor##
	newOppositeVector: function () {
		var vector = new Drawing.Vector(this.material)
			.fromVertices(this.v2, this.v1)
		return vector
	},
	
	// add start arrow to vector
	withStartArrow: function (material) {
		material = material ? material : this.material
		
		var arrow = new Drawing.Arrow(this.v1, this.v2, material)
		this.startArrow = arrow
		
		return this
	},
	
	// add end arrow to vector
	withEndArrow: function (material) {
		material = material ? material : this.material
		
		var arrow = new Drawing.Arrow(this.v2, this.v1, material)
		this.endArrow = arrow
		
		return this
	},
	
	withText: function (message, l, k, material) {
		material = material ? material : this.material
	
		var text = new Drawing.Text(message, material)
			.aroundVector(this, l, k)
		this.text = text
		
		return this
	},
	
	withLengthAsText: function (l, k, material) {
		var message = Drawing.Print.lengthBetween(this.v1, this.v2)
		return this.withText(message, l, k, material)
	},
	
	withAngleBetweenXAsText: function (l, k, material) {
		var message = Drawing.Print.angleBetweenX(this.v1, this.v2)
		return this.withText(message, l, k, material)
	},
	
	withStartVertexText: function (message, x, y, material) {
		material = material ? material : this.material
		
		var text = new Drawing.Text(message, material)
			.aroundVertex(this.v1, x, y)
		this.startVertexText = text
		
		return this
	},
	
	withEndVertexText: function (message, x, y, material) {
		material = material ? material : this.material
		
		var text = new Drawing.Text(message, material)
			.aroundVertex(this.v2, x, y)
		this.endVertexText = text
		
		return this
	},
	
	// add vector (and it's companions) to scene
	addTo: function (scene) {
		scene.add(this.vector)
		
		if (this.startArrow) this.startArrow.addTo(scene)
		if (this.endArrow) this.endArrow.addTo(scene)
		if (this.text) this.text.addTo(scene)
		if (this.startVertexText) this.startVertexText.addTo(scene)
		if (this.endVertexText) this.endVertexText.addTo(scene)
		
		return this
	}
}


/**
 * Arrow
 */

//create arrow in <v1, v2> direction 
// v1 - first vertex
// v2 - second vertex
// material - material
Drawing.Arrow = function (v1, v2, material) {
	var l = 2
	var p = 0.35
	
	var a = Drawing.Angle.betweenX(v1, v2)
	
	var vl = Drawing.Vertex.withAngleBetweenX(v2, a, -l)
	var vp1 = Drawing.Vertex.perpendicularToVector(v2, vl, p)
	var vp2 = Drawing.Vertex.perpendicularToVector(v2, vl, -p)
	
	var geometry = new THREE.Geometry();
	geometry.vertices.push(vp1, v2, vp2);
	geometry.faces.push(new THREE.Face3(0, 1, 2)); 
	
	var arrow = new THREE.Mesh(geometry, material);

	this.material = material
	this.geometry = geometry
	this.arrow = arrow
}

Drawing.Arrow.prototype = {
	constructor: Drawing.Arrow,
	
	// add arrow to scene
	addTo: function (scene) {
		scene.add(this.arrow)
		
		return this
	}
}


/**
 * Text
 */

// create text geometry
// message - message
// material - material
Drawing.Text = function (message, material) {
	var font = new THREE.Font(helvetiker_regular_typeface);
	
	var geometry = new THREE.TextGeometry(message, { size: 1.2, height: 0.0, font: font });
	var text = new THREE.Mesh(geometry, material);
	
	this.material = material
	this.geometry = geometry
	this.text = text
}

Drawing.Text.prototype = {
	constructor: Drawing.Text,
	
	// create text around vector <v1, v2>
	// v1 - first vertex
	// v2 - second vertex
	// l - length from 'v1'
	// k - length from <v1, v2>
	aroundVertices: function (v1, v2, l, k) {
		Drawing.Math.set(this.text.position, v1)
		
		var x = v2.x - v1.x
		var y = v2.y - v1.y
		var z = v2.z - v1.z 
		var direction = new THREE.Vector3(x, y, z).normalize()
		this.text.translateOnAxis(direction, l);
		
		var kk = k < 0 ? -k : k // adjust 'k' when 'k' is negative 
		var v3 = Drawing.Vertex.perpendicularToVector(v1, v2, k)
		var xk = v3.x - v2.x
		var yk = v3.y - v2.y
		var zk = v3.z - v2.z
		var perpendicularDirection = new THREE.Vector3(xk, yk, zk).normalize()
		this.text.translateOnAxis(perpendicularDirection, kk); // use adjusted 'k'
		
		this.text.rotateOnAxis(Drawing.Axis.Z, Math.atan(y/x));
		
		return this
	},
	
	// create text around vector <v1, v2>
	// v - vector
	// l - length from 'v1'
	// k - length from <v1, v2>
	aroundVector: function (v, l, k) {
		return this.aroundVertices(v.v1, v.v2, l, k)
	},
	
	// create text at vertex
	// v - vertex
	// x - length from 'x'
	// xy - length from 'y'
	aroundVertex: function (v, x, y) {
		Drawing.Math.set(this.text.position, v)
		
		this.text.translateOnAxis(Drawing.Axis.X, x);
		
		this.text.translateOnAxis(Drawing.Axis.Y, y);
		
		return this
	},
	
	// add text to scene
	addTo: function (scene) {
		scene.add(this.text)
		
		return this
	}
}


/**
 * Polygone
 */

// create polygone
// radius - radius
// center - center
// segments - number of segments
// material - material
Drawing.Polygone = function (radius, center, segments, material) {
	var alpha = Math.PI / segments * 2 // 360/segments
	var a = 0 // starting angle
		
	var geometry = new THREE.Geometry();
	for (i = 0; i <= segments; i++) {
		var x = radius * Math.cos(a)
		var y = radius * Math.sin(a)

		geometry.vertices.push(new THREE.Vector3(center.x + x, center.y + y, 0));
		
		a += alpha
	}
	
	var polygone = new THREE.Line( geometry, material );
	
	this.segments = segments
	this.material = material
	this.geometry = geometry
	this.polygone = polygone
}

Drawing.Polygone.prototype = {
	constructor: Drawing.Polygone,
	
	// add polygone to scene
	addTo: function (scene) {
		scene.add(this.polygone)
		
		return this
	}
}


/**
 * Circle
 */

// create circle
// radius - radius
// center - center
// material - material
Drawing.Circle = function (radius, center, material) {
	var p = new Drawing.Polygone(radius, center, 32, material)
	return p
}


/**
 * Arc
 */


// material - material
Drawing.Arc = function (material) {
	this.material = material
}

Drawing.Arc.prototype = {
	constructor: Drawing.Arc,
	
	// add length of arc in radians and segments
	withAngle: function (radians, segments) {
		this.radians = radians
		this.segments = segments
		
		return this
	},
	
	// create arc from center and start vertex
	// center - center
	// start - starting point
	// radians - length of arc in radians
	// segments - segments
	fromCenterAndStartVertex: function (center, start, radians, segments) {
		radians = radians ? radians : this.radians
		segments = segments ? segments : this.segments
	
		var radius = Drawing.Vertex.lengthBetween(center, start)
		
		var alpha = radians / segments
		var a = Drawing.Angle.betweenX(center, start) // starting angle
		if (start.y - center.y > 0) a = a < 0 ? a + Math.PI : a // adjust 'a' 
			
		var geometry = new THREE.Geometry();
		for (i = 0; i <= segments; i++) {
			var x = radius * Math.cos(a)
			var y = radius * Math.sin(a)
	
			geometry.vertices.push(new THREE.Vector3(center.x + x, center.y + y, 0));
			
			a += alpha
		}
		
		var arc = new THREE.Line(geometry, this.material);
		
		this.segments = segments
		this.geometry = geometry
		this.arc = arc
		
		this.center = center
		this.start = geometry.vertices[0]
		this.afterStart = geometry.vertices[1]
		this.beforeEnd = geometry.vertices[segments - 1]
		this.end = geometry.vertices[segments]
		
		return this
	},
	
	withStartArrow: function (material) {
		material = material ? material : this.material
		
		var arrow = new Drawing.Arrow(this.afterStart, this.start, material)
		this.startArrow = arrow
		
		return this
	},
	
	withEndArrow: function (material) {
		material = material ? material : this.material
		
		var arrow = new Drawing.Arrow(this.beforeEnd, this.end, material)
		this.endArrow = arrow
		
		return this
	},
	
	withText: function (message, l, k, material) {
		material = material ? material : this.material
	
		var text = new Drawing.Text(message, material)
			.aroundVertices(this.start, this.end, l, k)
		this.text = text
		
		return this
	},
	
	withCenterVertexText: function (message, x, y, material) {
		material = material ? material : this.material
		
		var text = new Drawing.Text(message, material)
			.aroundVertex(this.center, x, y)
		this.centerVertexText = text
		
		return this
	},
	
	withStartVertexText: function (message, x, y, material) {
		material = material ? material : this.material
		
		var text = new Drawing.Text(message, material)
			.aroundVertex(this.start, x, y)
		this.startVertexText = text
		
		return this
	},
	
	withEndVertexText: function (message, x, y, material) {
		material = material ? material : this.material
		
		var text = new Drawing.Text(message, material)
			.aroundVertex(this.end, x, y)
		this.endVertexText = text
		
		return this
	},
	
	// add arc to scene
	addTo: function (scene) {
		scene.add(this.arc)
		
		if (this.startArrow) this.startArrow.addTo(scene)
		if (this.endArrow) this.endArrow.addTo(scene)
		if (this.text) this.text.addTo(scene)
		if (this.centerVertexText) this.centerVertexText.addTo(scene)
		if (this.startVertexText) this.startVertexText.addTo(scene)
		if (this.endVertexText) this.endVertexText.addTo(scene) 
		
		return this
	}
}


/**
 * Triangle
 */

// create triangle
// v1 - first vertex
// v2 - second vertex
// v3 - third vertex
// material - material
Drawing.Triangle = function (v1, v2, v3, material) {
	var geometry = new THREE.Geometry();
	geometry.vertices.push(v1, v2, v3, v1);
	
	var triangle = new THREE.Line( geometry, material );
	
	this.material = material
	this.geometry = geometry
	this.triangle = triangle
}

Drawing.Triangle.prototype = {
	constructor: Drawing.Triangle,
	
	// add triangle to scene
	addTo: function (scene) {
		scene.add(this.triangle)
		
		return this
	}
}


/**
 * Rectangle
 */

// create rectangle
// v1 - first vertex
// v2 - second vertex
// v3 - third vertex
// v4 - forth vertex
// material - material
Drawing.Rectangle = function (v1, v2, v3, v4) {
	this.v1 = v1
	this.v2 = v2
	this.v3 = v3
	this.v4 = v4
}

Drawing.Rectangle.prototype = {
	constructor: Drawing.Rectangle,
	
	side: function (material) {
		var geometry = new THREE.Geometry();
		geometry.vertices.push(this.v1, this.v2, this.v3, this.v4);
		
		geometry.faces.push(new THREE.Face3(0, 1, 2)); 
		geometry.faces.push(new THREE.Face3(0, 2, 3)); 
		
		var mesh = new THREE.Mesh(geometry, material);
		this.mesh = mesh
		
		return this
	},
	
	frame: function (material) {
		var geometry = new THREE.Geometry();
		geometry.vertices.push(this.v1, this.v2, this.v3, this.v4, this.v1);
		
		var line = new THREE.Line(geometry, material);
		this.line = line
		
		return this
	},
	
	addSideTo: function (scene) {
		scene.add(this.mesh)
		
		return this
	},
	
	addFrameTo: function (scene) {
		scene.add(this.line)
		
		return this
	}
}


/**
 * Box
 */

// create box
// v1 - first vertex
// v2 - second vertex
// v3 - third vertex
// v4 - forth vertex
// v5 - fifth vertex
// material - material
Drawing.Box = function (v1, v2, v3, v4, v5) {
	var v6 = new THREE.Vector3(v3.x + (v5.x - v4.x), v3.y + (v5.y - v4.y), 0)
	var v7 = new THREE.Vector3(v2.x + (v5.x - v4.x), v2.y + (v5.y - v4.y), 0)
	var v8 = new THREE.Vector3(v5.x, v5.y - (v4.y - v1.y), 0)
	
	this.v1 = v1
	this.v2 = v2
	this.v3 = v3
	this.v4 = v4
	this.v5 = v5
	this.v6 = v6
	this.v7 = v7
	this.v8 = v8
	
	var s1 = new Drawing.Rectangle(v1, v2, v3, v4)
	var s2 = new Drawing.Rectangle(v2, v3, v6, v7)
	var s3 = new Drawing.Rectangle(v3, v4, v5, v6)
	var s4 = new Drawing.Rectangle(v1, v4, v5, v8)
	var s5 = new Drawing.Rectangle(v1, v2, v7, v8)
	var s6 = new Drawing.Rectangle(v5, v6, v7, v8)
	
	this.s1 = s1
	this.s2 = s2
	this.s3 = s3
	this.s4 = s4
	this.s5 = s5
	this.s6 = s6
}

Drawing.Box.prototype = {
	constructor: Drawing.Box,
	
	sides: function (material) {
		this.s1Side = this.s1.side(material)
		this.s2Side = this.s2.side(material)
		this.s3Side = this.s3.side(material)
		this.s4Side = this.s4.side(material)
		this.s5Side = this.s5.side(material)
		this.s6Side = this.s6.side(material)
		
		return this;
	},
	
	frames: function (material) {
		this.s1Frame = this.s1.frame(material)
		this.s2Frame = this.s2.frame(material)
		this.s3Frame = this.s3.frame(material)
		this.s4Frame = this.s4.frame(material)
		this.s5Frame = this.s5.frame(material)
		this.s6Frame = this.s6.frame(material)
		
		return this;
	},
	
	addSidesTo: function (scene) {
		this.s1Side.addSideTo(scene)
		this.s2Side.addSideTo(scene)
		this.s3Side.addSideTo(scene)
		this.s4Side.addSideTo(scene)
		this.s5Side.addSideTo(scene)
		this.s6Side.addSideTo(scene)
		
		return this
	},
	
	addFramesTo: function (scene) {
		this.s1Frame.addFrameTo(scene)
		this.s2Frame.addFrameTo(scene)
		this.s3Frame.addFrameTo(scene)
		this.s4Frame.addFrameTo(scene)
		this.s5Frame.addFrameTo(scene)
		this.s6Frame.addFrameTo(scene)
		
		return this
	}
}