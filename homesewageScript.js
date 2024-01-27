import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase, ref, onValue} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-analytics.js";
const firebaseConfig = {
    apiKey: "AIzaSyCuKnQUCNNpqPk_2qnSTX82Dr61R6tulvk",
    authDomain: "ezebuddies-sewage.firebaseapp.com",
    databaseURL: "https://ezebuddies-sewage-default-rtdb.firebaseio.com",
    projectId: "ezebuddies-sewage",
    storageBucket: "ezebuddies-sewage.appspot.com",
    messagingSenderId: "956190895994",
    appId: "1:956190895994:web:00d8e78b9ce64ecfc1f0c3",
    measurementId: "G-WN1NGNPNDE"
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
    var dataR1 = ref(database, "/H_2_s");
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
