document.addEventListener('DOMContentLoaded', function() {
    const musicPlayer = document.querySelector('.music-player');
    if (!musicPlayer) return;

    const audio = new Audio();
    const playBtn = document.getElementById('play-btn');
    const playIcon = document.getElementById('play-icon');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const progress = document.getElementById('progress');
    const progressContainer = document.querySelector('.progress-container');
    const currentTimeEl = document.getElementById('current-time');
    const durationEl = document.getElementById('duration');
    const songTitle = document.getElementById('song-title');
    const songArtist = document.getElementById('song-artist');
    const albumCover = document.getElementById('album-cover');
    const playlistItems = document.querySelectorAll('.playlist-item');

    let isPlaying = false;
    let currentSongIndex = 0;

    // Play song
    function playSong() {
        isPlaying = true;
        playIcon.classList.replace('fa-play', 'fa-pause');
        audio.play();
    }

    // Pause song
    function pauseSong() {
        isPlaying = false;
        playIcon.classList.replace('fa-pause', 'fa-play');
        audio.pause();
    }

    // Load song
    function loadSong(song) {
        songTitle.textContent = song.title;
        songArtist.textContent = song.artist;
        albumCover.src = song.cover;
        audio.src = song.src;

        // Update active playlist item
        playlistItems.forEach(item => item.classList.remove('active'));
        playlistItems[currentSongIndex].classList.add('active');
    }

    // Next song
    function nextSong() {
        currentSongIndex++;
        if (currentSongIndex > playlistItems.length - 1) {
            currentSongIndex = 0;
        }
        loadSong({
            title: playlistItems[currentSongIndex].getAttribute('data-title'),
            artist: playlistItems[currentSongIndex].getAttribute('data-artist'),
            cover: playlistItems[currentSongIndex].getAttribute('data-cover'),
            src: playlistItems[currentSongIndex].getAttribute('data-src')
        });
        if (isPlaying) playSong();
    }

    // Update progress bar
    function updateProgress(e) {
        const { duration, currentTime } = e.srcElement;
        const progressPercent = (currentTime / duration) * 100;
        progress.style.width = `${progressPercent}%`;
        
        // Calculate display for duration
        const durationMinutes = Math.floor(duration / 60);
        let durationSeconds = Math.floor(duration % 60);
        if (durationSeconds < 10) {
            durationSeconds = `0${durationSeconds}`;
        }
        
        // Calculate display for current time
        const currentMinutes = Math.floor(currentTime / 60);
        let currentSeconds = Math.floor(currentTime % 60);
        if (currentSeconds < 10) {
            currentSeconds = `0${currentSeconds}`;
        }
        
        // Update time display
        if (durationSeconds) {
            durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
        }
        currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
    }

    // Set progress bar
    function setProgress(e) {
        const width = this.clientWidth;
        const clickX = e.offsetX;
        const duration = audio.duration;
        audio.currentTime = (clickX / width) * duration;
    }

    // Event listeners
    if (playBtn && playIcon) {
        playBtn.addEventListener('click', () => {
            isPlaying ? pauseSong() : playSong();
        });
    }

    if (prevBtn) prevBtn.addEventListener('click', () => {
        currentSongIndex--;
        if (currentSongIndex < 0) {
            currentSongIndex = playlistItems.length - 1;
        }
        loadSong({
            title: playlistItems[currentSongIndex].getAttribute('data-title'),
            artist: playlistItems[currentSongIndex].getAttribute('data-artist'),
            cover: playlistItems[currentSongIndex].getAttribute('data-cover'),
            src: playlistItems[currentSongIndex].getAttribute('data-src')
        });
        if (isPlaying) playSong();
    });

    if (nextBtn) nextBtn.addEventListener('click', nextSong);

    if (audio) {
        audio.addEventListener('timeupdate', updateProgress);
        audio.addEventListener('ended', nextSong);
    }

    if (progressContainer) {
        progressContainer.addEventListener('click', setProgress);
    }

    // Click on playlist item
    playlistItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            currentSongIndex = index;
            loadSong({
                title: item.getAttribute('data-title'),
                artist: item.getAttribute('data-artist'),
                cover: item.getAttribute('data-cover'),
                src: item.getAttribute('data-src')
            });
            playSong();
        });
    });

    // Load first song
    if (playlistItems.length > 0) {
        loadSong({
            title: playlistItems[0].getAttribute('data-title'),
            artist: playlistItems[0].getAttribute('data-artist'),
            cover: playlistItems[0].getAttribute('data-cover'),
            src: playlistItems[0].getAttribute('data-src')
        });
    }
});