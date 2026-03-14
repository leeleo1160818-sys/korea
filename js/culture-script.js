/* kpop 슬라이드 */
var kpopSwiper = new Swiper(".swiper.k-pop", {
  slidesPerView: 3,
  spaceBetween: 80,
  loop: true,
  autoplay: {
    delay: 10000,
    disableOnInteraction: false,
  },
  navigation: {
    nextEl: ".kpop-next",
    prevEl: ".kpop-prev",
  },
});

/* 2번 스와이퍼 */
var swiper = new Swiper(".con-view", {
  spaceBetween: 30,
  centeredSlides: true,
  speed: 500,
  /* loop: true, */
  hashNavigation: {
    watchState: true,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});

window.addEventListener("load", function () {
  // 1. 주소창에 #이 있는지 확인 (예: #kdh)
  if (window.location.hash) {
    const hashName = window.location.hash.replace("#", "");

    // 2. 해당 data-hash를 가진 슬라이드 찾기
    const targetSlide = document.querySelector(`[data-hash="${hashName}"]`);

    if (targetSlide) {
      // 3. [핵심] 슬라이드가 속한 섹션(k-content)으로 화면 먼저 이동
      // 해당 슬라이드를 감싸고 있는 가장 가까운 섹션이나 id가 있는 부모를 찾습니다.
      const targetSection = targetSlide.closest("#k-content") || targetSlide.closest("section");

      if (targetSection) {
        const offsetTop = targetSection.offsetTop;
        window.scrollTo({
          top: offsetTop - 100, // 헤더 높이만큼 여유 공간
          behavior: "smooth",
        });
      }

      // 4. 스와이퍼를 해당 슬라이드로 이동 (setTimeout으로 안정성 확보)
      setTimeout(() => {
        // 루프 모드일 경우 slideToLoop를 사용해야 정확합니다.
        const slideIndex = Array.from(targetSlide.parentNode.children).indexOf(targetSlide);
        swiper.slideToLoop(slideIndex, 0);
      }, 200);
    }
  }
});

// 슬라이드 넘길 때 주소창 튀는 현상 방지
swiper.on("slideChange", function () {
  if (window.location.hash) {
    // 이동이 완료된 후 주소창의 해시를 조용히 제거해서 초기화 방지
    history.replaceState(null, null, " ");
  }
});

/* 3번스와이퍼 */
/* var beautySwiper = new Swiper(".beauty-swiper", {
  slidesPerView: 3,
  spaceBetween: 30,

  loop: true,

  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },

  pagination: {
    el: ".beauty-swiper .swiper-pagination",
    clickable: true,
  },

  breakpoints: {
    768: {
      slidesPerView: 1,
    },
    1024: {
      slidesPerView: 2,
    },
    1280: {
      slidesPerView: 3,
    },
  },
});
 */
