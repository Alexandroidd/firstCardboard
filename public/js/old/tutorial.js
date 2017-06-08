var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera(75, 
	window.innerWidth/window.innerHeight,
	0.1,
	1000
);

camera.position.set(0,100,0);

var renderer = new THREE.WebGLRenderer({ antialias:
true });

// size shoudl be the same as the window
renderer.setSize(window.innerWidth, window.innerHeight);

// set a near white clear color (default is black)
renderer.setClearColor(0xeeeeee);

// set renderer shadow
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

//bappend to document
document.body.appendChild(renderer.domElement);

//Render the scene/camera combination
renderer.render(scene,camera);


// A mesh is created from the geometry and material
// then added to the scene

var plane = new THREE.Mesh(
	new THREE.PlaneGeometry(5,5,5,5),
	new THREE.MeshBasicMaterial({
		color: 0x222222,
		wireframe: true})
	);

plane.rotateX(Math.PI/2);
scene.add(plane);



// camera controls
// var controls = new THREE.OrbitControls(camera,
// 	renderer.domElement);
// controls.addEventListener('change', function(){
// 	renderer.render(scene, camera);
// });

// adding an object
var geometry = new THREE.OctahedronGeometry(10,1);
var material = new THREE.MeshStandardMaterial({
	color: 0xff0051,
	shading: THREE.FlatShading, // default is THREE.SmothShading
	metalness: 0,
	roughness: 1
});


// the mesh

var shapeOne = new THREE.Mesh(geometry, material);
shapeOne.position.y += 10;
shapeOne.castShadow = true;
shapeOne.receiveShadow = true;
scene.add(shapeOne);

// shadow material???
// var shadowMaterial = new THREE.ShadowMaterial({
// 	color: 0xeeeeee
// });
// shadowMaterial.opacity = 0.5;

// the lights
var ambientLight = new THREE.AmbientLight(
	0xffffff, 0.2);
scene.add(ambientLight);

var pointLight = new THREE.PointLight(
	0xffffff, 1);
pointLight.position.set(25,50,25);
// specifies which light casts a shadow and
// size of shadow map
pointLight.castShadow = true;
pointLight.shadow.mapSize.width = 1024;
pointLight.shadow.mapSize.height = 1024;
scene.add(pointLight);


/////////OBJECTS////////////
/// this shows how to make an 
/// object constructor //////
var Decoration = function() {

    // Run the Group constructor with the given arguments
    THREE.Group.apply(this, arguments);

    // A random color assignment
    var colors = ['#ff0051', '#f56762','#a53c6c','#f19fa0','#72bdbf','#47689b'];

    // The main bauble is an Octahedron
    var bauble = new THREE.Mesh(
        addNoise(new THREE.OctahedronGeometry(12,1), 2),
        new THREE.MeshStandardMaterial( {
            color: colors[Math.floor(Math.random()*colors.length)],
            shading: THREE.FlatShading ,
            metalness: 0,
            roughness: 1
    } )
    );
    bauble.castShadow = true;
    bauble.receiveShadow = true;
    bauble.rotateZ(Math.random()*Math.PI*2);
    bauble.rotateY(Math.random()*Math.PI*2);
    this.add(bauble);

    // A cylinder to represent the top attachment
    var shapeOne = new THREE.Mesh(
        addNoise(new THREE.CylinderGeometry(4, 6, 10, 6, 1), 0.5),
        new THREE.MeshStandardMaterial( {
            color: 0xf8db08,
            shading: THREE.FlatShading ,
            metalness: 0,
            roughness: 1
        } )
    );
    shapeOne.position.y += 8;
    shapeOne.castShadow = true;
    shapeOne.receiveShadow = true;
    this.add(shapeOne);
};
Decoration.prototype = Object.create(THREE.Group.prototype);
Decoration.prototype.constructor = Decoration;

var decorations = [];

// THIS IS WHERE NEW INSTANCES OF THE CONSTRUCTOR HAPPEN
// Add some new instances of our decoration
var decoration1 = new Decoration();
decoration1.position.y += 10;
scene.add(decoration1);
decorations.push(decoration1);

var decoration2 = new Decoration();
decoration2.position.set(20,15,-30);
decoration2.scale.set(.8,.8,.8);
scene.add(decoration2);
decorations.push(decoration2);

var decoration3 = new Decoration();
decoration3.position.set(-20,20,-12);
scene.add(decoration3);
decorations.push(decoration3);


requestAnimationFrame(render);
function render(){
	renderer.render(scene, camera);
	requestAnimationFrame(render);
}

var controls = new THREE.OrbitControls( camera, renderer.domElement );
controls.target = new THREE.Vector3(0,15,0);
controls.maxPolarAngle = Math.PI / 2;





function addNoise(geometry, noiseX, noiseY, noiseZ) {
    var noiseX = noiseX || 2;
    var noiseY = noiseY || noiseX;
    var noiseZ = noiseZ || noiseY;
    for(var i = 0; i < geometry.vertices.length; i++){
        var v = geometry.vertices[i];
        v.x += -noiseX / 2 + Math.random() * noiseX;
        v.y += -noiseY / 2 + Math.random() * noiseY;
        v.z += -noiseZ / 2 + Math.random() * noiseZ;
    }
    return geometry;
}











