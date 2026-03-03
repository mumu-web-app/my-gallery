// 작가님 아이디와 저장소 이름 확인
const USER_ID = "mumu-web-app"; 
const REPO_NAME = "my-gallery"; 

const CATEGORIES = [
    { path: "images/work/seal", target: "gallery-work-seal" },
    { path: "images/work/wood", target: "gallery-work-wood" },
    { path: "images/lesson/seal", target: "gallery-lesson-seal" },
    { path: "images/lesson/wood", target: "gallery-lesson-wood" }
];

const modal = document.getElementById("photoModal");
const modalImg = document.getElementById("modalImg");

async function loadGallery() {
    for (const cat of CATEGORIES) {
        const box = document.getElementById(cat.target);
        if (!box) continue;

        try {
            const response = await fetch(`https://api.github.com/repos/${USER_ID}/${REPO_NAME}/contents/${cat.path}`);
            const files = await response.json();

            if (!Array.isArray(files) || files.length === 0) {
                box.innerHTML = "<p style='color:#999;'>준비된 사진이 없습니다.</p>";
                continue;
            }

            files.forEach(file => {
                // 사진 파일만 골라내기
                if (file.name.match(/\.(jpg|jpeg|png|gif|webp)$/i)) {
                    const card = document.createElement("div");
                    card.className = "card";
                    
                    const img = document.createElement("img");
                    img.src = file.download_url;
                    img.loading = "lazy";
                    
                    // ★ 클릭 시 크게 보기 ★
                    img.onclick = function(e) {
                        e.stopPropagation(); // 이벤트 겹침 방지
                        modal.style.display = "block";
                        modalImg.src = this.src;
                    }
                    
                    card.appendChild(img);
                    box.appendChild(card);
                }
            });
        } catch (e) { console.error("데이터 불러오기 실패:", e); }
    }
}

// ★ 다시 클릭하면 닫히는 기능 ★
// 모달창 전체(배경, 사진 포함)를 클릭하면 닫힙니다.
modal.onclick = function() {
    modal.style.display = "none";
}

window.onload = loadGallery;
