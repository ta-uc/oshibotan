const ua = navigator.userAgent.toLowerCase();
const isMobile = /iphone|ipod|ipad|android/.test(ua);
const eventStart = isMobile ? "touchstart" : "mousedown";
const eventEnd = isMobile ? "touchend" : "mouseup";

const wait = sec => {
  return () => {
    return new Promise( resolve => {
      setTimeout(resolve, sec*1000)
    });
  }
};

const measureDuration = (() => {
  let startTime;
  let endTime;
  let duration;
  return {
    startMeasure : () => {
      startTime = Date.now();
    },
    stopMeasure : () => {
      endTime = Date.now();
    },
    checkDuration : () => {
      duration = endTime - startTime;
      if(duration > 300){
        return true;
      }else{
        return false;
      }
    }
  }
})();

const changeDisplay = () => {
  if(!button.disabled){
    wait_text.style.display = "block";
    push_text.style.display = "none";
    button.disabled = true;
    Promise.resolve()
    .then(wait(2))
    .then(() => {
      sound.play();
      wait_text.style.display = "none";
      push_text.style.display = "none";
    })
    .then(wait(3))
    .then(() => {
      wait_text.style.display = "none";
      push_text.style.display = "block";
      button.disabled = false;
    })
  }
}

button.addEventListener(eventStart, () => {
  measureDuration.startMeasure();
});

button.addEventListener(eventEnd, () => {
  measureDuration.stopMeasure();
  if (measureDuration.checkDuration()) {
    changeDisplay();
  }
});

var database = firebase.database();
var ips = database.ref("/ip");

(function(){
  ips.set({title:"たとえば"});
}());
