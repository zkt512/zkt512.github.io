(function(){
    // 样式
    const style = document.createElement('style');
    style.textContent = `
        #waifu-box {
            position: fixed;
            left: 20px;
            bottom: 20px;
            z-index: 999999;
            user-select: none;
            cursor: default;
        }
        #waifu-img {
            width: 220px;
            height: auto;
            display: block;
        }
        #waifu-tips {
            position: absolute;
            bottom: 100%;
            left: 50%;
            transform: translateX(30%);
            width: 260px;
            padding: 12px;
            background: rgba(255,255,255,0.95);
            border-radius: 12px;
            box-shadow: 0 2px 12px #ddd;
            margin-bottom: 12px;
            display: none;
        }
        @media (max-width: 768px) {
            #waifu-img {
                width: 220px !important;
            }
        }
    `;
    document.head.appendChild(style);

    // 插入DOM
    const box = document.createElement('div');
    box.id = "waifu-box";
    box.innerHTML = '<div id="waifu-tips">你好呀，有什么可以帮你的吗？</div><img id="waifu-img" src="/girl.png">';
    document.body.appendChild(box);

    // 交互逻辑
    const tips = document.getElementById("waifu-tips");
    let isAttach = false, offsetX, offsetY;

    box.addEventListener("mouseenter", ()=>{tips.style.display = "block"});
    box.addEventListener("mouseleave", ()=>{tips.style.display = "none"});

    box.addEventListener("click", function(e){
        if(!isAttach){
            isAttach = true;
            const rect = box.getBoundingClientRect();
            offsetX = e.clientX - rect.left;
            offsetY = e.clientY - rect.top;
            box.style.cursor = "move";
            document.addEventListener("mousemove", moveBox);
        }else{
            detachBox();
        }
    });

    function moveBox(e){
        let x = e.clientX - offsetX;
        let y = e.clientY - offsetY;
        x = Math.max(0, Math.min(x, window.innerWidth - box.offsetWidth));
        y = Math.max(0, Math.min(y, window.innerHeight - box.offsetHeight));
        box.style.left = x + "px";
        box.style.top = y + "px";
        box.style.right = "auto";
        box.style.bottom = "auto";
    }

    function detachBox(){
        isAttach = false;
        box.style.cursor = "default";
        box.style.transition = "all 0.3s ease";
        document.removeEventListener("mousemove", moveBox);
    }

    box.addEventListener("dblclick", function(){
        detachBox();
        box.style.display = "none";
        setTimeout(()=>{
            box.style.display = "block";
            box.style.left = "20px";
            box.style.bottom = "20px";
        }, 5000);
    });
})();