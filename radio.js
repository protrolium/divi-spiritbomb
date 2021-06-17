var showList = [
  '/spiritbomb_ai/xen-stream-002/',
  '/spiritbomb_ai/xen-stage-construction/',
  '/spiritbomb_ai/xen-stage-construction-visualizer-3/'
];

var randomIndex = showList[Math.floor(Math.random()*showList.length)];
var widget = Mixcloud.PlayerWidget(document.getElementById("mixcloud-widget"));
var playPauseButton = document.getElementsByClassName("radioButton");
var clickedId = "";
var showListIndex = "";

widget.ready.then(function() {
  //loadRandom();
  //widget.play();
  // make sure playing() gets called when playlist autostart = true

  setTimeout(function() {
    widget.getIsPaused().then(result => {
      playing();
      console.log('widget.ready playing()')
    });
  }, 350);

  widget.events.play.on(playing);
  console.log('listening for play from widet.ready.then()')
});

function playing() {
  widget.getIsPaused().then(result => {

    if(! result) {
      console.log('playing if ' + result)
      playPauseButton[0].classList.add("paused");
      widget.events.play.off(playing);
      widget.events.pause.on(playing);
      console.log('listening for pause via playing()')

    } else if (result) {
      console.log('paused if ' + result)
      playPauseButton[0].classList.remove("paused");
      widget.events.pause.off(playing);
      widget.events.play.on(playing);
      console.log('listening for play via playing()')

    } else {
      console.log('will never be reached')
    }

  })
}

function loadShow() {
  showListIndex = document.getElementById(clickedId).dataset.showListIndex;
  console.log(showListIndex + ' loaded')
  widget.ready.then(function() {
    widget.load(showList[~~showListIndex], false);
  })
}

function togglePlay() {
  widget.togglePlay();
}

function loadRandom() {
  widget.load(randomIndex, false);
}

document.addEventListener('click', function(e) {
  clickedId = e.target.id;
  console.log('clickedId = ' + e.target.id)

  if (clickedId.startsWith('show_') == true) {
    onClickPlaylist();
  } else {
    console.log('show_ not true')
  }
}, false);

function onClickPlaylist() {
  widget.pause();
  widget.events.pause.off(playing);
  widget.events.play.on(playing);
  console.log('listening for play via onClickPlaylist()')

  loadShow();

  setTimeout(function() {
    widget.ready.then(result => {
      widget.play();
      console.log('play() via onClickPlaylist')
      widget.events.play.off(playing);
      widget.events.pause.on(playing);
      console.log('listening for pause via onClickPlaylist()')
    });

    widget.getIsPaused().then(result => {
      playing();
      console.log('check if ' + clickedId + ' is playing()')
    });

  }, 1000);
}

// function simClick() {
//   document.getElementById("radioButtonId").click();
// }
