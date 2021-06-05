var showList = [
  '/spiritbomb_ai/xen-stream-002/',
  '/spiritbomb_ai/xen-stage-construction/',
  '/spiritbomb_ai/xen-stage-construction-visualizer-3/'
];
var randomIndex = Math.floor(Math.random() * showList.length);
var randomIndex = showList[Math.floor(Math.random()*showList.length)];
var widget = Mixcloud.PlayerWidget(document.getElementById("mixcloud-widget"));
var playPauseButton = document.getElementsByClassName("radioButton");

widget.ready.then(function() {
  loadRandom();
  widget.play();
  // make sure playing() gets called when playlist autostart = true
  setTimeout(function() {
    widget.getIsPaused().then(result => {
      playing();
    });
  }, 350);
  widget.events.play.on(playing);
  console.log('listening for play')
});

function playing() {
  widget.getIsPaused().then(result => {

    if(! result) {
      console.log('playing if ' + result)
      playPauseButton[0].classList.add("paused");
      widget.events.play.off(playing);
      widget.events.pause.on(playing);

    } else if (result) {
      console.log('paused if ' + result)
      playPauseButton[0].classList.remove("paused");
      widget.events.pause.off(playing);
      widget.events.play.on(playing);

    } else {
      console.log('will never be reached')
    }

  });
}

function loadShow_0() {
    widget.load(showList[0], true);
}

function loadShow_1() {
    widget.load(showList[1], true);
}

function loadShow_2() {
    widget.load(showList[2], true);
}

function togglePlay() {
  widget.togglePlay();
}

function loadRandom() {
  widget.load(randomIndex, false);
}

document.getElementById("show_000").onclick = function() {
  loadShow_0();
  widget.play();
  // make sure playing() gets called when playlist autostart = true
  setTimeout(function() {
    widget.getIsPaused().then(result => {
      playing();
    });
  }, 350);
}

document.getElementById("show_001").onclick = function() {
  loadShow_1();
  widget.play();
  setTimeout(function() {
    widget.getIsPaused().then(result => {
      playing();
    });
  }, 350);
}

document.getElementById("show_002").onclick = function() {
  loadShow_2();
  widget.play();
  setTimeout(function() {
    widget.getIsPaused().then(result => {
      playing();
    });
  }, 350);
}

// function simClick() {
//   document.getElementById("radioButtonId").click();
// }
