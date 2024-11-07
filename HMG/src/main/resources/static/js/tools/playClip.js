function playClipControll(dicomElement) {
	// 플레이클립 박스
	const playClipBox = document.getElementById('playClipBox');
	const playClipPlayBtn = document.getElementById('playClipPlay');
	const playClipPauseBtn = document.getElementById('playClipPause');
	const playClipFpsInput = document.getElementById('playClipFps');
		
	// DICOM 이미지 스택 준비(playClip 설정)
	const imageElements = dicomElement.querySelectorAll('[data-path]');
	const imageList = Array.from(imageElements).map(el => 'wadouri:' + el.getAttribute('data-path'));
	
	// 이미지 스택 상태 설정
	const stack = { currentImageIdIndex: 0, imageIds: imageList };
	
	let isPlaying = false;  // 클립 재생 상태 추적
	let fps = 20; // 기본 재생 속도

	// playClip 툴 추가
	cornerstoneTools.addTool(cornerstoneTools.StackScrollTool);
	// Stack State Manager와 Tool State 설정
	cornerstoneTools.addStackStateManager(dicomElement, ['stack']);
	cornerstoneTools.addToolState(dicomElement, 'stack', stack);
		
	
	// 플레이 클립 재생 박스 출력
	if(playClipBox.style.display === 'none') {
		playClipBox.style.display = 'block';
	} else {
		playClipBox.style.display = 'none';
	}
	
	// 재생 버튼 클릭 시 클립 재생
	playClipPlayBtn.addEventListener('click', function() {
		if(!isPlaying) {
			cornerstoneTools.playClip(dicomElement, fps);
			isPlaying = true;
			console.log('Clip playing started at FPS : ', fps);
		}
	});
	// 정지 버튼 클릭 시 클립 정지
	playClipPauseBtn.addEventListener('click', function() {
		if(isPlaying) {
			cornerstoneTools.stopClip(dicomElement);
			isPlaying = false;
			console.log('Clip paused');
		}
	});
	// fps 입력 변경 시 재생 속도 조정
	playClipFpsInput.addEventListener('change', function() {
		fps = parseInt(playClipFpsInput.value, 10);	// FPS 값을 입력 필드에서 가져옴
		if (isPlaying) {
	          cornerstoneTools.stopClip(dicomElement);  // 재생 중일 경우 중단
	          cornerstoneTools.playClip(dicomElement, fps);  // 새로운 FPS로 재생
	          console.log('Clip playing with new FPS:', fps);
		}
	});
}