const 
	player = document.querySelector('.player'),
	playBtn = document.querySelector('.play'),
	audio = document.querySelector('.music'),
	progressContainer = document.querySelector('.progress_container')
	progress = document.querySelector('.progress'),
	timeNow = document.querySelector('.current-time');



function play() {
	player.classList.add('play');
	playBtn.src = "./img/pause.png";
	audio.play();
}

function pause() {
	player.classList.remove('play');
	playBtn.src = "./img/play.svg";
	audio.pause();
}

playBtn.addEventListener('click', () => {
	const isPlaying = player.classList.contains('play');
	if(isPlaying)
	{
		pause();
	} else { 
		play();
	}
});

function timeUpdate(time) {
	let minute = Math.floor(time / 60);
	let seconds = Math.floor(time - minute * 60);
	if(minute < 10) { minute = "0" + minute; }
	if(seconds < 10) { seconds = "0" + seconds; }
	timeNow.innerText = `${minute}:${seconds}`;
}

function updateProgress(e) {
	const {duration, currentTime} = e.srcElement;
	const progressPercent = (currentTime / duration) * 100;
	progress.style.width = `${progressPercent}%`;
	timeUpdate(currentTime);
}

audio.addEventListener('timeupdate', updateProgress);

function setProgress(e) {
	const width = this.clientWidth;
	const clickX = e.offsetX;
	const duration = audio.duration;

	audio.currentTime = (clickX / width) * duration;
}

progressContainer.addEventListener('click', setProgress);

