// 모든 도구 버튼의 활성화 상태를 관리하는 공통 함수
function deactivateAllTools(dicomElement) {
	// 모든 버튼에서 'active' 클래스를 제거하여 초기화
	const buttons = document.querySelectorAll('.tools-container-ul .btn');
	const annoButtons = document.querySelectorAll('.annotate-dropdown-menu .btn');
	buttons.forEach(button => {
	    button.classList.remove('active');
	});
	annoButtons.forEach(button => {
		button.classList.remove('active');
	});
	
	// 모든 도구 비활성화
	//cornerstoneTools.setToolDisabledForElement(dicomElement, 'Length');
	//cornerstoneTools.setToolDisabledForElement(dicomElement, 'Angle');
	cornerstoneTools.setToolDisabledForElement(dicomElement, 'Wwwc');
	cornerstoneTools.setToolDisabledForElement(dicomElement, 'Pan');
	cornerstoneTools.setToolDisabledForElement(dicomElement, 'Magnify');
	cornerstoneTools.setToolDisabledForElement(dicomElement, 'Zoom');
	//cornerstoneTools.setToolDisabledForElement(dicomElement, 'Eraser');
	cornerstoneTools.setToolDisabledForElement(dicomElement, 'Rotate');
	//cornerstoneTools.setToolDisabledForElement(dicomElement, 'ArrowAnnotate');
	//cornerstoneTools.setToolDisabledForElement(dicomElement, 'FreeHandRoi');
	
}

function multiDeactivateAllTools(element) {
	// 모든 버튼에서 'active' 클래스를 제거하여 초기화
	const buttons = document.querySelectorAll('.tools-container-ul .btn');
	const annoButtons = document.querySelectorAll('.annotate-dropdown-menu .btn');
	buttons.forEach(button => {
	    button.classList.remove('active2');
	});
	annoButtons.forEach(button => {
		button.classList.remove('active2');
	});
	
	// 모든 도구 비활성화
	//cornerstoneTools.setToolDisabledForElement(element, 'Length');
	//cornerstoneTools.setToolDisabledForElement(element, 'Angle');
	cornerstoneTools.setToolDisabledForElement(element, 'Wwwc');
	cornerstoneTools.setToolDisabledForElement(element, 'Pan');
	cornerstoneTools.setToolDisabledForElement(element, 'Magnify');
	cornerstoneTools.setToolDisabledForElement(element, 'Zoom');
	//cornerstoneTools.setToolDisabledForElement(element, 'Eraser');
	cornerstoneTools.setToolDisabledForElement(element, 'Rotate');
	//cornerstoneTools.setToolDisabledForElement(element, 'ArrowAnnotate');
	//cornerstoneTools.setToolDisabledForElement(element, 'FreeHandRoi');
}

function toggleButtonState(button, dicomElements, toolName) {
	const allTools = ['Angle', 'ArrowAnnotate', 'Pan', 'Eraser', 'FreehandRoi', 'Length', 'Magnify', 'Rotate', 'Zoom', 'Wwwc'];
	const isActive = button.classList.contains('active');
	
	resetAllTools(dicomElements, allTools, toolName);
	
	if (!isActive) {
		button.classList.add('active');
		dicomElements.forEach(element => {
			cornerstoneTools.setToolActiveForElement(element, toolName, { mouseButtonMask: 1 });
		});
		console.log(`${toolName} 활성화`);
	} else {
		dicomElements.forEach(element => {
			cornerstoneTools.setToolDisabledForElement(element, toolName);
		});
		console.log(`${toolName} 비활성화`);
	}
}

function resetAllTools(dicomElements, allTools, excludeToolName) {
	const allButtons = document.querySelectorAll('.tool-btn');
	allButtons.forEach(button => button.classList.remove('active'));
	
	const toolsToDisable = allTools.filter(tool => tool !== excludeToolName);
	dicomElements.forEach(element => {
		toolsToDisable.forEach(tool => {
			cornerstoneTools.setToolDisabledForElement(element, tool);
		});
	});
}