function app(){
const song = document.querySelector('.song')
const play = document.querySelector('.play')
const outline = document.querySelector('.moving-outline circle')
const video = document.querySelector('.vid-container video')

//SOUNDS

const sounds = document.querySelectorAll('.sound-picker button');
// Time Display
const timeDisplay = document.querySelector('.time-display');
// Get the lenght of the outline
const timeSelect = document.querySelectorAll('.time-select button')
const outlineLength = outline.getTotalLength();


let fakeDuration = 600;
outline.style.strokeDasharray = outlineLength;
outline.style.strokeDashoffset = outlineLength;

sounds.forEach(sound => {
    sound.addEventListener("click", function() {
      song.src = this.getAttribute("data-sound");
      video.src = this.getAttribute("data-video");
      checkPlaying(song);
    });
  });
  

//Play Sound
play.addEventListener('click',()=>{
   
    checkPlaying(song);
    // checkPlaying(song)
});

// Select sound
timeSelect.forEach(option =>{
    option.addEventListener('click', function(){
        fakeDuration = this.getAttribute("data-time");
        timeDisplay.textContent = `${Math.floor(fakeDuration/60)}:${Math.floor(fakeDuration%60)}`;
    }); 
})


// Create a function specific to stop and play the sounds

const checkPlaying = song =>{
    if(song.paused){
        song.play();
        video.play();
        play.src='./svg/pause.svg';
    }else{
        song.pause();
        video.pause();
        play.src="./svg/play.svg";
    }
}

song.ontimeupdate = function() {
    let currentTime = song.currentTime;
    let elapsed = fakeDuration - currentTime;
    let seconds = Math.floor(elapsed % 60);
    let minutes = Math.floor(elapsed / 60);
    timeDisplay.textContent = `${minutes}:${seconds}`;
    console.log(timeDisplay.textContent)
    let progress = outlineLength - (currentTime / fakeDuration) * outlineLength;
    outline.style.strokeDashoffset = progress;
    console.log(progress)
    console.log('inside ontimeupdate');
    if (currentTime >= fakeDuration) {
      song.pause();
      song.currentTime = 0;
      play.src = "./svg/play.svg";
      video.pause();
    }
  };
};
app();

