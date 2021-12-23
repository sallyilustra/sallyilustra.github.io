var navbar;
var navbarHeight;
var lastScrollTop = 0;

function navbarAutoHide() {
  let scrollTop = window.scrollY;

  if (scrollTop > navbarHeight / 2) {
    if (scrollTop < lastScrollTop) {
      navbar.classList.remove('scrolled-down');
      navbar.classList.add('scrolled-up');
    } else {
      navbar.classList.remove('scrolled-up');
      navbar.classList.add('scrolled-down');
    }
  }

  lastScrollTop = scrollTop;
}

function brandScrollToTop() {
  let scrollTop = window.scrollY;

  if (scrollTop > navbarHeight) {
    window.scrollTo(0,0);
    return false;
  }
}

function isMobile() {
  try {
    if(/Android|webOS|iPhone|iPad|iPod|pocket|psp|kindle|avantgo|blazer|midori|Tablet|Palm|maemo|plucker|phone|BlackBerry|symbian|IEMobile|mobile|ZuneWP7|Windows Phone|Opera Mini/i.test(navigator.userAgent)) {
      return true;
    };
  } catch(e) {
    console.log("Error in isMobile");
  }
  return false;
}

function readyToLink() {
  if (this.firstElementChild.tagName == 'A' && this.classList.contains('ready-to-link')) {
    location = this.firstElementChild.href;
  } else {
    resetReadyToLink();
    this.classList.add('ready-to-link');
    return false;
  }
}

function resetReadyToLink() {
  let ready = document.getElementsByClassName('ready-to-link');
  if (ready.length) {
    ready[0].classList.remove('ready-to-link');
  }
}

document.addEventListener("DOMContentLoaded", function() {
    /* Navbar autohide and brand scroll to top */
    navbar = document.querySelector('.autohide');
    navbarHeight = navbar.offsetHeight;

    // navbar .fixed-top correction
    document.body.style.paddingTop = navbarHeight + 'px';

    window.addEventListener('scroll', navbarAutoHide);

    let brand = document.getElementsByClassName("navbar-brand");
    brand[0].onclick = brandScrollToTop;

    /* Update gallery hover effect on mobile */
    if (isMobile()) {
      let work = document.querySelectorAll('.img-container');
      work.forEach(function(item) {
        item.onclick = readyToLink;
      });
    }
})