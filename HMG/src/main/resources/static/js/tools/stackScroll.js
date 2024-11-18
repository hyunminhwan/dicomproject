/*let stackScrollEnabled = false;

function enablestackScroll(dicomElement) {
	stackScrollEnabled = !stackScrollEnabled;
	
	if (stackScrollEnabled) {
        cornerstoneTools.setToolActiveForElement(dicomElement, 'StackScroll', { mouseButtonMask: 0 }, ['Mouse', 'Wheel']);
		cornerstoneTools.addToolState(dicomElement, 'StackScroll', {
		        loop: false,
		        allowSkipping: true,
		      });
		            
        document.getElementById('stackScroll').classList.add('active'); // 버튼 활성화 표시

        // 도구 상태 즉시 확인 - Length 기능이 활성화 됐는지 확인
        const toolState = cornerstoneTools.getToolState(dicomElement, 'StackScroll');
        if (toolState && toolState.data && toolState.data.length > 0) {
            console.log('도구 "StackScroll" 활성화 상태 확인:', toolState.data);
        } else {
            console.log('도구 "StackScroll" 상태: 비활성화 또는 데이터 없음');
        }
    } else {
        // 길이 측정 도구 비활성화
        cornerstoneTools.setToolDisabledForElement(dicomElement, 'StackScroll');
        document.getElementById('stackScroll').classList.remove('active'); // 버튼 비활성화 표시
        console.log('도구 "StackScroll" 상태 비활성화됨');
    }
}*/

/*
function enablestackScroll(dicomElement) {
    // StackScroll 도구 활성화
    cornerstoneTools.setToolActiveForElement(dicomElement, 'StackScroll', { mouseButtonMask: 0 });

    // 휠 이벤트 추가를 위해 툴 옵션 설정
    const options = {
        loop: false,
        allowSkipping: true,
    };
    cornerstoneTools.setToolOptions('StackScroll', dicomElement, options);

    // 휠 이벤트 추가
    dicomElement.addEventListener('wheel', function (evt) {
        const eventData = {
            element: dicomElement,
            deltaY: evt.deltaY,
        };

        // cornerstoneTools 이벤트 시스템을 활용하여 휠 이벤트 발생시킴
        cornerstoneTools.triggerEvent(dicomElement, 'mouseWheel', eventData);
        evt.preventDefault();
    });
}
*/