let arrowToolEnabled = false;

function enableArrow(dicomElement) {
	deactivateAllTools(dicomElement);
	arrowToolEnabled = !arrowToolEnabled;
	
	if (arrowToolEnabled) {
        // 길이 측정 도구 활성화 및 상태 저장
        cornerstoneTools.setToolActiveForElement(dicomElement, 'ArrowAnnotate', { mouseButtonMask: 1 });
		try {
		cornerstoneTools.addToolState(dicomElement, 'ArrowAnnotate', {
			getTextCallback,
			changeTextCallback,
			drawHandles: true,
			drawHandlesOnHover: false,
			hideHandlesIfMoving: false,
			arrowFirst: true,
			renderDashed: false,
			allowEmptyLabel: false
        });
		} catch (error) {
			console.error(`ArrowAnnotate 도구 상태 추가 중 오류 발생 (${dicomElement}):`, error);
		}
		document.getElementById('arrow').classList.add('active');

        // 도구 상태 즉시 확인 - Length 기능이 활성화 됐는지 확인
        const toolState = cornerstoneTools.getToolState(dicomElement, 'ArrowAnnotate');
        if (toolState && toolState.data && toolState.data.length > 0) {
            console.log('도구 "Arrow" 활성화 상태 확인:', toolState.data);
        } else {
            console.log('도구 "Arrow" 상태: 비활성화 또는 데이터 없음');
        }
    } else {
        // 길이 측정 도구 비활성화
        cornerstoneTools.setToolDisabledForElement(dicomElement, 'ArrowAnnotate');
		document.getElementById('arrow').classList.remove('active');
        console.log('도구 "Arrow" 상태 비활성화됨');
    }
}

function multiEnableArrow(element) {
	// 뷰어 요소를 활성화
	if (!cornerstone.getEnabledElement(element)) { cornerstone.enable(element); }
	
	multiDeactivateAllTools(element);

    // 길이 측정 도구 활성화 및 상태 저장
    cornerstoneTools.setToolActiveForElement(element, 'ArrowAnnotate', { mouseButtonMask: 1 });
	try {
		cornerstoneTools.addToolState(element, 'ArrowAnnotate', {
			getTextCallback,
			changeTextCallback,
			drawHandles: true,
			drawHandlesOnHover: false,
			hideHandlesIfMoving: false,
			arrowFirst: true,
			renderDashed: false,
			allowEmptyLabel: false
	    });
	} catch (error) {
		console.error(`ArrowAnnotate 도구 상태 추가 중 오류 발생 (${element.id}):`, error);
	}
	
	document.getElementById('arrow').classList.add('active2');

    // 도구 상태 즉시 확인 - Length 기능이 활성화 됐는지 확인
    const toolState = cornerstoneTools.getToolState(element, 'ArrowAnnotate');
    if (toolState && toolState.data && toolState.data.length > 0) {
        console.log(`도구 "Arrow" 활성화 상태 확인 (${element.id}):`, toolState.data);
    } else {
        console.log(`도구 "Arrow" 상태: 비활성화 또는 데이터 없음 (${element.id})`);
    }
}

function multiUnableArrow(element) {
	// 길이 측정 도구 비활성화
	cornerstoneTools.setToolDisabledForElement(element, 'Arrow');
	document.getElementById('arrow').classList.remove('active2'); // 버튼 비활성화 표시
	console.log(`도구 "Arrow" 상태 비활성화됨 (${element.id})`);
}