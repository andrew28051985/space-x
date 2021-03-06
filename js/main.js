var instance = new vidbg('.world', {
  mp4: 'video/world.mp4', // URL or relative path to MP4 video
  webm: 'video/world.webm', // URL or relative path to webm video
  poster: 'img/world.jpg', // URL or relative path to fallback image
  overlay: false, // Boolean to display the overlay or not
}, {
  // Attributes
})

AOS.init();

var rellax = new Rellax('.description__rocket');
if (document.body.clientWidth < 769) {
  rellax.destroy();
}

