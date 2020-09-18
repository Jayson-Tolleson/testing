window.onload=function(){ 

 // best way to un-global this ...? 
     socket = io.connect(); 

        

            Math.seedrandom('def')






navigator.getUserMedia = navigator.webkitGetUserMedia || navigator.getUserMedia;
window.URL = window.URL || window.webkitURL;

var camvideo = document.getElementById('monitor');

	if (!navigator.getUserMedia) 
	{
		document.getElementById('errorMessage').innerHTML = 
			'Sorry. <code>navigator.getUserMedia()</code> is not available.';
		return;
	}
	navigator.getUserMedia({video: true}, gotStream, noStream);

function gotStream(stream) 
{
	if (window.URL) 
	{   camvideo.src = window.URL.createObjectURL(stream);   } 
	else // Opera
	{   camvideo.src = stream;   }

	camvideo.onerror = function(e) 
	{   stream.stop();   };

	stream.onended = noStream;
}

function noStream(e) 
{
	var msg = 'No camera available.';
	if (e.code == 1) 
	{   msg = 'User denied access to use camera.';   }
	document.getElementById('errorMessage').textContent = msg;
}




// MAIN

// standard global variables
var container, scene, camera, renderer, controls, stats;
var keyboard = new THREEx.KeyboardState();
var clock = new THREE.Clock();

// custom global variables
var video, videoImage, videoImageContext, videoTexture;


// custom global variables
var rendererCSS;
// custom global variables
var cube;

// custom global variables 
var cube; var parameters; var gui;


var player = new THREE.Object3D();

init();
animate();

// FUNCTIONS 		
function init() 
{
	// SCENE
	scene = new THREE.Scene();
	// CAMERA
	var SCREEN_WIDTH = window.innerWidth, SCREEN_HEIGHT = window.innerHeight;
	var VIEW_ANGLE = 45, ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT, NEAR = 0.1, FAR = 20000;
	camera = new THREE.PerspectiveCamera( VIEW_ANGLE, ASPECT, NEAR, FAR);
	scene.add(camera);
	camera.position.set(0,0,400);
	camera.lookAt(scene.position);	
	// RENDERER
	if ( Detector.webgl )
		renderer = new THREE.WebGLRenderer( { antialias:true } );
	else
		renderer = new THREE.CanvasRenderer(); 
	renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
	container = document.createElement( 'div' );
	// CSS added so the hidden HTML elements do not reposition this one
	container.style.cssText = "position:absolute;top:0px;left:0px;";
	document.body.appendChild( container );
	container.appendChild( renderer.domElement );
	// CONTROLS
	// disabled for manual repositioning of camera.
	//  controls = new THREE.TrackballControls( camera );
	// EVENTS
	THREEx.WindowResize(renderer, camera);
	THREEx.FullScreen.bindKey({ charCode : 'm'.charCodeAt(0) });
	// STATS
	stats = new Stats();
	stats.domElement.style.position = 'absolute';
	stats.domElement.style.bottom = '0px';
	stats.domElement.style.zIndex = 100;
	container.appendChild( stats.domElement );
	// LIGHT
	var light = new THREE.PointLight(0xffffff);
	light.position.set(0,250,0);
	scene.add(light);
//moontop//


//GUI// 




var cubeGeometry = new THREE.CubeGeometry( 5, 5, 5 );
	var cubeMaterial = new THREE.MeshBasicMaterial( { color: 0x000088 } );
	cube = new THREE.Mesh( cubeGeometry, cubeMaterial );
	cube.position.set(0,6,0);
	scene.add(cube);



////////add player



	scene.add( player );







//gui




	var gui = new dat.GUI();
	
	var parameters = 
	{
		a: 200, // numeric
		b: 200, // numeric slider
		c: "Hello, i am on lftr.biz!!!!", // string
		d: false, // boolean (checkbox)
		e: "#ff8800", // color (hex)
		f: function() { alert("Hello!") },
		g: function() { alert( parameters.c ) },
		v : 0,    // dummy value, only type is important
		w: "...", // dummy value, only type is important
		x: 0, y: 0, z: 0
	};


	// gui.add( parameters )
	gui.add( parameters, 'a' ).name('Number');
	gui.add( parameters, 'b' ).min(128).max(256).step(16).name('Slider');
	gui.add( parameters, 'c' ).name('String');
	gui.add( parameters, 'd' ).name('Boolean');
	
	gui.addColor( parameters, 'e' ).name('Color');
	
	var numberList = [1, 2, 3];
	gui.add( parameters, 'v', numberList ).name('List');
	
	var stringList = ["One", "Two", "Three"];
	gui.add( parameters, 'w', stringList ).name('List');
	
	gui.add( parameters, 'f' ).name('Say "Hello!"');
	gui.add( parameters, 'g' ).name("Alert Message");
	
	var folder1 = gui.addFolder('Coordinates');
	folder1.add( parameters, 'x' );
	folder1.add( parameters, 'y' );
	folder1.close();
	gui.open();








                
/*moontop*/
//
//
//
var floorTexture = new THREE.ImageUtils.loadTexture( 'js/checkerboard.jpg' );
	floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping; 
	floorTexture.repeat.set( 10, 10 );
	var floorMaterial = new THREE.MeshBasicMaterial( { map: floorTexture, side: THREE.DoubleSide } );
	var floorGeometry = new THREE.PlaneGeometry(100, 100, 10, 10);
	var floor = new THREE.Mesh(floorGeometry, floorMaterial);
	floor.position.y = 5;
	floor.rotation.x = Math.PI / 2;
	scene.add(floor);
	// FLOOR
	var floorTexture = new THREE.ImageUtils.loadTexture( 'js/moontop.jpg' );
	floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping; 
	floorTexture.repeat.set( 1, 1);
	var floorMaterial = new THREE.MeshBasicMaterial( { map: floorTexture, side: THREE.DoubleSide } );
	var floorGeometry = new THREE.PlaneGeometry(400, 400, 10, 10);
	var floor = new THREE.Mesh(floorGeometry, floorMaterial);
	floor.position.y = 4.5;
	floor.rotation.x = Math.PI / 2;
	scene.add(floor);
	// FLOOR
	var floorTexture = new THREE.ImageUtils.loadTexture( 'js/sea.jpg' );
	floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping; 
	floorTexture.repeat.set( 1.2,1.2 );
	var floorMaterial = new THREE.MeshBasicMaterial( { map: floorTexture, side: THREE.DoubleSide } );
	var floorGeometry = new THREE.PlaneGeometry(1000, 1000, 10, 10);
	var floor = new THREE.Mesh(floorGeometry, floorMaterial);
	floor.position.y = 4.2;
	floor.rotation.x = Math.PI / 2;
	scene.add(floor);

	////////////
	// CUSTOM //
	////////////


	
	var imagePrefix = "js/dawnmountain-";
	var directions  = ["xpos", "xneg", "ypos", "yneg", "zpos", "zneg"];
	var imageSuffix = ".png";
	var skyGeometry = new THREE.CubeGeometry(500, 500, 500 );	
	
	var materialArray = [];
	for (var i = 0; i < 6; i++)
		materialArray.push( new THREE.MeshBasicMaterial({
			map: THREE.ImageUtils.loadTexture( imagePrefix + directions[i] + imageSuffix ),
			side: THREE.BackSide
		}));
	var skyMaterial = new THREE.MeshFaceMaterial( materialArray );
	var skyBox = new THREE.Mesh( skyGeometry, skyMaterial );
	scene.add( skyBox );
	
	var imagePrefix = "js/nebula-";
	var directions  = ["xpos", "xneg", "ypos", "yneg", "zpos", "zneg"];
	var imageSuffix = ".png";
	var skyGeometry = new THREE.CubeGeometry(1000, 498, 1000 );	
	
	var materialArray = [];
	for (var i = 0; i < 6; i++)
		materialArray.push( new THREE.MeshBasicMaterial({
			map: THREE.ImageUtils.loadTexture( imagePrefix + directions[i] + imageSuffix ),
			side: THREE.BackSide
		}));
	var skyMaterial = new THREE.MeshFaceMaterial( materialArray );
	var skyBox = new THREE.Mesh( skyGeometry, skyMaterial );
	scene.add( skyBox );






	//backwall
        var planeMaterial   = new THREE.MeshBasicMaterial({color: 0x32cd32, side: THREE.DoubleSide });
	var planeWidth = 62;
        var planeHeight = 42;
	var planeGeometry = new THREE.PlaneGeometry( planeWidth, planeHeight );
	var planeMesh= new THREE.Mesh( planeGeometry, planeMaterial );
	planeMesh.position.x += 0;
	planeMesh.position.y += 11;
	planeMesh.position.z += -22;
	planeMesh.rotation.x = 0;
	planeMesh.rotation.y = 0;
	// add it to the standard (WebGL) scene
	scene.add(planeMesh);

	//frontwall
        var planeMaterial   = new THREE.MeshBasicMaterial({color: 0xede5d1, side: THREE.DoubleSide });
	var planeWidth = 52;
        var planeHeight = 6;
	var planeGeometry = new THREE.PlaneGeometry( planeWidth, planeHeight );
	var planeMesh= new THREE.Mesh( planeGeometry, planeMaterial );
	planeMesh.position.x += 0;
	planeMesh.position.y += 33;
	planeMesh.position.z += 22;
	planeMesh.rotation.x = 0;
	planeMesh.rotation.y = 0;
	// add it to the standard (WebGL) scene
	scene.add(planeMesh);


	//sidewall1closed
        var planeMaterial   = new THREE.MeshBasicMaterial({color: 0x32cd32, side: THREE.DoubleSide });
	var planeWidth = 52;
        var planeHeight = 44;
	var planeGeometry = new THREE.PlaneGeometry( planeWidth, planeHeight );
	var planeMesh= new THREE.Mesh( planeGeometry, planeMaterial );
	planeMesh.position.x += 31;
	planeMesh.position.y += 11;
	planeMesh.position.z += 0;
	planeMesh.rotation.x = Math.PI / 2;
	planeMesh.rotation.y = Math.PI / 2;
	// add it to the standard (WebGL) scene
	scene.add(planeMesh);

	//sidewallopen
        var planeMaterial   = new THREE.MeshBasicMaterial({color: 0x32cd32, side: THREE.DoubleSide });
	var planeWidth = 52;
        var planeHeight = 44;
	var planeGeometry = new THREE.PlaneGeometry( planeWidth, planeHeight );
	var planeMesh= new THREE.Mesh( planeGeometry, planeMaterial );
	planeMesh.position.x += -31;
	planeMesh.position.y += 11;
	planeMesh.position.z += 0;
	planeMesh.rotation.x = Math.PI / 2;
	planeMesh.rotation.y = Math.PI / 2;
	// add it to the standard (WebGL) scene
	scene.add(planeMesh);



	//roof
        var planeMaterial   = new THREE.MeshBasicMaterial({color: 0x000000, side: THREE.DoubleSide });
	var planeWidth = 70;
        var planeHeight = 34;
	var planeGeometry = new THREE.PlaneGeometry( planeWidth, planeHeight );
	var planeMesh= new THREE.Mesh( planeGeometry, planeMaterial );
	planeMesh.position.x += 0;
	planeMesh.position.y += 42;
	planeMesh.position.z += -12;
	planeMesh.rotation.x = Math.PI / 4;
	planeMesh.rotation.y = 0;
	// add it to the standard (WebGL) scene
	scene.add(planeMesh);

	//roof
        var planeMaterial   = new THREE.MeshBasicMaterial({color: 0x000000, side: THREE.DoubleSide });
	var planeWidth = 70;
        var planeHeight = 34;
	var planeGeometry = new THREE.PlaneGeometry( planeWidth, planeHeight );
	var planeMesh= new THREE.Mesh( planeGeometry, planeMaterial );
	planeMesh.position.x += 0;
	planeMesh.position.y += 42;
	planeMesh.position.z += 12;
	planeMesh.rotation.x = Math.PI / -4;
	planeMesh.rotation.y = 0;
	// add it to the standard (WebGL) scene
	scene.add(planeMesh);
///TV.s/// //tvone 

//tvone
	var planeMaterial   = new THREE.MeshBasicMaterial({color: 0x000000, opacity: 0.1, side: THREE.DoubleSide });
	var planeWidth = 24;
        var planeHeight = 24;
	var planeGeometry = new THREE.PlaneGeometry( planeWidth, planeHeight );
	var planeMesh= new THREE.Mesh( planeGeometry, planeMaterial );
	planeMesh.position.x += -10;
	planeMesh.position.y += 14;
	planeMesh.position.z +=-14 ;
	// add it to the standard (WebGL) scene
	scene.add(planeMesh);
	// create a new scene to hold CSS
	cssScene = new THREE.Scene();
	// create the iframe to contain webpage
	var element	= document.createElement('iframe')
	// webpage to be loaded into iframe
	element.src	= "https://lftr.biz/cgi-bin/lftr/broadcast.py#hello";
	// width of iframe in pixels
	var elementWidth = 24;
	// force iframe to have same relative dimensions as planeGeometry
	var aspectRatio = planeHeight / planeWidth;
	var elementHeight = elementWidth * aspectRatio;
	element.style.width  = elementWidth + "px";
	element.style.height = elementHeight + "px";
	
	// create a CSS3DObject to display element
	var cssObject = new THREE.CSS3DObject( element );
	// synchronize cssObject position/rotation with planeMesh position/rotation 
	cssObject.position = planeMesh.position;
	cssObject.rotation = planeMesh.rotation;
	// resize cssObject to same size as planeMesh (plus a border)
	var percentBorder = 0.05;
	cssObject.scale.x /= (1 + percentBorder) * (elementWidth / planeWidth);
	cssObject.scale.y /= (1 + percentBorder) * (elementWidth / planeWidth);
	cssScene.add(cssObject);
	// create a renderer for CSS
	rendererCSS	= new THREE.CSS3DRenderer();
/**

	rendererCSS.setSize( window.innerWidth, window.innerHeight );
	rendererCSS.domElement.style.position = 'absolute';
	rendererCSS.domElement.style.top	  = 0;
	rendererCSS.domElement.style.margin	  = 0;
	rendererCSS.domElement.style.padding  = 0;
	document.body.appendChild( rendererCSS.domElement );



	// when window resizes, also resize this renderer
	THREEx.WindowResize(rendererCSS, camera);

	renderer.domElement.style.position = 'absolute';
	renderer.domElement.style.top      = 0;
	// make sure original renderer appears on top of CSS renderer
	renderer.domElement.style.zIndex   = 1;
	rendererCSS.domElement.appendChild( renderer.domElement );






**/




	//tvtwo
	var planeMaterial   = new THREE.MeshBasicMaterial({color: 0x000000, opacity: 0.1, side: THREE.DoubleSide });
	var planeWidth = 24;
        var planeHeight = 24;
	var planeGeometry = new THREE.PlaneGeometry( planeWidth, planeHeight );
	var planeMesh= new THREE.Mesh( planeGeometry, planeMaterial );
	planeMesh.position.x += 18.4;
	planeMesh.position.y += 14;
	planeMesh.position.z +=-14 ;
	// add it to the standard (WebGL) scene
	scene.add(planeMesh);
	
	// create a new scene to hold CSS
	cssScene2 = new THREE.Scene();
	// create the iframe to contain webpage
	var element2	= document.createElement('iframe')
	// webpage to be loaded into iframe
	element2.src	= "https://lftr.biz/map.html";
	// width of iframe in pixels
	var elementWidth = 24;
	// force iframe to have same relative dimensions as planeGeometry
	var aspectRatio = planeHeight / planeWidth;
	var elementHeight = elementWidth * aspectRatio;
	element2.style.width  = elementWidth + "px";
	element2.style.height = elementHeight + "px";
	
	// create a CSS3DObject to display element
	var cssObject2 = new THREE.CSS3DObject( element2 );
	// synchronize cssObject position/rotation with planeMesh position/rotation 
	cssObject2.position = planeMesh.position;
	cssObject2.rotation = planeMesh.rotation;
	// resize cssObject to same size as planeMesh (plus a border)
	var percentBorder = 0.05;
	cssObject2.scale.x /= (1 + percentBorder) * (elementWidth / planeWidth);
	cssObject2.scale.y /= (1 + percentBorder) * (elementWidth / planeWidth);
	cssScene2.add(cssObject2);
	










//add the player

	
	scene.add( player );
	
	///////////
	// VIDEO //
	///////////

	video = document.getElementById( 'monitor' );
	
	videoImage = document.getElementById( 'videoImage' );
	videoImageContext = videoImage.getContext( '2d' );
	// background color if no video present
	videoImageContext.fillStyle = '#000000';
	videoImageContext.fillRect( 0, 0, videoImage.width, videoImage.height );

	videoTexture = new THREE.Texture( videoImage );
	videoTexture.minFilter = THREE.LinearFilter;
	videoTexture.magFilter = THREE.LinearFilter;
	
	var movieMaterial = new THREE.MeshBasicMaterial( { map: videoTexture, overdraw: true, side:THREE.DoubleSide } );
	// the geometry on which the movie will be displayed;
	var movieGeometry = new THREE.PlaneGeometry( 100, 100, 1, 1 );
	// attach video to a mesh that will move with the camera
	this.movieScreen = new THREE.Mesh( movieGeometry, movieMaterial );

	// add a frame to the image.
	var frameGeo = new THREE.CubeGeometry(120, 120, 20);
	var frameMat = new THREE.MeshLambertMaterial( {color:0x888888, emissive:0x000011} );
	this.frameMesh = new THREE.Mesh( frameGeo, frameMat );
	
	// "attach" player to camera
	player.position = camera.position;
	player.rotation = camera.rotation;
	player.add( movieScreen );
	player.add( frameMesh );
	// position the movieScreen so it is attached
	//   to the front and center of the frameMesh
	movieScreen.position.y = 5;
	movieScreen.position.z = -12;
}	


 socket.on('m4', function(data) {
        // new player
        obj = JSON.parse(data);
        console.log('received new player: ' + obj.name)
        // CREATE SPRITE HERE
        createThing(obj.name)
    });

    socket.on('m6', function(data) {
        // newly connected, get player list
        obj = JSON.parse(data);
        console.log('get player list: ' + obj)
        obj.forEach(function(entry) {
            createThing(entry);
        });
    });

    socket.on('m5', function(data) {
        // delete player
        obj = JSON.parse(data);
        console.log('delete player: ' + obj.name)
        // CREATE SPRITE HERE
        deleteThing(obj.name)
    });

    socket.on('m2', function(data) {
        // receive coordinates and rotation
        obj = JSON.parse(data);

    if (slave == obj.n)
    {
        // console.log(angle)
        camera.parent.parent.position.x = obj.cx;
        camera.parent.parent.position.y = obj.cy;
        camera.parent.parent.position.z = obj.cz;
        camera.parent.rotation.x = obj.rx;
        camera.parent.parent.rotation.y = obj.ry + angle;
    }
    else
    {
        scene.getObjectByName( obj.n).position.x = obj.cx;
        scene.getObjectByName( obj.n).position.y = obj.cy;
        scene.getObjectByName( obj.n).position.z = obj.cz;
        scene.getObjectByName( obj.n).rotation.x = obj.rx;
        scene.getObjectByName( obj.n).rotation.y = obj.ry;
        scene.getObjectByName( obj.n).rotation.z = obj.rz;
    }
    });

yawObject = '';

function getUrlVars() {
    var vars = {}, parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi,    
    function(m,key,value) { vars[key] = value;});
    return vars;
  }


