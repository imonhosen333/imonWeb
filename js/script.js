// Mobile Menu Toggle - Disabled for always-visible navigation
const iconMenu = document.querySelector('.icon-menu');
const menuBody = document.querySelector('.menu__body');
const header = document.querySelector('.header');

// Disabled mobile menu toggle
// if (iconMenu) {
//     iconMenu.addEventListener('click', function (e) {
//         document.body.classList.toggle('menu-open');
//         iconMenu.classList.toggle('active');
//         menuBody.classList.toggle('active');
//     });
// }

// Smooth Scrolling for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            // Smooth scroll to target
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Active Menu Link on Scroll
const sections = document.querySelectorAll('section[id]');

function highlightActiveSection() {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const menuLink = document.querySelector(`.menu__link[href="#${sectionId}"]`);

        if (menuLink && scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelectorAll('.menu__link').forEach(link => {
                link.classList.remove('active');
            });
            menuLink.classList.add('active');
        }
    });
}

window.addEventListener('scroll', highlightActiveSection);

// Scroll Reveal Animation
const revealElements = document.querySelectorAll('.reveal');

function reveal() {
    revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;

        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('active');
        }
    });
}

window.addEventListener('scroll', reveal);

// Header Background on Scroll
function toggleHeaderBackground() {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
}

window.addEventListener('scroll', toggleHeaderBackground);

// Initialize on Load
window.addEventListener('load', () => {
    highlightActiveSection();
    reveal();
    toggleHeaderBackground();
});

const spollerButtons = document.querySelectorAll("[data-spoller] .spollers-faq__button");

spollerButtons.forEach((button) => {
  button.addEventListener("click", function () {
    const currentItem = button.closest("[data-spoller]");
    const content = currentItem.querySelector(".spollers-faq__text");

    const parent = currentItem.parentNode;
    const isOneSpoller = parent.hasAttribute("data-one-spoller");

    if (isOneSpoller) {
      const allItems = parent.querySelectorAll("[data-spoller]");
      allItems.forEach((item) => {
        if (item !== currentItem) {
          const otherContent = item.querySelector(".spollers-faq__text");
          item.classList.remove("active");
          otherContent.style.maxHeight = null;
        }
      });
    }

    if (currentItem.classList.contains("active")) {
      currentItem.classList.remove("active");
      content.style.maxHeight = null;
    } else {
      currentItem.classList.add("active");
      content.style.maxHeight = content.scrollHeight + "px";
    }
  });
});

// Random video background
const videos = [
  'img/home/video3.mp4',
  'img/home/video4.mp4'
];

function setRandomVideo() {
  const videoElement = document.querySelector('.video-bg');
  if (videoElement) {
    const randomVideo = videos[Math.floor(Math.random() * videos.length)];
    videoElement.src = randomVideo;
    videoElement.play().catch(function(error) {
      console.log("Video autoplay failed:", error);
    });
  }
}

// Set initial random video and start the interval
document.addEventListener('DOMContentLoaded', () => {
  setRandomVideo();
  // Change video every 30 seconds
  setInterval(setRandomVideo, 30000);
});

// Header scroll effect
window.addEventListener('scroll', function() {
  const header = document.querySelector('.header');
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// Contact title animation
function animateContactTitle() {
  const title = document.querySelector('.contact__title');
  if (!title) return;

  const letters = title.querySelectorAll('.letter');
  const dash = title.querySelector('.dash');

  // Add animate class to prepare for animation
  letters.forEach(letter => letter.classList.add('animate'));
  if (dash) dash.classList.add('animate');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Animate letters one by one
        letters.forEach((letter, index) => {
          setTimeout(() => {
            letter.classList.add('visible');
          }, index * 100); // 100ms delay between each letter
        });

        // Animate dash after all letters
        if (dash) {
          setTimeout(() => {
            dash.classList.add('visible');
          }, letters.length * 100);
        }

        observer.disconnect(); // Only animate once
      }
    });
  }, { threshold: 0.5 });

  observer.observe(title);
}

