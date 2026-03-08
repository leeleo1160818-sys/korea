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