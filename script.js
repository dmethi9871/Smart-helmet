import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase, ref, onValue} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-analytics.js";
const firebaseConfig = {
    apiKey: "AIzaSyAgGRwbMMcDLKqDwyHjBcPkqby55xqE7IY",
    authDomain: "ezeagros.firebaseapp.com",
    databaseURL: "https://ezeagros-default-rtdb.firebaseio.com",
    projectId: "ezeagros",
    storageBucket: "ezeagros.appspot.com",
    messagingSenderId: "439167074452",
    appId: "1:439167074452:web:3c7d7e9ceb86451e2f3481",
    measurementId: "G-BWYQHFVQXD"
    };
const firebase = initializeApp(firebaseConfig);
var database = getDatabase(firebase);
var alertsoundon = false;
var isAlreadyPlaying = false;
var isTempNormal = true;
var isShiverNormal = true;
var isMQ135Normal = true;
var isMQ136Normal = true;
var isMQ2Normal = true;
var isMQ7Normal = true;
var isSPO2Normal = true;

function stopAlert(){
    const alertsound = document.getElementById("alertsound");
    if(isTempHigh && isShiverHigh && isMQ135Normal && isMQ136Normal && isMQ2Normal && isMQ7Normal && isSPO2Normal){
        alertsound.pause();
        alertsound.currentTime = 0;
        isAlreadyPlaying = false;
    }
}
function playAlert(){
    const alertsound = document.getElementById("alertsound");
    alertsound.play();
    isAlreadyPlaying = true;
}
function updateData(elementId, data) {
    document.getElementById(elementId).innerHTML = data;
  }
  setInterval(function(){
    stopAlert();
  }, 1000);

// For Temperature
function checkTemperature(){
    var temperatureHighLimit = 100;
    var ishigh = false;
    var dataR1 = ref(database, "/Body_temp");
    onValue(dataR1, function (snapshot) {
        var temp = snapshot.val();
        // updateData("temperature", temp);
        var element = document.getElementById("temperature");
        var limitMessage = document.getElementById("limitMessageTemp");
        var elementId = "temperature";
        if (temp > temperatureHighLimit) {
            element.classList.add('exceed-limit');
            limitMessage.innerHTML = `Limit Exceeded: ${elementId} value exceeds the limit!`;
            alertsoundon = true;
            ishigh = true;
            isTempNormal = false;
            playAlert();
        } else {
            element.classList.remove('exceed-limit');
            limitMessage.innerHTML = '';
            alertsoundon = false;
            isTempNormal = true;
            stopAlert();
        }
    });

};
checkTemperature();
setInterval(function(){
    checkTemperature();
    if(ishigh) playAlertSound("temperaturehigh");
}, 100);

setInterval(function(){
    if(alertsoundon && !isAlreadyPlaying){
        playAlert();
    }
}, 100);


//For Body Shivering


function checkBodyShiver(){
    var shiverLimit = 0;
    var ishigh = false;
    var dataR1 = ref(database, "/Body Shivering");
    onValue(dataR1, function (snapshot) {
        var shiver = snapshot.val();
        // updateData("temperature", temp);
        var element = document.getElementById("bodyShivering");
        var limitMessage = document.getElementById("limitMessageShiver");
        var elementId = "bodyShivering";
        if (shiver > shiverLimit) {
            element.classList.add('exceed-limit');
            limitMessage.innerHTML = `Limit Exceeded: ${elementId} value exceeds the limit!`;
            alertsoundon = true;
            ishigh = true;
            isShiverNormal = false;
            playAlert();
        } else {
            element.classList.remove('exceed-limit');
            limitMessage.innerHTML = '';
            isShiverNormal = true;
            alertsoundon = false;
            stopAlert();
        }
    });

};
// checkBodyShiver();
// setInterval(function(){
//     checkBodyShiver();
//     // if(ishigh) playAlertSound("temperaturehigh");
// }, 100);


//MQ135 Conceteration
function checkMQ135(){
    var mq135Limit = 10;
    var ishigh = false;
    var dataR1 = ref(database, "/ MQ135_concentration");
    onValue(dataR1, function (snapshot) {
        var mq135 = snapshot.val();
        // updateData("temperature", temp);
        var element = document.getElementById("mq135");
        var limitMessage = document.getElementById("limitMessageMQ135");
        var elementId = "mq135";
        if (mq135 > mq135Limit) {
            element.classList.add('exceed-limit');
            limitMessage.innerHTML = `Limit Exceeded: ${elementId} value exceeds the limit!`;
            alertsoundon = true;
            ishigh = true;
            isMQ135Normal = false;
            playAlert();
        } else {
            element.classList.remove('exceed-limit');
            limitMessage.innerHTML = '';
            isMQ135Normal = true;
            alertsoundon = false;
            stopAlert();
        }
    });

};
checkMQ135();
setInterval(function(){
    checkMQ135();
    // if(ishigh) playAlertSound("temperaturehigh");
}, 100);

