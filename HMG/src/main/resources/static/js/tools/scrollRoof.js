let rotateToolEnabled = false;

function enableRotate(dicomElement) {
	deactivateAllTools(dicomElement);
	rotateToolEnabled = !rotateToolEnabled;
	
	if (rotateToolEnabled) {
        // 길이 측정 도구 활성화 및 상태 저장
        cornerstoneTools.setToolActiveForElement(dicomElement, 'Rotate', { mouseButtonMask: 1 });
		cornerstoneTools.addToolState(dicomElement, 'Rotate', {
			roundAngles: false,
	        flipHorizontal: false,
	        flipVertical: false,
	        rotateScale: 1,
		});
		                
        document.getElementById('scrollRoof').classList.add('active'); // 버튼 활성화 표시

        // 도구 상태 즉시 확인 - Length 기능이 활성화 됐는지 확인
        const toolState = cornerstoneTools.getToolState(dicomElement, 'Rotate');
        if (toolState && toolState.data && toolState.data.length > 0) {
            console.log('도구 "Rotate" 활성화 상태 확인:', toolState.data);
        } else {
            console.log('도구 "Rotate" 상태: 비활성화 또는 데이터 없음');
        }
    } else {
        // 길이 측정 도구 비활성화
        cornerstoneTools.setToolDisabledForElement(dicomElement, 'Rotate');
        document.getElementById('scrollRoof').classList.remove('active'); // 버튼 비활성화 표시
        console.log('도구 "Rotate" 상태 비활성화됨');
    }
}

function multiEnableRotate(element) {
	// 뷰어 요소를 활성화
	if (!cornerstone.getEnabledElement(element)) { cornerstone.enable(element); }
	
	multiDeactivateAllTools(element);

    // 길이 측정 도구 활성화 및 상태 저장
    cornerstoneTools.setToolActiveForElement(element, 'Rotate', { mouseButtonMask: 1 });
	cornerstoneTools.addToolState(element, 'Rotate', {
		roundAngles: false,
        flipHorizontal: false,
        flipVertical: false,
        rotateScale: 1,
	});
	                
    document.getElementById('scrollRoof').classList.add('active2'); // 버튼 활성화 표시

    // 도구 상태 즉시 확인 - Length 기능이 활성화 됐는지 확인
    const toolState = cornerstoneTools.getToolState(element, 'Rotate');
    if (toolState && toolState.data && toolState.data.length > 0) {
        console.log(`도구 "Rotate" 활성화 상태 확인 (${element.id}):`, toolState.data);
    } else {
        console.log(`도구 "Rotate" 상태: 비활성화 또는 데이터 없음 (${element.id})`);
    }
}

function multiUnableRotate(element) {
	// 길이 측정 도구 비활성화
	cornerstoneTools.setToolDisabledForElement(element, 'Rotate');
	document.getElementById('scrollRoof').classList.remove('active2'); // 버튼 비활성화 표시
	console.log(`도구 "Rotate" 상태 비활성화됨 (${element.id})`);
}