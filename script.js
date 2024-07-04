//------------------play playlist--------------------
const musicContainer = document.querySelector('.music-container');
const playBtn = document.querySelector('#play');
const prevBtn = document.querySelector('#prev');
const nextBtn = document.querySelector('#next');
const audio = document.querySelector('#audio');
const progress = document.querySelector('.progress');
const preogressContainer = document.querySelector('.progress-container');
const title = document.querySelector('#title');
const cover = document.querySelector('#cover');
// song titles
const songs =["MAMA BALD SIND WIR REICH (ft. CYYRO)", "Vibes (ft. CYYRO)", "Heißer als Lava (ft. Leo Peru)", "Broke aber gut aussehend (ft. CYYRO)"]
//keep track of songs
let songIndex = 2

//initially load song info DOM
loadSong(songs[songIndex])

//update song details
function loadSong(song){
    title.innerText = song

audio.src = `music/${song}.m4a`
cover.src = `Assets/${song}.jpg`
}
function playSong(){
    musicContainer.classList.add('play')
    playBtn.querySelector('i.fas').classList.remove('fa-play')
    playBtn.querySelector('i.fas').classList.add('fa-pause')

    audio.play()
}
function pauseSong(){
    musicContainer.classList.remove('play')
    playBtn.querySelector('i.fas').classList.remove('fa-pause')
    playBtn.querySelector('i.fas').classList.add('fa-play')

    audio.pause()
}
function prevSong(){
    songIndex--
    if(songIndex < 0){
        songIndex= songs.length - 1
    }
    loadSong(songs[songIndex])
    playSong()
}
function nextSong(){
    songIndex++
    if(songIndex > songs.length -1){
        songIndex = 0
    }
    loadSong(songs[songIndex])
    playSong()
}
function updateProgress(e){
    const { duration, currentTime} = e.srcElement
    const progressPercent = (currentTime / duration) * 100
    progress.style.width = `${progressPercent}%`
}
function setProgress(e){
    const width = this.clientWidth
    const clickX = e.offsetX
    const duration = audio.duration

    audio.currentTime = (clickX / width) * duration
}
//event listners
playBtn.addEventListener('click', () => {
    const isPlaying = musicContainer.classList.contains('play')
    console.log('played');

    if(isPlaying){
        pauseSong()
    }else{
        playSong()
    }
})
//change song event
prevBtn.addEventListener('click', prevSong)
nextBtn.addEventListener('click', nextSong)

audio.addEventListener('timeupdate', updateProgress)

preogressContainer.addEventListener('click', setProgress)

audio.addEventListener('ended', nextSong)


//-----------------------countdown------------------------

let launchDate = new Date("Jun 10 2022 22:00:00").getTime();
launchDate;
let time = setInterval(tick, 1000);

function tick (){
    let now = new Date().getTime();
    let t = launchDate - now;

    if (t > 0){
        let days = Math.floor( t / (1000 * 60 * 60 * 24));

    if(days < 10){
        days ="0" + days;
    }
    let hours = Math.floor(( t % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    if(hours < 10){
        hours ="0" + hours;
    }
    let mins = Math.floor(( t % (1000 * 60 * 60)) / (1000 * 60));

    if(hours < 10){
        mins ="0" + mins;
    }
    let secs = Math.floor(( t % (1000 * 60)) / 1000);
    
    if(secs < 10){
       secs ="0" + secs;
    }

    let time = `${days} : ${hours} : ${mins} : ${secs}`;

    document.querySelector('.countdown').innerText = time;
    }
}
tick();