//MQ136 Concetration
function checkMQ136(){
    var mq136Limit = 3;
    var ishigh = false;
    var dataR1 = ref(database, "/MQ136_concentration");
    onValue(dataR1, function (snapshot) {
        var mq136 = snapshot.val();
        // updateData("temperature", temp);
        var element = document.getElementById("mq136");
        var limitMessage = document.getElementById("limitMessageMQ136");
        var elementId = "mq136";
        if (mq136 > mq136Limit) {
            element.classList.add('exceed-limit');
            limitMessage.innerHTML = `Limit Exceeded: ${elementId} value exceeds the limit!`;
            alertsoundon = true;
            ishigh = true;
            isMQ136Normal = false;
            playAlert();
        } else {
            element.classList.remove('exceed-limit');
            limitMessage.innerHTML = '';
            isMQ136Normal = true;
            alertsoundon = false;
            stopAlert();
        }
    });

};
checkMQ136();
setInterval(function(){
    checkMQ136();
    // if(ishigh) playAlertSound("temperaturehigh");
}, 100);

//MQ2 Concetration
function checkMQ2(){
    var mq2Limit = 800;
    var ishigh = false;
    var dataR1 = ref(database, "/MQ2_concentration");
    onValue(dataR1, function (snapshot) {
        var mq2 = snapshot.val();
        // updateData("temperature", temp);
        var element = document.getElementById("mq2");
        var limitMessage = document.getElementById("limitMessageMQ2");
        var elementId = "mq2";
        if (mq2 > mq2Limit) {
            element.classList.add('exceed-limit');
            limitMessage.innerHTML = `Limit Exceeded: ${elementId} value exceeds the limit!`;
            alertsoundon = true;
            ishigh = true;
            isMQ2Normal = false;
            playAlert();
        } else {
            element.classList.remove('exceed-limit');
            limitMessage.innerHTML = '';
            isMQ2Normal = true;
            alertsoundon = false;
            stopAlert();
        }
    });

};
checkMQ2();
setInterval(function(){
    checkMQ2();
    // if(ishigh) playAlertSound("temperaturehigh");
}, 100);


//MQ7 Concetration
function checkMQ7(){
    var mq7Limit = 350;
    var ishigh = false;
    var dataR1 = ref(database, "/MQ7_concentration");
    onValue(dataR1, function (snapshot) {
        var mq7 = snapshot.val();
        // updateData("temperature", temp);
        var element = document.getElementById("mq7");
        var limitMessage = document.getElementById("limitMessageMQ7");
        var elementId = "mq7";
        if (mq7 > mq7Limit) {
            element.classList.add('exceed-limit');
            limitMessage.innerHTML = `Limit Exceeded: ${elementId} value exceeds the limit!`;
            alertsoundon = true;
            ishigh = true;
            isMQ7Normal = false;
            playAlert();
        } else {
            element.classList.remove('exceed-limit');
            limitMessage.innerHTML = '';
            isMQ7Normal = true;
            alertsoundon = false;
            stopAlert();
        }
    });

};
checkMQ7();
setInterval(function(){
    checkMQ7();
    // if(ishigh) playAlertSound("temperaturehigh");
}, 100);

//SPO2 Concetration
function spo2(){
    var spo2Limit = 105;
    var ishigh = false;
    var dataR1 = ref(database, "/Spo2");
    onValue(dataR1, function (snapshot) {
        var spo2 = snapshot.val();
        // updateData("temperature", temp);
        var element = document.getElementById("spo2");
        var limitMessage = document.getElementById("limitMessageSPO2");
        var elementId = "spo2";
        if (spo2 > spo2Limit) {
            element.classList.add('exceed-limit');
            limitMessage.innerHTML = `Limit Exceeded: ${elementId} value exceeds the limit!`;
            alertsoundon = true;
            ishigh = true;
            isSPO2Normal = false;
            playAlert();
        } else {
            element.classList.remove('exceed-limit');
            limitMessage.innerHTML = '';
            isSPO2Normal = true;
            alertsoundon = false;
            stopAlert();
        }
    });

};
spo2();
setInterval(function(){
    spo2();
    // if(ishigh) playAlertSound("temperaturehigh");
}, 100);


