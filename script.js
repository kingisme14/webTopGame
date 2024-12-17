const box = document.getElementById("greenBox");
const counter = document.getElementById("counter");
const scoreDisplay = document.getElementById("score");

let scale = 1; // 初始大小
let targetScale = 1; // 目標大小
const growRate = 0.05; // 每次變大的幅度
const shrinkRate = 0.01; // 每次縮小的幅度

let clickCount = 0; // 當前點擊次數
let smashThreshold = 20; // 觸發粉碎的初始次數
let score = 0; // 分數
let isSmashing = false; // 是否正在執行粉碎動畫

// 畫面震動功能
function shakeScreen() {
    document.body.classList.add("shake");
    setTimeout(() => document.body.classList.remove("shake"), 300); // 震動持續 300ms
}

// 粉碎效果
function smashBox() {
    isSmashing = true; // 禁止點擊
    box.classList.add("smash");
    setTimeout(() => {
        box.classList.remove("smash");
        resetBox(); // 重置方塊與計數
        isSmashing = false; // 允許再次點擊
    }, 500);
}

// 隨機產生 5 到 20 的數字
function getRandomThresholdIncrease() {
    return Math.floor(Math.random() * 16) + 5; // 隨機 5 ~ 20
}

// 重置方塊與計數，並更新分數
function resetBox() {
    clickCount = 0; // 歸零計數
    counter.textContent = clickCount;
    smashThreshold += getRandomThresholdIncrease(); // 隨機增加下一次粉碎門檻
    score++; // 分數加 1
    scoreDisplay.textContent = score; // 更新分數顯示
    targetScale = 1; // 重置大小
}

// 點擊事件：變大、數字累加、震動、檢查粉碎
box.addEventListener("mousedown", () => {
    if (isSmashing) return; // 如果正在粉碎，忽略點擊事件

    targetScale = 2;
    clickCount++;
    counter.textContent = clickCount;
    shakeScreen(); // 每次點擊時震動畫面

    // 檢查是否達到粉碎門檻
    if (clickCount >= smashThreshold) {
        smashBox();
    }
});

// 鬆開滑鼠時，方塊恢復
box.addEventListener("mouseup", () => {
    if (!isSmashing) targetScale = 1;
});

// 滑鼠離開也恢復
box.addEventListener("mouseleave", () => {
    if (!isSmashing) targetScale = 1;
});

// 動畫：持續更新方塊大小
function animate() {
    if (scale < targetScale) {
        scale += growRate;
        if (scale > targetScale) scale = targetScale;
    } else if (scale > targetScale) {
        scale -= shrinkRate;
        if (scale < targetScale) scale = targetScale;
    }
    box.style.transform = `scale(${scale})`;
    requestAnimationFrame(animate);
}

animate();
