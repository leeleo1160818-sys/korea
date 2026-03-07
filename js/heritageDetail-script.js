const API_URL = "./data/heritage.json";

/* URL id 가져오기 */

const params = new URLSearchParams(location.search);
const id = params.get("id");


fetch(API_URL)
.then(res => res.json())
.then(data => {

  const item = data.find(v => v.id == id);

  if(!item) return;


  document.getElementById("detail-image").src = item.detail_image_url;

  document.getElementById("detail-name").textContent = item.name;
  document.getElementById("detail-tagline").textContent = item.tagline;

  document.getElementById("detail-intro").textContent = item.intro;
  document.getElementById("detail-intro2").textContent = item.intro;

  document.getElementById("detail-history").textContent = item.history;


  document.getElementById("g1").src = item.gallery_1;
  document.getElementById("g2").src = item.gallery_2;
  document.getElementById("g3").src = item.gallery_3;
  document.getElementById("g4").src = item.gallery_4;


  const exp = document.getElementById("experience");

  const list = [
    item.experience_1,
    item.experience_2,
    item.experience_3,
    item.experience_4
  ];

  list.forEach(v=>{

    if(v){

      const li = document.createElement("li");
      li.textContent = v;
      exp.appendChild(li);

    }

  });


  document.getElementById("location").textContent = item.location;

});

  $(".return").click(function () {
    location.href = "heritage-index.html";
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