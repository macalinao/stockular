/* 
   @start: api stuff
   @author: Andrew Liu
*/
var URL = "http://cywoods.wynd07.com/work/";

function api(url, data, callb) {
  $.ajax({
    type: 'GET',
    url: url,
    async: true,
    cache: false,
    dataType: 'json',
    data: (data != "" && data != null ? data : ""),
    success: function(data, textStatus, jqXHR) {
      if (typeof data === "undefined" || data == null) {
        callb(null);
        alert("Request failed");
        return;
      }
      callb(data);
    }
  });
}

var stocks = ["GOOG", "V", "AAPL", "YHOO", "T", "MSFT"];
var stdata = [];
if( req != null) stocks[1] = req;
var stcount = 0;
$(document).ready(function() {
  for(var i = 0; i<stocks.length; i++){
    stdata.push(null);
    (function(){
    var a = i;
    api("work/"+stocks[i] + ".json", null, function(dd){
      stdata[a] = dd;
      stcount++;
    });
})();
  }
});





var VR_POSITION_SCALE = 25;

function printVector(values) {
    var str = "[";

    str += values.x.toFixed(2) + ", ";
    str += values.y.toFixed(2) + ", ";
    str += values.z.toFixed(2);

    if ("w" in values) {
        str += ", " + values.w.toFixed(2);
    }

    str += "]";
    return str;
}

 //
 // WebVR Device initialization
 //
var sensorDevice = null;
var hmdDevice = null;
var vrMode = false;
var stats = document.getElementById("stats");

function PerspectiveMatrixFromVRFieldOfView(fov, zNear, zFar) {
    var outMat = new THREE.Matrix4();
    var out = outMat.elements;
    var upTan = Math.tan(fov.upDegrees * Math.PI / 180.0);
    var downTan = Math.tan(fov.downDegrees * Math.PI / 180.0);
    var leftTan = Math.tan(fov.leftDegrees * Math.PI / 180.0);
    var rightTan = Math.tan(fov.rightDegrees * Math.PI / 180.0);

    var xScale = 2.0 / (leftTan + rightTan);
    var yScale = 2.0 / (upTan + downTan);

    out[0] = xScale;
    out[4] = 0.0;
    out[8] = -((leftTan - rightTan) * xScale * 0.5);
    out[12] = 0.0;

    out[1] = 0.0;
    out[5] = yScale;
    out[9] = ((upTan - downTan) * yScale * 0.5);
    out[13] = 0.0;

    out[2] = 0.0;
    out[6] = 0.0;
    out[10] = zFar / (zNear - zFar);
    out[14] = (zFar * zNear) / (zNear - zFar);

    out[3] = 0.0;
    out[7] = 0.0;
    out[11] = -1.0;
    out[15] = 0.0;

    return outMat;
}

var cameraLeft = new THREE.PerspectiveCamera(75, 4 / 3, 0.1, 1000);
var cameraRight = new THREE.PerspectiveCamera(75, 4 / 3, 0.1, 1000);

var fovScale = 1.0;

function resizeFOV(amount) {
    var fovLeft, fovRight;

    if (!hmdDevice) {
        return;
    }

    if (amount != 0 && 'setFieldOfView' in hmdDevice) {
        fovScale += amount;
        if (fovScale < 0.1) {
            fovScale = 0.1;
        }

        fovLeft = hmdDevice.getRecommendedEyeFieldOfView("left");
        fovRight = hmdDevice.getRecommendedEyeFieldOfView("right");

        fovLeft.upDegrees *= fovScale;
        fovLeft.downDegrees *= fovScale;
        fovLeft.leftDegrees *= fovScale;
        fovLeft.rightDegrees *= fovScale;

        fovRight.upDegrees *= fovScale;
        fovRight.downDegrees *= fovScale;
        fovRight.leftDegrees *= fovScale;
        fovRight.rightDegrees *= fovScale;

        hmdDevice.setFieldOfView(fovLeft, fovRight);
    }

    if ('getRecommendedRenderTargetSize' in hmdDevice) {
        var renderTargetSize = hmdDevice.getRecommendedRenderTargetSize();
        document.getElementById("renderTarget").innerHTML = renderTargetSize.width + "x" + renderTargetSize.height;
    }

    if ('getCurrentEyeFieldOfView' in hmdDevice) {
        fovLeft = hmdDevice.getCurrentEyeFieldOfView("left");
        fovRight = hmdDevice.getCurrentEyeFieldOfView("right");
    } else {
        fovLeft = hmdDevice.getRecommendedEyeFieldOfView("left");
        fovRight = hmdDevice.getRecommendedEyeFieldOfView("right");
    }

    cameraLeft.projectionMatrix = PerspectiveMatrixFromVRFieldOfView(fovLeft, 0.1, 1000);
    cameraRight.projectionMatrix = PerspectiveMatrixFromVRFieldOfView(fovRight, 0.1, 1000);
}

