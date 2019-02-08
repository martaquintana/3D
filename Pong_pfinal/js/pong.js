/* Mi programa es el pong basico + extras, he indicado los pasos que he seguido de la práctica,
  lo he explicado en cada función. He añadido todos los extras: he añadido columnas, seguir a la pelota con una luz,
  sombras y he añadido textura a todos los objetos menos a las dos palas.
  Además de los extras que se piden he puesto más luces,otro plano, paredes transparentes, 
  también he puesto que si la pelota toca nuestra pala, aumente un poco la velocidad de la pelota,
  y un boton de JUGAR debajo de las explicaciones de las teclas de nuestra pala para recargar la página.
 IMPORTANTE: LAS TEXTURAS FUNCIONAN EN FIREFOX , EN CHROME USAR http://localhost:8000/index.html con servidor python -m SimpleHTTPServer
*/

// GLOBAL VARIABLES
const WIDTH = 640,
      HEIGHT =360;

var container;
var renderer, scene, camera, pointLight;

const VIEW_ANGLE = 50;
const ASPECT = WIDTH / HEIGHT;
const NEAR = 0.1;
const FAR = 10000;

const RADIUS= 5,
      SEGMENTS= 6,
      RINGS= 6;
var sphere;
var plane;

const
FIELD_WIDTH= 400,
FIELD_HEIGTH= 200;

const
PLANE_WIDTH=FIELD_WIDTH,
PLANE_HEIGTH =FIELD_HEIGTH,
PLANE_QUALITY= 10;

const PADDLE_WITH= 10,
      PADDLE_HEIGTH= 30,
      PADDLE_DEPTH= 10,
      PADDLE_QUALITY = 1;
      
var playerPaddleDirY = 0,
    cpuPaddleDirY = 0,
    paddleSpeed = 3;
    
var playerPaddle,cpuPaddle;

var ballDirX = 1, ballDirY = 1, ballSpeed = 2;

var
score1 = 0,
score2 = 0,
maxScore = 3;  

var alturacolumnas=100;

// GAME FUNCTIONS

function setup() //Paso 2
{
    createScene();
    addMesh();
    addLight();
    requestAnimationFrame(draw);
}

var draw = function ()
{
  score();
  cameraposition();
  balldirection();
  paddlemove();
  renderer.render(scene, camera);
  requestAnimationFrame(draw);

}

function createScene() //Paso 3
{
    container = document.getElementById("gameCanvas"); //Paso 4

    renderer = new THREE.WebGLRenderer();
	renderer.setSize(WIDTH, HEIGHT);
    renderer.shadowMapEnabled = true;
    renderer.shadowMaptype = THREE.PCFSoftShadowMap;

    camera = //Paso5 Añadir una cámara a la escena
        new THREE.PerspectiveCamera(
            VIEW_ANGLE,
            ASPECT,
            NEAR,
            FAR
        );

    scene = new THREE.Scene();
    scene.add(camera);

    container.appendChild(renderer.domElement);
}

