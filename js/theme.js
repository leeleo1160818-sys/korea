$(function(){

  const header = $("header");

  /* gnb hover */
  $(".gnb").mouseenter(function(){
    header.addClass("on");
  });

  header.mouseleave(function(){
    header.removeClass("on");
  });

  /* language */
$(".lang > a").click(function (e) {
    e.preventDefault();
    /* $(".lang-list").stop().slideToggle(300); */
    $(".lang").toggleClass("active");

  });

});

/* 탭메뉴 이동 */
// 페이지 처음 열릴 때
$(window).on("load", function(){

  const hash = window.location.hash.replace("#","");

  if(hash){

    const target = $(`.tab li[data-filter="${hash}"]`);

    if(target.length){
      target.click();
    }
  }
});


// 같은 페이지에서 hash 변경될 때
$(window).on("hashchange", function(){

  const hash = window.location.hash.replace("#","");

  if(hash){

    const target = $(`.tab li[data-filter="${hash}"]`);

    if(target.length){
      target.click();
    }
  }
});


/* 테마변경 */
const buttons = document.querySelectorAll(".color button[data-theme]");

// 저장된 테마 불러오기
const savedTheme = localStorage.getItem("theme");

if(savedTheme){
  document.body.classList.add(savedTheme);
}else{
  document.body.classList.add("light");
}

// 테마 버튼 클릭
buttons.forEach(button=>{
  button.addEventListener("click",()=>{
    const theme = button.dataset.theme;

    document.body.classList.remove("light","dark","mix");
    document.body.classList.add(theme);

    localStorage.setItem("theme",theme);
  });
});



/* BGM */
const bgm = document.getElementById("bgm");
const bgmButton = document.querySelector(".bgm-btn");

// 저장된 상태
let savedBgm = localStorage.getItem("bgm");
let savedTime = localStorage.getItem("bgmTime");

if(savedTime){
  bgm.currentTime = savedTime;
}

if(savedBgm === "on"){
  bgm.play().catch(()=>{});
}

bgm.addEventListener("timeupdate", ()=>{
  localStorage.setItem("bgmTime", bgm.currentTime);
});

// BGM 버튼
bgmButton.addEventListener("click", ()=>{

  if(bgm.paused){
    bgm.play();
    localStorage.setItem("bgm","on");
  }else{
    bgm.pause();
    localStorage.setItem("bgm","off");
  }

});

/* 마우스커서 */
/* const cursor = document.querySelector(".cursor-light");
const trails = document.querySelectorAll(".trail");

window.addEventListener("mousemove", e => {
  gsap.to(cursor, {
    x: e.clientX - 12,
    y: e.clientY - 12,
    duration: 0.12,
    ease: "power2.out",
  });

  trails.forEach((trail, i) => {
    gsap.to(trail, {
      x: e.clientX - 7,
      y: e.clientY - 7,
      scale: 1 - i * 0.12, // 뒤로 갈수록 작아짐
      duration: 0.25 + i * 0.08,
      ease: "power3.out",
    });
  });
}); */