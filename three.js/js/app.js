"use strict";

window.facesLoaded = false;

function init( name ){

    var renderer = new THREE.WebGLRenderer( { antialias: false } );
    renderer.setSize( 355, 343 );
    
    var container = document.getElementById( "wgl-app" );
    container.appendChild( renderer.domElement );
    
    var clock = new THREE.Clock();
    var faceList = ["programmer", "girl", "advokat"];
    var loader = new THREE.JSONLoader();
    var faces = {};
    var scene, camera, character, lookAtPos, mouseVec;

    var loaded = function( ) {
    
        scene = new THREE.Scene( );
        
        camera = new THREE.PerspectiveCamera( 45, 355 / 343, 0.1, 1000 );
        camera.position.set( 0, 1.5, 4.5 );
        camera.lookAt(new THREE.Vector3(0,1,0));

        lookAtPos = new THREE.Vector3(0, 0, camera.position.z - 0.5);
        mouseVec = new THREE.Vector3(0, 0, camera.position.z - 0.5);
        
        
        var light = new THREE.PointLight( 0xFFFFFF, 1, 100 );
        light.position.set( 2, 2, 7 );

        var xAxis = new THREE.Mesh(
            new THREE.CubeGeometry( 50, 0.01, 0.01 ),
            new THREE.MeshBasicMaterial( { color: 0xff0000} )
        );
        var yAxis = new THREE.Mesh(
            new THREE.CubeGeometry( 0.01, 50, 0.01 ),
            new THREE.MeshBasicMaterial( { color: 0x00ff00} )
        );
        var zAxis = new THREE.Mesh(
            new THREE.CubeGeometry( 0.01, 0.01, 50 ),
            new THREE.MeshBasicMaterial( { color: 0x0000ff} )
        );

        loadFromArr(faceList);

        scene.add( camera );
        scene.add( light );

        animate();

    }

    var loadFromArr = function(arr){
    
        var i = 0;
        var len = arr.length;

        var loadNext = function(){
        
            i++
            if ( i > len ) {
                window.facesLoaded = true;
                return;
            }


            console.log(i)
            loader.load( "assets/characters/" + arr[i-1] + "/" + arr[i-1] + ".js", function( geometry, materials ) {
            
                var mesh = new THREE.SkinnedMesh(
                    geometry,
                    new THREE.MeshFaceMaterial(materials)
                );
                mesh.visible = false;

                if(name == arr[i-1]) {
                    character = new THREE.HeadControls( mesh, camera, renderer.domElement, scene, true );
                    mesh.visible = true;
                }

                scene.add( mesh );
                console.log(arr[i-1])
                faces[arr[i-1]] = mesh;

                loadNext();

            } )

        }

        loadNext();



    }

    
    var render = function( ){


        var delta = clock.getDelta( );

        if(character && character.update) character.update( delta );

        renderer.render( scene, camera );
        
    }
    
    var animate = function( ) {
        render( );
        requestAnimFrame( animate );
    }
     
    loaded( );

    window.setFace = function(name){
        
        for ( var face in faces ) {
            faces[face].visible = false;
        }
        faces[name].visible = true;
        character.setMesh( faces[name] );
                

    }

}
