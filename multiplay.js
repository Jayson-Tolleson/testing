
window.onload=function(){ 

 // best way to un-global this ...? 
     socket = io.connect(); 

        

            Math.seedrandom('def')

            var players = [];

            var stats;


// custom global variables
var rendererCSS;
// custom global variables
var cube;


            scene = '';
            var camera, renderer //, scene;
            var geometry, material, mesh;
            var controls;

            var objects = [];

            var ray;
            var camera;


            var blocker = document.getElementById( 'blocker' );
            var instructions = document.getElementById( 'instructions' );

            // http://www.html5rocks.com/en/tutorials/pointerlock/intro/

            var havePointerLock = 'pointerLockElement' in document || 'mozPointerLockElement' in document || 'webkitPointerLockElement' in document;

            if ( havePointerLock ) {

                var element = document.body;

                var pointerlockchange = function ( event ) {

                    if ( document.pointerLockElement === element || document.mozPointerLockElement === element || document.webkitPointerLockElement === element ) {

                        controls.enabled = true;

                        blocker.style.display = 'none';

                    } else {

                        controls.enabled = false;

                        blocker.style.display = '-webkit-box';
                        blocker.style.display = '-moz-box';
                        blocker.style.display = 'box';

                        instructions.style.display = '';

                    }

                }

                var pointerlockerror = function ( event ) {

                    instructions.style.display = '';

                }

                // Hook pointer lock state change events
                document.addEventListener( 'pointerlockchange', pointerlockchange, false );
                document.addEventListener( 'mozpointerlockchange', pointerlockchange, false );
                document.addEventListener( 'webkitpointerlockchange', pointerlockchange, false );

                document.addEventListener( 'pointerlockerror', pointerlockerror, false );
                document.addEventListener( 'mozpointerlockerror', pointerlockerror, false );
                document.addEventListener( 'webkitpointerlockerror', pointerlockerror, false );

                instructions.addEventListener( 'click', function ( event ) {

                    instructions.style.display = 'none';

                    // Ask the browser to lock the pointer
                    element.requestPointerLock = element.requestPointerLock || element.mozRequestPointerLock || element.webkitRequestPointerLock;

                    // if ( /Firefox/i.test( navigator.userAgent ) ) {

                    //     var fullscreenchange = function ( event ) {

                    //         if ( document.fullscreenElement === element || document.mozFullscreenElement === element || document.mozFullScreenElement === element ) {

                    //             document.removeEventListener( 'fullscreenchange', fullscreenchange );
                    //             document.removeEventListener( 'mozfullscreenchange', fullscreenchange );

                    //             element.requestPointerLock();
                    //         }

                    //     }

                    //     document.addEventListener( 'fullscreenchange', fullscreenchange, false );
                    //     document.addEventListener( 'mozfullscreenchange', fullscreenchange, false );

                    //     element.requestFullscreen = element.requestFullscreen || element.mozRequestFullscreen || element.mozRequestFullScreen || element.webkitRequestFullscreen;

                    //     element.requestFullscreen();

                    // } else {

                        element.requestPointerLock();

                    // }

                }, false );

            } else {

                instructions.innerHTML = 'Your browser doesn\'t seem to support Pointer Lock API';

            }




// var toggle = false;
// var onKeyUp = function ( event ) {
//     switch( event.keyCode ) {
//         case 66: // b
//         console.log('toogggle')
//             toggle = !toggle;
//             break;
//     }
// };
// document.addEventListener( 'keyup', onKeyUp, false );


            init();
            animate();

            function init() {
me = getUrlVars()["me"];

angle = parseFloat(getUrlVars()["angle"], 10);
if (isNaN(angle)) {
    angle = 0.0;
}
console.log(angle)

slave = getUrlVars()["slave"];
if (!slave) slave = 0



                camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 5000 );

                scene = new THREE.Scene();
                scene.fog = new THREE.Fog( 0xffffff, 0, 750 );
                scene.fog.color.setHSL( 0.6, 0, 1 );

                controls = new THREE.PointerLockControls( camera );
                scene.add( controls.getObject() );
                if (slave === 0)
                {
                    ray = new THREE.Raycaster();
                    ray.ray.direction.set( 0, -1, 0 );

                }



                var light = new THREE.DirectionalLight( 0xffffff, 1.5 );
                light.position.set( 1, 1, 1 );
                scene.add( light );

                var light = new THREE.DirectionalLight( 0xffffff, 0.75 );
                light.position.set( -1, - 0.5, -1 );
                scene.add( light );
                
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
	var floorMaterial = new THREE.MeshBasicMaterial( { map: floorTexture, side: THREE.DoubleSide} );
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

// add 3D text
	var materialFront = new THREE.MeshBasicMaterial( { color: 0xff0000 } );
	var materialSide = new THREE.MeshBasicMaterial( { color: 0x000088 } );
	var materialArray = [ materialFront, materialSide ];
	var textGeom = new THREE.TextGeometry( "Hello, World!", 
	{
		size: 30, height: 4, curveSegments: 3,
		font: "helvetiker", weight: "bold", style: "normal",
		bevelThickness: 1, bevelSize: 2, bevelEnabled: true,
		material: 0, extrudeMaterial: 1
	});
	// font: helvetiker, gentilis, droid sans, droid serif, optimer
	// weight: normal, bold
	
	var textMaterial = new THREE.MeshFaceMaterial(materialArray);
	var textMesh = new THREE.Mesh(textGeom, textMaterial );
	
	textGeom.computeBoundingBox();
	var textWidth = textGeom.boundingBox.max.x - textGeom.boundingBox.min.x;
	
	textMesh.position.set( -0.5 * textWidth, 50, 100 );
	textMesh.rotation.x = -Math.PI / 4;
	scene.add(textMesh);

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

//
//
//                

///TV.s/// //tvone 
////////////
	// CUSTOM //
	////////////
	
	var planeMaterial   = new THREE.MeshBasicMaterial({color: 0x000000, opacity: 0.1, side: THREE.DoubleSide });
	var planeWidth =24;
    var planeHeight = 24;
	var planeGeometry = new THREE.PlaneGeometry( planeWidth, planeHeight );
	var planeMesh= new THREE.Mesh( planeGeometry, planeMaterial );
	planeMesh.position.y += planeHeight/2;
	// add it to the standard (WebGL) scene
	
	planeMesh.position.x += -10;
	planeMesh.position.y += 14;
	planeMesh.position.z +=-14 ;    
	// create a new scene to hold CSS
	cssScene = new THREE.Scene();
	// create the iframe to contain webpage
	var element	= document.createElement('iframe')
	// webpage to be loaded into iframe
	element.src	= "http://stemkoski.github.io/Three.js/index.html";
	// width of iframe in pixels
	var elementWidth = 1024;
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
	
		    
		    
		    
		




	//tvtwo
	//planeMesh.position.x += 18.4;
//	planeMesh.position.y += 14;
//	planeMesh.position.z +=-14 ;

		    // // objects

                geometry = new THREE.BoxGeometry( 2, 2, 2 );

                for ( var i = 0, l = geometry.faces.length; i < l; i ++ ) {

                    var face = geometry.faces[ i ];
                    face.vertexColors[ 0 ] = new THREE.Color().setHSL( Math.random() * 0.2 + 0.5, 0.75, Math.random() * 0.25 + 0.75 );
                    face.vertexColors[ 1 ] = new THREE.Color().setHSL( Math.random() * 0.2 + 0.5, 0.75, Math.random() * 0.25 + 0.75 );
                    face.vertexColors[ 2 ] = new THREE.Color().setHSL( Math.random() * 0.2 + 0.5, 0.75, Math.random() * 0.25 + 0.75 );

                }

                for ( var i = 0; i < 500; i ++ ) {

                    material = new THREE.MeshPhongMaterial( { specular: 0xffffff, shading: THREE.FlatShading, vertexColors: THREE.VertexColors } );

                    var mesh = new THREE.Mesh( geometry, material );
                    mesh.position.x = Math.floor( Math.random() * 20 - 10 ) * 20;
                    mesh.position.y = Math.floor( Math.random() * 20 ) * 20 + 10;
                    mesh.position.z = Math.floor( Math.random() * 20 - 10 ) * 20;

                    mesh.receiveShadow = true;
                    mesh.castShadow = true;
                    scene.add( mesh );

                    material.color.setHSL( Math.random() * 0.2 + 0.5, 0.75, Math.random() * 0.25 + 0.75 );

                    objects.push( mesh );

                }

                //




    createThing = function(name) {  
        var p = new THREE.Mesh(
            new THREE.BoxGeometry(5, 10, 5),
            new THREE.MeshBasicMaterial({
                color: 0x0000ff,
                wireframe: false
            })
        );
        p.castShadow = true;
        p.receiveShadow = true;
        p.name = name
        scene.add( p );
        p.position.y = 0;
        p.position.z = 0;

        players.push(name)
    }

    deleteThing = function(name) {
        scene.remove(scene.getObjectByName(name))
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


if (window.WebGLRenderingContext)
    renderer = new THREE.WebGLRenderer();
                // renderer = new THREE.WebGLRenderer( { antialias: true } );
else
    renderer = new THREE.CanvasRenderer();

                renderer.setSize( window.innerWidth, window.innerHeight );
                document.body.appendChild( renderer.domElement );

                renderer.setClearColor( scene.fog.color, 1 );

                renderer.gammaInput = true;
                renderer.gammaOutput = true;

                renderer.shadowMapEnabled = true;
                renderer.shadowMapCullFace = THREE.CullFaceBack;

                stats = new Stats();
                setInterval( function () {
                    stats.begin();
                    // your code goes here
                    stats.end();
                }, 1000 / 60 );
                document.body.appendChild( stats.domElement );

                window.addEventListener( 'resize', onWindowResize, false );

            }

            function onWindowResize() {

                camera.aspect = window.innerWidth / window.innerHeight;
                camera.updateProjectionMatrix();

                renderer.setSize( window.innerWidth, window.innerHeight );
                // effect.setSize( window.innerWidth, window.innerHeight  );

            }
            function animate() {

                requestAnimationFrame( animate );

                if (slave === 0)
                {
                    controls.isOnObject( false );

                    ray.ray.origin.copy( controls.getObject().position );
                    ray.ray.origin.y -= 10;

                    var intersections = ray.intersectObjects( objects );

                    if ( intersections.length > 0 ) {
                        var distance = intersections[ 0 ].distance;
                        if ( distance > 0 && distance < 10 ) {
                            controls.isOnObject( true );
                        }
                    }

                    controls.update();
// if (me === 'u2')
// {
//     console.log(camera)
// }

                }


                renderer.render( scene, camera );
        	rendererCSS.render( cssScene, camera );

	        rendererCSS.render( cssScene2, camera );

            }
        }