socket.on('connect', function() { 
    console.log( me +' connected to server');
    socket.emit('m3', JSON.stringify({'name': me}))

if (!slave == 0){
    // controls.enabled = true;
    blocker.style.display = 'none';
}


});
socket.on('disconnect', function() { 
    console.log('disconnected from server'); 
});





function animate() 
{
    requestAnimationFrame( animate );
	render();		
	update();
}

function update()
{		
	if ( keyboard.pressed("p") ) // pause webcam
		video.pause();
	if ( keyboard.pressed("r") ) // resume webcam
		video.play();
		
	var delta = clock.getDelta(); // seconds.
	var moveDistance = 100 * delta; // 100 pixels per second
	var rotateAngle = Math.PI / 2 * delta;   // pi/2 radians (90 degrees) per second

	var previousPosition = camera.position.clone();
	var previousRotation = camera.rotation.clone();
	
	// move forwards/backwards/left/right (local coordinates)
	if ( keyboard.pressed("W") )
		camera.translateZ( -moveDistance );
	if ( keyboard.pressed("S") )
		camera.translateZ(  moveDistance );
	if ( keyboard.pressed("Q") )
		camera.translateX( -moveDistance );
	if ( keyboard.pressed("E") )
		camera.translateX(  moveDistance );	

	// rotate left/right/up/down
	if ( keyboard.pressed("A") )
		camera.rotateOnAxis( new THREE.Vector3(0,1,0), rotateAngle);
	if ( keyboard.pressed("D") )
		camera.rotateOnAxis( new THREE.Vector3(0,1,0), -rotateAngle);
	
	var d = camera.position.distanceTo( mirrorSphere.position );
	if ( d > 500 || d < 60 )
	{
		camera.position = previousPosition;
		camera.rotation = previousRotation;
		player.position = camera.position;
		player.rotation = camera.rotation;
	}
	
	stats.update();
}

