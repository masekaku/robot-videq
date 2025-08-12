document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const dramaId = urlParams.get('id');
    
    if (!dramaId) {
        window.location.href = 'index.html';
        return;
    }
    
    // Load drama details
    fetch('video-detail.json')
        .then(response => response.json())
        .then(allDramas => {
            const drama = allDramas.find(d => d.id === dramaId);
            if (!drama) throw new Error('Drama not found');
            
            document.getElementById('videoTitle').textContent = drama.title;
            
            const episodesContainer = document.getElementById('episodesContainer');
            const episodeList = document.createElement('div');
            episodeList.className = 'episode-list';
            
            drama.episodes.forEach((episode, index) => {
                const episodeCard = document.createElement('div');
                episodeCard.className = 'episode-card';
                if (index === 0) {
                    episodeCard.classList.add('active');
                    loadVideoSource(episode.videoId);
                }
                
                episodeCard.innerHTML = `
                    <h3>Episode ${episode.episode}</h3>
                `;
                
                episodeCard.addEventListener('click', () => {
                    document.querySelectorAll('.episode-card').forEach(card => {
                        card.classList.remove('active');
                    });
                    episodeCard.classList.add('active');
                    loadVideoSource(episode.videoId);
                });
                
                episodeList.appendChild(episodeCard);
            });
            
            episodesContainer.appendChild(episodeList);
        })
        .catch(error => {
            console.error('Error loading drama details:', error);
            document.getElementById('videoTitle').textContent = 'Error loading drama details';
        });
});

function loadVideoSource(videoId) {
    fetch('video-source.json')
        .then(response => response.json())
        .then(sources => {
            const videoSource = sources.find(source => source.id === videoId);
            if (videoSource && videoSource.url) {
                document.getElementById('videoFrame').src = videoSource.url;
            } else {
                console.error('Video source not found for ID:', videoId);
            }
        })
        .catch(error => {
            console.error('Error loading video source:', error);
        });
}