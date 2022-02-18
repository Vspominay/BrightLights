let start = document.querySelector('.icon-play');
let pause = document.querySelector('.icon-pause');
let music = document.getElementById('prevMus');
let progrssBar = document.querySelector('.bar__progress');
let timeline = document.querySelector('.player__bar')
let playhead = document.querySelector('.playhead');
let playerTime = document.querySelector('.player__time');
let startInner = document.querySelector('.player__time-cur');
let capacityInner = document.querySelector('.player__time-all');
var timelineWidth = timeline.offsetWidth - playhead.offsetWidth;
let duration = music.duration;
music.addEventListener("timeupdate", timeUpdate, false);

start.addEventListener('click', () => {
    printCapcTime();
    playAudio();

})

pause.addEventListener('click', () => {
    playAudio();
})

function playAudio() {
    if (music.paused) {
        music.play();
        start.classList.add('hideplay');
        pause.classList.remove('hideplay');
        pause.classList.add('showplay');
    } else {
        music.pause();
        pause.classList.add('hideplay');
        start.classList.remove('hideplay');
        start.classList.add('showplay');
    }
}

function timeUpdate() {
    printTime();
    var playPercent = 100 * (music.currentTime / duration);
    playhead.style.left = playPercent + "%";
    progrssBar.style.width = playPercent + "%";
}

music.addEventListener("canplaythrough", () => {
    duration = music.duration;
}, false);

timeline.addEventListener("click", function (event) {
    moveplayhead(event);
    music.currentTime = duration * clickPercent(event);
}, false);

// returns click as decimal (.77) of the total timelineWidth
function clickPercent(event) {
    return (event.clientX - getPosition(timeline)) / timelineWidth;
}

function moveplayhead(event) {
    var width = event.clientX - getPosition(timeline);

    if (width >= 0 && width <= timelineWidth) {
        playhead.style.left = width + "px";
        progrssBar.style.width = width + "px";
    }
    if (width < 0) {
        playhead.style.left = "0px"
        progrssBar.style.width = "0px";
    }
    if (width > timelineWidth) {
        playhead.style.left = timelineWidth + "px";
        progrssBar.style.width = timelineWidth + "px";
    }
}
var onplayhead = false;
function mouseDown() {
    onplayhead = true;
    window.addEventListener('mousemove', moveplayhead, true);
    music.removeEventListener('timeupdate', timeUpdate, false);
}

playhead.addEventListener('mousedown', mouseDown, false);
window.addEventListener('mouseup', mouseUp, false);

function mouseUp(event) {
    if (onplayhead == true) {
        moveplayhead(event);
        window.removeEventListener('mousemove', moveplayhead, true);
        // change current time
        music.currentTime = duration * clickPercent(event);
        music.addEventListener('timeupdate', timeUpdate, false);
    }
    onplayhead = false;
}

// getPosition
// Returns elements left position relative to top-left of viewport
function getPosition(el) {
    return el.getBoundingClientRect().left;
}

function printTime() {
    startInner.innerHTML = `${calcTimes(music.currentTime)}`;
}
function printCapcTime() {
<<<<<<< HEAD
    let duration = calcTimes(music.duration);
    if (isNaN(music.duration)) {
        duration = calcTimes(0);
    }
    capacityInner.innerHTML = duration;
=======
    capacityInner.innerHTML = calcTimes(music.duration) || 0;
>>>>>>> 9a06ba4087de9b3b61bfa23787bbf0aeb8cd64ff
}

function calcTimes(secondsInp) {
    let minutes = Math.floor(secondsInp / 60);
    let seconds = Math.round(secondsInp % 60);
    if (minutes < 10) minutes = '0' + minutes;
    if (seconds < 10) seconds = '0' + seconds;
    return `${minutes}:${seconds}`;
}
printTime();
printCapcTime();
