// Admin credentials
const ADMIN_CREDENTIALS = {
  username: 'imon333',
  password: 'imon33!#'
};

// Available categories for blog posts
const BLOG_CATEGORIES = [
  'Data Science',
  'Machine Learning',
  'AI Agents',
  'Neural Networks',
  'Deep Learning',
  'Python',
  'Software Engineering',
  'Technology',
  'Research',
  'Projects'
];

// Check if user is logged in
function checkAuth() {
  const isLoggedIn = localStorage.getItem('adminLoggedIn') === 'true';
  if (!isLoggedIn) {
    window.location.href = 'admin-login.html';
  }
}

// Handle login
function handleLogin(event) {
  event.preventDefault();
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
    localStorage.setItem('adminLoggedIn', 'true');
    window.location.href = 'admin-dashboard.html';
  } else {
    alert('Invalid credentials');
  }
}

// Initialize dashboard
function initDashboard() {
  checkAuth();
  setupSidebar();
  setupImageUploads();
  setupCategorySelects();
  loadBlogPosts();
  updateStats();
}

// Setup sidebar functionality
function setupSidebar() {
  const sidebarToggle = document.getElementById('sidebarToggle');
  const sidebar = document.querySelector('.admin-sidebar');
  const navLinks = document.querySelectorAll('.sidebar-nav a');

  if (sidebarToggle) {
    sidebarToggle.addEventListener('click', () => {
      sidebar.classList.toggle('active');
    });
  }

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      navLinks.forEach(l => l.parentElement.classList.remove('active'));
      link.parentElement.classList.add('active');
      
      // Handle section visibility
      const targetId = link.getAttribute('href').substring(1) + '-section';
      document.querySelectorAll('.content-section').forEach(section => {
        section.style.display = 'none';
      });
      document.getElementById(targetId).style.display = 'block';
    });
  });
}

// Setup image upload preview
function setupImageUploads() {
  const imageInputs = document.querySelectorAll('.image-file-input');
  
  imageInputs.forEach(input => {
    input.addEventListener('change', function() {
      const preview = this.closest('.image-upload-container').querySelector('img');
      if (this.files && this.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
          preview.src = e.target.result;
          preview.style.display = 'block';
        };
        reader.readAsDataURL(this.files[0]);
      }
    });
  });
}

// Setup category select dropdowns
function setupCategorySelects() {
  const categorySelects = document.querySelectorAll('select[id$="Category"]');
  
  categorySelects.forEach(select => {
    BLOG_CATEGORIES.forEach(category => {
      const option = document.createElement('option');
      option.value = category;
      option.textContent = category;
      select.appendChild(option);
    });
  });
}

