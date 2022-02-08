const prefix = "/spiritbomb_ai/";
const showList = [
  `${prefix}xen-stream-002/`,
  `${prefix}xen-stage-construction/`,
  `${prefix}xen-stage-construction-visualizer-3/`
];

// declaring here so it can be used everywhere
let widget;

document.addEventListener("DOMContentLoaded", () => {
	console.log("** Document ready **");

  const widgetElement = document.getElementById("mixcloud-widget");

  // Instantiate the widget, attach the listener
  widget = Mixcloud.PlayerWidget(widgetElement);
  widget.ready.then(onReady);
});

function onReady() {
  console.log("** Widget ready **");
  // NOTE: ES6 variable destructuring; equivalent of "const events = widget.evernts"
  const { events } = widget;
  const numberOfShows = showList.length;
  const playPauseButton = document.getElementsByClassName("radioButton");

  events.buffering.on(() => console.log("buffering event"));
  events.ended.on(() => console.log("ended event"));
  events.error.on(() => console.log("error event"));
  events.play.on(playing);
  events.pause.on(playing);

  function playing() {
  widget.getIsPaused().then(result => {

    if(! result) {
      console.log('playing if ' + result)
      playPauseButton[0].classList.add("paused");
      console.log('listening for pause via playing()')

    } else if (result) {
      console.log('paused if ' + result)
      playPauseButton[0].classList.remove("paused");
      console.log('listening for play via playing()')

    } else {
      console.log('will never be reached')
    }

  })
}

  document.addEventListener("click", (evt) => { // a click event fired
    const { target } = evt;
    const action = target.getAttribute("action");

    if(action === "play-show") { //play link was clicked
      const indexAttribute = target.getAttribute("data-show-index");
      const index = parseInt(indexAttribute, 10);
      const showPath = showList[index];

      widget.pause();
      widget.load(showPath, true);

      setTimeout(function() {
          widget.getIsPaused().then(result => {
            playing();
            widget.events.pause.on(playing);
            widget.events.play.on(playing);
            console.log('check if ' + clickedId + ' is playing()')
          });

        }, 666);
    }
  }, false)
}

function togglePlay() {
  widget.togglePlay;
}

// let randomIndex = showList[Math.floor(Math.random()*showList.length)];
// let widget = Mixcloud.PlayerWidget(document.getElementById("mixcloud-widget"));
// let playPauseButton = document.getElementsByClassName("radioButton");
// let clickedId = "";
// let showListIndex = "";
//
// function loadShow() {
//   let showListIndex = document.getElementById(clickedId).dataset.showListIndex;
//   console.log(showListIndex + ' loaded')
//   widget.ready.then(function() {
//     widget.load(showList[~~showListIndex], false);
//   })
// }

// function loadRandom() {
//   widget.load(randomIndex, false);
// }

// function simClick() {
//   document.getElementById("mixcloud-div").click();
// }
