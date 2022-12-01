const 
	player = document.querySelectorAll('.player'),
	playBtn = document.querySelectorAll('.play'),
	audio = document.querySelector('.music'),
	progressContainer = document.querySelectorAll('.progress_container')
	progress = document.querySelectorAll('.progress'),
	timeNow = document.querySelectorAll('.current-time'),
	maxTime = document.querySelectorAll('.max-time'),
	tracksList = document.querySelectorAll('.tracks__item');

let 
	isPlaying = false,
	trackIndex = 0,
	isListing = false;

const tracks = ['3LAU, Bright Lights — How You Love Me', 'Bright Lights, Kaleena Zanders, Kandy — War For Love', 'Pink Is Punk, Benny Benassi, Bright Lights — Ghost', 'Hardwell, Dyro, Bright Lights — Never Say Goodbye', 'Zeds Dead, Dirtyphonics, Bright Lights — Where Are You Now', 'Zedd, Bright Lights — Follow You Down'];

// !!!!! console.log(e.target.innerText); !!!!!!!


function loadTrack() {
	if(isListing) { return 0; }
	if(trackIndex === 0 || trackIndex == 2) {
		audio.src = `audio/${tracks[1]}.mp3`;
	}
	else if(trackIndex === 1) {
		audio.src = `audio/${tracks[0]}.mp3`;
	}
	else if(trackIndex === 3) {
		audio.src = `audio/${tracks[2]}.mp3`;
	}
	else if(trackIndex === 4) {
		audio.src = `audio/${tracks[3]}.mp3`;
	}
	else if(trackIndex === 5) {
		audio.src = `audio/${tracks[4]}.mp3`;
	}
	else if(trackIndex === 6) {
		audio.src = `audio/${tracks[5]}.mp3`;
	}
	findMaxTime();
}

function play() {
	isPlaying = true;
	loadTrack();
	isListing = true;
	player.forEach(item => {
		item.classList.add('play');
	});
	playBtn.forEach(item => {
		item.src = "./img/pause.png";
	});
	audio.play();
}

function pause() {
	isPlaying = false;
	player.forEach(item => {
		item.classList.remove('play');
	});
	playBtn.forEach(item => {
		item.src = "./img/play.svg";
	});
	audio.pause();
}

function stop() {
	isListing = false;
	pause();
}

playBtn.forEach(item => {
	item.addEventListener('click', () => {
		if(isPlaying)
		{
			pause();
		} else { 
			play();
		}
	});
});


function timeUpdate(time) {
	let minute = Math.floor(time / 60);
	let seconds = Math.floor(time - minute * 60);
	if(minute < 10) { minute = "0" + minute; }
	if(seconds < 10) { seconds = "0" + seconds; }
	timeNow.forEach(item => {
		item.innerText = `${minute}:${seconds}`;
	})
}

function updateProgress(e) {
	const {duration, currentTime} = e.srcElement;
	const progressPercent = (currentTime / duration) * 100;
	progress.forEach(item => {
		item.style.width = `${progressPercent}%`;
	})
	timeUpdate(currentTime);
	if(currentTime === duration) {
		nextTrack();
	}
}

audio.addEventListener('timeupdate', updateProgress);

function setProgress(e) {
	const width = this.clientWidth;
	const clickX = e.offsetX;
	const duration = audio.duration;

	audio.currentTime = (clickX / width) * duration;
}

progressContainer.forEach(item => item.addEventListener('click', setProgress));


function findMaxTime() {
	setTimeout(() => {
		const duration = audio.duration;
		let minute = Math.floor(duration / 60);
		let seconds = Math.floor(duration - minute * 60);
		if(minute < 10) { minute = "0" + minute; }
		if(seconds < 10) { seconds = "0" + seconds; }
		maxTime.forEach(item => item.innerText = `${minute}:${seconds}`);
	}, 600)
}

document.addEventListener('DOMContentLoaded', findMaxTime);

function nextTrack(track = -1) {
	const oldActive = document.querySelector('.active-item');
	if(oldActive != null) { oldActive.classList.remove('active-item'); }
	if(track == -1) {
		trackIndex++;
		if(trackIndex > tracks.length) { trackIndex = 0; stop(); }
	}
	else { trackIndex = track }
	tracks.forEach(item => {
		if(tracksList[trackIndex - 1].outerText == item) { tracksList[trackIndex - 1].classList.add('active-item');}
	})
	pause();
	isListing = false;
	play();
}



tracksList.forEach(item => {
	item.addEventListener('click', (e) => {
		const oldActive = document.querySelector('.active-item');
		if(oldActive != null) { oldActive.classList.remove('active-item'); }
		tracks.find((track, index) => {
			if(track === e.target.innerText) {
				nextTrack(index + 1);
			}
		})
		item.classList.add('active-item')
	})
})