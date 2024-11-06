document.addEventListener('DOMContentLoaded', function() {
	cornerstoneWADOImageLoader.external.cornerstone = cornerstone;
		cornerstoneWADOImageLoader.configure({useWebWorkers: true});

		// 모든 dicomViewer 요소를 찾아서 cornerstone.js 적용
		document.querySelectorAll('[id^="dicomViewer"]').forEach((dicomElement) => {
			const imageElements = dicomElement.querySelectorAll('[data-path]');
			const imageList = Array.from(imageElements).map(el => el.getAttribute('data-path'));

			let currentIndex = 0;
			const totalImages = imageList.length;

			// cornerstone.js 활성화
			cornerstone.enable(dicomElement);

			// DICOM 이미지 로드 함수
			function loadDicomImage(index) {
				const dicomFilePath = imageList[index];

				cornerstone.loadAndCacheImage('wadouri:' + dicomFilePath).then(function (image) {
					cornerstone.displayImage(dicomElement, image);
					dicomElement.classList.remove('hidden');  // 이미지가 있으면 뷰어를 표시
				}).catch(function (error) {
					console.error('Error loading DICOM image:', error);
					dicomElement.classList.add('hidden');  // 이미지가 없으면 뷰어를 숨김
				});
			}

			// 처음 이미지 로드
			if (totalImages > 0) {
				loadDicomImage(currentIndex);
			} else {
				console.error('No DICOM images to display.');
				dicomElement.classList.add('hidden');  // 이미지가 없으면 뷰어를 숨김
			}

			// 마우스 휠 이벤트 처리 (이미지 전환)
			dicomElement.addEventListener('wheel', (event) => {
				if (event.deltaY > 0) {
					// 마우스 휠 아래로 (다음 이미지)
					currentIndex = (currentIndex + 1) % totalImages;
				} else {
					// 마우스 휠 위로 (이전 이미지)
					currentIndex = (currentIndex - 1 + totalImages) % totalImages;
				}
				loadDicomImage(currentIndex);
			});
		});

		
	
});
function imageDetail(key) {
			const studyKey = key.getAttribute('data-studyKey');
			const seriesKey = key.getAttribute('data-seriesKey');

			const url = `/ImageDetail?studyKey=${studyKey}&seriesKey=${seriesKey}`;
			window.location.href = url;
		}