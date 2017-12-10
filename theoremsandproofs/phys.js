Phys = {

displacement: function (scene) {
	var material = Drawing.Material.Black()
	
	var O = new THREE.Vector3(0, 0, 0)
	var Z = new THREE.Vector3(0, 10, 0)
	var Y = new THREE.Vector3(10, 0, 0)
	var X = new THREE.Vector3(-5, -5, 0)
	var ArcO = new THREE.Vector3(7, 0, 0)
	var ArcA = new THREE.Vector3(2, 5, 0)
	
	var OZ = new Drawing.Vector(material)
		.fromVertices(O, Z)
		.withStartArrow()
		.withEndVertexText("Z", -2, 0)
		.addTo(scene)
		
	var OY = new Drawing.Vector(material)
		.fromVertices(O, Y)
		.withStartArrow()
		.withEndVertexText("Y", 1, -2)
		.addTo(scene)
		
	var OX = new Drawing.Vector(material)
		.fromVertices(O, X)
		.withStartArrow()
		.withEndVertexText("X", -2, 0)
		.addTo(scene)
		
	var Arc = new Drawing.Arc(material)
		.withAngle(-2*Math.PI/3, 15)
		.fromCenterAndStartVertex(ArcO, ArcA)
		.withText("s", 7, 4)
		.addTo(scene)
		
	var red = Drawing.Material.Red()
	
	var ArcB = Arc.geometry.vertices[3]
	var ArcC = Arc.geometry.vertices[12]
	
	var OArcB = new Drawing.Vector(red)
		.fromVertices(O, ArcB)
		.withStartArrow()
		.withText("r1", 3, 0)
		.addTo(scene)
		
	var OArcC = new Drawing.Vector(red)
		.fromVertices(O, ArcC)
		.withStartArrow()
		.withText("r2", 3, 0)
		.addTo(scene)
		
	var ArcAAcrC = new Drawing.Vector(red)
		.fromVertices(ArcB, ArcC)
		.withStartArrow()
		.withText("dr", 3, 0)
		.withStartVertexText("M1", -1, 0.6)
		.withEndVertexText("M2", 0, 0.3)
		.addTo(scene)
		
}, // end of displacement

acceleration: function (scene) {
	var material = Drawing.Material.Black()
	
	var O = new THREE.Vector3(-10, -1, 0)
	var M1 = new THREE.Vector3(-8, 11, 0)
	
	var arcM1M2 = new Drawing.Arc(material)
		.withAngle(-Math.PI / 10, 10)
		.fromCenterAndStartVertex(O, M1)
		.withCenterVertexText("O", 0.5, -0.7)
		.withStartVertexText("M1", -1, 0.3)
		.withEndVertexText("M2", 0, 1)
		.addTo(scene)
	
	var M2 = arcM1M2.end
	
	var OM1 = new Drawing.Vector(material)
		.fromVertices(O, M1)
		.withText("R", 8, 0)
		.addTo(scene)
		
	var OM2 = new Drawing.Vector(material)
		.fromVertices(O, M2)
		.withText("R", 8, 0)
		.addTo(scene)
		
	var M1N1 = OM1
		.newVectorWithAngleBetween(15, -Math.PI/2)
		.withStartArrow()
		.withText("t", 10, 0)
		.addTo(scene)
		
	var M2N2 = OM2
		.newVectorWithAngleBetween(15, -Math.PI/2)
		.withStartArrow()
		.withText("t", 10, 0)
		.addTo(scene)
		
	// d alpha
	var E = Drawing.Vertex.fromVector(OM1, 4)
	
	var arcOE = new Drawing.Arc(material)
		.withAngle(-Math.PI / 10, 10)
		.fromCenterAndStartVertex(O, E)
		.withStartVertexText("da", 0.5, 1)
		.addTo(scene)
	
	
	// new M1 point
	var P1 = new THREE.Vector3(-5, -5, 0)
	
	var P1Q1 = M1N1
		.newVectorStartingFrom(P1)
		.withStartArrow()
		.withText("t", 10, 0)
		.withStartVertexText("M1", -1, 0.3)
		.addTo(scene)
		
	var P1Q2 = M2N2
		.newVectorStartingFrom(P1)
		.withStartArrow()
		.withText("t", 10, 0)
		.addTo(scene)
	
	// d tau	
	var Q1Q2 = new Drawing.Vector(material)
		.fromVertices(P1Q1.v2, P1Q2.v2)
		.withStartArrow()
		.withText("dt/2", 2.5, 2)
		.withStartVertexText("Q1", -1, 0.5)
		.withEndVertexText("Q2", -0.5, -1.5)
		.addTo(scene)
		
	// d tau
	var OQ1Q2 = Q1Q2
		.newVectorStartingFrom(O)
		.withStartArrow()
		.withText("n", 2, 0)
		.addTo(scene)
		
	// d tau
	var P1Q1Q2 = Q1Q2
		.newVectorStartingFrom(P1)
		.withStartArrow()
		.withText("dt", 2, 0)
		.addTo(scene)
		
	// d alpha
	var D = Drawing.Vertex.fromVector(P1Q1, 4)
	
	var arcP1D = new Drawing.Arc(material)
		.withAngle(-Math.PI / 10, 10)
		.fromCenterAndStartVertex(P1, D)
		.withStartVertexText("da/2", 0, 0)
		.addTo(scene)
	
	// middle point of d tau	
	var K = Drawing.Vertex.fromVector(Q1Q2, Q1Q2.length()/2)
	
	var P1K = new Drawing.Vector(Drawing.Material.Red())
		.fromVertices(P1, K)
		.addTo(scene)
		
}, // end of acceleration

impulse: function (scene) {
	var material = Drawing.Material.Black()
	var red = Drawing.Material.Red()
	
	var O = new THREE.Vector3(0, 0, 0)
	var M1 = new THREE.Vector3(4, 4, 0)
	var M2 = new THREE.Vector3(-9, -3, 0)
	var M3 = new THREE.Vector3(3, -7, 0)
	
	
	var system = new Drawing.Circle(15, O, material)
		.addTo(scene)
		
	var obj1 = new Drawing.Circle(2, M1, material)
		.addTo(scene)
		
	var obj2 = new Drawing.Circle(2, M2, material)
		.addTo(scene)
	
	var obj3 = new Drawing.Circle(2, M3, material)
		.addTo(scene)
		
	// obj1
	var F1 = new THREE.Vector3(9, 8, 0)
	
	var M1F1 = new Drawing.Vector(red)
		.fromVertices(M1, F1)
		.withStartArrow()
		.withEndVertexText("F1", 0, 0.5)
		.addTo(scene)
		
	var M1M2 = new Drawing.Vector(material)
		.fromVerticesWithLength(M1, M2, 5)
		.withStartArrow()
		.withEndVertexText("f21", -1, 1.5)
		.addTo(scene)
		
	var M1M3 = new Drawing.Vector(material)
		.fromVerticesWithLength(M1, M3, 5)
		.withStartArrow()
		.withEndVertexText("f31", 1, 0.5)
		.addTo(scene)
		
	// obj2
	var F2 = new THREE.Vector3(-9, -8, 0)
	
	var M2F2 = new Drawing.Vector(red)
		.fromVertices(M2, F2)
		.withStartArrow()
		.withEndVertexText("F2", -2.5, 0)
		.addTo(scene)
		
	var M2M1 = new Drawing.Vector(material)
		.fromVerticesWithLength(M2, M1, 5)
		.withStartArrow()
		.withEndVertexText("f12", -3, 0)
		.addTo(scene)
		
	var M2M3 = new Drawing.Vector(material)
		.fromVerticesWithLength(M2, M3, 5)
		.withStartArrow()
		.withEndVertexText("f32", -1, 0.5)
		.addTo(scene)
		
	// obj3
	var F3 = new THREE.Vector3(9, -8, 0)
	
	var M3F3 = new Drawing.Vector(red)
		.fromVertices(M3, F3)
		.withStartArrow()
		.withEndVertexText("F3", 0, 0.5)
		.addTo(scene)
		
	var M3M1 = new Drawing.Vector(material)
		.fromVerticesWithLength(M3, M1, 5)
		.withStartArrow()
		.withEndVertexText("f13", 1, -2)
		.addTo(scene)
		
	var M3M2 = new Drawing.Vector(material)
		.fromVerticesWithLength(M3, M2, 5)
		.withStartArrow()
		.withEndVertexText("f23", 0, 0)
		.addTo(scene)
		
}, // end of impulse

momentOfImpulse: function (scene) {
	var material = Drawing.Material.Black()
	var red = Drawing.Material.Red()
	
	var O = new THREE.Vector3(0, 0, 0)
	var Arc0 = new THREE.Vector3(5, 11, 0)
	
	var Arc = new Drawing.Arc(material)
		.withAngle(-2*Math.PI/3, 15)
		.fromCenterAndStartVertex(O, Arc0)
		.addTo(scene)
		
	var Arc1 = Arc.geometry.vertices[3]
	var Arc2 = Arc.geometry.vertices[7]
	
	var OArc2 = new Drawing.Vector(material)
		.fromVertices(O, Arc1)
		.withStartArrow()
		.withText("R", 4, 0)
		.addTo(scene)
		
	var OArc1 = new Drawing.Vector(material)
		.fromVertices(O, Arc2)
		.withStartArrow()
		.withText("R", 4, 0)
		.addTo(scene)
		
	var ON = OArc1
		.newVectorWithAngleBetween(14, Math.PI/2)
		.newVectorStartingFrom(O)
		.withStartArrow()
		.withEndVertexText("n", 1, -1)
		.addTo(scene)
		
	var OF1 = OArc1
		.newVectorWithAngleBetween(8, Math.PI/2)
		.withStartArrow()
		.withEndVertexText("F", 1, -1)
		.addTo(scene)
		
	var OF2 = OArc2
		.newVectorWithAngleBetween(8, Math.PI/2)
		.withStartArrow()
		.withEndVertexText("F", 2, -1)
		.addTo(scene)
		
}, // end of momentOfImpulse

divergence: function (scene) {
	var material = Drawing.Material.Black()
	
	var O = new THREE.Vector3(0, 0, 0)
	var Z = new THREE.Vector3(0, 10, 0)
	var Y = new THREE.Vector3(10, 0, 0)
	var X = new THREE.Vector3(-5, -5, 0)
	
	var OZ = new Drawing.Vector(material)
		.fromVertices(O, Z)
		.withStartArrow()
		.withEndVertexText("Z", -2, 0)
		.addTo(scene)
		
	var OY = new Drawing.Vector(material)
		.fromVertices(O, Y)
		.withStartArrow()
		.withEndVertexText("Y", 1, -2)
		.addTo(scene)
		
	var OX = new Drawing.Vector(material)
		.fromVertices(O, X)
		.withStartArrow()
		.withEndVertexText("X", -2, 0)
		.addTo(scene)
	
	var red = new THREE.MeshBasicMaterial({color:0xff0000, transparent:true, opacity:0.2, side: THREE.DoubleSide})
	
	var v1 = new THREE.Vector3(2, 2, 0)
	var v2 = new THREE.Vector3(8, 2, 0)
	var v3 = new THREE.Vector3(8, 6, 0)
	var v4 = new THREE.Vector3(2, 6, 0)
	var v5 = new THREE.Vector3(5, 8, 0)
	
	var box = new Drawing.Box(v1, v2, v3, v4, v5)
		.sides(red)
		.frames(material)
		.addSidesTo(scene)
		.addFramesTo(scene)
		
	var M = new THREE.Vector3(6, 4.6, 0)
	var MPoint = new Drawing.Circle(0.1, M, material)
		.addTo(scene)
	var MText = new Drawing.Text("M", material)
		.aroundVertex(M, 0.3, -0.1)
		.addTo(scene)
		
}, // end of divergence

circulation: function (scene) {
	var material = Drawing.Material.Black()
	
	var O = new THREE.Vector3(0, 0, 0)
	var Z = new THREE.Vector3(0, 10, 0)
	var Y = new THREE.Vector3(10, 0, 0)
	var X = new THREE.Vector3(-5, -5, 0)
	
	var OZ = new Drawing.Vector(material)
		.fromVertices(O, Z)
		.withStartArrow()
		.withEndVertexText("Z", -2, 0)
		.addTo(scene)
		
	var OY = new Drawing.Vector(material)
		.fromVertices(O, Y)
		.withStartArrow()
		.withEndVertexText("Y", 1, -2)
		.addTo(scene)
		
	var OX = new Drawing.Vector(material)
		.fromVertices(O, X)
		.withStartArrow()
		.withEndVertexText("X", -2, 0)
		.addTo(scene)
	
	var red = new THREE.MeshBasicMaterial({color:0xff0000, transparent:true, opacity:0.2, side: THREE.DoubleSide})

	var v1 = new THREE.Vector3(2, 2, 0)
	var v2 = new THREE.Vector3(8, 2, 0)
	var v3 = new THREE.Vector3(8, 6, 0)
	var v4 = new THREE.Vector3(2, 6, 0)
	var v5 = new THREE.Vector3(5, 8, 0)
	
	var box = new Drawing.Box(v1, v2, v3, v4, v5)
		.sides(red)
		.frames(material)
		.addFramesTo(scene)
		
	var M = new THREE.Vector3(6.5, 7, 0)
	var MPoint = new Drawing.Circle(0.1, M, material)
		.addTo(scene)
	var MText = new Drawing.Text("M", material)
		.aroundVertex(M, 0.3, -0.1)
		.addTo(scene)
		
	var s1 = new Drawing.Rectangle(box.v1, box.v2, box.v3, box.v4)
		.side(new THREE.MeshBasicMaterial({color:0xff0000, transparent:true, opacity:0.2, side: THREE.DoubleSide}))
		.addSideTo(scene)
	var s2 = new Drawing.Rectangle(box.v2, box.v3, box.v6, box.v7)
		.side(new THREE.MeshBasicMaterial({color:0x00ff00, transparent:true, opacity:0.2, side: THREE.DoubleSide}))
		.addSideTo(scene)
	var s3 = new Drawing.Rectangle(box.v3, box.v4, box.v5, box.v6)
		.side(new THREE.MeshBasicMaterial({color:0x0000ff, transparent:true, opacity:0.2, side: THREE.DoubleSide}))
		.addSideTo(scene)
		
	var XPlus = new Drawing.Text("x+", material)
		.aroundVertex(box.v4, 0, 1)
		.addTo(scene)
		
	var YPlus = new Drawing.Text("y+", material)
		.aroundVertex(box.v3, -3, -1)
		.addTo(scene)
		
	var XMinus = new Drawing.Text("x-", material)
		.aroundVertex(box.v6, -2, -2)
		.addTo(scene)
		
	var YMinus = new Drawing.Text("y-", material)
		.aroundVertex(box.v5, 3, 0.5)
		.addTo(scene)
		
}, // end of circulation

sumOfDivergence: function (scene) {
	var material = Drawing.Material.Black()
	var red = Drawing.Material.Red()
	var blue = Drawing.Material.Blue()
	var green = Drawing.Material.Green()
	
	var l = 8
	var d = 4.5
	var t = 2
	
	// box coordinates
	
	var a1 = new THREE.Vector3(-(l+d), -l/2, 0)
	var a2 = new THREE.Vector3(-(d), -l/2, 0)
	var a3 = new THREE.Vector3(-(d), l/2, 0)
	var a4 = new THREE.Vector3(-(l+d), l/2, 0)
	var a5 = new THREE.Vector3(-(l+d) + t, l/2 + t, 0)
		
	var b1 = new THREE.Vector3((d), -l/2, 0)
	var b2 = new THREE.Vector3((l+d), -l/2, 0)
	var b3 = new THREE.Vector3((l+d), l/2, 0)
	var b4 = new THREE.Vector3((d), l/2, 0)
	var b5 = new THREE.Vector3((d) + t, l/2 + t, 0)
	
	// box A & B
	
	var boxA = new Drawing.Box(a1, a2, a3, a4, a5)
		.frames(material)
		.addFramesTo(scene)
	
	var boxB = new Drawing.Box(b1, b2, b3, b4, b5)
		.frames(material)
		.addFramesTo(scene)
		
	// common side of A and B
		
	var sA = new Drawing.Rectangle(boxA.v2, boxA.v3, boxA.v6, boxA.v7)
		.side(green)
		.addSideTo(scene)
		
	var sB = new Drawing.Rectangle(boxB.v1, boxB.v4, boxB.v5, boxB.v8)
		.side(green)
		.addSideTo(scene)
		
	// normal to side vector of A & B
		
	var nPlus = new Drawing.Vector(blue)
		.fromVertexWithAngleBetweenX(new THREE.Vector3(-(d - t/2), t/2, 0), 0, 4)
		.withStartArrow()
		.withEndVertexText("n+", -2, 1)
		.addTo(scene)
		
	var nMinus = new Drawing.Vector(red)
		.fromVertexWithAngleBetweenX(new THREE.Vector3((d + t/2), t/2, 0), Math.PI, 4)
		.withStartArrow()
		.withEndVertexText("n-", 1, 1)
		.addTo(scene)
	
}, // end of sumOfDivergence

sumOfCirculation: function (scene) {
	var material = Drawing.Material.Black()
	var red = Drawing.Material.Red()
	var blue = Drawing.Material.Blue()
	
	var l = 10
	var d = 1
	
	// area
	
	var geometry = new THREE.Geometry();
	geometry.vertices.push(
		new THREE.Vector3(-(l+2*d), -(l/2+d), 0), 
		new THREE.Vector3(0, -(l/2+d), 0), 
		new THREE.Vector3(0, (l/2+d), 0), 
		new THREE.Vector3(0, -(l/2+d), 0), 
		new THREE.Vector3((l+2*d), -(l/2+d), 0),  
		new THREE.Vector3((l+2*d), (l/2+d), 0), 
		new THREE.Vector3(-(l+2*d), (l/2+d), 0), 
		new THREE.Vector3(-(l+2*d), -(l/2+d), 0)
	);
	
	var line = new THREE.Line(geometry, material);
	scene.add(line)
	
	//
	// circulation:
	//
	
	var a1 = new THREE.Vector3(-(l+d), -l/2, 0)
	var a2 = new THREE.Vector3(-(d), -l/2, 0)
	var a3 = new THREE.Vector3(-(d), l/2, 0)
	var a4 = new THREE.Vector3(-(l+d), l/2, 0)
	
	var b1 = new THREE.Vector3((d), -l/2, 0)
	var b2 = new THREE.Vector3((l+d), -l/2, 0)
	var b3 = new THREE.Vector3((l+d), l/2, 0)
	var b4 = new THREE.Vector3((d), l/2, 0)
	
	// blue circulation
	
	var A12 = new Drawing.Vector(blue)
		.fromVertices(a1, a2)
		.withStartArrow()
		.addTo(scene)
		
	var A23 = new Drawing.Vector(blue)
		.fromVertices(a2, a3)
		.withStartArrow()
		.addTo(scene)
		
	var A34 = new Drawing.Vector(blue)
		.fromVertices(a3, a4)
		.withStartArrow()
		.addTo(scene)
		
	var A41 = new Drawing.Vector(blue)
		.fromVertices(a4, a1)
		.withStartArrow()
		.addTo(scene)
		
	// red circulation
	
	var B12 = new Drawing.Vector(red)
		.fromVertices(b1, b2)
		.withStartArrow()
		.addTo(scene)
		
	var B23 = new Drawing.Vector(red)
		.fromVertices(b2, b3)
		.withStartArrow()
		.addTo(scene)
		
	var B34 = new Drawing.Vector(red)
		.fromVertices(b3, b4)
		.withStartArrow()
		.addTo(scene)
		
	var B41 = new Drawing.Vector(red)
		.fromVertices(b4, b1)
		.withStartArrow()
		.addTo(scene)
	
	
}, // end of sumOfCirculation

CoulombLaw: function (scene) {
    var material = Drawing.Material.Black()
	var red = Drawing.Material.Red()
	var blue = Drawing.Material.Blue()
	
	var l = 6
	
	var X1 = new THREE.Vector3(-11, 1, 0)
	var X2 = new THREE.Vector3(2, 7, 0)
	
	var q1 = new Drawing.Circle(0.4, X1, red)
		.addTo(scene)
		
	var q2 = new Drawing.Circle(0.4, X2, blue)
		.addTo(scene)
		
	var F21 = new Drawing.Vector(blue)
		.fromVerticesWithLength(X1, X2, l)
		.withStartArrow()
		.withText("F21", 0.7, 0.3)
		.withStartVertexText("q1", 0, -2, red)
		.addTo(scene)
		
	var F12 = new Drawing.Vector(red)
		.fromVerticesWithLength(X2, X1, l)
		.withStartArrow()
		.withText("F12", 3.1, -0.3)
		.withStartVertexText("q2", 0, -2, blue)
		.addTo(scene)
		
		
	var X3 = new THREE.Vector3(1, -9, 0)
	var X4 = new THREE.Vector3(7, -3, 0)
	
	var q3 = new Drawing.Circle(0.4, X3, red)
		.addTo(scene)
		
	var q4 = new Drawing.Circle(0.4, X4, red)
		.addTo(scene)
		
	var F43 = new Drawing.Vector(red)
		.fromVerticesWithLength(X3, X4, -l)
		.withStartArrow()
		.withText("F43", 3.1, -0.3)
		.withStartVertexText("q3", 0, -2, red)
		.addTo(scene)
		
	var F34 = new Drawing.Vector(red)
		.fromVerticesWithLength(X4, X3, -l)
		.withStartArrow()
		.withText("F34", 0.7, 0.3)
		.withStartVertexText("q4", 0, -2, red)
		.addTo(scene)
    
}, // end of CoulombLaw

GaussLaw: function (scene) {
    var material = Drawing.Material.Black()
	var red = Drawing.Material.Red()
	var blue = Drawing.Material.Blue()
}, // end of GaussLaw

electricWork: function (scene) {
    var material = Drawing.Material.Black()
	var red = Drawing.Material.Red()
	var blue = Drawing.Material.Blue()
	
	var center = new THREE.Vector3(0, -8, 0)
	var X1 = new THREE.Vector3(-5, 1, 0)
	var X = new THREE.Vector3(0, 9, 0)
	var X2 = new THREE.Vector3(9, 7, 0)
	var X3 = new THREE.Vector3(11, 7, 0)

	var shape = new THREE.Shape();					
	shape.moveTo(-8,-1);							
	shape.splineThru([X1, X, X2, X3]);

	var geometry = new THREE.ShapeGeometry( shape );
	var mesh = new THREE.Line( geometry, blue ) ;		
	scene.add( mesh );

	var R1 = new Drawing.Vector(red)
		.fromVertices(center, X1)
		.withStartArrow()
		.withText("r1", 7, -0.5)
		.withEndVertexText("1", -1, 0, blue)
		.addTo(scene)

	var R = new Drawing.Vector(red)
		.fromVertices(center, X)
		.withStartArrow()
		.withText("r", 10, 0.5)
		.addTo(scene)

	var R2 = new Drawing.Vector(red)
		.fromVertices(center, X2)
		.withStartArrow()
		.withText("r2", 10, 0.5)
		.withEndVertexText("2", 0.5, 0.5, blue)
		.addTo(scene)
	
	var F = new Drawing.Vector(red)
		.fromVerticesWithLength(center, X, 7)
		.newVectorStartingFrom(X)
		.withStartArrow()
		.withText("F", 5, 1)
		.addTo(scene)
		
	var dr = new Drawing.Vector(material)
		.fromVerticesWithLength(center, X, 3)
		.newVectorStartingFrom(X)
		.withStartArrow()
		.withText("dr", 1, 1)
		.addTo(scene)
		
	var dl = new Drawing.Vector(material)
		.fromVertexWithAngleBetweenX(X, 60, -5)
		.withStartArrow()
		.withStartVertexText("a", 0.5, 0.5, material)
		.withText("dl", 1, -2)
		.addTo(scene)
}, // end of electricWork

convectionCurrent: function (scene) {
    var material = Drawing.Material.Black()
    var red = Drawing.Material.Red()
    var blue = Drawing.Material.Blue()
	
	var v1 = new THREE.Vector3(-4, -4, 0)
	var v2 = new THREE.Vector3(4, -4, 0)
	var v3 = new THREE.Vector3(4, 4, 0)
	var v4 = new THREE.Vector3(-4, 4, 0)
	var v5 = new THREE.Vector3(0, 6, 0)
	
	var box = new Drawing.Box(v1, v2, v3, v4, v5)
		.frames(material)
		.addFramesTo(scene)
		
	var Q = new THREE.Vector3(-12, 0, 0)
	var V = new THREE.Vector3(-5.5, 0, 0)
	var QPoint = new Drawing.Circle(0.1, Q, red)
		.addTo(scene)
    var QV = new Drawing.Vector(red)
		.fromVertices(Q, V)
		.withStartArrow()
		.withStartVertexText("q", -0.3, 1, material)
		.withEndVertexText("v", -0.3, 1, red)
		.addTo(scene)
		
	var dl = new Drawing.Vector(red)
		.fromVertices(v1, v2)
		.withText("dl=vdt", 2, -2)
		.addTo(scene)
		
	var ds = new Drawing.Rectangle(box.v2, box.v3, box.v6, box.v7)
		.side(blue)
		.addSideTo(scene)
	var dsText = new Drawing.Text("dS", blue)
		.aroundVertex(box.v6, 1, -3)
		.addTo(scene)
		
	var dvText = new Drawing.Text("dV", material)
		.aroundVertex(box.v5, 3, 2)
		.addTo(scene)
}, // end of convectionCurrent

continuityEquation: function (scene) {
    var material = Drawing.Material.Black()
    var blue = Drawing.Material.Blue()
	
	var v1 = new THREE.Vector3(-4, -4, 0)
	var v2 = new THREE.Vector3(4, -4, 0)
	var v3 = new THREE.Vector3(4, 4, 0)
	var v4 = new THREE.Vector3(-4, 4, 0)
	var v5 = new THREE.Vector3(0, 6, 0)
	
	var box = new Drawing.Box(v1, v2, v3, v4, v5)
		.frames(material)
		.addFramesTo(scene)
		
	var Q = new THREE.Vector3(2, 0, 0)
	var I = new THREE.Vector3(13, 0, 0)
	var QPoint = new Drawing.Circle(0.1, Q, blue)
		.addTo(scene)
    var QI = new Drawing.Vector(blue)
		.fromVertices(Q, I)
		.withStartArrow()
		.withStartVertexText("q", -0.3, 1, material)
		.withEndVertexText("i", -0.3, 1, blue)
		.addTo(scene)
	
	var dvText = new Drawing.Text("(S)", material)
		.aroundVertex(box.v5, 3, 2)
		.addTo(scene)
}, // end of continuityEquation

magneticInduction: function (scene) {
    var material = Drawing.Material.Black()
	var red = Drawing.Material.Red()
	var blue = Drawing.Material.Blue()
	
	var text = new Drawing.Text("te2 18.1.2. [18.2]", material)
		.aroundVertex(new THREE.Vector3(0, 0, 0), 0, 0)
		.addTo(scene)
}, // end of magneticInduction

magneticInductionLine: function (scene) {
    var material = Drawing.Material.Black()
	var red = Drawing.Material.Red()
	var blue = Drawing.Material.Blue()
	
	var text = new Drawing.Text("fizika 195 [278]", material)
		.aroundVertex(new THREE.Vector3(0, 0, 0), 0, 0)
		.addTo(scene)
}, // end of magneticInductionLine

magneticInductionCircle: function (scene) {
    var material = Drawing.Material.Black()
	var red = Drawing.Material.Red()
	var blue = Drawing.Material.Blue()
	
	var text = new Drawing.Text("fizika 195 [279]", material)
		.aroundVertex(new THREE.Vector3(0, 0, 0), 0, 0)
		.addTo(scene)
}, // end of magneticInductionCircle

magneticInductionCirculationIn: function (scene) {
    var material = Drawing.Material.Black()
	var red = Drawing.Material.Red()
	var blue = Drawing.Material.Blue()
	
	var text = new Drawing.Text("fizika 197 [280]", material)
		.aroundVertex(new THREE.Vector3(0, 0, 0), 0, 0)
		.addTo(scene)
}, // end of magneticInductionCirculationIn

magneticInductionCirculationOut: function (scene) {
    var material = Drawing.Material.Black()
	var red = Drawing.Material.Red()
	var blue = Drawing.Material.Blue()
	
	var text = new Drawing.Text("fizika 197 [281]", material)
		.aroundVertex(new THREE.Vector3(0, 0, 0), 0, 0)
		.addTo(scene)
}, // end of magneticInductionCirculationOut

magneticInductionCirculationSolenoid: function (scene) {
    var material = Drawing.Material.Black()
	var red = Drawing.Material.Red()
	var blue = Drawing.Material.Blue()
	
	var text = new Drawing.Text("fizika 197 [282]", material)
		.aroundVertex(new THREE.Vector3(0, 0, 0), 0, 0)
		.addTo(scene)
}, // end of magneticInductionCirculationSolenoid

magneticIntensityCirculation: function (scene) {
    var material = Drawing.Material.Black()
	var red = Drawing.Material.Red()
	var blue = Drawing.Material.Blue()
	
	var text = new Drawing.Text("te2 18.1.5. [18.11 & 18.12]", material)
		.aroundVertex(new THREE.Vector3(0, 0, 0), 0, 0)
		.addTo(scene)
}, // end of magneticIntensityCirculation

magneticFlux: function (scene) {
    var material = Drawing.Material.Black()
	var red = Drawing.Material.Red()
	var blue = Drawing.Material.Blue()
	
	var text = new Drawing.Text("fizika 198 [283]", material)
		.aroundVertex(new THREE.Vector3(0, 0, 0), 0, 0)
		.addTo(scene)
}, // end of magneticFlux

workOfMagneticField: function (scene) {
    var material = Drawing.Material.Black()
	var red = Drawing.Material.Red()
	var blue = Drawing.Material.Blue()
	
	var text = new Drawing.Text("fizika 201 [286]", material)
		.aroundVertex(new THREE.Vector3(0, 0, 0), 0, 0)
		.addTo(scene)
}, // end of workOfMagneticField

magneticInductionSolenoid: function (scene) {
    var material = Drawing.Material.Black()
	var red = Drawing.Material.Red()
	var blue = Drawing.Material.Blue()
	
	var text = new Drawing.Text("te2 18.1.4. [18.8]", material)
		.aroundVertex(new THREE.Vector3(0, 0, 0), 0, 0)
		.addTo(scene)
} // end of magneticInductionSolenoid

} // end of Phys