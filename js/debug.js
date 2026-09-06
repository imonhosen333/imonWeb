console.log('Debug script loaded');

document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM fully loaded');
  
  const adminLink = document.getElementById('admin-link');
  
  if (adminLink) {
    console.log('Admin link found:', adminLink);
    
    // Add a direct click handler for testing
    adminLink.onclick = function(e) {
      console.log('Admin link clicked');
      e.preventDefault();
      window.location.href = 'admin-login.html';
    };
  } else {
    console.log('Admin link not found');
  }
}); 