function addMesh()
{
    //Sphere Añadir esfera PASO 6
     var geometrysphere = new THREE.SphereGeometry(
         RADIUS,
         SEGMENTS,
         RINGS);
         
    //LAS TEXTURAS FUNCIONAN EN FIREFOX , EN CHROME USAR http://localhost:8000/index.html con servidor python
	var texturesphere = new THREE.ImageUtils.loadTexture( "textures/saturno.jpg" );

    var materialsphere = new THREE.MeshBasicMaterial( { map: texturesphere } );
    materialsphere.map=texturesphere;
     
    sphere = new THREE.Mesh(geometrysphere, materialsphere);
    //Sombras
    sphere.castShadow = true;
	sphere.receiveShadow = false;


    //Paso7.1 Plano del juego
    var geometryplane = new THREE.PlaneGeometry( PLANE_WIDTH, PLANE_HEIGTH, 32 );
    var textureplane = new THREE.ImageUtils.loadTexture( "textures/hockey.jpg" );
     

    var materialplane = new THREE.MeshBasicMaterial( { map: textureplane } );
    materialplane.map=textureplane;
    plane = new THREE.Mesh( geometryplane, materialplane );
    plane.position.z = -300;
    
   //Sombras
   plane.receiveShadow = true;
   plane.castShadow = true;
   
   scene.add( plane );
   
   //Paso 7.2 Dibujar palas 

    var geometrycube = new THREE.CubeGeometry(
          PADDLE_WITH,
          PADDLE_HEIGTH,
          PADDLE_DEPTH,
          PADDLE_QUALITY);
    var materialcube = new THREE.MeshLambertMaterial( { color: 0x0000ff } );
    var materialcube2 = new THREE.MeshLambertMaterial( { color: 0xff0000 } );
    playerPaddle = new THREE.Mesh( geometrycube, materialcube );
    cpuPaddle= new THREE.Mesh( geometrycube, materialcube2 );
    
     playerPaddle.position.z = plane.position.z+(PADDLE_WITH/2);
     playerPaddle.position.x = 150;
     cpuPaddle.position.z = plane.position.z+(PADDLE_WITH/2);
     cpuPaddle.position.x = -150;
     sphere.position.z =plane.position.z+PADDLE_WITH/2;
     
	 //Sombras
     playerPaddle.castShadow = true;
	 playerPaddle.receiveShadow = false;
	  cpuPaddle.castShadow = true;
	 cpuPaddle.receiveShadow = false;

     scene.add(sphere);
     scene.add(playerPaddle );
     scene.add(cpuPaddle);
     
   //EXTRA  añadir columnas
   var geometry = new THREE.CylinderGeometry( 5, 5, alturacolumnas, 50 );
   var texture = new THREE.ImageUtils.loadTexture( "textures/ice_texture.jpg" );

    var material = new THREE.MeshBasicMaterial( { map: texture } );
     material.map=texture;
     
   var cylinder1 = new THREE.Mesh( geometry, material );
   var cylinder2 = new THREE.Mesh( geometry, material );
   var cylinder3 = new THREE.Mesh( geometry, material );
   var cylinder4 = new THREE.Mesh( geometry, material );
   var cylinder5 = new THREE.Mesh( geometry, material );
   var cylinder6 = new THREE.Mesh( geometry, material );

   cylinder1.position.z=plane.position.z+(alturacolumnas/2);
   cylinder1.position.x=-100;
   cylinder1.position.y=-110;
   cylinder1.rotation.x=Math.PI/2;

   cylinder2.position.z=plane.position.z+(alturacolumnas/2);
   cylinder2.position.x=0;
   cylinder2.position.y=-110;
   cylinder2.rotation.x=Math.PI/2;

   cylinder3.position.z=plane.position.z+(alturacolumnas/2);
   cylinder3.position.x=100;
   cylinder3.position.y=-110;
   cylinder3.rotation.x=Math.PI/2;

   cylinder4.position.z=plane.position.z+(alturacolumnas/2);
   cylinder4.position.x=-100;
   cylinder4.position.y=110;
   cylinder4.rotation.x=Math.PI/2;

   cylinder5.position.z=plane.position.z+(alturacolumnas/2);
   cylinder5.position.x=0;
   cylinder5.position.y=110;
   cylinder5.rotation.x=Math.PI/2;

   cylinder6.position.z=plane.position.z+(alturacolumnas/2);
   cylinder6.position.x=100;
   cylinder6.position.y=110;
   cylinder6.rotation.x=Math.PI/2;

   //Sombras
   cylinder1.castShadow = true;
   cylinder1.receiveShadow = false;
   cylinder2.castShadow = true;
   cylinder2.receiveShadow = false;
   cylinder3.castShadow = true;
   cylinder3.receiveShadow = false;
   cylinder4.castShadow = true;
   cylinder4.receiveShadow = false;
   cylinder5.castShadow = true;
   cylinder5.receiveShadow = false;
   cylinder6.castShadow = true;
   cylinder6.receiveShadow = false;



   scene.add(cylinder1);
   scene.add(cylinder2);
   scene.add(cylinder3);
   scene.add(cylinder4);
   scene.add(cylinder5);
   scene.add(cylinder6);

//EXTRA Paredes de cristal

var pared = new THREE.PlaneGeometry( PLANE_WIDTH, PLANE_HEIGTH,32);
var materialpared = new THREE.MeshLambertMaterial({color: 0x00BFFF , transparent: true, opacity: 0.4});

var pared1 = new THREE.Mesh(pared, materialpared);
 pared1.position.z=plane.position.z;
   pared1.position.x=0;
   pared1.position.y=110;
   pared1.rotation.x=Math.PI/2;
   pared1.castShadow = true;
   pared1.receiveShadow = true;

var pared2 = new THREE.Mesh(pared, materialpared);
 pared2.position.z=plane.position.z;
   pared2.position.x=0;
   pared2.position.y=-110;
   pared2.rotation.x=-Math.PI/2;

  pared2.castShadow = true;
   pared2.receiveShadow = true;

 scene.add(pared1);
 scene.add(pared2);

//Plano extra 
var geometryplane2= new THREE.PlaneGeometry( PLANE_WIDTH+100, PLANE_HEIGTH+100,32);
var textureplano2 = new THREE.ImageUtils.loadTexture( "textures/hielo.jpg" );

var materialplano2 = new THREE.MeshBasicMaterial( { map: textureplano2 } );
  materialplano2.map=textureplano2;
var plano2 = new THREE.Mesh(geometryplane2, materialplano2);
 plano2.position.z=plane.position.z-10;
 plano2.castShadow = true;
 plano2.receiveShadow = true;
 scene.add(plano2);
}

