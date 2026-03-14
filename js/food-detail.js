const DATA_PATH = "https://69a843a637caab4b8c6138b7.mockapi.io/api/v1/test";

$(function () {
  const params = new URLSearchParams(location.search);
  const id = params.get("id");

  $.getJSON(DATA_PATH, function (foods) {
    const food = foods.find(f => f.id == id);

    if (!food) {
      alert("음식을 찾을 수 없습니다.");
      return;
    }

    showFood(food);

    // ⭐ AOS 다시 계산
    setTimeout(() => {
      AOS.refresh();
    }, 100);

  });
});

function showFood(food) {
  // 이미지
  $("#foodImage").attr("src", food.detail_image_url);

  // 기본 정보
  $("#foodCategory").text(food.category);
  $("#foodName").text(food.name);
  $("#foodTagline").text(food.tagline);
  $("#foodIntro").text(food.intro);
  $("#foodHistory").text(food.history);

  // 카테고리
  if (food.category) {
    $("#foodCategory").text(food.category);
  }

  // 재료
  if (food.ingredient) {
    $("#ingredientList").text(food.ingredient);
  }

  // 페어링
  if (food.pairing) {
    $("#pairingList").text(food.pairing);
  }

  // 지역
  if (food.region) {
    $("#regionList").text(food.region);
  }
}

// 뒤로가기
$(".return").click(function () {
  location.href = "food-index.html";
});

$(".list-return").click(function () {
  location.href = "food-index.html";
});