// Load blog posts
function loadBlogPosts() {
  const blogPosts = JSON.parse(localStorage.getItem('blogPosts') || '[]');
  const blogTable = document.getElementById('blogTable');
  if (!blogTable) return;

  blogTable.innerHTML = '';
  blogPosts.forEach((post, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${post.title}</td>
      <td>${post.category}</td>
      <td>${post.date}</td>
      <td><span class="status-badge ${post.published ? 'status-published' : 'status-draft'}">${post.published ? 'Published' : 'Draft'}</span></td>
      <td>${post.views || 0}</td>
      <td>
        <button onclick="editBlogPost(${index})" class="action-btn edit-btn" title="Edit">
          <i class="fas fa-edit"></i>
        </button>
        <button onclick="deleteBlogPost(${index})" class="action-btn delete-btn" title="Delete">
          <i class="fas fa-trash"></i>
        </button>
        <button onclick="togglePublish(${index})" class="action-btn publish-btn" title="${post.published ? 'Unpublish' : 'Publish'}">
          <i class="fas ${post.published ? 'fa-eye-slash' : 'fa-eye'}"></i>
        </button>
      </td>
    `;
    blogTable.appendChild(row);
  });
}

// Update dashboard stats
function updateStats() {
  const blogPosts = JSON.parse(localStorage.getItem('blogPosts') || '[]');
  
  document.getElementById('totalPosts').textContent = blogPosts.length;
  document.getElementById('totalViews').textContent = blogPosts.reduce((sum, post) => sum + (post.views || 0), 0);
  document.getElementById('totalCategories').textContent = BLOG_CATEGORIES.length;
  document.getElementById('totalComments').textContent = '0'; // Implement comments system later
}

// Handle new blog post submission
function handleNewBlogPost(event) {
  event.preventDefault();
  const title = document.getElementById('blogTitle').value;
  const category = document.getElementById('blogCategory').value;
  const content = document.getElementById('blogContent').value;
  const imageUrl = document.getElementById('blogImage').value;
  const date = new Date().toISOString().split('T')[0]; // Format as YYYY-MM-DD
  const isDraft = event.submitter.classList.contains('draft-btn');

  // Generate a unique ID
  const id = 'blog-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);

  // Create excerpt from content (first 150 characters)
  const excerpt = content.substring(0, 150) + (content.length > 150 ? '...' : '');

  const blogPosts = JSON.parse(localStorage.getItem('blogPosts') || '[]');
  blogPosts.push({
    id,
    title,
    category,
    content,
    excerpt,
    imageUrl,
    date,
    published: !isDraft,
    views: 0
  });

  // Sort posts by date (newest first)
  blogPosts.sort((a, b) => new Date(b.date) - new Date(a.date));

  localStorage.setItem('blogPosts', JSON.stringify(blogPosts));
  loadBlogPosts();
  updateStats();
  event.target.reset();
  
  // Show success message
  showNotification(isDraft ? 'Post saved as draft' : 'Post published successfully');
}

// Edit blog post
function editBlogPost(index) {
  const blogPosts = JSON.parse(localStorage.getItem('blogPosts') || '[]');
  const post = blogPosts[index];
  
  document.getElementById('editPostId').value = index;
  document.getElementById('editBlogTitle').value = post.title;
  document.getElementById('editBlogCategory').value = post.category;
  document.getElementById('editBlogContent').value = post.content;
  document.getElementById('editBlogImage').value = post.imageUrl;
  
  if (post.imageUrl) {
    document.getElementById('editImagePreview').src = post.imageUrl;
    document.getElementById('editImagePreview').style.display = 'block';
  }
  
  document.getElementById('editPostModal').style.display = 'block';
}

// Handle edit form submission
function handleEditPost(event) {
  event.preventDefault();
  const index = document.getElementById('editPostId').value;
  const blogPosts = JSON.parse(localStorage.getItem('blogPosts') || '[]');
  
  blogPosts[index] = {
    ...blogPosts[index],
    title: document.getElementById('editBlogTitle').value,
    category: document.getElementById('editBlogCategory').value,
    content: document.getElementById('editBlogContent').value,
    imageUrl: document.getElementById('editBlogImage').value
  };
  
  localStorage.setItem('blogPosts', JSON.stringify(blogPosts));
  loadBlogPosts();
  updateStats();
  closeModal();
  
  showNotification('Post updated successfully');
}

// Delete blog post
function deleteBlogPost(index) {
  if (confirm('Are you sure you want to delete this post?')) {
    const blogPosts = JSON.parse(localStorage.getItem('blogPosts') || '[]');
    blogPosts.splice(index, 1);
    localStorage.setItem('blogPosts', JSON.stringify(blogPosts));
    loadBlogPosts();
    updateStats();
    showNotification('Post deleted successfully');
  }
}

// Toggle publish status
function togglePublish(index) {
  const blogPosts = JSON.parse(localStorage.getItem('blogPosts') || '[]');
  blogPosts[index].published = !blogPosts[index].published;
  localStorage.setItem('blogPosts', JSON.stringify(blogPosts));
  loadBlogPosts();
  updateStats();
  showNotification(blogPosts[index].published ? 'Post published' : 'Post unpublished');
}

// Modal functions
function closeModal() {
  document.getElementById('editPostModal').style.display = 'none';
}

// Show notification
function showNotification(message) {
  const notification = document.createElement('div');
  notification.className = 'notification';
  notification.textContent = message;
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.classList.add('show');
    setTimeout(() => {
      notification.classList.remove('show');
      setTimeout(() => {
        notification.remove();
      }, 300);
    }, 3000);
  }, 100);
}

// Handle logout
function handleLogout() {
  localStorage.removeItem('adminLoggedIn');
  window.location.href = 'admin-login.html';
}

// Initialize event listeners
document.addEventListener('DOMContentLoaded', function() {
  const loginForm = document.getElementById('loginForm');
  const blogForm = document.getElementById('blogForm');
  const editPostForm = document.getElementById('editPostForm');
  const logoutBtn = document.getElementById('logoutBtn');
  const closeModalBtn = document.querySelector('.close-modal');

  if (loginForm) {
    loginForm.addEventListener('submit', handleLogin);
  }

  if (blogForm) {
    blogForm.addEventListener('submit', handleNewBlogPost);
    initDashboard();
  }

  if (editPostForm) {
    editPostForm.addEventListener('submit', handleEditPost);
  }

  if (logoutBtn) {
    logoutBtn.addEventListener('click', handleLogout);
  }

  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', closeModal);
  }

  // Close modal when clicking outside
  window.addEventListener('click', function(e) {
    const modal = document.getElementById('editPostModal');
    if (e.target === modal) {
      closeModal();
    }
  });
}); 