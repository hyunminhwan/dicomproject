// 페이지 관련 변수 설정
let compareEnabled = false;
let currentPage = 1; // 페이지 번호는 1부터 시작
let totalPages = 0;
let currentRows = 0;
let currentCols = 0;
let startPageIndex = 0;
let endPageIndex = 0;
let currentSeriesList = [];

// 그리드 격자 출력
function gridController() {
	const compareButton = document.getElementById('compare');	
	compareEnabled = !compareEnabled;
	if (compareEnabled) {
		// 시리즈 비교 모드 초기화
		currentPage = 1; // 페이지는 1부터 시작
		startPageIndex = 0;
		endPageIndex = 0;
		currentSeriesList = [];
		
		compareButton.classList.add('comp');
	  	const gridContainer = $("#gridContainer");
	  	const gridSelector = $(".grid-selector");
	  
	    // 그리드 초기화: 기존 셀 제거
	    gridSelector.empty();
	
	    // 초기 5x5 그리드 셀 생성
	    for (let i = 0; i < 25; i++) {
	    	gridSelector.append("<div></div>");
		}
	
		// 버튼 클릭 시 드롭다운 메뉴 표시
		gridContainer.toggle();
		
		// 마우스 오버 이벤트: 색상만 표시
		gridSelector.children("div").on("mouseover", function() {
		    const index = $(this).index();
		    const gridSize = Math.sqrt(gridSelector.children().length); // 그리드 크기 계산 (예: 5x5)
	
		    // 마우스가 위치한 셀의 행, 열 인덱스 계산
		    const row = Math.floor(index / gridSize);
			const col = index % gridSize;
	
		    // 모든 셀의 배경 초기화
		    gridSelector.children("div").css("background-color", "");
	
		    // (0,0)부터 (row, col)까지의 영역에 배경색 적용
		    gridSelector.children("div").each(function(i) {
		        const r = Math.floor(i / gridSize);
		        const c = i % gridSize;
		        if (r <= row && c <= col) {
		            $(this).css("background-color", "grey");
		        }
	    	});
		});

		// 클릭 이벤트: 그리드 크기 선택 및 로드
		gridSelector.children("div").on("click", function() {
		    const index = $(this).index();
		    const gridSize = Math.sqrt(gridSelector.children().length);
		    const col = Math.floor(index / gridSize) + 1;
		    const row = index % gridSize + 1;

		    // 선택한 그리드 크기 출력
		    console.log(`선택된 그리드 크기: ${col}x${row}`);
	
		    // 선택한 그리드 크기 값을 사용하여 다중 뷰어 로드
		    loadGridImages(col, row);
	
		    // 드롭다운 메뉴 닫기
		    gridContainer.hide();
		});
	
		// 드롭다운 외부 클릭 시 드롭다운 숨기기
		$(window).on("click", function(event) {
			if (!$(event.target).closest("#compare").length && !$(event.target).closest("#gridContainer").length) {
				gridContainer.hide();
			}
		});
	} else {
		compareButton.classList.remove('comp');
		const multiViewerGrid = document.getElementById('multiViewerGrid');
		const singleViewer = document.getElementById('dicomViewer');
		const pageBtn = document.getElementById('paginationControls');
		const playClipBtn = document.getElementById('playClip');
		const downloadBtn = document.getElementById('download');
		downloadBtn.style.display = 'block';
		playClipBtn.style.display = 'block';
		multiViewerGrid.style.display = 'none';
		singleViewer.style.display = 'block';
		pageBtn.style.display = 'none';
	}
}
	
// 해당 스터디의 데이터들 로드
function seriesAllDataLoad() {
	const param = new URLSearchParams(window.location.search);
	const studyKey = param.get('studyKey');
	const seriesCache = {
		studyKey: '',
		seriesList: []
	};

	axios.get('/gridImageData', { params: {studyKey: studyKey} })
		.then(response => {
			const seriesList = response.data.map((images, index) => {
				return {
					seriesKey: index + 1,
					imagePath: images
					//ArrayList<ArrayList<String>>
				};
			});
			
			seriesCache.studyKey = studyKey;
			seriesCache.seriesList = seriesList;
			console.log('seriesCache: ', seriesCache);
			window.seriesCache = seriesCache;
		})
		.catch((e) => {
			console.error('axios error:', e.response ? e.response.data : e.message);
		})
}