function balldirection() 
{
 //8.2 rebote
 if(sphere.position.y>=(FIELD_HEIGTH/2)){
      ballDirY=-1;
      ballSpeed+=0.25;
      if(ballSpeed==4){
        ballSpeed=2;
      }
  }else if(sphere.position.y<=-(FIELD_HEIGTH/2)){
    ballDirY=1;
    ballSpeed+=0.25;
    if(ballSpeed==4){
      ballSpeed=2;
    }
  }

  if(sphere.position.x>=(FIELD_WIDTH/2)){
    ballDirX=-1;
    ballDirY=1;

  }else if(sphere.position.x<=-(FIELD_WIDTH/2)){

     ballDirX=1;
     ballDirY=-1;
    }

 //Para que si marca un tanto se vuelve al centro.
  if(sphere.position.x>=(FIELD_WIDTH/2) || sphere.position.x<=-(FIELD_WIDTH/2)){
	   //8.5 Marcar un tanto
	 if( sphere.position.x>=(FIELD_WIDTH/2)){
		 score1+=1;
		 }else if( sphere.position.x<=-(FIELD_WIDTH/2)){
		 score2+=1;
	 }
	  sphere.position.x=0;
	  sphere.position.y=0;

  }


//8.6 Hacer que las palas golpeen la pelota
  if((sphere.position.x>=(playerPaddle.position.x-PADDLE_WITH/2))&& (sphere.position.x<=(playerPaddle.position.x+PADDLE_WITH/2))) {

    if( (sphere.position.y<= (playerPaddle.position.y+(PADDLE_HEIGTH/2))) && (sphere.position.y>= (playerPaddle.position.y-(PADDLE_HEIGTH/2)))){
            ballDirX=-1;
            ballSpeed+=0.25;//velocidad de la pelota para que aumente cuando toque la paleta que maneja el jugador
            if(ballSpeed==4){ //VELOCIDAD MAXIMA DE LA PELOTA
              ballSpeed=2;
            }
          }
        }

    if((sphere.position.x>=(cpuPaddle.position.x-PADDLE_WITH/2))&& (sphere.position.x<=(cpuPaddle.position.x+PADDLE_WITH/2))) {

    if( (sphere.position.y<= (cpuPaddle.position.y+(PADDLE_HEIGTH/2)))&& (sphere.position.y>= (cpuPaddle.position.y-(PADDLE_HEIGTH/2)))){
        ballDirX=1;
      }
    }
    if(ballSpeed==4){
      ballSpeed=2;
    }


  //8.1 Movimiento de la pelota
  sphere.position.y += ballSpeed * ballDirY;
  sphere.position.x += ballSpeed * ballDirX;

}


