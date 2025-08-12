document.addEventListener('DOMContentLoaded', function() {
    const videoGrid = document.getElementById('videoGrid');
    
    // Fetch video list from JSON
    fetch('video-list.json')
        .then(response => response.json())
        .then(videos => {
            videos.forEach(video => {
                const videoCard = document.createElement('div');
                videoCard.className = 'video-card';
                videoCard.innerHTML = `
                    <img src="${video.thumbnail}" alt="${video.title}" class="video-thumbnail">
                    <div class="video-title">${video.title}</div>
                    <div class="video-meta">${video.year} • ${video.genre}</div>
                `;
                
                videoCard.addEventListener('click', () => {
                    window.location.href = `watch.html?id=${video.id}`;
                });
                
                videoGrid.appendChild(videoCard);
            });
        })
        .catch(error => {
            console.error('Error loading video list:', error);
            videoGrid.innerHTML = '<p>Error loading videos. Please try again later.</p>';
        });
});