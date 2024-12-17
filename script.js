const box = document.getElementById("greenBox");
const counter = document.getElementById("counter");

let scale = 1; // 初始大小
let targetScale = 1; // 目標大小
const growRate = 0.05; // 每次變大的幅度
const shrinkRate = 0.01; // 每次縮小的幅度
let clickCount = 0; // 點擊次數

// 點擊事件：方塊變大，數字累加
box.addEventListener("mousedown", () => {
    targetScale = 2; // 變大到2倍
    clickCount++; // 點擊次數累加
    counter.textContent = clickCount; // 更新數字顯示
});

// 鬆開滑鼠時，方塊恢復
box.addEventListener("mouseup", () => {
    targetScale = 1; // 恢復到原始大小
});

box.addEventListener("mouseleave", () => {
    targetScale = 1; // 滑鼠離開也恢復
});

// 持續更新方塊大小
function animate() {
    if (scale < targetScale) {
        scale += growRate; // 變大
        if (scale > targetScale) scale = targetScale; // 限制最大值
    } else if (scale > targetScale) {
        scale -= shrinkRate; // 變小
        if (scale < targetScale) scale = targetScale; // 限制最小值
    }
    box.style.transform = `scale(${scale})`; // 更新CSS的transform屬性
    requestAnimationFrame(animate); // 持續執行動畫
}

animate(); // 啟動動畫