function EnumerateVRDevices(devices) {
    // First find an HMD device
    for (var i = 0; i < devices.length; ++i) {
        if (devices[i] instanceof HMDVRDevice) {
            hmdDevice = devices[i];

            var eyeOffsetLeft = hmdDevice.getEyeTranslation("left");
            var eyeOffsetRight = hmdDevice.getEyeTranslation("right")
            document.getElementById("leftTranslation").innerHTML = printVector(eyeOffsetLeft);
            document.getElementById("rightTranslation").innerHTML = printVector(eyeOffsetRight);

            cameraLeft.position.sub(eyeOffsetLeft);
            cameraLeft.position.z = 130;

            cameraRight.position.sub(eyeOffsetRight);
            cameraRight.position.z = 130;

            resizeFOV(0.0);
        }
    }

    // Next find a sensor that matches the HMD hardwareUnitId
    for (var i = 0; i < devices.length; ++i) {
        if (devices[i] instanceof PositionSensorVRDevice &&
            (!hmdDevice || devices[i].hardwareUnitId == hmdDevice.hardwareUnitId)) {
            sensorDevice = devices[i];
            document.getElementById("hardwareUnitId").innerHTML = sensorDevice.hardwareUnitId;
            document.getElementById("deviceId").innerHTML = sensorDevice.deviceId;
            document.getElementById("deviceName").innerHTML = sensorDevice.deviceName;
        }
    }
}

if (navigator.getVRDevices) {
    navigator.getVRDevices().then(EnumerateVRDevices);
} else if (navigator.mozGetVRDevices) {
    navigator.mozGetVRDevices(EnumerateVRDevices);
} else {
    stats.classList.add("error");
    stats.innerHTML = "WebVR API not supported";
}

window.addEventListener("keydown", function(ev) {
    if (hmdDevice) {
        if (ev.keyCode == "R".charCodeAt(0)) {
            sensorDevice.resetSensor();
        }
        if (ev.keyCode == 187 || ev.keyCode == 61) { // "+" key
            resizeFOV(0.1);
        }
        if (ev.keyCode == 189 || ev.keyCode == 173) { // "-" key
            resizeFOV(-0.1);
        }
    }
});

 //
 // Rendering
 //
var renderer = new THREE.WebGLRenderer({
    preserveDrawingBuffer: true
});
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

renderer.setClearColor(0x111111, 1.0);

var ambient = new THREE.AmbientLight(0x444444);
scene.add(ambient);

var directionalLight = new THREE.DirectionalLight(0xffeedd);
directionalLight.position.set(0, 0, 1).normalize();
scene.add(directionalLight);


camera.position.z = 130;

function resize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}
resize();
window.addEventListener("resize", resize, false);

 // Fullscreen VR mode handling

function onFullscreenChange() {
    if (!document.webkitFullscreenElement && !document.mozFullScreenElement) {
        vrMode = false;
    }
    resize();
}

document.addEventListener("webkitfullscreenchange", onFullscreenChange, false);
document.addEventListener("mozfullscreenchange", onFullscreenChange, false);

var vrBtn = document.getElementById("vrBtn");
if (vrBtn) {
    vrBtn.addEventListener("click", function() {
        vrMode = true;
        if (renderer.domElement.webkitRequestFullscreen) {
            renderer.domElement.webkitRequestFullscreen({
                vrDisplay: hmdDevice
            });
        } else if (renderer.domElement.mozRequestFullScreen) {
            renderer.domElement.mozRequestFullScreen({
                vrDisplay: hmdDevice
            });
        }
    }, false);
}

 //
 // Update Loop
 //

