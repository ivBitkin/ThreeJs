window.onload = function() {

  var container, stats;
	var camera, controls, trackBallControls, scene, renderer;
  var objects = [];
  
  var startColor;
  
  
  var figures;
  init();
  animate();
  
	function init() {
    // Create div-container
    container = document.createElement( 'div' );
    document.body.appendChild( container );
    
    camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 5000 );
    camera.position.z = 1000;
    
    trackBallControls = new THREE.TrackballControls( camera );
    trackBallControls.rotateSpeed = 1.0;
    trackBallControls.zoomSpeed = 1.2;
    trackBallControls.panSpeed = 0.8;
    trackBallControls.noZoom = false;
    trackBallControls.noPan = false;
    trackBallControls.staticMoving = true;
    trackBallControls.dynamicDampingFactor = 0.3;


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
    
    
    

    var geometry = [
      new THREE.SphereGeometry( 45, 32, 32 ),
      new THREE.CylinderGeometry( 40, 40, 100, 32 ),
      new THREE.BoxBufferGeometry( 60, 60, 60 )
    ];
    var counter = geometry.length;
    
    function getRandomInt(max) {
      return Math.floor(Math.random() * Math.floor(counter));
    };  
                
    for ( var i = 0; i < 100; i ++ ) {
      figures = new THREE.Mesh( geometry[getRandomInt()],
                    new THREE.MeshLambertMaterial( { color: Math.random() * 0x32a6a6 } ) );

      var position = figures.position.set(Math.random() * 1000 - 500, 
                                          Math.random() * 600 - 300,
                                          Math.random() * (800 - 400));

      var rotation = figures.rotation.set(Math.random() * 2 * Math.PI, 
                                          Math.random() * 2 * Math.PI, 
                                          Math.random() * 2 * Math.PI);
      
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

    var controls = new THREE.DragControls( objects, camera, renderer.domElement );
    controls.addEventListener( 'dragstart', function ( event ) { trackBallControls.enabled = false; } );
    controls.addEventListener( 'dragend', function ( event ) { trackBallControls.enabled = true; } );
    controls.addEventListener( 'dragstart', dragStartCallback );
    controls.addEventListener( 'dragend', dragendCallback );

    function dragStartCallback(event) {
      startColor = event.object.material.color.getHex();
      event.object.material.color.setHex(0x2aed0c);
    }
     
    function dragendCallback(event) {
      event.object.material.color.setHex(startColor);
    }

   


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
    trackBallControls.update();
    renderer.render( scene, camera );
  }




};