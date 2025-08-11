document.addEventListener("DOMContentLoaded", () => {
  // Navbar toggle
  const toggleMenu = () => {
    const wrapper = document.getElementById("nav-wrapper");
    wrapper.classList.toggle("show");
  };

  // Video Play Logic
  
  const video = document.getElementById("myVideo");
  const playBtn = document.getElementById("playBtn");

  if (video && playBtn) {
    playBtn.addEventListener("click", () => {
      video.play();
      playBtn.classList.add("hidden");
    });

    video.addEventListener("click", () => {
      if (!video.paused) {
        video.pause();
        playBtn.classList.remove("hidden");
      }
    });

    video.addEventListener("ended", () => {
      playBtn.classList.remove("hidden");
    });
  }
 
  // testimonial
  
  const slides = document.getElementById("slides");
  const slideCount = 5;
  let currentIndex = 1;

  function getSlideWidth() {
    return document.querySelector(".slide").offsetWidth;
  }

  function updateTransform() {
    const slideWidth = getSlideWidth();
    slides.style.transform = `translateX(-${slideWidth * currentIndex}px)`;
  }

  function moveTo(index) {
    const slideWidth = getSlideWidth();
    slides.style.transition = "transform 0.5s ease-in-out";
    slides.style.transform = `translateX(-${index * slideWidth}px)`;
    currentIndex = index;
  }

  function nextSlide() {
    if (currentIndex < slideCount) {
      moveTo(currentIndex + 1);
    } else {
      moveTo(currentIndex + 1);
      setTimeout(() => {
        slides.style.transition = "none";
        moveTo(1);
      }, 500);
    }
  }

  function prevSlide() {
    moveTo(currentIndex - 1);
    if (currentIndex === 0) {
      setTimeout(() => {
        slides.style.transition = "none";
        const slideWidth = getSlideWidth();
        slides.style.transform = `translateX(-${slideWidth * slideCount}px)`;
        currentIndex = slideCount;
      }, 500);
    }
  }

  updateTransform();
  let autoSlide = setInterval(nextSlide, 5000);

  document.getElementById("prevDot")?.addEventListener("click", () => {
    clearInterval(autoSlide);
    prevSlide();
    autoSlide = setInterval(nextSlide, 5000);
  });

  document.getElementById("nextDot")?.addEventListener("click", () => {
    clearInterval(autoSlide);
    nextSlide();
    autoSlide = setInterval(nextSlide, 5000);
  });

  window.addEventListener("resize", updateTransform);

// Modal

  const form = document.getElementById('contactForm');
  const modal = document.getElementById('successModal');
  const closeX = document.getElementById('closeX');

  if (form && modal && closeX) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      if (form.checkValidity()) {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';

        setTimeout(() => {
          form.reset();
        }, 300);
      } else {
        form.reportValidity();
      }
    });

    function closeModal() {
      modal.style.display = 'none';
      document.body.style.overflow = '';
    }

    closeX.addEventListener('click', closeModal);
    window.addEventListener('click', function (e) {
      if (e.target === modal) {
        closeModal();
      }
    });
  }
});

