# VideoStream Website

A modern video streaming website deployed on Vercel.

## Features

- Clean, responsive UI with dark theme
- Video listing with thumbnails
- Detailed video pages with episode navigation
- Secure video source handling

## File Structure

- `index.html` - Homepage with video listings
- `watch.html` - Video player page
- `style.css` - All styling rules
- `video-list.json` - List of all available videos
- `video-detail-*.json` - Details for each video
- `video-source.json` - Mapping of episode IDs to video sources
- `main.js` - Homepage JavaScript
- `video.js` - Video page JavaScript

## Deployment

This project is configured for deployment on Vercel:

1. Push your code to a GitHub repository
2. Connect the repository to Vercel
3. Vercel will automatically detect and deploy the project

## Customization

To add more videos:
1. Add an entry to `video-list.json`
2. Create a corresponding `video-detail-[id].json` file
3. Add video sources to `video-source.json` if needed
