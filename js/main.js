document.addEventListener("DOMContentLoaded", function() {
    /* Navbar auto-hide */
    // fixed-top correction
    autohide = document.querySelector('.autohide');
    height = autohide.offsetHeight;
    document.body.style.paddingTop = height + 'px';

    // auto-hide scroll listener
    if(autohide){
      var last_scroll_top = 0;
      window.addEventListener('scroll', function() {
          let scroll_top = window.scrollY;
          if (scroll_top > height / 2) {
            if(scroll_top < last_scroll_top) {
                autohide.classList.remove('scrolled-down');
                autohide.classList.add('scrolled-up');
            } else {
                autohide.classList.remove('scrolled-up');
                autohide.classList.add('scrolled-down');
            }
          }
          last_scroll_top = scroll_top;
      }); 
    }

    /* Lazy image auto-loading */
    var lazyloadImages = document.querySelectorAll(".lazy");

    if ("IntersectionObserver" in window) {
      // Intersection Observer
      var imageObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) {
            var image = entry.target;
            image.src = image.dataset.src;
            image.classList.remove("lazy");
            imageObserver.unobserve(image);
          }
        });
      });
  
      lazyloadImages.forEach(function(image) {
        imageObserver.observe(image);
      });
    } else {  
      // legacy (aka register event listeners)
      var lazyloadThrottleTimeout;
      
      function lazyload () {
        if (lazyloadThrottleTimeout) {
          clearTimeout(lazyloadThrottleTimeout);
        }    
  
        lazyloadThrottleTimeout = setTimeout(function() {
          var scrollTop = window.pageYOffset;
          lazyloadImages.forEach(function(img) {
              if (img.offsetTop < (window.innerHeight + scrollTop)) {
                img.src = img.dataset.src;
                img.classList.remove('lazy');
              }
          });
          if (lazyloadImages.length == 0) { 
            document.removeEventListener("scroll", lazyload);
            window.removeEventListener("resize", lazyload);
            window.removeEventListener("orientationChange", lazyload);
          }
        }, 20);
      }
  
      document.addEventListener("scroll", lazyload);
      window.addEventListener("resize", lazyload);
      window.addEventListener("orientationChange", lazyload);
    }

    /* Scroll to top of the page on logo click */
    var links = document.getElementsByClassName("navbar-brand");
    links[0].onclick = function() {
      let scroll_top = window.scrollY;

      if (scroll_top > height) {
        window.scrollTo(0,0);
      }

      return false;
    }
})