function paddlemove()
{
  //movimiento de nuestra pala 8.3
  if (Key.isDown(Key.D))
  {
    if(playerPaddle.position.y<=(FIELD_HEIGTH/2 -(PADDLE_HEIGTH/2))){ //para que no sobresalga del plano la pala
        playerPaddle.position.y+=paddleSpeed+2 ;// code to move paddle left (el +2 para que vaya mejor nuestra pala)
    }
  }
  if (Key.isDown(Key.A))
  {
      if(playerPaddle.position.y>=-((FIELD_HEIGTH/2)-(PADDLE_HEIGTH/2))){
      playerPaddle.position.y-=paddleSpeed+2; // code to move paddle right
      }
    }

//8.4 moviemiento CPU 
var difficulty=0.2;
cpuPaddleDirY = (sphere.position.y - cpuPaddle.position.y)*difficulty;
    
// He estado buscando para entender como hacer que la pala se mueva de una forma correcta y esta ha sido la mejor opcion
    if (Math.abs(cpuPaddleDirY) <= paddleSpeed){	
     cpuPaddle.position.y += cpuPaddleDirY;
     } else {
			if (cpuPaddleDirY > paddleSpeed){
					cpuPaddle.position.y += paddleSpeed;
			} else if (cpuPaddleDirY < -paddleSpeed){
					cpuPaddle.position.y -= paddleSpeed;
			}
	}

}

function score(){

if(maxScore!=0){
 document.getElementById("scores").innerHTML =score1 + "-" + score2;
  document.getElementById("winnerBoard").innerHTML = "First to " + maxScore + " wins!";
 }
//8.7 Tanteo
  if(score2==maxScore && maxScore!=0){
    ballSpeed = 0;
    
    document.getElementById("winnerBoard").innerHTML = score1 + "-" + score2;
    document.getElementById("scores").innerHTML ="YOU WIN";
    maxScore=0;

  }
  else if(score1==maxScore && maxScore!=0){
      ballSpeed = 0;

      document.getElementById("winnerBoard").innerHTML = score1 + "-" + score2;
      maxScore=0;
      document.getElementById("scores").innerHTML ="CPU WINS";
    }
}

function cameraposition(){
	
//posicion de la camara para que se encuentre detras del jugador

  camera.position.z= playerPaddle.position.z+ 50;
  camera.position.x= playerPaddle.position.x+150;
  camera.rotation.y=Math.PI/2;
  camera.rotation.z=Math.PI/2;
  camera.position.y= playerPaddle.position.y;
}

function addLight()
{
  //Luz Puntual
   pointLight = new THREE.PointLight(0xffffff, 0.5); //paso 6 PointLight
    pointLight.position.z=-200;
    pointLight.position.x=playerPaddle.position.x;
    pointLight.position.y=playerPaddle.position.y;


    pointLight2 = new THREE.PointLight(0xffffff, 0.5); 
    pointLight2.position.z= -200;
    pointLight2.position.x=cpuPaddle.position.x;
    pointLight2.position.y=cpuPaddle.position.y;

    scene.add(pointLight);
    scene.add(pointLight2);

// Luz Direccional para las sombras

	var directionalLight = new THREE.DirectionalLight( 0xffffff,0.5 );
		directionalLight.position.z=50;
		directionalLight.position.x=cpuPaddle.position.x;
		directionalLight.position.y=cpuPaddle.position.y;


		directionalLight.castShadow = true;
		scene.add( directionalLight );

		var directionalLight2 = new THREE.DirectionalLight( 0xffffff,0.5 );
		directionalLight2.position.z=400;
		directionalLight2.position.x=-150;
		directionalLight2.position.y=150;


		directionalLight2.castShadow = true;
		scene.add( directionalLight2 );



	//Spot light Es la luz que sigue a la pelota 
	var spotLight = new THREE.SpotLight( 0x00a000,80 );

	spotLight.position= sphere.position;
	spotLight.position.z== -600;
	spotLight.castShadow = true;
	scene.add( spotLight );

}
