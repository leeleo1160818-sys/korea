const API_URL = "./data/culture.json";

const params = new URLSearchParams(location.search);
const id = params.get("id");

fetch(API_URL)
  .then(res => res.json())
  .then(data => {
    const item = data.find(v => v.id == id);

    if (!item) return;

    document.getElementById("detail-category-title").textContent = "K-POP";
    document.getElementById("detail-category-text").textContent =
      "음악과 퍼포먼스로 세계를 사로잡은 K-POP 아티스트를 만나보세요.";

    document.getElementById("detail-list").innerHTML = `
      <div class="item">
        <div class="detail-text">
          <h3 class="detail-name">${item.name}</h3>

          <div class="info-box">
            <h4>소개</h4>
            <p>${item.intro}</p>
          </div>

          <div class="info-box">
            <h4>역사</h4>
            <p>${item.history}</p>
          </div>

          <div class="info-box">
            <h4>관련지역</h4>
            <p>${item.tagline}</p>
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
      </div>
    `;
  });

$(".return-btn").click(function () {
  location.href = "culture-index.html";
});
