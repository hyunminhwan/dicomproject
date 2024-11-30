let windowLevelEnabled = false; // 윈도우 레벨 기능이 활성화되었는지 여부

function enableWwwcTool(dicomElement) {
	deactivateAllTools(dicomElement);
	windowLevelEnabled = !windowLevelEnabled;
	
	if(windowLevelEnabled) {
		cornerstoneTools.setToolActiveForElement(dicomElement, 'Wwwc', { mouseButtonMask: 1 });
		cornerstoneTools.addToolState(dicomElement, 'Wwwc', {});
		document.getElementById('windowLevel').classList.add('active');

		// 도구 상태 즉시 확인 - Length 기능이 활성화 됐는지 확인
        const toolState = cornerstoneTools.getToolState(dicomElement, 'Wwwc');
        if (toolState && toolState.data && toolState.data.length > 0) {
            console.log('도구 "Wwwc" 활성화 상태 확인:', toolState.data);
        } else {
            console.log('도구 "Wwwc" 상태: 비활성화 또는 데이터 없음');
        };
		
	} else {
        // 길이 측정 도구 비활성화
        cornerstoneTools.setToolDisabledForElement(dicomElement, 'Wwwc');
        document.getElementById('windowLevel').classList.remove('active'); // 버튼 비활성화 표시
        console.log('도구 "Wwwc" 상태 비활성화됨');
    }
}

function multiEnableWwwcTool(element) {
	// 뷰어 요소를 활성화
	if (!cornerstone.getEnabledElement(element)) { cornerstone.enable(element); }
	
	multiDeactivateAllTools(element);
	
	cornerstoneTools.setToolActiveForElement(element, 'Wwwc', { mouseButtonMask: 1 });
	cornerstoneTools.addToolState(element, 'Wwwc', {});
	document.getElementById('windowLevel').classList.add('active2');

	// 도구 상태 즉시 확인 - Length 기능이 활성화 됐는지 확인
    const toolState = cornerstoneTools.getToolState(element, 'Wwwc');
    if (toolState && toolState.data && toolState.data.length > 0) {
        console.log(`도구 "Wwwc" 활성화 상태 확인 (${element.id}):`, toolState.data);
    } else {
        console.log(`도구 "Wwwc" 상태: 비활성화 또는 데이터 없음 (${element.id})`);
    }
}

function multiUnableWwwcTool(element) {
	// 길이 측정 도구 비활성화
	cornerstoneTools.setToolDisabledForElement(element, 'Wwwc');
	document.getElementById('windowLevel').classList.remove('active2'); // 버튼 비활성화 표시
	console.log(`도구 "Wwwc" 상태 비활성화됨 (${element.id})`);
}