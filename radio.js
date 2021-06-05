var showList = [
  '/spiritbomb_ai/xen-stream-002/',
  '/spiritbomb_ai/xen-stage-construction/',
  '/spiritbomb_ai/xen-stage-construction-visualizer-3/'
];
//var randomIndex = Math.floor(Math.random() * showList.length);
var randomIndex = showList[Math.floor(Math.random()*showList.length)];
var widget = Mixcloud.PlayerWidget(document.getElementById("mixcloud-widget"));
var playPauseButton = document.getElementsByClassName("radioButton");

widget.ready.then(function() {
  //widget.load(randomIndex, false);
  //console.log(randomIndex, 'show loaded … ready')
  widget.events.play.on(playing);
  console.log('listening for play')
  //widget.events.pause.on(playing);
  //console.log('listening for pause')
});

document.getElementById("show_000").onclick = function() {
  loadShow_0();
  widget.play();
  /* setTimeout(function() {
    simClick();
  }, 500); */
  playing();
}

function playing() {
  widget.getIsPaused().then(result => {
    if(! result) {
      console.log('playing if ' + result)
      playPauseButton[0].classList.add("paused");
      console.log('playListener added paused class')
      widget.events.play.off(playing);
      widget.events.pause.on(playing);
      console.log('listening for pause')
    } else if (result) {
      console.log('paused if ' + result)
      playPauseButton[0].classList.remove("paused");
      console.log('playlistener removed paused class')
      widget.events.pause.off(playing);
      widget.events.play.on(playing);
      console.log('listening for play')
    } else {
      console.log('will never be reached')
    }
  });
  /* return {
    playing: playing
  } */
}

function loadShow_0() {
  function init() {
    //widget.events.play.on(playing);
    //console.log('listening for play')
    widget.load(showList[0], true);
    console.log('play autostarted')
    //widget.events.play.off(playing);
    //widget.events.pause.on(playing);
    //console.log('listening for pause')
  }
  init();
  console.log('init();')
  console.log('show 0 is this.playing();')
}


function loadShow_1() {
  widget.load(showList[1], true);
  widget.play();
  console.log('play autostarted')
  //widget.events.play.off(playing);
  //widget.events.pause.on(playing);
  //console.log('listening for pause')
  playing();
  //playPauseButton[0].classList.add("paused");
}

function loadShow_2() {
  widget.load(showList[2], true);
  widget.play();
  console.log('play autostarted')
  widget.events.play.off(playing);
  widget.events.pause.on(playing);
  console.log('listening for pause')
  playing();
  //playPauseButton[0].classList.add("paused");
}

function togglePlay() {
  widget.togglePlay();
}

function simClick() {
  document.getElementById("radioButtonId").click();
}
