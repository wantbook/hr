THREE.HeadControls = function ( object, camera, domElement, scene, useHelper ) {

	this.object = object;
    this.camera = camera;
	this.domElement = ( domElement !== undefined ) ? domElement : document;

	this.enabled = true;
	this.target = camera.position.clone();
    this.dist = camera.position.clone();

    this.offset = new THREE.Vector3( 0, -1, 0 );

    this.projector = new THREE.Projector();

	var scope = this;


    if (useHelper) {
        var helper = new THREE.Object3D( );
        var mat = new THREE.LineBasicMaterial( {color: 0xba7418, linewidth:2} );

        var r1geo = new THREE.Geometry();
        var r2geo = new THREE.Geometry();
        var r3geo = new THREE.Geometry();
        var vlgeo = new THREE.Geometry();
        var hlgeo = new THREE.Geometry();
        for ( var i = 0, l = 100; i <= l; i++ ) {
            var segment = ( i * 3.6 ) * Math.PI / 180;
            r1geo.vertices.push( new THREE.Vertex( new THREE.Vector3( Math.cos( segment ) * 0.25, Math.sin( segment ) * 0.25, 0 ) ) );
            r2geo.vertices.push( new THREE.Vertex( new THREE.Vector3( Math.cos( segment ) * 0.15, Math.sin( segment ) * 0.15 ), 0 ) );
            r3geo.vertices.push( new THREE.Vertex( new THREE.Vector3( Math.cos( segment ) * 0.06, Math.sin( segment ) * 0.06 ), 0 ) );
        }
        vlgeo.vertices.push( new THREE.Vertex( new THREE.Vector3(0,0.3,0) ) );
        vlgeo.vertices.push( new THREE.Vertex( new THREE.Vector3(0,-0.3,0) ) );
        hlgeo.vertices.push( new THREE.Vertex( new THREE.Vector3(0.3,0,0) ) );
        hlgeo.vertices.push( new THREE.Vertex( new THREE.Vector3(-0.3,0,0) ) );

        helper.add( new THREE.Line(r1geo, mat) );
        helper.add( new THREE.Line(r2geo, mat) );
        helper.add( new THREE.Line(r3geo, mat) );
        helper.add( new THREE.Line(vlgeo, mat) );
        helper.add( new THREE.Line(hlgeo, mat) );

        helper.position = this.target;
        scene.add(helper);
    }

    this.setMesh = function( mesh ) {
    
        scope.object = mesh;

    }

	this.update = function ( delta ) {

        var dist = scope.dist.clone()//.add( scope.offset );
        scope.target.add( dist.sub( scope.target ).multiplyScalar(delta * 10) );

        scope.object.lookAt( scope.target.clone().add(scope.offset) );
        // console.clear();
        // console.log( scope.target );

	};

	function onMouseMove( event ) {

        scope.dist.set(
                  ( event.offsetX / domElement.width  ) * 2 - 1,
                - ( event.offsetY / domElement.height ) * 2 + 1,
                  3
        );

        scope.projector.unprojectVector( scope.dist, scope.camera )

        var dir = scope.dist.sub( scope.camera.position ).normalize();

        scope.dist.copy( scope.camera.position.clone().add( dir.multiplyScalar( -3 ) ) );

	}
	
	function touchstart( event ) {

	}

	function touchmove( event ) {

	}

	function touchend( /* event */ ) {

	}

	this.domElement.addEventListener( 'contextmenu', function ( event ) { event.preventDefault(); }, false );

    domElement.addEventListener( 'mousemove', onMouseMove, false );

	this.domElement.addEventListener( 'touchstart', touchstart, false );
	this.domElement.addEventListener( 'touchend', touchend, false );
	this.domElement.addEventListener( 'touchmove', touchmove, false );

};

THREE.HeadControls.prototype = Object.create( THREE.EventDispatcher.prototype );