// 로드한 데이터 사용자가 지정한 그리드 칸에 맞게 출력
function loadGridImages(rows, cols) {
	const multiViewerGrid = document.getElementById('multiViewerGrid');
	const singleViewer = document.getElementById('dicomViewer');
	const pageBtn = document.getElementById('paginationControls');
	const prevBtn = document.getElementById('prevPage');
	const nextBtn = document.getElementById('nextPage');
	const playClipBtn = document.getElementById('playClip');
	const downloadBtn = document.getElementById('download');
	
	multiViewerGrid.innerHTML = '';
	multiViewerGrid.style.display = 'grid';
	singleViewer.style.display = 'none';
	playClipBtn.style.display = 'none';
	downloadBtn.style.display = 'none';
	multiViewerGrid.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
	multiViewerGrid.style.gridTemplateRows = `repeat(${rows}, 1fr)`;
	multiViewerGrid.style.gap = '10px';  // 선택사항: 셀 간격 설정
	
	// 현재 그리드 설정 저장
	currentRows = rows;
	currentCols = cols;
	
	const seriesList = window.seriesCache.seriesList;
	//const totalViewers = rows * cols;
	const seriesPerPage = rows * cols;
	const totalSeries = seriesList.length;
	
	totalPages = Math.ceil(totalSeries / seriesPerPage);	// 페이지 수 계산
	startPageIndex = ( currentPage-1 ) * seriesPerPage;		// 현재 페이지 범위 내 시리즈만 가져오기
	endPageIndex = Math.min(startPageIndex + seriesPerPage, totalSeries);
	currentSeriesList = seriesList.slice(startPageIndex, endPageIndex);
	
	console.log('startPageIndex :', startPageIndex);
	console.log('endPageIndex :', endPageIndex);
	console.log('seriesList :', seriesList);
	console.log('currentPage :', currentPage);
	console.log('currentSeriesList :', currentSeriesList);
	console.log('totalPages :', totalPages);
	
	// 
	currentSeriesList.forEach((series) => {
	    const dicomElement = document.createElement('div');
	    dicomElement.classList.add('dicom-viewer');
		dicomElement.setAttribute('data-series-key', series.seriesKey); // 시리즈 키 추가
	    multiViewerGrid.appendChild(dicomElement);
	    cornerstone.enable(dicomElement);
		
		// 시리즈의 모든 이미지 경로를 스택에 추가
		const imagePaths = series.imagePath.map(path => `/mhg/${path}`);
		const stack = {
		    currentImageIndex: 0,
		    imagePaths: imagePaths,
		    totalImages: imagePaths.length
		};
		
		cornerstone.loadAndCacheImage('wadouri:' + stack.imagePaths[0])
		    .then(image => {
		        cornerstone.displayImage(dicomElement, image);
                
				// 휠 이벤트로 스택 이미지 스크롤
                dicomElement.addEventListener('wheel', function(event) {
                    event.preventDefault();
                    handleScroll(event, dicomElement, stack);
                });
				
				// 더블클릭 이벤트로 싱글뷰어, 선택한 다중 뷰어 비교 출력
				dicomElement.addEventListener('dblclick', function() {
				    switchToCompareMode(dicomElement, stack);
				});
            })
            .catch(error => console.error('Error loading image:', error));
    });
	updatePagination();
	// 페이지 버튼 표시 여부 결정 및 이벤트 리스너 추가
	if (totalPages > 1) {
	    pageBtn.style.display = 'flex';

	    // 버튼이 표시된 후에 이벤트 리스너 추가
	    if (prevBtn && !prevBtn.hasAttribute('data-initialized')) {	//!prevBtn.hasAttribute('data-initialized') : 이벤트 리스너가 중복으로 추가
	        prevBtn.addEventListener('click', function () {
	            if (currentPage > 1) {
	                currentPage--;
	                loadGridImages(currentRows, currentCols);
	            }
	        });
	        prevBtn.setAttribute('data-initialized', 'true');
	    }

	    if (nextBtn && !nextBtn.hasAttribute('data-initialized')) {
	        nextBtn.addEventListener('click', function () {
	            if (currentPage < totalPages) {
	                currentPage++;
	                loadGridImages(currentRows, currentCols);
	            }
	        });
	        nextBtn.setAttribute('data-initialized', 'true');
	    }

	} else {
	    pageBtn.style.display = 'none';
	}

	// 이전 버튼 비활성화 설정
	if (currentPage === 1) {
	    prevBtn.disabled = true;
	    prevBtn.classList.add('disabled'); // 비활성화 스타일 추가
	} else {
	    prevBtn.disabled = false;
	    prevBtn.classList.remove('disabled');
	}
	// 다음 버튼 비활성화 설정
	if (currentPage === totalPages) {
	    nextBtn.disabled = true;
	    nextBtn.classList.add('disabled'); // 비활성화 스타일 추가
	} else {
	    nextBtn.disabled = false;
	    nextBtn.classList.remove('disabled');
	}
}

function handleScroll(event, dicomElement, stack) {
    const delta = Math.sign(event.deltaY);
    let newIndex = stack.currentImageIndex + delta;

    if (newIndex >= 0 && newIndex < stack.totalImages) {
        stack.currentImageIndex = newIndex;
        cornerstone.loadAndCacheImage('wadouri:' + stack.imagePaths[newIndex])
            .then(image => cornerstone.displayImage(dicomElement, image))
            .catch(error => console.error('Error loading image:', error));
    }
}

