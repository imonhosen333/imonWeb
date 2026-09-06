document.addEventListener('DOMContentLoaded', function() {
  // Check if user is already logged in
  if (localStorage.getItem('adminLoggedIn') === 'true') {
    window.location.href = 'admin-dashboard.html';
  }
  
  const loginForm = document.getElementById('loginForm');
  const loginError = document.getElementById('loginError');
  
  // Admin credentials (in a real application, this would be handled server-side)
  const ADMIN_USERNAME = 'admin';
  const ADMIN_PASSWORD = 'password123'; // Change this to a secure password
  
  loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    
    // Simple authentication
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      // Set login status in localStorage
      localStorage.setItem('adminLoggedIn', 'true');
      
      // Redirect to admin dashboard
      window.location.href = 'admin-dashboard.html';
    } else {
      // Show error message
      loginError.textContent = 'Invalid username or password. Please try again.';
      
      // Clear password field
      document.getElementById('password').value = '';
    }
  });
}); 