const API_URL = "./data/heritage.json";

let dataList = [];
let resultList = [];

let page = 1;
let pageSize = 12;
let category = "all";

let isLoading = false;

let masonry;


/* 데이터 불러오기 */

fetch(API_URL)
.then(res => res.json())
.then(data => {

  dataList = data;
  resultList = data;

  render(true);

});


/* 카드 출력 */

function render(reset=false){

  const start = (page - 1) * pageSize;
  const end = start + pageSize;

  const pageData = resultList.slice(start,end);

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

  const grid = document.querySelector(".grid");

  if(reset){
    grid.innerHTML = html;
  }else{
    grid.innerHTML += html;
  }

  /* Masonry 실행 */

  setTimeout(() => {

  if(!masonry){

    masonry = new Masonry(".grid",{
      itemSelector:".item",
      columnWidth:".item",
      percentPosition:true
      
    });

  }else{

    masonry.reloadItems();
    masonry.layout();

  }

  /* 순차 애니메이션 */

  const items = document.querySelectorAll(".item");

  items.forEach((item,i)=>{

    setTimeout(()=>{
      item.classList.add("animate");
    }, i * 80);

  });

},50);

  isLoading = false;

}


/* 스크롤 로딩 */

window.addEventListener("scroll", () => {

  if(isLoading) return;

  const bottom =
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 200;

  if(bottom){

    const maxPage = Math.ceil(resultList.length / pageSize);

    if(page < maxPage){

      page++;
      isLoading = true;

      render();

    }

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


/* 검색 버튼 */

$(".search-btn").click(searchData);


/* 엔터 검색 */

$("#searchInput").on("keydown",function(e){

  if(e.key === "Enter"){
    searchData();
  }

});


/* 검색 함수 */

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