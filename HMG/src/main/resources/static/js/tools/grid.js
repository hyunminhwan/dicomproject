function handleGridSelection(rows, cols, imageList) {
    const singleViewer = document.getElementById('singleViewer');
    const gridViewer = document.getElementById('gridViewer');
    let currentPage = 0; // 페이지네이션 용도

    function switchToGridViewer() {
        const totalItems = rows * cols;
        const startIndex = currentPage * totalItems;

        // 단일 뷰어 숨기기, 다중 뷰어 보이기
        singleViewer.style.display = 'none';
        gridViewer.style.display = 'grid';
        gridViewer.innerHTML = ''; // 이전 뷰어 초기화
        gridViewer.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
        gridViewer.style.gridTemplateRows = `repeat(${rows}, 1fr)`;

        // 페이지네이션에 따른 이미지 목록 계산
        const paginatedImages = imageList.slice(startIndex, startIndex + totalItems);

        paginatedImages.forEach((imagePath) => {
            const dicomElement = document.createElement('div');
            dicomElement.style.border = '1px solid black';
            cornerstone.enable(dicomElement);

            // DICOM 이미지를 로드하고 뷰어에 표시
            cornerstone.loadAndCacheImage('wadouri:' + imagePath).then(function(image) {
                cornerstone.displayImage(dicomElement, image);
                initializeTools(dicomElement); // mainTools.js의 도구 초기화
            }).catch(function(error) {
                console.error('Error loading DICOM image:', error);
            });

            gridViewer.appendChild(dicomElement);
        });
    }

    // 페이지네이션 함수
    function nextPage() {
        const totalItems = rows * cols;
        if ((currentPage + 1) * totalItems < imageList.length) {
            currentPage++;
            switchToGridViewer();
        }
    }

    function prevPage() {
        if (currentPage > 0) {
            currentPage--;
            switchToGridViewer();
        }
    }

    // 페이지네이션 컨트롤 추가
    const paginationControls = document.createElement('div');
    paginationControls.innerHTML = `
        <button onclick="prevPage()">Previous</button>
        <button onclick="nextPage()">Next</button>
    `;
    gridViewer.after(paginationControls);

    // 초기 다중 뷰어 설정 호출
    switchToGridViewer();
}
