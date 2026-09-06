document.addEventListener('DOMContentLoaded', function() {
  // Get blogs from localStorage
  const blogs = JSON.parse(localStorage.getItem('blogs')) || [];
  
  // Get blog ID from URL parameter
  const urlParams = new URLSearchParams(window.location.search);
  const blogId = urlParams.get('id');
  
  // DOM Elements
  const postTitle = document.getElementById('post-title');
  const postCategory = document.getElementById('post-category');
  const postDate = document.getElementById('post-date');
  const postImage = document.getElementById('post-image');
  const postContent = document.getElementById('post-content');
  const relatedPostsGrid = document.getElementById('related-posts-grid');
  
  // Check if blog ID exists and blogs array is not empty
  if (!blogId || blogs.length === 0) {
    // Redirect to blog page if no blog ID or no blogs
    window.location.href = 'blog.html';
    return;
  }
  
  // Find the blog post by ID
  const blog = blogs.find(blog => blog.id === blogId);
  
  // Check if blog post exists
  if (!blog) {
    // Redirect to blog page if blog post not found
    window.location.href = 'blog.html';
    return;
  }
  
  // Update page title
  document.title = `${blog.title} - Imon Hosen`;
  
  // Display blog post
  postTitle.textContent = blog.title;
  postCategory.textContent = blog.category;
  postDate.textContent = formatDate(blog.date);
  postImage.src = blog.image;
  postImage.alt = blog.title;
  
  // Format and display blog content
  postContent.innerHTML = formatContent(blog.content);
  
  // Display related posts (same category, excluding current post)
  // No need to sort as blogs are already in order of newest first
  const relatedBlogs = blogs
    .filter(b => b.category === blog.category && b.id !== blog.id)
    .slice(0, 3); // Limit to 3 related posts
  
  if (relatedBlogs.length > 0) {
    relatedPostsGrid.innerHTML = '';
    
    relatedBlogs.forEach(relatedBlog => {
      const relatedPost = document.createElement('div');
      relatedPost.className = 'related-post';
      
      relatedPost.innerHTML = `
        <div class="related-post__image">
          <img src="${relatedBlog.image}" alt="${relatedBlog.title}">
        </div>
        <div class="related-post__content">
          <h3 class="related-post__title">
            <a href="blog-post.html?id=${relatedBlog.id}">${relatedBlog.title}</a>
          </h3>
          <div class="post-date">${formatDate(relatedBlog.date)}</div>
        </div>
      `;
      
      relatedPostsGrid.appendChild(relatedPost);
    });
  } else {
    // Hide related posts section if no related posts
    document.querySelector('.related-posts').style.display = 'none';
  }
  
  // Format date for display
  function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  }
  
  // Format blog content (convert line breaks to paragraphs)
  function formatContent(content) {
    // Split content by line breaks and create paragraphs
    return content
      .split('\n\n')
      .map(paragraph => paragraph.trim())
      .filter(paragraph => paragraph.length > 0)
      .map(paragraph => `<p>${paragraph}</p>`)
      .join('');
  }
}); 