function switchToCompareMode(dicomElement, stack) {
    const multiViewerGrid = document.getElementById('multiViewerGrid');
	const pageBtn = document.getElementById('paginationControls');
	pageBtn.style.display = 'none';

    // 현재 URL에서 단일 뷰어의 seriesKey 가져오기
    const urlParams = new URLSearchParams(window.location.search);
    const singleViewerSeriesKey = urlParams.get('seriesKey');

    // 사용자가 선택한 시리즈의 seriesKey 가져오기
    const selectedSeriesKey = dicomElement.getAttribute('data-series-key');

    // seriesCache에서 단일 뷰어와 선택된 시리즈만 남기기
    const filteredSeriesList = window.seriesCache.seriesList.filter(series =>
        series.seriesKey === parseInt(singleViewerSeriesKey) || series.seriesKey === parseInt(selectedSeriesKey)
    );

	// 동일한 시리즈가 선택된 경우 같은 시리즈를 두 번 추가하여 1행 2열로 출력
	if (singleViewerSeriesKey === selectedSeriesKey) { filteredSeriesList.push(filteredSeriesList[0]); }
	console.log('filteredSeriesList:', filteredSeriesList);
	
    // multiViewerGrid의 모든 자식 요소 제거(단일뷰어 이미지와, 선택된 이미지를 다시 로드하기 위해서)
    while (multiViewerGrid.firstChild) { multiViewerGrid.removeChild(multiViewerGrid.firstChild); }

    // 다중 뷰어를 1행 2열로 설정
    multiViewerGrid.style.display = 'grid';
    multiViewerGrid.style.gridTemplateColumns = '1fr 1fr';
    multiViewerGrid.style.gridTemplateRows = '1fr';
    multiViewerGrid.style.gap = '10px';

	// 스택 생성(동기화 염두(참조선 툴 등등))
	const firstSeries = filteredSeriesList[0].imagePath.map(path => `/mhg/${path}`);
	const secondSeries = filteredSeriesList[1].imagePath.map(path => `/mhg/${path}`);
	
	const firstStack = {
	    currentImageIdIndex: 0,
	    imagePaths: firstSeries,
	    totalImages: firstSeries.length
	};

	const secondStack = {
	    currentImageIdIndex: 0,
	    imagePaths: secondSeries,
	    totalImages: secondSeries.length
	};
	
	console.log('firstStack:', firstStack);
	console.log('secondStack:', secondStack);
	
	// 첫 번째 시리즈 출력
	const firstDicomElement = document.createElement('div');
	firstDicomElement.classList.add('dicom-viewer');
	multiViewerGrid.appendChild(firstDicomElement);
	cornerstone.enable(firstDicomElement);
	loadSeriesImages(firstDicomElement, firstStack);

	// 두 번째 시리즈 출력
	const secondDicomElement = document.createElement('div');
	secondDicomElement.classList.add('dicom-viewer');
	multiViewerGrid.appendChild(secondDicomElement);
	cornerstone.enable(secondDicomElement);
	loadSeriesImages(secondDicomElement, secondStack);
	
	initializeMultiViewerTools();
}

function loadSeriesImages(dicomElement, stack) {
    cornerstone.loadAndCacheImage('wadouri:' + stack.imagePaths[stack.currentImageIdIndex])
        .then(image => {
            cornerstone.displayImage(dicomElement, image);
            cornerstone.setViewport(dicomElement, { scale: 1.0 });
            // 휠 이벤트로 스택 이미지 스크롤
            dicomElement.addEventListener('wheel', function(event) {
                event.preventDefault();
                handleScroll(event, dicomElement, stack);
            });
        })
        .catch(error => console.error('Error loading image:', error));
}

function handleScroll(event, dicomElement, stack) {
    const delta = Math.sign(event.deltaY);
    let newIndex = stack.currentImageIdIndex + delta;

    if (newIndex >= 0 && newIndex < stack.totalImages) {
        stack.currentImageIdIndex = newIndex;
        cornerstone.loadAndCacheImage('wadouri:' + stack.imagePaths[newIndex])
            .then(image => cornerstone.displayImage(dicomElement, image))
            .catch(error => console.error('Error loading image:', error));
    }
}

function updatePagination() {
    const pageInfo = document.getElementById('pageInfo');
    const prevBtn = document.getElementById('prevPage');
    const nextBtn = document.getElementById('nextPage');

    // 현재 페이지와 총 페이지를 속성으로 설정
    pageInfo.setAttribute('data-crtPage', currentPage);
    pageInfo.setAttribute('data-totalPage', totalPages);

    // 페이지 정보를 텍스트로도 표시
    pageInfo.textContent = `${currentPage} / ${totalPages}`;

    // 이전 버튼 비활성화 설정
    prevBtn.disabled = currentPage === 1;

    // 다음 버튼 비활성화 설정
    nextBtn.disabled = currentPage === totalPages;
}
