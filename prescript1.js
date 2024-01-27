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
var isMQ135Normal = true;
var isMQ136Normal = true;
var isMQ2Normal = true;
var isMQ7Normal = true;

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

//MQ135 Conceteration
function checkMQ135(){
    var mq135Limit = 30;
    var ishigh = false;
    var dataR1 = ref(database, "/Ammonia");
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
    var dataR1 = ref(database, "/Hydrogen_sulphide");
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
// function checkMQ2(){
//     var mq2Limit = 800;
//     var ishigh = false;
//     var dataR1 = ref(database, "/PH");
//     onValue(dataR1, function (snapshot) {
//         var mq2 = snapshot.val();
//         // updateData("temperature", temp);
//         var element = document.getElementById("mq2");
//         var limitMessage = document.getElementById("limitMessageMQ2");
//         var elementId = "mq2";
//         if (mq2 > mq2Limit) {
//             element.classList.add('exceed-limit');
//             limitMessage.innerHTML = `Limit Exceeded: ${elementId} value exceeds the limit!`;
//             alertsoundon = true;
//             ishigh = true;
//             isMQ2Normal = false;
//             playAlert();
//         } else {
//             element.classList.remove('exceed-limit');
//             limitMessage.innerHTML = '';
//             isMQ2Normal = true;
//             alertsoundon = false;
//             stopAlert();
//         }
//     });

// };
// checkMQ2();
// setInterval(function(){
//     checkMQ2();
//     // if(ishigh) playAlertSound("temperaturehigh");
// }, 100);


//MQ7 Concetration
function checkMQ7(){
    var mq7Limit = 4000;
    var ishigh = false;
    var dataR1 = ref(database, "/Turbudity");
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