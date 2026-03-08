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