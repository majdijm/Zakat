// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Safely get elements with null checks
  const shareButton = document.getElementById('share-button');
  const shareModal = document.getElementById('share-modal');
  const closeButton = document.getElementById('close-modal');
  
  // Only add event listeners if elements exist
  if (shareButton) {
    shareButton.addEventListener('click', function() {
      if (shareModal) {
        shareModal.classList.add('active');
      }
    });
  }
  
  if (closeButton) {
    closeButton.addEventListener('click', function() {
      if (shareModal) {
        shareModal.classList.remove('active');
      }
    });
  }
  
  // Close modal when clicking outside
  if (shareModal) {
    window.addEventListener('click', function(event) {
      if (event.target === shareModal) {
        shareModal.classList.remove('active');
      }
    });
  }
  
  console.log('Share modal script loaded successfully');
});
