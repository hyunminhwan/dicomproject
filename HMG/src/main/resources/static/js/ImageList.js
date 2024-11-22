document.addEventListener('DOMContentLoaded', function() {
	cornerstoneWADOImageLoader.external.cornerstone = cornerstone;
	cornerstoneWADOImageLoader.configure({ useWebWorkers: true });

	// 모든 dicomViewer 요소를 찾아서 cornerstone.js 적용
	document.querySelectorAll('[id^="dicomViewer"]').forEach((dicomElement, index) => {
		const imageElements = dicomElement.querySelectorAll('[data-path]');
		const imageList = Array.from(imageElements).map(el => el.getAttribute('data-path'));

		let currentIndex = 0;
		const totalImages = imageList.length;

		// cornerstone.js 활성화
		cornerstone.enable(dicomElement);

		// DICOM 이미지 로드 함수
		function loadDicomImage(index) {
			const dicomFilePath = imageList[index];
			console.log('dicomFilePath :', dicomFilePath);
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

	//리포트 studyKey 로 List에서 보여주기
	const param = new URLSearchParams(window.location.search);
	const studyKey = param.get('studyKey');
	axios.get(`/api/report/${studyKey}/${0}`) // 검사에 대한 리포트를 가져오는 API 호출
		.then(response => {
			const report = response.data;
			console.log(report);
			// 리포트 데이터가 있다면 입력 필드에 채우기
			if (report) {
				document.getElementById("comment").value = report.reComment || "";
				document.getElementById("exploration").value = report.reExploration || "";
				document.getElementById("conclusion").value = report.reConclusion || "";
				document.getElementById("recommendation").value = report.reRecommendation || "";
			} else {
				document.getElementById("comment").value = "";
				document.getElementById("exploration").value = "";
				document.getElementById("conclusion").value = "";
				document.getElementById("recommendation").value = "";
			}
		})
		.catch(error => {
			console.error("리포트 로드 오류:", error);
		});




});
function saveReport() {
	const param = new URLSearchParams(window.location.search);
	const studyKey = param.get('studyKey');

	const comment = document.getElementById("comment").value;
	const exploration = document.getElementById("exploration").value;
	const conclusion = document.getElementById("conclusion").value;
	const recommendation = document.getElementById("recommendation").value;

	axios.post('/api/saveReport', {
		studyKey: studyKey, // studyKey 함께 전송
		seriesKey:0,
		reComment: comment,
		reExploration: exploration,
		reConclusion: conclusion,
		reRecommendation: recommendation
	})
		.then(response => {
			if (response.status === 200) {
				alert("저장되었습니다.");
			} else {
				alert("저장에 실패했습니다.");
			}
		})
		.catch(error => {
			console.error("오류 발생:", error);
			alert("오류가 발생했습니다.");
		});
}

function imageDetail(key) {
	const studyKey = key.getAttribute('data-studyKey');
	const seriesKey = key.getAttribute('data-seriesKey');

	const url = `/ImageDetail?studyKey=${studyKey}&seriesKey=${seriesKey}`;
	window.location.href = url;
}
