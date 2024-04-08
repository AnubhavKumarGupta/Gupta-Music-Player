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
    path: "https://2022.downloadming.ws/bollywood%20mp3/RRR%20(2022)/02%20-%20Naacho%20Naacho%20(320%20Kbps).mp3",
    musicName: "Naacho Naacho",
    artist: "Vishal Mishra, Rahul Sipligunj.",
    cover:
      "https://m.media-amazon.com/images/M/MV5BOGEzYzcxYjAtZmZiNi00YzI0LWIyY2YtOTM0MDFjODU2YTZiXkEyXkFqcGdeQXVyMTQ3Mzk2MDg4._V1_.jpg",
  },

  {
    path: "https://2022.downloadming.ws/bollywood%20mp3/Animal%202023/01%20-%20Hua%20Main%20%28320%20Kbps%29.mp3",
    musicName: "Hua Main",
    artist: "Raghav Chaitanya",
    cover: "https://downloadming.ws/uploads/Animal-2023-MP3-Songs-Download.jpg",
  },

  {
    path: "https://2022.downloadming.ws/bollywood%20mp3/Tanhaji%20-%20The%20Unsung%20Warrior%20(2020)/Tanhaji%20-%20The%20Unsung%20Warrior%20(2020)%20(320%20Kbps)/03%20-%20Ghamand%20Kar%20-%20DownloadMing.SE.mp3",
    musicName: "Ghamand Kar",
    artist: "Parampara Thakur, Sachet Tandon",
    cover:
      "https://m.media-amazon.com/images/M/MV5BNTlmMTIxODgtNDFiMS00M2NlLWI4ZDgtYmI4MjhkMjM2ZTBkXkEyXkFqcGdeQXVyMTA5NzIyMDY5._V1_.jpg",
  },

  {
    path: "https://sd2.djjohal.com/128/518405/King%20Shit%20-%20Shubh%20(DJJOhAL.Com).mp3",
    musicName: "King Shit",
    artist: "Shubh",
    cover:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHNDHlGKABQsZsuJLYehECclROLAhT4pl5oA&s",
  },

  {
    path: "https://new.downloadming.ws/audio%20songs/bollywood%20mp3/Life%20in%20a...%20Metro%20(2007)/07%20-%20Alvida%20Reprise%20-%20www.downloadming.com.mp3",
    musicName: "Alvida Reprise",
    artist: "Pritam",
    cover:
      "https://th.bing.com/th/id/OIP.F6ABQFGbN-Jf8MFLjQgWzQHaHa?w=181&h=182&c=7&r=0&o=5&dpr=1.3&pid=1.7",
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
