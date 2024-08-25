let $ = document; // alias kiye hai

const image = $.querySelector("#cover");
const title = $.querySelector("#title");
const artist = $.querySelector("#artist");
const music = $.querySelector("#audio");
const currentTimeEl = $.querySelector("#current-time");
const durationEl = $.querySelector("#duration");
const progress = $.querySelector("#progress");
const progressContainer = $.querySelector("#progress-container");
const prevBtn = $.querySelector("#prev");
const playBtn = $.querySelector("#play");
const nextBtn = $.querySelector("#next");
const background = $.querySelector("#background");

// const songs ek array bnae hai uske under songs ke objects insert kiye hai. 

const songs = [

  {
    path: "https://pagallworld.co.in/wp-content/uploads/2023/11/Cheri-Cheri-Lady.mp3",
    musicName: "Cheri Cheri Lady.",
    artist: "Modern Talking.",
    cover: "https://th.bing.com/th/id/OIP.AtdgLpJxfuYvXSODxdlBxgHaHa?w=171&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
  },


  {
    path: "https://hindi3.djpunjab.app/load/EqaDW-O7bZn-srX7LjadKw==/Pyaar%20Ke%20Pal%20(From%20Pal).mp3",
    musicName: "Pyaar Ke Pal.",
    artist: "KK.",
    cover: "https://raag.fm/image/250/2417833/Best_of_Bollywood:_KK_K.K..jpg",
  },
  

  {
    path: "https://www.pagalworld.com.sb/files/download/type/320/id/70532",
    musicName: "Pehle Bhi Main Remix.",
    artist: "Vishal Mishra.",
    cover: "https://th.bing.com/th/id/OIP.KJiWdwcMZDsU8RgFe1ZzkwHaEK?w=287&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
  },
  

  {
    path: "https://www.pagalworld.com.sb/files/download/type/192/id/68445",
    musicName: "Barbaadiyan Club Mix.",
    artist: "Sachet Tandon, Nikhita Gandhi.",
    cover: "https://th.bing.com/th/id/OIP.5f-yxmFE6zfJbbBG3jWZlAHaHa?w=183&h=183&c=7&r=0&o=5&dpr=1.3&pid=1.7",
  },


  {
    path: "https://raag.fm/files/mp3/128/Hindi/1067286/Woh%20Lamhein%20(DJ%20Suketu%20Mix)%20-%20(Raag.Fm).mp3",
    musicName: "Woh Lamhein (DJ Suketu Mix).",
    artist: "Atif Aslam.",
    cover: "https://raag.fm/image/250/1067286/Zeher_Atif_Aslam.jpg",
  },


  {
    path: "https://www.pagalworld.com.sb/files/download/type/320/id/68510",
    musicName: "Hua Main Remix.",
    artist: "Raghav Chaitanya.",
    cover: "https://downloadming.ws/uploads/Animal-2023-MP3-Songs-Download.jpg",
  },
  

  {
    path: "https://djmaza.live/files/download/type/320/id/14828",
    musicName: "Love Stereo Again.",
    artist: "Edward Maya.",
    cover: "https://www.filmytoday.com/ogimage/news/20131/tiger-shroff-and-zahrah-khan-are-sizzling-in-love-stereo-again/",
  },


  {
    path: "https://pagal.com.in/assets/images/products/Chhod_Diya_-_Baazaar_128_Kbps.mp3",
    musicName: "Chhod Diya.",
    artist: "Arijit Singh.",
    cover: "https://th.bing.com/th/id/OIP.a7n0hamhjLEPklVFfYYTNwHaKt?w=139&h=200&c=7&r=0&o=5&dpr=1.3&pid=1.7",
  },


];



let isPlaying = false;   // starting me songs play nhi hoga until we click on the play button that's why false kiye hai.
let songIndex = 0;       // array ke under ka index ko depict kr rha ye to songs phele index pe jo hai usko phele play krega.


function playSong() {
  isPlaying = true;
  playBtn.classList.replace("fa-play", "fa-pause");
  playBtn.setAttribute("title", "Pause");
  music.play();
}


function pauseSong() {
  isPlaying = false;
  playBtn.classList.replace("fa-pause", "fa-play");
  playBtn.setAttribute("title", "Play");
  music.pause();
}

function playToggle() {
  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
}

function loadSongs(song) {
  title.innerHTML = song.musicName;
  artist.innerHTML = song.artist;
  music.src = song.path;
  changeCover(song.cover);
}


function changeCover(cover) {
  image.classList.remove("active");
  setTimeout(() => {
    image.src = cover;
    image.classList.add("active");
  }, 100);
}


function nextSong() {
  songIndex++;
  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }
  loadSongs(songs[songIndex]);
  playSong();
}

function prevSong() {
  songIndex--;
  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }
  loadSongs(songs[songIndex]);
  playSong();
}

function updateProgressBar() {
  if (isPlaying) {
    const duration = music.duration;
    const currentTime = music.currentTime;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
    const durationMinutes = Math.floor(duration / 60);
    const durationSeconds = Math.floor(duration % 60);
    if (durationSeconds < 10) {
      durationSeconds = `0${durationSeconds}`;
    }
    if (durationSeconds) {
      durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
    }
    const currentMinutes = Math.floor(currentTime / 60);
    let currentSeconds = Math.floor(currentTime % 60);
    if (currentSeconds < 10) {
      currentSeconds = `0${currentSeconds}`;
    }
    currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
  }
}

function setProgressBar(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = music.duration;
  music.currentTime = (clickX / width) * duration;
}

playBtn.addEventListener("click", playToggle);
prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);
music.addEventListener("timeupdate", updateProgressBar);
music.addEventListener("ended", nextSong);
progressContainer.addEventListener("click", setProgressBar);

loadSongs(songs[songIndex]);