// Hobbies title animation
function animateHobbiesTitle() {
  const title = document.querySelector('.hobbies__title');
  if (!title) return;

  const letters = title.querySelectorAll('.letter');
  const dash = title.querySelector('.dash');

  // Add animate class to prepare for animation
  letters.forEach(letter => letter.classList.add('animate'));
  if (dash) dash.classList.add('animate');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Animate letters one by one
        letters.forEach((letter, index) => {
          setTimeout(() => {
            letter.classList.add('visible');
          }, index * 100); // 100ms delay between each letter
        });

        // Animate dash after all letters
        if (dash) {
          setTimeout(() => {
            dash.classList.add('visible');
          }, letters.length * 100);
        }

        observer.disconnect(); // Only animate once
      }
    });
  }, { threshold: 0.5 });

  observer.observe(title);
}

// Skills title animation
function animateSkillsTitle() {
  const title = document.querySelector('.skills__title');
  if (!title) return;

  const letters = title.querySelectorAll('.letter');
  const dash = title.querySelector('.dash');

  // Add animate class to prepare for animation
  letters.forEach(letter => letter.classList.add('animate'));
  if (dash) dash.classList.add('animate');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Animate letters one by one
        letters.forEach((letter, index) => {
          setTimeout(() => {
            letter.classList.add('visible');
          }, index * 100); // 100ms delay between each letter
        });

        // Animate dash after all letters
        if (dash) {
          setTimeout(() => {
            dash.classList.add('visible');
          }, letters.length * 100);
        }

        observer.disconnect(); // Only animate once
      }
    });
  }, { threshold: 0.5 });

  observer.observe(title);
}

// Projects title animation
function animateProjectsTitle() {
  const title = document.querySelector('.projects__title');
  if (!title) return;

  const letters = title.querySelectorAll('.letter');
  const dash = title.querySelector('.dash');

  // Add animate class to prepare for animation
  letters.forEach(letter => letter.classList.add('animate'));
  if (dash) dash.classList.add('animate');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Animate letters one by one
        letters.forEach((letter, index) => {
          setTimeout(() => {
            letter.classList.add('visible');
          }, index * 100); // 100ms delay between each letter
        });

        // Animate dash after all letters
        if (dash) {
          setTimeout(() => {
            dash.classList.add('visible');
          }, letters.length * 100);
        }

        observer.disconnect(); // Only animate once
      }
    });
  }, { threshold: 0.5 });

  observer.observe(title);
}

// About title animation
function animateAboutTitle() {
  const title = document.querySelector('.about__title');
  if (!title) return;

  const letters = title.querySelectorAll('.letter');
  const dash = title.querySelector('.dash');

  // Add animate class to prepare for animation
  letters.forEach(letter => letter.classList.add('animate'));
  if (dash) dash.classList.add('animate');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Animate letters one by one
        letters.forEach((letter, index) => {
          setTimeout(() => {
            letter.classList.add('visible');
          }, index * 100); // 100ms delay between each letter
        });

        // Animate dash after all letters
        if (dash) {
          setTimeout(() => {
            dash.classList.add('visible');
          }, letters.length * 100);
        }

        observer.disconnect(); // Only animate once
      }
    });
  }, { threshold: 0.5 });

  observer.observe(title);
}

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  animateContactTitle();
  animateHobbiesTitle();
  animateSkillsTitle();
  animateProjectsTitle();
  animateAboutTitle();
});

// Contact form submission handler
document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.getElementById('contactForm');
  const thankYouMessage = document.getElementById('thankYouMessage');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Show thank you message
      thankYouMessage.classList.add('visible');
      
      // Clear form fields
      contactForm.reset();
      
      // Hide thank you message after 2 seconds
      setTimeout(function() {
        thankYouMessage.classList.remove('visible');
      }, 2000);
    });
  }
});