function render() 
{	
	// update image from webcam
	if ( video.readyState === video.HAVE_ENOUGH_DATA ) 
	{
		videoImageContext.drawImage( video, 0, 0, videoImage.width, videoImage.height );
		if ( videoTexture ) 
			videoTexture.needsUpdate = true;
	}

	// update cameras
	var SCREEN_WIDTH = window.innerWidth, SCREEN_HEIGHT = window.innerHeight;
	camera.aspect = 0.5 * SCREEN_WIDTH / SCREEN_HEIGHT;
	camera.updateProjectionMatrix();
	topCamera.aspect = 0.5 * SCREEN_WIDTH / SCREEN_HEIGHT;
	topCamera.updateProjectionMatrix();

	// setViewport parameters:
	//  lower_left_x, lower_left_y, viewport_width, viewport_height
	renderer.setViewport( 0, 0, SCREEN_WIDTH, SCREEN_HEIGHT );
	//renderer.clear();
	
	// left side
	renderer.setViewport( 1, 1,   0.5 * SCREEN_WIDTH - 2, SCREEN_HEIGHT - 2 );
	
	// move the CubeCamera to the position of the object
	//    that has a reflective surface, "take a picture" in each direction
	//    and apply it to the surface.
	// need to hide mirror surface before and after so that it does not
	//    "get in the way" of the camera
	movieScreen.visible = true;
	mirrorSphere.visible = false;
	
	renderer.autoClear = true;		
	mirrorSphereCamera.updateCubeMap( renderer, scene );
	renderer.autoClear = false;
	
	mirrorSphere.visible = true;
	movieScreen.visible = false;
	renderer.render( scene, camera );

	// right side
	movieScreen.visible = true;
	mirrorSphere.visible = true;
	renderer.setViewport( 0.5 * SCREEN_WIDTH + 1, 1,   0.5 * SCREEN_WIDTH - 2, SCREEN_HEIGHT - 2 );
	renderer.render( scene, topCamera );	
}
}
