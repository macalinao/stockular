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

var stocks = ["GOOG", "AAPL", "YHOO"];
var stdata = [{"name":{"name":"Google Inc C","symbol":"GOOG"},"values":{"CHG_NET_1D":"4.1","PX_VOLUME":"1629477.0","PX_HIGH":"586.55","EQY_SH_OUT_REAL":"3.38209995E8","VOLUME_AVG_30D":"1329544.25","LOW_52WEEK":"502.8","CUR_MKT_CAP":"4.0005581404608E11","PX_CLOSE":"586.08","CHG_PCT_1D":"0.7044916","HIGH_52WEEK":"604.83","PX_OPEN":"583.98","EQY_INST_PCT_SH_OUT":"72.49308556188889","PX_LOW":"581.95"},"graph":[{"date":1409923800000,"value":585.2,"volume":65810},{"date":1409924100000,"value":584.1,"volume":13111},{"date":1409924400000,"value":584.64,"volume":32523},{"date":1409924700000,"value":585.405,"volume":50279},{"date":1409925000000,"value":585.49,"volume":9326},{"date":1409925300000,"value":585.935,"volume":24846},{"date":1409925600000,"value":586.25,"volume":14765},{"date":1409925900000,"value":586.22,"volume":21894},{"date":1409926200000,"value":584.6,"volume":11965},{"date":1409926500000,"value":583.6,"volume":18177},{"date":1409926800000,"value":584.38,"volume":16993},{"date":1409927100000,"value":583.66,"volume":13804},{"date":1409927400000,"value":583.166,"volume":17303},{"date":1409927700000,"value":583.27,"volume":15025},{"date":1409928000000,"value":582.96,"volume":23253},{"date":1409928300000,"value":583.13,"volume":19198},{"date":1409928600000,"value":583.86,"volume":21233},{"date":1409928900000,"value":583.41,"volume":8378},{"date":1409929200000,"value":583.84,"volume":16879},{"date":1409929500000,"value":584.08,"volume":16713},{"date":1409929800000,"value":583.55,"volume":8416},{"date":1409930100000,"value":584.12,"volume":4100},{"date":1409930400000,"value":584.44,"volume":6059},{"date":1409930700000,"value":584.25,"volume":7928},{"date":1409931000000,"value":583.0,"volume":6883},{"date":1409931300000,"value":583.78,"volume":6260},{"date":1409931600000,"value":584.25,"volume":18510},{"date":1409931900000,"value":583.39,"volume":15784},{"date":1409932200000,"value":584.22,"volume":10314},{"date":1409932500000,"value":583.765,"volume":9082},{"date":1409932800000,"value":584.02,"volume":12578},{"date":1409933100000,"value":584.0,"volume":18839},{"date":1409933400000,"value":584.1,"volume":3181},{"date":1409933700000,"value":584.08,"volume":17288},{"date":1409934000000,"value":583.99,"volume":3858},{"date":1409934300000,"value":584.13,"volume":6676},{"date":1409934600000,"value":584.11,"volume":15094},{"date":1409934900000,"value":583.78,"volume":8108},{"date":1409935200000,"value":583.95,"volume":8100},{"date":1409935500000,"value":584.07,"volume":17199},{"date":1409935800000,"value":583.8,"volume":11271},{"date":1409936100000,"value":583.56,"volume":6667},{"date":1409936400000,"value":583.72,"volume":6649},{"date":1409936700000,"value":583.755,"volume":8596},{"date":1409937000000,"value":583.751,"volume":8979},{"date":1409937300000,"value":584.029,"volume":8261},{"date":1409937600000,"value":583.715,"volume":7713},{"date":1409937900000,"value":583.88,"volume":5010},{"date":1409938200000,"value":583.765,"volume":2470},{"date":1409938500000,"value":584.1,"volume":6305},{"date":1409938800000,"value":583.942,"volume":6040},{"date":1409939100000,"value":583.83,"volume":5880},{"date":1409939400000,"value":584.0,"volume":8786},{"date":1409939700000,"value":584.31,"volume":12141},{"date":1409940000000,"value":585.04,"volume":13592},{"date":1409940300000,"value":585.25,"volume":13531},{"date":1409940600000,"value":585.2,"volume":20100},{"date":1409940900000,"value":584.895,"volume":14648},{"date":1409941200000,"value":585.075,"volume":10313},{"date":1409941500000,"value":584.93,"volume":6710},{"date":1409941800000,"value":584.9,"volume":8006},{"date":1409942100000,"value":584.61,"volume":10984},{"date":1409942400000,"value":584.24,"volume":7654},{"date":1409942700000,"value":584.155,"volume":5570},{"date":1409943000000,"value":584.0,"volume":9083},{"date":1409943300000,"value":584.59,"volume":7378},{"date":1409943600000,"value":584.13,"volume":4510},{"date":1409943900000,"value":584.28,"volume":5531},{"date":1409944200000,"value":584.31,"volume":3000},{"date":1409944500000,"value":584.75,"volume":5864},{"date":1409944800000,"value":584.52,"volume":11720},{"date":1409945100000,"value":584.32,"volume":7494},{"date":1409945400000,"value":584.27,"volume":6797},{"date":1409945700000,"value":584.56,"volume":7761},{"date":1409946000000,"value":584.53,"volume":11770},{"date":1409946300000,"value":584.75,"volume":24091},{"date":1409946600000,"value":585.27,"volume":38450},{"date":1409946900000,"value":586.06,"volume":168226},{"date":1409948700000,"value":586.08,"volume":0}]}];
stdata.push({"name":{"name":"Apple Inc.","symbol":"AAPL"},"values":{"CHG_NET_1D":"0.85","PX_HIGH":"99.39","PE_RATIO":"15.985001937643753","CUR_MKT_CAP":"5.9261919699E11","VOLUME_AVG_30D":"4.9734068E7","DIVIDEND_YIELD":"1.7956379646936318","TRAIL_12M_EPS":"6.191428790986538","HIGH_52WEEK":"103.74","PX_OPEN":"98.8","REL_PE_RATIO":"0.8933829123063081","EQY_INST_PCT_SH_OUT":"64.4908184315442","PX_TO_BOOK_RATIO":"4.901176295526706","PX_VOLUME":"5.8457035E7","EQY_SH_OUT_REAL":"5.987867E9","PX_CLOSE":"98.97","LOW_52WEEK":"63.8886","PX_TO_SALES_RATIO":"3.4385399173859086","CHG_PCT_1D":"0.8662862","EQY_DVD_YLD_IND":"1.8995655200885406","PX_LOW":"98.31","EQY_BETA":"0.911483108997345"},"graph":[{"date":1409923800000,"value":99.08,"volume":3592326},{"date":1409924100000,"value":98.8599,"volume":1745422},{"date":1409924400000,"value":98.93,"volume":1415615},{"date":1409924700000,"value":99.16,"volume":1358941},{"date":1409925000000,"value":98.85,"volume":1042826},{"date":1409925300000,"value":98.9999,"volume":550439},{"date":1409925600000,"value":98.989,"volume":686987},{"date":1409925900000,"value":99.35,"volume":1226914},{"date":1409926200000,"value":99.08,"volume":945341},{"date":1409926500000,"value":99.0,"volume":946340},{"date":1409926800000,"value":99.0227,"volume":644513},{"date":1409927100000,"value":99.04,"volume":544051},{"date":1409927400000,"value":99.05,"volume":1137455},{"date":1409927700000,"value":98.8,"volume":777956},{"date":1409928000000,"value":98.916,"volume":954634},{"date":1409928300000,"value":98.94,"volume":689298},{"date":1409928600000,"value":99.09,"volume":593143},{"date":1409928900000,"value":99.11,"volume":452998},{"date":1409929200000,"value":99.17,"volume":547644},{"date":1409929500000,"value":99.2,"volume":762219},{"date":1409929800000,"value":98.96,"volume":671438},{"date":1409930100000,"value":98.89,"volume":729125},{"date":1409930400000,"value":98.9255,"volume":941356},{"date":1409930700000,"value":98.71,"volume":720211},{"date":1409931000000,"value":98.76,"volume":425252},{"date":1409931300000,"value":98.89,"volume":499204},{"date":1409931600000,"value":99.0382,"volume":857598},{"date":1409931900000,"value":98.945,"volume":442678},{"date":1409932200000,"value":98.9612,"volume":467754},{"date":1409932500000,"value":98.76,"volume":329597},{"date":1409932800000,"value":98.76,"volume":508582},{"date":1409933100000,"value":98.6971,"volume":367761},{"date":1409933400000,"value":98.8,"volume":204957},{"date":1409933700000,"value":98.75,"volume":325663},{"date":1409934000000,"value":98.76,"volume":221872},{"date":1409934300000,"value":98.7867,"volume":217849},{"date":1409934600000,"value":98.91,"volume":542187},{"date":1409934900000,"value":98.91,"volume":329523},{"date":1409935200000,"value":98.79,"volume":489802},{"date":1409935500000,"value":98.6999,"volume":520011},{"date":1409935800000,"value":98.605,"volume":1039808},{"date":1409936100000,"value":98.4164,"volume":501602},{"date":1409936400000,"value":98.46,"volume":704541},{"date":1409936700000,"value":98.45,"volume":395777},{"date":1409937000000,"value":98.54,"volume":321992},{"date":1409937300000,"value":98.64,"volume":340146},{"date":1409937600000,"value":98.6366,"volume":254687},{"date":1409937900000,"value":98.555,"volume":312044},{"date":1409938200000,"value":98.55,"volume":202730},{"date":1409938500000,"value":98.6101,"volume":295136},{"date":1409938800000,"value":98.55,"volume":233549},{"date":1409939100000,"value":98.57,"volume":176661},{"date":1409939400000,"value":98.679,"volume":222748},{"date":1409939700000,"value":98.7099,"volume":304295},{"date":1409940000000,"value":98.8,"volume":504028},{"date":1409940300000,"value":98.7745,"volume":388749},{"date":1409940600000,"value":98.7455,"volume":309322},{"date":1409940900000,"value":98.755,"volume":240163},{"date":1409941200000,"value":98.775,"volume":233784},{"date":1409941500000,"value":98.82,"volume":343146},{"date":1409941800000,"value":98.7667,"volume":485978},{"date":1409942100000,"value":98.76,"volume":288252},{"date":1409942400000,"value":98.73,"volume":295508},{"date":1409942700000,"value":98.64,"volume":332447},{"date":1409943000000,"value":98.71,"volume":406717},{"date":1409943300000,"value":98.6499,"volume":244146},{"date":1409943600000,"value":98.645,"volume":314065},{"date":1409943900000,"value":98.69,"volume":326273},{"date":1409944200000,"value":98.61,"volume":334218},{"date":1409944500000,"value":98.59,"volume":433410},{"date":1409944800000,"value":98.475,"volume":639599},{"date":1409945100000,"value":98.56,"volume":620014},{"date":1409945400000,"value":98.53,"volume":634558},{"date":1409945700000,"value":98.535,"volume":428351},{"date":1409946000000,"value":98.6699,"volume":696303},{"date":1409946300000,"value":98.84,"volume":1143346},{"date":1409946600000,"value":98.7999,"volume":1315372},{"date":1409946900000,"value":98.961,"volume":4701688},{"date":1409947200000,"value":98.97,"volume":800},{"date":1409947800000,"value":98.97,"volume":0},{"date":1409948700000,"value":98.97,"volume":0}]});
stdata.push({"name":{"name":"Yahoo Inc","symbol":"YHOO"},"values":{"CHG_NET_1D":"0.4","PX_HIGH":"39.8","PE_RATIO":"34.22206407071225","CUR_MKT_CAP":"3.9376363966920006E10","VOLUME_AVG_30D":"1.5475982E7","DIVIDEND_YIELD":"0.0","TRAIL_12M_EPS":"1.1568559999999999","HIGH_52WEEK":"41.7201","PX_OPEN":"39.05","REL_PE_RATIO":"1.9126308138022414","EQY_INST_PCT_SH_OUT":"74.97173082547033","PX_TO_BOOK_RATIO":"3.105818485010296","PX_VOLUME":"2.6200419E7","EQY_SH_OUT_REAL":"9.94603788E8","PX_CLOSE":"39.59","LOW_52WEEK":"28.32","PX_TO_SALES_RATIO":"8.726765469519268","CHG_PCT_1D":"1.020669","PX_LOW":"39.05","EQY_BETA":"0.9882472157478333"},"graph":[{"date":1409923800000,"value":39.18,"volume":573759},{"date":1409924100000,"value":39.245,"volume":317729},{"date":1409924400000,"value":39.32,"volume":336239},{"date":1409924700000,"value":39.395,"volume":277145},{"date":1409925000000,"value":39.35,"volume":189944},{"date":1409925300000,"value":39.33,"volume":318780},{"date":1409925600000,"value":39.28,"volume":278394},{"date":1409925900000,"value":39.33,"volume":120716},{"date":1409926200000,"value":39.31,"volume":105818},{"date":1409926500000,"value":39.2874,"volume":240243},{"date":1409926800000,"value":39.305,"volume":125451},{"date":1409927100000,"value":39.31,"volume":165317},{"date":1409927400000,"value":39.265,"volume":164927},{"date":1409927700000,"value":39.24,"volume":191860},{"date":1409928000000,"value":39.275,"volume":349662},{"date":1409928300000,"value":39.29,"volume":249878},{"date":1409928600000,"value":39.345,"volume":385521},{"date":1409928900000,"value":39.3,"volume":146657},{"date":1409929200000,"value":39.395,"volume":207319},{"date":1409929500000,"value":39.46,"volume":269661},{"date":1409929800000,"value":39.43,"volume":217736},{"date":1409930100000,"value":39.446,"volume":117448},{"date":1409930400000,"value":39.4768,"volume":261902},{"date":1409930700000,"value":39.49,"volume":167312},{"date":1409931000000,"value":39.465,"volume":198369},{"date":1409931300000,"value":39.41,"volume":252459},{"date":1409931600000,"value":39.4682,"volume":198152},{"date":1409931900000,"value":39.484,"volume":157797},{"date":1409932200000,"value":39.605,"volume":340086},{"date":1409932500000,"value":39.6,"volume":239919},{"date":1409932800000,"value":39.61,"volume":168990},{"date":1409933100000,"value":39.54,"volume":243846},{"date":1409933400000,"value":39.595,"volume":153528},{"date":1409933700000,"value":39.555,"volume":89423},{"date":1409934000000,"value":39.5101,"volume":120602},{"date":1409934300000,"value":39.57,"volume":226957},{"date":1409934600000,"value":39.58,"volume":186083},{"date":1409934900000,"value":39.6,"volume":77798},{"date":1409935200000,"value":39.66,"volume":141532},{"date":1409935500000,"value":39.656,"volume":148265},{"date":1409935800000,"value":39.67,"volume":119037},{"date":1409936100000,"value":39.6499,"volume":133025},{"date":1409936400000,"value":39.66,"volume":212507},{"date":1409936700000,"value":39.65,"volume":121748},{"date":1409937000000,"value":39.6501,"volume":117189},{"date":1409937300000,"value":39.659,"volume":99372},{"date":1409937600000,"value":39.645,"volume":302714},{"date":1409937900000,"value":39.5926,"volume":213603},{"date":1409938200000,"value":39.5834,"volume":86782},{"date":1409938500000,"value":39.61,"volume":70492},{"date":1409938800000,"value":39.635,"volume":150001},{"date":1409939100000,"value":39.6,"volume":73617},{"date":1409939400000,"value":39.62,"volume":58576},{"date":1409939700000,"value":39.61,"volume":41188},{"date":1409940000000,"value":39.67,"volume":156209},{"date":1409940300000,"value":39.67,"volume":107264},{"date":1409940600000,"value":39.625,"volume":123453},{"date":1409940900000,"value":39.625,"volume":64893},{"date":1409941200000,"value":39.6299,"volume":106027},{"date":1409941500000,"value":39.615,"volume":110096},{"date":1409941800000,"value":39.62,"volume":128227},{"date":1409942100000,"value":39.56,"volume":201762},{"date":1409942400000,"value":39.53,"volume":274582},{"date":1409942700000,"value":39.47,"volume":243675},{"date":1409943000000,"value":39.4485,"volume":215591},{"date":1409943300000,"value":39.4599,"volume":202245},{"date":1409943600000,"value":39.415,"volume":146415},{"date":1409943900000,"value":39.371,"volume":342121},{"date":1409944200000,"value":39.335,"volume":454842},{"date":1409944500000,"value":39.345,"volume":194560},{"date":1409944800000,"value":39.345,"volume":150055},{"date":1409945100000,"value":39.37,"volume":166733},{"date":1409945400000,"value":39.38,"volume":141367},{"date":1409945700000,"value":39.43,"volume":181643},{"date":1409946000000,"value":39.43,"volume":905006},{"date":1409946300000,"value":39.6,"volume":2073209},{"date":1409946600000,"value":39.77,"volume":2569231},{"date":1409946900000,"value":39.5801,"volume":3047498},{"date":1409947800000,"value":39.59,"volume":0},{"date":1409948700000,"value":39.59,"volume":0}]});

$(document).ready(function() {
  for(var i = 0; i<stocks.length; i++){
    //data.push(null);
    //var a = i;
    /*api(stocks[i] + ".json", null, function(dd){
      data[a] = dd;
    });*/
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

Card(stdata[0], scene, 0, 0,size*3,0,0);
Card(stdata[1], scene, 0, 0,-size*3,0,0);
Card(stdata[2], scene, 0, 0,0,0,0);
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
  this.tween.delay(10*1000+Math.random()*3000);
  
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