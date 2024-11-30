document.addEventListener('DOMContentLoaded', function() {
	cornerstoneWADOImageLoader.external.cornerstone = cornerstone;
	cornerstoneWADOImageLoader.configure({ useWebWorkers: true });
	cornerstoneTools.external.cornerstone = cornerstone;
	cornerstoneTools.external.cornerstoneMath = cornerstoneMath;
	cornerstoneTools.external.Hammer = Hammer;
	cornerstoneTools.getModule("segmentation").configuration.segmentsPerLabelmap = 0; // 오류 문구 제거용	
	
	
	// DICOM 이미지를 단일 뷰어 컨테이너에서 로드하고 전환
	const dicomElement = document.getElementById('dicomViewer');
	const imageElements = dicomElement.querySelectorAll('[data-path]');
	const imageList = Array.from(imageElements).map(el => el.getAttribute('data-path'));


	// cornerstone 활성화
	cornerstone.enable(dicomElement);
	// cornerstoneTools 초기화(활성화시 커서 변경 true)
	cornerstoneTools.init({ showSVGCursors: true });
	
	// 길이 측정 도구를 특정 요소에 추가
	cornerstoneTools.addToolForElement(dicomElement, cornerstoneTools.LengthTool);
	cornerstoneTools.addToolForElement(dicomElement, cornerstoneTools.AngleTool);
	cornerstoneTools.addToolForElement(dicomElement, cornerstoneTools.WwwcTool);
	cornerstoneTools.addToolForElement(dicomElement, cornerstoneTools.PanTool);
	cornerstoneTools.addToolForElement(dicomElement, cornerstoneTools.MagnifyTool);
	cornerstoneTools.addToolForElement(dicomElement, cornerstoneTools.ZoomTool);
	cornerstoneTools.addToolForElement(dicomElement, cornerstoneTools.EraserTool);
	cornerstoneTools.addToolForElement(dicomElement, cornerstoneTools.RotateTool);
	cornerstoneTools.addToolForElement(dicomElement, cornerstoneTools.ArrowAnnotateTool);
	cornerstoneTools.addToolForElement(dicomElement, cornerstoneTools.FreehandRoiTool);

	
	// 라이브러리 활성화 상태 확인
	console.log("cornerstone : ", cornerstone);
	console.log("loader : ", cornerstoneWADOImageLoader);
	console.log("tools : ", cornerstoneTools);
	console.log("math : ", cornerstoneMath);
	console.log("hammer : ", Hammer);

	let currentImageIndex = 0;
	const totalImages = imageList.length;

	// 이미지 로드 함수
	function loadDicomImage(index) {
		const dicomFilePath = 'wadouri:' + imageList[index]; // currentImageIndex에 따른 이미지 로드
		// cornerstone을 사용해 DICOM 이미지 로드 및 표시
		cornerstone.loadAndCacheImage(dicomFilePath).then(function(image) {
			cornerstone.displayImage(dicomElement, image);
			dicomElement.classList.remove('hidden');  // 이미지가 있으면 뷰어를 표시
			
		}).catch(function(error) {
			console.error('Error loading DICOM image:', error);
			dicomElement.classList.add('hidden');  // 이미지가 없으면 뷰어를 숨김
		});
	}

	// 처음 이미지 로드
	if (totalImages > 0) {
		loadDicomImage(currentImageIndex); // 첫 번째 이미지를 로드
	} else {
		console.error('No DICOM images to display.');
		dicomElement.classList.add('hidden');  // 이미지가 없으면 뷰어를 숨김
	}

	// 마우스 휠 이벤트 처리 (이미지 전환)
	dicomElement.addEventListener('wheel', function(e) {
		if (e.deltaY > 0) {
			// 마우스 휠 아래로 (다음 이미지)
			currentImageIndex = (currentImageIndex + 1) % totalImages;
		} else {
			// 마우스 휠 위로 (이전 이미지)
			currentImageIndex = (currentImageIndex - 1 + totalImages) % totalImages;
		}
		loadDicomImage(currentImageIndex); // 현재 이미지 인덱스에 해당하는 이미지 로드
		e.preventDefault(); // 페이지 스크롤 방지
	});
	
	console.log('ImageDetail_dicomElement :', dicomElement);
	
	// mainTools.js 호출
	if(dicomElement.style.display != 'none') { 
		initializeTools(dicomElement,currentImageIndex); 
	}
	
});
/*
function gridViewerImageLoad() {
	const param = new URLSearchParams(window.location.search);
	const studyKey = param.get('studyKey');
	const seriesCache = {
	        studyKey: '',
	        seriesList: []
	    };
	console.log('gridViewerImageLoad studyKey: ', studyKey);
	
	axios.get('/gridImageData', {
		params: {studyKey: studyKey}
		})
		.then(response => {
			const seriesList = response.data.map((images, index) => {
				return {
					seriesKey: index + 1,
					imagePath: images
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
*/