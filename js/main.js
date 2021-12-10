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
    function support_format_webp() {
      var elem = document.createElement('canvas');
      if (!!(elem.getContext && elem.getContext('2d'))) {
        // was able or not to get WebP representation
        return elem.toDataURL('image/webp').indexOf('data:image/webp') == 0;
      } else {
        // very old browser like IE 8, canvas not supported
        return false;
      }
    }

    var lazyloadImages = document.querySelectorAll(".lazy");
    var canWebp = support_format_webp();

    var img_path = "./img/";
    var img_ext;

    if (canWebp) {
      img_path = img_path + "webp/";
      img_ext = ".webp";
    } else {
      img_ext = ".png";
    }

    if ("IntersectionObserver" in window) {
      // Intersection Observer
      var imageObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) {
            var image = entry.target;
            image.src = img_path + image.dataset.src + img_ext;
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
                img.src = img_path + img.dataset.src + img_ext;
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