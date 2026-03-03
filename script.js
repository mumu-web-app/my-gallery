// 작가님 아이디와 저장소 확인
const USER_ID = "mumu-web-app"; 
const REPO_NAME = "my-gallery"; 

const CATEGORIES = [
    { path: "images/work/seal", target: "gallery-work-seal" },
    { path: "images/work/wood", target: "gallery-work-wood" },
    { path: "images/lesson/seal", target: "gallery-lesson-seal" },
    { path: "images/lesson/wood", target: "gallery-lesson-wood" }
];

// 크게 보기 관련 요소
const modal = document.getElementById("photoModal");
const modalImg = document.getElementById("modalImg");
const closeBtn = document.getElementsByClassName("close")[0];

async function loadGallery() {
    for (const cat of CATEGORIES) {
        const box = document.getElementById(cat.target);
        if (!box) continue;

        try {
            const response = await fetch(`https://api.github.com/repos/${USER_ID}/${REPO_NAME}/contents/${cat.path}`);
            const files = await response.json();

            if (!Array.isArray(files) || files.length === 0) continue;

            files.forEach(file => {
                if (file.name.match(/\.(jpg|jpeg|png|gif)$/i)) {
                    const card = document.createElement("div");
                    card.className = "card";
                    
                    const img = document.createElement("img");
                    img.src = file.download_url;
                    
                    // ★ 클릭 시 크게 보기 이벤트 ★
                    img.onclick = function() {
                        modal.style.display = "block";
                        modalImg.src = this.src;
                    }
                    
                    card.appendChild(img);
                    box.appendChild(card);
                }
            });
        } catch (e) { console.log("로딩 오류"); }
    }
}

// 닫기 기능
closeBtn.onclick = () => modal.style.display = "none";
window.onclick = (e) => { if (e.target == modal) modal.style.display = "none"; }

window.onload = loadGallery;
