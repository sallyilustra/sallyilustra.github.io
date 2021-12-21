document.addEventListener("DOMContentLoaded", function() {
    /* Navbar auto-hide */
    // fixed-top correction
    autohide = document.querySelector('.autohide');
    height = autohide.offsetHeight;
    document.body.style.paddingTop = height + 'px';

    // auto-hide scroll listener
    if(autohide) {
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

    /* Scroll to top of the page on logo click */
    var links = document.getElementsByClassName("navbar-brand");
    links[0].onclick = function() {
      let scroll_top = window.scrollY;

      if (scroll_top > height) {
        window.scrollTo(0,0);
      }

      return false;
    }

    /* Detect mobile */
    function isMobile() {
      try {
         if(/Android|webOS|iPhone|iPad|iPod|pocket|psp|kindle|avantgo|blazer|midori|Tablet|Palm|maemo|plucker|phone|BlackBerry|symbian|IEMobile|mobile|ZuneWP7|Windows Phone|Opera Mini/i.test(navigator.userAgent)) {
          return true;
         };
         return false;
      } catch(e){ console.log("Error in isMobile"); return false; }
    }

    if (isMobile()) {
      var links = document.querySelectorAll('.img-container');
      for (var i = 0; i != links.length; ++i) {
        links[i].onclick = function() {
          if (this.firstElementChild.tagName == 'A' && this.classList.contains('ready-to-link')) {
            location = this.firstElementChild.href;
          } else {
            ready = document.getElementsByClassName('ready-to-link');
            if (ready.length) {
              ready[0].classList.remove('ready-to-link');
            }
            this.classList.add('ready-to-link');
            return false;
          }
        }
      }
    }
})