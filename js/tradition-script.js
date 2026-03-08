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