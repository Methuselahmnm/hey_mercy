// Loading Screen Functionality
document.addEventListener('DOMContentLoaded', function() {
    const loadingScreen = document.querySelector('.loading-screen');
    const progressBar = document.querySelector('.progress-bar');
    
    // Simulate progress (replace with actual loading logic)
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 10;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setTimeout(() => {
          loadingScreen.classList.add('hidden');
        }, 500);
      }
      progressBar.style.width = `${progress}%`;
    }, 300);
  
    // For actual implementation, you might want to use:
    // window.addEventListener('load', function() {
    //   loadingScreen.classList.add('hidden');
    // });
    
    // Or for more accurate loading tracking:
    // document.onreadystatechange = function() {
    //   if (document.readyState === 'complete') {
    //     loadingScreen.classList.add('hidden');
    //   }
    // }
  });