var timestamp = document.getElementById("timestamp");
var orientation = document.getElementById("orientation");
var position = document.getElementById("position");
var angularVelocity = document.getElementById("angularVelocity");
var linearVelocity = document.getElementById("linearVelocity");
var angularAcceleration = document.getElementById("angularAcceleration");
var linearAcceleration = document.getElementById("linearAcceleration");
 // create a new mesh with
 // sphere geometry - we will cover
 // the sphereMaterial next!
 // create the sphere's material


function updateVRDevice() {
    if (!sensorDevice) return false;
    var vrState = sensorDevice.getState();

    timestamp.innerHTML = vrState.timeStamp.toFixed(2);
    orientation.innerHTML = printVector(vrState.orientation);
    position.innerHTML = printVector(vrState.position);
    angularVelocity.innerHTML = printVector(vrState.angularVelocity);
    linearVelocity.innerHTML = printVector(vrState.linearVelocity);
    angularAcceleration.innerHTML = printVector(vrState.angularAcceleration);
    linearAcceleration.innerHTML = printVector(vrState.linearAcceleration);

        camera.quaternion.x = vrState.orientation.x;
        camera.quaternion.y = vrState.orientation.y;
        camera.quaternion.z = vrState.orientation.z;
        camera.quaternion.w = vrState.orientation.w;
        cameraLeft.quaternion.x = vrState.orientation.x;
        cameraLeft.quaternion.y = vrState.orientation.y;
        cameraLeft.quaternion.z = vrState.orientation.z;
        cameraLeft.quaternion.w = vrState.orientation.w;
        cameraRight.quaternion.x = vrState.orientation.x;
        cameraRight.quaternion.y = vrState.orientation.y;
        cameraRight.quaternion.z = vrState.orientation.z;
        cameraRight.quaternion.w = vrState.orientation.w;
    
    return true;
}

var pointLight =
    new THREE.PointLight(0xFFFFFF);

 // set its position
pointLight.position.x = 10;
pointLight.position.y = 50;
pointLight.position.z = 130;

var size = 50;
var thick = 1;

function Card(data, scene, rotx, roty, dx, dy, dz){
  this.data = data;
  scene.add(getLine(-size,-size, -size,size,rotx,roty, dx, dy, dz));
  scene.add(getLine(-size,-size, size,-size,rotx,roty, dx, dy, dz));
  var x = [], y = [], g = data.graph;
  for(var i = 0; i<g.length; i++){
    x.push(g[i].date);
    y.push(g[i].value);
  }
  nlize(x);
  nlize(y);
  for(var i = 1; i<g.length; i++){
    scene.add(getLine(size*2*x[i-1]-size, size*1.6*y[i-1]-size*0.8, size*2*x[i]-size, size*1.6*y[i]-size*0.8, rotx,roty, dx, dy, dz));

  }
  scene.add(Text(data.name.name + " ("+data.name.symbol+")", dx,dy+size+10,dz-5));
  var vals = [data.values.PX_OPEN, data.values.PX_CLOSE, data.values.CHG_PCT_1D, data.values.PX_LOW, data.values.PX_HIGH, data.values.CUR_MKT_CAP, data.values.VOLUME_AVG_30D];
  var names =["Open", "Close", "% Change", "Low", "High", "Market Cap", "Volume"];
  for(var i = 0; i<vals.length; i++)
    scene.add(Text(names[i]+": " +formatNumber(vals[i]), dx,-size-30-i*16,dz-5));
  anim += 5000;
}

function waiting(){
    if( stcount != stocks.length) 
        setTimeout(waiting, 100);
    else{
        for(var i = 0; i<stocks.length; i++){

            Card(stdata[i], scene, 0, 0,(i-1)*size*3,0,0);
            anim += 2000;
        }
    }
}

waiting();


function Text(str, x, y, z){
  var bitmap = document.createElement('canvas');
  var g = bitmap.getContext('2d');
  bitmap.width = 240;
  bitmap.height = 40;
  g.font = 'Bold 20px Arial';
  g.fillStyle = '#111111';
  g.fillRect(0, 0, bitmap.width, bitmap.height);
  g.fillStyle = '#00ddff';
  g.fillText(str, 0, 25);
  g.strokeStyle = 'black';
  g.strokeText(str, 0, 25);

  // canvas contents will be used for a texture
  var texture = new THREE.Texture(bitmap) 
  texture.needsUpdate = true;
  var plane = new THREE.Mesh(
          new THREE.PlaneGeometry(120, 16), new THREE.MeshBasicMaterial({ map: texture }));
  
  plane.position.set(x, y, z);
  animate(plane);
  return plane;
}


