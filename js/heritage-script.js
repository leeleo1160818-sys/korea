const API_URL = "./data/heritage.json";

let dataList = [];      
let resultList = [];    

let page = 1;
const pageSize = 12;

let category = "all";
let isLoading = false;

let masonry;

// 자주 쓰는 요소
const grid = document.querySelector(".grid");
const noResult = document.querySelector(".no-result");


/* 데이터 */

fetch(API_URL)
.then(res => res.json())
.then(data => {

  dataList = data;
  resultList = data;

  render(true);

});


/* 카드렌더 */

function render(reset=false){

  // 검색 결과 없을 때
  if(resultList.length === 0){
    grid.innerHTML = "";
    noResult.style.display = "block";
    isLoading = false;
    return;
  }

  noResult.style.display = "none";

  // 페이지 데이터
  const start = (page - 1) * pageSize;
  const end = start + pageSize;

  const pageData = resultList.slice(start, end);

  let html = "";

  pageData.forEach(item => {

    html += `
      <div class="item ${item.category}">
        <div class="card">
          <a href="heritage-detail.html?id=${item.id}">
            <img src="${item.list_image_url}" loading="lazy">
            <h3>${item.name}</h3>
            <p>${item.tagline}</p>
          </a>
        </div>
      </div>
    `;

  });

  if(reset){
    grid.innerHTML = html;
  }else{
    grid.insertAdjacentHTML("beforeend", html);
  }


/* 메이슨리 */

  imagesLoaded(grid, () => {

    if(!masonry){

      masonry = new Masonry(grid,{
        itemSelector:".item",
        columnWidth:".item",
        percentPosition:true
      });

    }else{

      masonry.reloadItems();
      masonry.layout();

    }

    // 순차 애니메이션
    document.querySelectorAll(".item").forEach((item,i)=>{
      setTimeout(()=>{
        item.classList.add("animate");
      }, i * 80);
    });

    isLoading = false;

  });

}


/* 스크롤 */

window.addEventListener("scroll", () => {

  if(isLoading) return;

  const bottom =
    window.innerHeight + window.scrollY >=
    document.documentElement.scrollHeight - 200;

  if(!bottom) return;

  const maxPage = Math.ceil(resultList.length / pageSize);

  if(page < maxPage){
    page++;
    isLoading = true;
    render();
  }

});


/* 탭 */

$(".tab li").click(function(e){

  e.preventDefault();

  $(".tab li").removeClass("on");
  $(this).addClass("on");

  category = $(this).data("filter");

  searchData();

});

/* 검색 */

$(".search-btn").click(searchData);

$("#searchInput").on("keydown",function(e){
  if(e.key === "Enter") searchData();
});


function searchData(){

  const keyword = $("#searchInput").val().toLowerCase();

  resultList = dataList.filter(item => {

    const matchName =
      item.name.toLowerCase().includes(keyword);

    const matchCategory =
      category === "all" || item.category === category;

    return matchName && matchCategory;

  });

  page = 1;

  render(true);

}


/* 테마 */

$(".color button").click(function () {

  let theme = $(this).data("theme");

  $("body").removeClass("light dark mix")
           .addClass(theme);

});


/* 언어 */

$(".lang").on("click", function (e) {

  e.preventDefault();

  $(".lang-list").slideToggle(250);

  $(this).toggleClass("active");

});