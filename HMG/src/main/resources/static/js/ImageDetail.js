document.addEventListener('DOMContentLoaded', function() {
	cornerstoneWADOImageLoader.external.cornerstone = cornerstone;
	cornerstoneWADOImageLoader.configure({ useWebWorkers: true });
	
	// DICOM 이미지를 단일 뷰어 컨테이너에서 로드하고 전환
	const dicomElement = document.getElementById('dicomViewer');
	const imageElements = dicomElement.querySelectorAll('[data-path]');
	const imageList = Array.from(imageElements).map(el => el.getAttribute('data-path'));

	// cornerstone 활성화
	cornerstone.enable(dicomElement);

	let currentImageIndex = 0;
	const totalImages = imageList.length;

	// 이미지 로드 함수
	function loadDicomImage(index) {
		const dicomFilePath = imageList[index]; // currentImageIndex에 따른 이미지 로드
		// cornerstone을 사용해 DICOM 이미지 로드 및 표시
		cornerstone.loadAndCacheImage('wadouri:' + dicomFilePath).then(function(image) {
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

	// 흑백 반전 기능
	document.getElementById('invertButton').addEventListener('click', function(){
		const viewport = cornerstone.getViewport(dicomElement); // 현재 뷰포트 가져오기
		viewport.invert = !viewport.invert; // invert 속성 반전
		cornerstone.setViewport(dicomElement, viewport); // 반전된 뷰포트 설정
	});


	
	// 이동 기능
	document.getElementById('panButton').addEventListener('click', function(){
		const PanTool = cornerstoneTools.PanTool;

		if (!panToolActive) {
			cornerstoneTools.addTool(PanTool);
			cornerstoneTools.setToolActive('Pan', { mouseButtonMask: 1 });
			panToolActive = true;
		} else {
			cornerstoneTools.setToolDisabled('Pan');
			panToolActive = false;
		}
	}); // panButton에 해당하는 버튼을 생성해서 연결
});


