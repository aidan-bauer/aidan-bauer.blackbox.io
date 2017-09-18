var activeSong;
var play = "../media/play.png";

function play(id) {
	//select the audio ID
	activeSong = document.getElementById(id)

	//play the song
	activeSong.play();

}

function pause() {
	activeSong.pause();
}

function playPause(id,image) {
	activeSong = document.getElementById(id);

	if (activeSong.paused){
		activeSong.play();
		document.getElementById(image).src = "../media/pause.png";
	}else{
		activeSong.pause();
		document.getElementById(image).src = "../media/play.png";
	}	
}

//resets the play/pause icon to play once the song finishes
function resetImage(image) {
	document.getElementById(image).src = "../media/play.png";
}

function stop(image) {
	//set the time of the file back to zero
	activeSong.currentTime = 0;
	//pause the file
	activeSong.pause();
	//change the play button back to its default state
	resetImage(image);
}

//updates the current time function
function updateTime(songTime,songSlider,trackProgress) {
	var currentSeconds = (Math.floor(activeSong.currentTime % 60) < 10 ? '0' : '') + Math.floor(activeSong.currentTime % 60);
	var currentMinutes = Math.floor(activeSong.currentTime / 60);

	//sets current song location compared to song duration
	document.getElementById(songTime).innerHTML = (currentMinutes + ':' + currentSeconds+'/'+Math.floor(activeSong.duration/60)+':'+(Math.floor(activeSong.duration%60) < 10 ? '0' : '') + Math.floor(activeSong.duration%60));

	//fills out slider w/appropriate position
	var percentageOfSong = (activeSong.currentTime/activeSong.duration);
	var percentageOfSlider = document.getElementById(songSlider).offsetWidth * percentageOfSong;

	//updates the track progress div
	document.getElementById(trackProgress).style.width = Math.round(percentageOfSlider) + "px";
}

//set the playback location as percentage based off of user click
function setLocation(percentage) {
	activeSong.currentTime = activeSong.duration * percentage;
}

//gets the percentage for user click
function setSongPosition(obj,e) {
	var songSliderWidth = obj.offsetWidth;
	var eventObj = window.event? event:e;
	clickLocation = eventObj.layerX - obj.offsetLeft;

	var percentage = (clickLocation/songSliderWidth);
	setLocation(percentage);
}

//set volume as percentage of total off of user click
function setVolume(percentage) {
	activeSong.volume = percentage;

	var percentageOfVolume=activeSong.volume / 1;
	var percentageOfVolumeSlider=document.getElementById('volumeMeter').offsetWidth*percentageOfVolume;

	document.getElementById('volumeStatus').style.width = Math.round(percentageOfVolumeSlider) + "px";
}

//set new volume id based off the click on the volume bar
function setNewVolume(obj,e) {
	var volumeSliderWidth = obj.offsetWidth;
	var eventObj = window.event ? event: e;
	clickLocation = eventObj.layerX - obj.offsetLeft;

	var percentage = (clickLocation / volumeSliderWidth);
	setVolume(percentage);
}