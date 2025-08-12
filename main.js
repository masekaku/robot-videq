document.addEventListener('DOMContentLoaded', function() {
    const videoGrid = document.getElementById('videoGrid');
    
    fetch('video-list.json')
        .then(response => response.json())
        .then(dramas => {
            dramas.forEach(drama => {
                const videoCard = document.createElement('div');
                videoCard.className = 'video-card';
                videoCard.innerHTML = `
                    <img src="${drama.thumbnail}" alt="${drama.title}" class="video-thumbnail">
                    <div class="video-title">${drama.title}</div>
                `;
                
                videoCard.addEventListener('click', () => {
                    window.location.href = `watch.html?id=${drama.id}`;
                });
                
                videoGrid.appendChild(videoCard);
            });
        })
        .catch(error => {
            console.error('Error loading drama list:', error);
            videoGrid.innerHTML = '<p>Error loading dramas. Please try again later.</p>';
        });
});