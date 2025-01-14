document.addEventListener("DOMContentLoaded", function () {
  const body = document.querySelector("body");
  body.classList.remove("opacity-0");
  body.classList.add("opacity-100");
  const photos = document.querySelectorAll("img");
  let delay = 0;
  photos.forEach((photo) => {
    setTimeout(() => {
      photo.classList.remove("opacity-0");
      photo.classList.add("opacity-100");
    }, delay);
    delay += 100;
  });

  function isMobileDevice() {
    return /Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(navigator.userAgent);
  }

  if (isMobileDevice()) {
    function addWatermark(image) {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = image.naturalWidth;
      canvas.height = image.naturalHeight;

      // Draw original image
      ctx.drawImage(image, 0, 0);

      // Configure watermark
      ctx.font = '32px Arial';
      ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
      ctx.textAlign = 'center';
      ctx.fillText('© Your Watermark', canvas.width/2, canvas.height/2);

      return canvas.toDataURL('image/jpeg', 0.8);
    }

    // Handle image links
    document.querySelectorAll('a > img').forEach(img => {
      const parent = img.parentElement;
      parent.addEventListener('click', (event) => {
        if (event.ctrlKey || event.metaKey || event.button === 1) {
          event.preventDefault();
          const watermarkedImage = addWatermark(img);
          window.open(watermarkedImage, '_blank');
        }
      });
    });

    // Handle direct image opens
    document.addEventListener('contextmenu', (event) => {
      if (event.target.tagName === 'IMG') {
        event.preventDefault();
        const watermarkedImage = addWatermark(event.target);
        window.open(watermarkedImage, '_blank');
      }
    });
  }

  document.addEventListener('contextmenu', (event) => {
    if (event.target.tagName === 'IMG') {
      event.preventDefault();
    }
  });
});
