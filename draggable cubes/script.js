window.onload = function() {

  var container, stats;
	var camera, controls, scene, renderer;
  var objects = [];
  // var group = new Group();
  
  init();
  animate();
  
	function init() {
    // Create div-container
    container = document.createElement( 'div' );
    document.body.appendChild( container );
    
    camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 5000 );
    camera.position.z = 1000;
    
    controls = new THREE.TrackballControls( camera );
    controls.rotateSpeed = 1.0;
    controls.zoomSpeed = 1.2;
    controls.panSpeed = 0.8;
    controls.noZoom = false;
    controls.noPan = false;
    controls.staticMoving = true;
    controls.dynamicDampingFactor = 0.3;


    scene = new THREE.Scene();
    scene.background = new THREE.Color( 0x915b10);
    scene.add( new THREE.AmbientLight( 0x505050 ) );

    var light = new THREE.SpotLight( 0xffffff, 1.5 );
    light.position.set( 0, 500, 2000 );
    light.angle = Math.PI / 9;
    light.castShadow = true;
    light.shadow.camera.near = 1000;
    light.shadow.camera.far = 4000;
    light.shadow.mapSize.width = 1024;
    light.shadow.mapSize.height = 1024;
    scene.add( light );
    
    var options = {
      Geometry: function getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor());
      }
    };
    

    var geometry = [
      new THREE.SphereGeometry( 45, 32, 32 ),
      new THREE.CylinderGeometry( 40, 40, 100, 32 ),
      new THREE.BoxBufferGeometry( 60, 60, 60 )
    ];
    var counter = geometry.length;
    
    function getRandomInt(max) {
      return Math.floor(Math.random() * Math.floor(counter));
    };  
                
    for ( var i = 0; i < 40; i ++ ) {
      var figures = new THREE.Mesh( geometry[getRandomInt()],
                    new THREE.MeshLambertMaterial( { color: Math.random() * 0x32a6a6 } ) );
      figures.position.x = Math.random() * 1000 - 500;
      figures.position.y = Math.random() * 600 - 300;
      figures.position.z = Math.random() * 800 - 400;
      figures.rotation.x = Math.random() * 2 * Math.PI;
      figures.rotation.y = Math.random() * 2 * Math.PI;
      figures.rotation.z = Math.random() * 2 * Math.PI;
      figures.castShadow = true;
      figures.receiveShadow = true;

      scene.add( figures );
      objects.push( figures );
     
    }

    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;
    container.appendChild( renderer.domElement );

    var dragControls = new THREE.DragControls( objects, camera, renderer.domElement );
    dragControls.addEventListener( 'dragstart', function ( event ) { controls.enabled = false; } );
    dragControls.addEventListener( 'dragend', function ( event ) { controls.enabled = true; } );

    var info = document.createElement( 'div' );
    info.style.position = 'absolute';
    info.style.top = '10px';
    info.style.width = '100%';
    info.style.textAlign = 'center';
    info.innerHTML = 'Manufactory - draggable cubes <h1 class = "logo" > Way of the developer</h1>';
    container.appendChild( info );
    //Fps
    stats = new Stats();
    stats.domElement.style.cssText="position:absolute; bottom:0; left:0; cursor:pointer; opacity:0.7;";
    container.appendChild( stats.dom );
    
    window.addEventListener( 'resize', onWindowResize, false );
   
  };

  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
  }
  function animate() {
    requestAnimationFrame( animate );
    render();
    stats.update();
  }
  function render() {
    controls.update();
    renderer.render( scene, camera );
  }




};