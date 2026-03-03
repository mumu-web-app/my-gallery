// 작가님 아이디와 저장소 이름입니다.
const USER_ID = "mumu-web-app"; 
const REPO_NAME = "my-gallery"; 

const CATEGORIES = [
    { path: "images/work/seal", target: "gallery-work-seal" },
    { path: "images/work/wood", target: "gallery-work-wood" },
    { path: "images/lesson/seal", target: "gallery-lesson-seal" },
    { path: "images/lesson/wood", target: "gallery-lesson-wood" }
];

async function loadGallery() {
    for (const cat of CATEGORIES) {
        const box = document.getElementById(cat.target);
        if (!box) continue;

        try {
            // GitHub 폴더를 뒤져서 사진 목록을 가져옵니다.
            const response = await fetch(`https://api.github.com/repos/${USER_ID}/${REPO_NAME}/contents/${cat.path}`);
            const files = await response.json();

            box.innerHTML = ""; 

            if (!Array.isArray(files) || files.length === 0) {
                box.innerHTML = "<p>사진을 기다리고 있어요!</p>";
                continue;
            }

            files.forEach(file => {
                // .gitkeep 파일은 무시하고 진짜 이미지 파일만 보여줍니다.
                if (file.name.match(/\.(jpg|jpeg|png|gif)$/i)) {
                    box.innerHTML += `
                        <div class="card">
                            <img src="${file.download_url}" alt="작품">
                        </div>`;
                }
            });
        } catch (e) {
            console.log("로딩 중...");
        }
    }
}

window.onload = loadGallery;
