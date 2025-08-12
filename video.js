document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const videoId = urlParams.get('id');
    
    if (!videoId) {
        window.location.href = 'index.html';
        return;
    }
    
    // Load video details
    fetch(`video-detail-${videoId}.json`)
        .then(response => response.json())
        .then(video => {
            document.getElementById('videoTitle').textContent = video.title;
            document.getElementById('releaseYear').textContent = video.year;
            document.getElementById('genre').textContent = video.genre;
            document.getElementById('description').textContent = video.description;
            
            const episodesContainer = document.getElementById('episodesContainer');
            const episodeList = document.createElement('div');
            episodeList.className = 'episode-list';
            
            video.episodes.forEach((episode, index) => {
                const episodeCard = document.createElement('div');
                episodeCard.className = 'episode-card';
                if (index === 0) {
                    episodeCard.classList.add('active');
                    loadVideoSource(episode.id);
                }
                
                episodeCard.innerHTML = `
                    <h3>${episode.title}</h3>
                    <p>${episode.duration}</p>
                `;
                
                episodeCard.addEventListener('click', () => {
                    document.querySelectorAll('.episode-card').forEach(card => {
                        card.classList.remove('active');
                    });
                    episodeCard.classList.add('active');
                    loadVideoSource(episode.id);
                });
                
                episodeList.appendChild(episodeCard);
            });
            
            episodesContainer.appendChild(episodeList);
        })
        .catch(error => {
            console.error('Error loading video details:', error);
            document.getElementById('videoTitle').textContent = 'Error loading video details';
        });
});

function loadVideoSource(episodeId) {
    fetch('video-source.json')
        .then(response => response.json())
        .then(sources => {
            const videoUrl = sources[episodeId];
            if (videoUrl) {
                document.getElementById('videoFrame').src = videoUrl;
            } else {
                console.error('Video source not found for episode:', episodeId);
            }
        })
        .catch(error => {
            console.error('Error loading video source:', error);
        });
}