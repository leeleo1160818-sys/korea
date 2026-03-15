const API_URL = "./data/tradition.json";

const params = new URLSearchParams(location.search);
const category = params.get("category");

fetch(API_URL)
  .then(res => res.json())
  .then(data => {
    const items = data.filter(v => v.category === category);

    if (!items.length) {
      document.getElementById("detail-category-title").textContent = "전통문화";
      document.getElementById("detail-category-text").textContent = "선택한 카테고리의 데이터가 없습니다.";
      return;
    }

    document.getElementById("detail-category-title").textContent = items[0].krCategory;
    document.getElementById("detail-category-text").textContent = items[0].categoryText;

    const detailList = document.getElementById("detail-list");
    detailList.innerHTML = "";

    items.forEach((item, index) => {
      const div = document.createElement("div");
      div.className = index % 2 === 1 ? "item reverse" : "item";

      div.innerHTML = `
        <div class="detail-text">
          <h3 class="detail-name">${item.name}</h3>

          <div class="info-box">
            <h4>문화소개</h4>
            <p>${item.intro}</p>
          </div>

          <div class="info-box">
            <h4>역사</h4>
            <p>${item.history}</p>
          </div>

          <div class="info-box">
            <h4>관련지역</h4>
            <p>${item.region}</p>
          </div>
        </div>

        <div class="detail-thumb">
          <div class="thumb-grid">
            <img src="${item.img1}" alt="${item.name}">
            <img src="${item.img2}" alt="${item.name}">
            <img src="${item.img3}" alt="${item.name}">
            <img src="${item.img4}" alt="${item.name}">
          </div>
        </div>
      `;

      detailList.appendChild(div);
    });
  });

$(".return-btn").click(function () {
  location.href = "tradition-index.html";
});
