/* 마우스커서 */
const cursor = document.querySelector(".cursor-light");
const trails = document.querySelectorAll(".trail");

window.addEventListener("mousemove", e => {
  gsap.to(cursor, {
    x: e.clientX - 12,
    y: e.clientY - 12,
    duration: 0.12,
    ease: "power2.out",
  });

  trails.forEach((trail, i) => {
    gsap.to(trail, {
      x: e.clientX - 7,
      y: e.clientY - 7,
      scale: 1 - i * 0.12, // 뒤로 갈수록 작아짐
      duration: 0.25 + i * 0.08,
      ease: "power3.out",
    });
  });
});

/* 테마변경 */
$(".color button").click(function () {

  let theme = $(this).data("theme")

  $("body").removeClass("light dark mix")
  $("body").addClass(theme)

})

/* 언어 선택 */
$(".lang").on("click", function (e) {
  e.preventDefault(); 
  $(".lang-list").slideToggle(250);
  $(this).toggleClass("active");
});

/* now 슬라이드 */
var nowSwiper = new Swiper(".swiper.now", {
  slidesPerView: 3,
  spaceBetween: 80,
  loop: true,
  autoplay: {
    delay: 10000,
    disableOnInteraction: false,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

/* 갤러리 */
$(".thumb").click(function () {
  const img = $(this).find("img").attr("src");
  const title = $(this).find("h3").text();
  const desc = $(this).find("p").text();

  $("#mainImg").attr("src", img);
  $("#title").text(title);
  $("#desc").text(desc);
});

/* explore 슬라이드 */
var swiper = new Swiper(".exploreview", {
  watchSlidesProgress: true,

  slidesPerView: 3,
  spaceBetween: 50,
  loop: true,

  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
  },
});