var anim = 4000;
function animate(obj){

  this.obj = obj;
  var done = false;

  var pos = { x:obj.position.x+(Math.random()<0.5?1:-1)*(50+100*Math.random()),
          y:obj.position.y+(Math.random()<0.5?1:-1)*(50+100*Math.random()), 
          z:obj.position.z+20+20*Math.random(),
          rotx: -3-(Math.random()*3),
          roty: -3-(Math.random()*3)};
  var end = { x:obj.position.x, y:obj.position.y, z:obj.position.z,rotx:0, roty:0 };
  
  this.tween = new TWEEN.Tween(pos).to(end, 5000);
  this.tween.easing(TWEEN.Easing.Elastic.Out);
  this.tween.delay(anim+Math.random()*3000);
  
  var updating = function(){
    obj.position.x  = pos.x;
    obj.position.y = pos.y;
    obj.position.z = pos.z
    obj.rotation.x = pos.rotx;
    obj.rotation.y = pos.roty;
  };
  
  this.tween.onUpdate(updating);
  this.tween.start();
  updating();
}

function nlize(ar){
  var min = 1e13, max = -1e13;
  for(var i = 0; i<ar.length; i++){
    min = Math.min(min, ar[i]);
    max = Math.max(max, ar[i]);
  }
  for(var i = 0; i<ar.length; i++)
    ar[i] = (ar[i]-min)/(max-min);
}

function getPlane(x, y, wid, len, rotx, roty, rotz, dx, dy, dz){
  var geo =  new THREE.PlaneGeometry(wid, len);
  var m1 = new THREE.Matrix4();
  var m2 = new THREE.Matrix4();
  var m3 = new THREE.Matrix4();
  var m4 = new THREE.Matrix4();
  m1.makeRotationX(rotx);
  m2.makeRotationY(roty);
  m3.makeRotationZ(rotz);
  m4.makeTranslation(dx, dy, dz);
  var m = new THREE.Matrix4();
  m.multiply( m4 );
  m.multiply( m3 );
  m.multiply( m2 );
  m.multiply( m1 );
  geo.applyMatrix(m);
  var plane = new THREE.Mesh(
         geo, new THREE.MeshLambertMaterial({color: 0x00aaff}));
  plane.position.x = x;
  plane.position.y = y;
  animate(plane);
  return plane;
}

function getLine(x1, y1, x2, y2, rotx, roty, dx, dy, dz){
  var mx = (x1+x2)/2;
  var my = (y1+y2)/2;
  var theta = -Math.atan((x2-x1)/(y2-y1));
  return getPlane(mx, my, thick, Math.sqrt(Math.pow(y2-y1,2)+Math.pow(x2-x1,2)), rotx, roty, theta, dx, dy, dz);
}

function render(t) {
    requestAnimationFrame(render);
    if (!updateVRDevice()) {
        // If we don't have a VR device just spin the model around to give us
        // something pretty to look at.
        //rift.rotation.y += 0.01;
    }

    TWEEN.update();

    if (vrMode) {
        // Render left eye
        renderer.enableScissorTest(true);
        renderer.setScissor(0, 0, window.innerWidth / 2, window.innerHeight);
        renderer.setViewport(0, 0, window.innerWidth / 2, window.innerHeight);
        renderer.render(scene, cameraLeft);

        // Render right eye
        renderer.setScissor(window.innerWidth / 2, 0, window.innerWidth / 2, window.innerHeight);
        renderer.setViewport(window.innerWidth / 2, 0, window.innerWidth / 2, window.innerHeight);
        renderer.render(scene, cameraRight);
    } else {
        // Render mono view
        renderer.enableScissorTest(false);
        renderer.setViewport(0, 0, window.innerWidth, window.innerHeight);
        renderer.render(scene, camera);
    }
}
document.body.appendChild(renderer.domElement);
render();

function formatNumber(x) {
  x = parseFloat(x);
  if (x > 1e9) return numberWithCommas((x / 1e9).toFixed(2)) + "B";
  if (x > 1e6) return numberWithCommas((x / 1e6).toFixed(2)) + "M";
  return numberWithCommas(x.toFixed(2))
}

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}