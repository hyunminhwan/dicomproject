let freeHandToolEnabled = false;

function enableFreeHand(dicomElement) {
	deactivateAllTools(dicomElement);
	freeHandToolEnabled = !freeHandToolEnabled;
	
	if (freeHandToolEnabled) {
        // 길이 측정 도구 활성화 및 상태 저장
        cornerstoneTools.setToolActiveForElement(dicomElement, 'FreehandRoi', { mouseButtonMask: 1 });
		cornerstoneTools.addToolState(dicomElement, 'FreehandRoi', {
			visible: true,
			active: false,
			color: undefined,
			invalidated: true,
			handles: {
				points: [
                    { x: 10, y: 10, highlight: true, active: false },
                    { x: 20, y: 20, highlight: true, active: false },
                    { x: 30, y: 10, highlight: true, active: false }
                ],
			    textBox: {
			        active: false,
			        hasMoved: false,
			        movesIndependently: false,
			        drawnIndependently: true,
			        allowedOutsideImage: true,
			        hasBoundingBox: true
			    }
			}
		});
		document.getElementById('freeHand').classList.add('active');

        // 도구 상태 즉시 확인 - Length 기능이 활성화 됐는지 확인
        const toolState = cornerstoneTools.getToolState(dicomElement, 'FreehandRoi');
        if (toolState && toolState.data && toolState.data.length > 0) {
            console.log('도구 "FreehandRoi" 활성화 상태 확인:', toolState.data);
        } else {
            console.log('도구 "FreehandRoi" 상태: 비활성화 또는 데이터 없음');
        }
    } else {
        // 길이 측정 도구 비활성화
        cornerstoneTools.setToolDisabledForElement(dicomElement, 'FreehandRoi');
		document.getElementById('freeHand').classList.remove('active');
        console.log('도구 "FreehandRoi" 상태 비활성화됨');
    }
}

function multiEnableFreeHand(element) {
	// 뷰어 요소를 활성화
	if (!cornerstone.getEnabledElement(element)) { cornerstone.enable(element); }
	
	multiDeactivateAllTools(element);

    // 길이 측정 도구 활성화 및 상태 저장
    cornerstoneTools.setToolActiveForElement(element, 'FreehandRoi', { mouseButtonMask: 1 });
	cornerstoneTools.addToolState(element, 'FreehandRoi', {
		visible: true,
		active: false,
		color: undefined,
		invalidated: true,
		handles: {
			points: [
                { x: 10, y: 10, highlight: true, active: false },
                { x: 20, y: 20, highlight: true, active: false },
                { x: 30, y: 10, highlight: true, active: false }
            ],
		    textBox: {
		        active: false,
		        hasMoved: false,
		        movesIndependently: false,
		        drawnIndependently: true,
		        allowedOutsideImage: true,
		        hasBoundingBox: true
		    }
		}
	});
	document.getElementById('freeHand').classList.add('active2');

    // 도구 상태 즉시 확인 - Length 기능이 활성화 됐는지 확인
    const toolState = cornerstoneTools.getToolState(element, 'FreehandRoi');
    if (toolState && toolState.data && toolState.data.length > 0) {
        console.log(`도구 "FreehandRoi" 활성화 상태 확인 (${element.id}):`, toolState.data);
    } else {
        console.log(`도구 "FreehandRoi" 상태: 비활성화 또는 데이터 없음 (${element.id})`);
    }
}

function multiUnableFreeHand(element) {
	// 길이 측정 도구 비활성화
	cornerstoneTools.setToolDisabledForElement(element, 'FreehandRoi');
	document.getElementById('freeHand').classList.remove('active2'); // 버튼 비활성화 표시
	console.log(`도구 "FreehandRoi" 상태 비활성화됨 (${element.id})`);
}