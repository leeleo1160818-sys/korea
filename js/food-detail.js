const API_URL = "./data/foods.json";

// URL에서 id 가져오기
const params = new URLSearchParams(window.location.search);
const id = params.get("id");

// 데이터 호출
fetch(API_URL)
  .then(res => res.json())
  .then(data => {
    const food = data.find(item => item.id === Number(id));

    renderFood(food);
  });

function renderFood(food) {
  $("#foodImage").attr("src", food.detail_image_url);

  $("#foodName").text(food.name);

  $("#foodTagline").text(food.tagline);

  $("#foodIntro").text(food.intro);

  $("#foodHistory").text(food.history);

  const ingredients = [food.ingredient_1, food.ingredient_2, food.ingredient_3, food.ingredient_4];

  ingredients.forEach(i => {
    if (i) $("#ingredientList").append(`<li>${i}</li>`);
  });

  const pairings = [food.pairing_1, food.pairing_2, food.pairing_3, food.pairing_4];

  pairings.forEach(p => {
    if (p) $("#pairingList").append(`<li>${p}</li>`);
  });

  const regions = [food.region_1, food.region_2, food.region_3, food.region_4];

  regions.forEach(r => {
    if (r) $("#regionList").append(`<li>${r}</li>`);
  });

  $(".return").click(function () {
    location.href = "food-index.html";
  });
}


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