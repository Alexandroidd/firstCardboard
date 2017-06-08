var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 500);
camera.position.set(0, 0, 100);
camera.lookAt(new THREE.Vector3(0, 0, 0));

var scene = new THREE.Scene();

var geometryTwo = new THREE.BoxGeometry(20,20,20);
var materialTwo = new THREE.MeshNormalMaterial();
var cube = new THREE.Mesh(geometryTwo, materialTwo);
scene.add(cube);

cube.position.x = -30;
cube.position.y = 20;

cube.rotation.x = 0.7;
cube.rotation.y = -0.2;

var loader = new THREE.FontLoader();
loader.load('js/helvetiker_regular.typeface.json', function(font){

	var textGeo = new THREE.TextGeometry('Hello World', {
		font: font, 
		size: 80,
		height: 5,
		curveSegmets: 12,
		bevelEnabled: true,
		bevelThickness: 10,
		bevelSize: 8,
		bevewlSegments: 5
	});
});





var render = function() {
	requestAnimationFrame(render);
	renderer.render(scene,camera);
	cube.rotation.x += 0.1;
	cube.rotation.y += 0.05;
};

render();