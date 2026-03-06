const API_URL = "./data/foods.json";
let $grid;
let limit = 12;
let currentFilter = "*"; // 현재 선택된 탭 저장용

fetch(API_URL)
  .then(res => res.json())
  .then(data => {
    renderAll(data);
  });

function renderAll(data) {
  let html = "";
  data.forEach(food => {
    html += `
      <div class="food-card ${food.category}">
        <div class="card-inner">
          <a href="detail-food.html?id=${food.id}">
            <img src="${food.list_image_url}" alt="${food.name}" />
            <div class="info">
              <h3>${food.name}</h3>
              <p>${food.tagline}</p>
            </div>
          </a>
        </div>
      </div>`;
  });
  $(".food-list").html(html);

  $grid = $(".food-list").isotope({
    itemSelector: ".food-card",
    layoutMode: "fitRows",
    transitionDuration: "0.6s",
  });

  update();
}

// 개수와 필터를 동시에 체크하는 핵심 함수
function update() {
  let count = 0;
  $grid.isotope({
    filter: function () {
      const isMatch = currentFilter === "*" || $(this).hasClass(currentFilter);
      // 필터에 해당하면서 동시에 limit 개수 안에 드는 것만 표시
      if (isMatch && count < limit) {
        count++;
        return true;
      }
      return false;
    },
  });

  // 현재 필터 조건에 맞는 전체 개수 확인 후 버튼 노출 결정
  const totalMatched = currentFilter === "*" ? $(".food-card").length : $("." + currentFilter).length;
  if (limit >= totalMatched) {
    $(".more-btn").hide();
  } else {
    $(".more-btn").show();
  }
}

/* 더보기 버튼 */
$(".more-btn").click(function () {
  limit += 12;
  update();
});

/* 탭 클릭 */
$(".tab li").click(function () {
  $(".tab li").removeClass("on");
  $(this).addClass("on");

  const f = $(this).data("filter");
  currentFilter = f === "all" ? "*" : f;

  limit = 12; // 탭 바꿀 때마다 다시 8개부터 보여주기 위해 리셋
  update();
});

/* 검색 - 검색 시에는 데이터가 적을 수 있으니 제한 해제 */
$("#searchInput").on("keyup", function () {
  const k = $(this).val().toLowerCase();

  if (k.length > 0) {
    $(".more-btn").hide(); // 검색 중엔 버튼 숨김
    $grid.isotope({
      filter: function () {
        return $(this).find("h3").text().toLowerCase().includes(k);
      },
    });
  } else {
    update(); // 검색어 지우면 다시 원래 탭/개수 상태로 복구
  }
});
