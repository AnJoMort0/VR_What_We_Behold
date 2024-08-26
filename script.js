let wih = window.innerHeight;
let wiw = window.innerWidth;

// Create a scene
let scene = new THREE.Scene();

// Create a camera
let camera = new THREE.PerspectiveCamera(75, wiw / wih, 0.1, 1000);
camera.position.z = 5;

// Create a Rendering Engine
let rendEng = new THREE.WebGLRenderer({ antialias: true });
// Adapt to Window Size
rendEng.setSize(wiw, wih);

// Add rendEng to the scene
document.body.appendChild(rendEng.domElement);

// Load the texture for the skybox
const loader = new THREE.TextureLoader();
loader.load('sprites/bg.png', function (texture) {
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(4, 4); // Repeat the texture

    // Create the main skybox sphere
    let geometry = new THREE.SphereGeometry(500, 32, 32);
    let material = new THREE.MeshBasicMaterial({
        map: texture,
        side: THREE.BackSide // Render the inside of the sphere
    });
    let skybox = new THREE.Mesh(geometry, material);
    scene.add(skybox);

    // Create a second sphere for the white top
    let whiteGeometry = new THREE.SphereGeometry(500, 32, 32);
    let whiteMaterial = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        side: THREE.BackSide // Render the inside of the sphere
    });

    let whiteSphere = new THREE.Mesh(whiteGeometry, whiteMaterial);
    whiteSphere.scale.set(1.01, 1.01, 1.01); // Slightly larger to avoid z-fighting

    // Clip the bottom 75% of the white sphere
    whiteSphere.position.y = 250; // Move the white sphere up to cover the top

    scene.add(whiteSphere);
});

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    rendEng.render(scene, camera);
}

animate();