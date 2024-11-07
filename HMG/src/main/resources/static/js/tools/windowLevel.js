let windowLevelEnabled = false; // 윈도우 레벨 기능이 활성화되었는지 여부

function enableWwwcTool(dicomElement) {
	windowLevelEnabled = !windowLevelEnabled;
	
	if(windowLevelEnabled) {
		cornerstoneTools.setToolActiveForElement(dicomElement, 'Wwwc', { mouseButtonMask: 1 });
		cornerstoneTools.addToolState(dicomElement, 'Wwwc', {});
		document.getElementById('windowLevel').classList.add('active');
		console.log('Wwwc 도구 활성화');
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
        console.log('Wwwc 도구 비활성화됨');
    }
}

