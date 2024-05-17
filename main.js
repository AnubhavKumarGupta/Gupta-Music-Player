let $ = document;
const image = $.getElementById("cover");
const title = $.getElementById("title");
const artist = $.getElementById("artist");
const music = $.querySelector("audio");
const currentTimeEl = $.getElementById("current-time");
const durationEl = $.getElementById("duration");
const progress = $.getElementById("progress");
const progressContainer = $.getElementById("progress-container");
const prevBtn = $.getElementById("prev");
const playBtn = $.getElementById("play");
const nextBtn = $.getElementById("next");
const background = $.getElementById("background");

const songs = [

  {
    path: "https://pagalfree.com/download/320-Naacho%20Naacho%20-%20RRR%20320%20Kbps.mp3",
    musicName: "Naacho Naacho",
    artist: "Vishal Mishra, Rahul Sipligunj.",
    cover: "https://pagalfree.com/images/128Naacho%20Naacho%20-%20RRR%20128%20Kbps.jpg",
  },


  {
    path: "https://hindi.djpunjab.app/load/K3i7DtkOK2HHkhh39UXW8Q==/Papa%20Meri%20Jaan%20(Childs%20Version).mp3",
    musicName: "Papa Meri Jaan",
    artist: "R.P. Krishaang",
    cover: "https://pagalfree.com/images/128Papa%20Meri%20Jaan%20-%20Animal%20128%20Kbps.jpg",
  },


  {
    path: "https://pagalfree.com/download/320-Dosti%20-%20RRR%20320%20Kbps.mp3",
    musicName: "Dosti",
    artist: "Amit Trivedi, M. M. Keeravani",
    cover: "https://pagalfree.com/images/128Dosti%20-%20RRR%20128%20Kbps.jpg",
  },


  {
    path: "https://www.mediafire.com/file/cl5u8500s12jx8k/HUA+MAIN+(REMIX)+-+DJ+TARAL.mp3/file",
    musicName: "Hua Main Remix",
    artist: "Raghav Chaitanya",
    cover: "https://downloadming.ws/uploads/Animal-2023-MP3-Songs-Download.jpg",
  },



  {
    path: "https://raag.fm/files/mp3/128/Hindi/2308450/Chaar%20Botal%20Vodka%20(Ragini%20MMS%202)%20-%20(Raag.Fm).mp3",
    musicName: "Chaar Botal Vodka",
    artist: "Yo Yo Honey Singh",
    cover: "https://resize.indiatvnews.com/en/resize/oldbucket/1200_-/entertainmentbollywood/Ragini-MMS-song12207.jpg",
  },


  {
    path: "https://pagalfree.com/download/320-Khairiyat%20(Bonus%20Track)%20-%20Chhichhore%20320%20Kbps.mp3",
    musicName: "Khairiyat (Bonus Track)",
    artist: "Arijit Singh",
    cover: "https://pagalfree.com/images/128Khairiyat%20(Bonus%20Track)%20-%20Chhichhore%20128%20Kbps.jpg",
  },


  {
    path: "https://sd2.djjohal.com/128/518405/King%20Shit%20-%20Shubh%20(DJJOhAL.Com).mp3",
    musicName: "King Shit",
    artist: "Shubh",
    cover: "https://pagalfree.com/images/128King%20Shit%20-%20Leo%20128%20Kbps.jpg",
  },



  {
    path: "https://new.downloadming.ws/2016a/bollywood%20mp3/K.K.%20Mega%20Hit%20Songs%20Collection%20(2017)/K.K.%20-%20Mega%20Hit%20Songs%20Collection%20(2017)%20(320%20Kbps)/18%20-%20Tujhi%20Mein%20(Crook)%20-%20K.K.%20-%20DownloadMing.SE.mp3",
    musicName: "Tujhi Mein",
    artist: "K.K.",
    cover: "https://e-cdn-images.dzcdn.net/images/cover/b085365c38eaaa6095ae44723a76f853/500x500-000000-80-0-0.jpg",
  },

];

let isLoading = false;

function playSong() {
  isLoading = true;
  playBtn.classList.replace("fa-play", "fa-pause");
  playBtn.setAttribute("title", "Pause");
  music.play();
}

function pauseSong() {
  isLoading = false;
  playBtn.classList.replace("fa-pause", "fa-play");
  playBtn.setAttribute("title", "Play");
  music.pause();
}

function playToggle() {
  if (isLoading) {
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
  setTimeout(function () {
    image.src = cover;
    image.classList.add("active");
  }, 100);
  background.src = cover;
}

let songIndex = 0;

function prevSong() {
  songIndex--;
  if (songIndex < 0) {
    songIndex = 2;
  }
  loadSongs(songs[songIndex]);
  playSong();
}

function nextSong() {
  songIndex++;
  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }
  loadSongs(songs[songIndex]);
  playSong();
}

loadSongs(songs[songIndex]);

function updateProgressBar() {
  if (isLoading) {
    const duration = music.duration;
    let currentTime = music.currentTime;
    let progressPercent = (currentTime / duration) * 100;
    progress.style.width = progressPercent + "%";
    const durationMinutes = Math.floor(duration / 60);
    let durationSeconds = Math.floor(duration % 60);
    if (durationSeconds < 10) {
      durationSeconds = "0" + durationSeconds;
    }
    if (durationSeconds) {
      durationEl.innerHTML = durationMinutes + ":" + durationSeconds;
    }
    const currentMinutes = Math.floor(currentTime / 60);
    let currentSeconds = Math.floor(currentTime % 60);
    if (currentSeconds < 10) {
      currentSeconds = "0" + currentSeconds;
    }
    currentTimeEl.innerHTML = currentMinutes + ":" + currentSeconds;
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
music.addEventListener("ended", nextSong);
music.addEventListener("timeupdate", updateProgressBar);
progressContainer.addEventListener("click", setProgressBar);
