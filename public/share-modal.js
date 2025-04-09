// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  console.log('Share modal script loaded successfully');
  
  // Function to safely add event listeners with null checks
  function safeAddEventListener(selector, event, handler) {
    const element = document.getElementById(selector);
    if (element) {
      element.addEventListener(event, handler);
      console.log(`Event listener added to ${selector}`);
    } else {
      console.log(`Element with ID ${selector} not found in DOM`);
    }
  }

  // Set up event listeners with safety checks
  setTimeout(() => {
    // This timeout gives React components time to render
    safeAddEventListener('share-button', 'click', function() {
      const modal = document.getElementById('share-modal');
      if (modal) modal.classList.add('active');
    });
    
    safeAddEventListener('close-modal', 'click', function() {
      const modal = document.getElementById('share-modal');
      if (modal) modal.classList.remove('active');
    });
    
    // Close modal when clicking outside
    const modal = document.getElementById('share-modal');
    if (modal) {
      window.addEventListener('click', function(event) {
        if (event.target === modal) {
          modal.classList.remove('active');
        }
      });
    }
  }, 1000); // Wait 1 second for React to render
});
