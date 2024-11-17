function initializeMultiViewerTools() {
	const dicomElements = document.querySelectorAll('.dicom-viewer');
	const multiViewerGrid = document.querySelector('.multi-viewer-grid');
	
	// cornerstone-tools 초기화 및 외부 라이브러리 연결
	cornerstoneTools.external.cornerstone = cornerstone;
	cornerstoneTools.external.cornerstoneMath = cornerstoneMath;
	cornerstoneTools.external.Hammer = Hammer;
	cornerstoneTools.init({ showSVGCursors: true });
	initializeAddTools();	
	
	let maginfyToolEnabled = false;
	let angleToolEnabled = false;
	let wwwcToolEnabled = false;
	let arrowToolEnabled = false;
	let panToolEnabled = false;
	let eraserToolEnabled = false;
	let freeHandRoiToolEnabled = false;
	let lengthToolEnabled = false;
	let rotateToolEnabled = false;
	let zoomToolEnabled = false;
	let annoDropControllEnabled = false;
	
	if ( multiViewerGrid && multiViewerGrid.style.display !== 'none' && dicomElements ) {
		
	document.getElementById('hFlip').addEventListener('click', function() {
		if (multiViewerGrid && multiViewerGrid.style.display !== 'none' && dicomElements) 
			dicomElements.forEach(element => flipHorizontal(element));
	});

	document.getElementById('vFlip').addEventListener('click', function () {
		if (multiViewerGrid && multiViewerGrid.style.display !== 'none' && dicomElements) 
			dicomElements.forEach(element => flipVertical(element));
	});

	document.getElementById('lRotate').addEventListener('click', function () {
		if (multiViewerGrid && multiViewerGrid.style.display !== 'none' && dicomElements) 
			dicomElements.forEach(element => rotateLeft(element));
	});

	document.getElementById('rRotate').addEventListener('click', function () {
		if (multiViewerGrid && multiViewerGrid.style.display !== 'none' && dicomElements) 
			dicomElements.forEach(element => rotateRight(element));
	});

	document.getElementById('zoomIn').addEventListener('click', function () {
		if (multiViewerGrid && multiViewerGrid.style.display !== 'none' && dicomElements) 
			dicomElements.forEach(element => zoomIn(element));
	});

	document.getElementById('zoomOut').addEventListener('click', function () {
		if (multiViewerGrid && multiViewerGrid.style.display !== 'none' && dicomElements) 
			dicomElements.forEach(element => zoomOut(element));
	});
	
	document.getElementById('scrollRoof').addEventListener('click', function () {
		if (multiViewerGrid && multiViewerGrid.style.display !== 'none' && dicomElements && !rotateToolEnabled) {
			rotateToolEnabled = true;
			dicomElements.forEach(element => multiEnableRotate(element));
		} else {
			rotateToolEnabled = false;
			dicomElements.forEach(element => multiUnableRotate(element));
		}
	});

	document.getElementById('scrollZoom').addEventListener('click', function () {
		if (multiViewerGrid && multiViewerGrid.style.display !== 'none' && dicomElements && !zoomToolEnabled) {
			zoomToolEnabled = true;
			dicomElements.forEach(element => multiEnableScrollZoom(element));
		} else {
			zoomToolEnabled = false;
			dicomElements.forEach(element => multiUnableScrollZoom(element));
		}
	});

	document.getElementById('drag').addEventListener('click', function () {
		if (multiViewerGrid && multiViewerGrid.style.display !== 'none' && dicomElements && !panToolEnabled) {
			panToolEnabled = true;
			dicomElements.forEach(element => multiEnableDrag(element));
		} else {
			panToolEnabled = false;
			dicomElements.forEach(element => multiUnableDrag(element));
		}
	});

	document.getElementById('windowLevel').addEventListener('click', function () {
		if (multiViewerGrid && multiViewerGrid.style.display !== 'none' && dicomElements && !wwwcToolEnabled) {
			wwwcToolEnabled = true;
			dicomElements.forEach(element => multiEnableWwwcTool(element));
		} else {
			wwwcToolEnabled = false;
			dicomElements.forEach(element => multiUnableWwwcTool(element));
		}
	});
		
	document.getElementById('invert').addEventListener('click', function() {
		if (multiViewerGrid && multiViewerGrid.style.display !== 'none' && dicomElements) 
			dicomElements.forEach(element => invert(element));
	});
		
	document.getElementById('reset').addEventListener('click', function () {
		if (multiViewerGrid && multiViewerGrid.style.display !== 'none' && dicomElements) 
			dicomElements.forEach(element => multiResetImage(element));
	});

	document.getElementById('playClip').addEventListener('click', function () {
		if (multiViewerGrid && multiViewerGrid.style.display !== 'none' && dicomElements) 
			dicomElements.forEach(element => playClipControll(element));
	});

	document.getElementById('magnify').addEventListener('click', function() {
		if (multiViewerGrid && multiViewerGrid.style.display !== 'none' && dicomElements && !maginfyToolEnabled) {
			maginfyToolEnabled = true;
			dicomElements.forEach(element => multiEnableMagnify(element));
		} else {
			maginfyToolEnabled = false;
			dicomElements.forEach(element => multiUnableMagnify(element));
		}
	});
	
	document.getElementById('download').addEventListener('click', function() {
		
	});
	
	
	
	//주석 도구
	document.getElementById('annotateBtn')	.addEventListener('click', function() {
		if (multiViewerGrid && multiViewerGrid.style.display !== 'none' && dicomElements) {
			if(!annoDropControllEnabled) {
				annoDropControllEnabled = true;
				multiAnnoDropControll();
			} else {
				annoDropControllEnabled = false;
				multiUnAnnoDropControll();
			}
		} else {
			if(annoDropControllEnabled) {
				annoDropControllEnabled = false;
				multiUnAnnoDropControll();
			}
		}  
    });
	
	document.getElementById('length').addEventListener('click', function() {
		if (multiViewerGrid && multiViewerGrid.style.display !== 'none' && dicomElements && !lengthToolEnabled) {
			lengthToolEnabled = true;
			dicomElements.forEach(element => multiEnableLength(element));
		} else {
			lengthToolEnabled = false;
			dicomElements.forEach(element => multiUnableLength(element));
		}
	})
	
	document.getElementById('angle').addEventListener('click', function() {
		if (multiViewerGrid && multiViewerGrid.style.display !== 'none' && dicomElements && !angleToolEnabled) {
			angleToolEnabled = true;
			dicomElements.forEach(element => multiEnableAngle(element));
		} else {
			angleToolEnabled = false;
			dicomElements.forEach(element => multiUnableAngle(element));
		}
	});
	
	document.getElementById('arrow').addEventListener('click', function() {
		if (multiViewerGrid && multiViewerGrid.style.display !== 'none' && dicomElements && !arrowToolEnabled) {
			arrowToolEnabled = true;
			dicomElements.forEach(element => multiEnableArrow(element));
		} else {
			arrowToolEnabled = false;
			dicomElements.forEach(element => multiUnableArrow(element));
		}
	});
	
	document.getElementById('freeHand').addEventListener('click', function() {
		if (multiViewerGrid && multiViewerGrid.style.display !== 'none' && dicomElements && !freeHandRoiToolEnabled) {
			freeHandRoiToolEnabled = true;
			dicomElements.forEach(element => multiEnableFreeHand(element));
		} else {
			freeHandRoiToolEnabled = false;
			dicomElements.forEach(element => multiUnableFreeHand(element));
		}
	});
	
	document.getElementById('eraser').addEventListener('click', function() {
		if (multiViewerGrid && multiViewerGrid.style.display !== 'none' && dicomElements && !eraserToolEnabled) {
			eraserToolEnabled = true;
			dicomElements.forEach(element => multiEnableEraser(element));
		} else {
			eraserToolEnabled = false;
			dicomElements.forEach(element => multiUnableEraser(element));
		}
	});
	}
}

function initializeAddTools() {
	const dicomElements = document.querySelectorAll('.dicom-viewer');
	dicomElements.forEach(element => {
		cornerstoneTools.addToolForElement(element, cornerstoneTools.LengthTool);
		cornerstoneTools.addToolForElement(element, cornerstoneTools.AngleTool);
		cornerstoneTools.addToolForElement(element, cornerstoneTools.WwwcTool);
		cornerstoneTools.addToolForElement(element, cornerstoneTools.PanTool);
		cornerstoneTools.addToolForElement(element, cornerstoneTools.MagnifyTool);
		cornerstoneTools.addToolForElement(element, cornerstoneTools.ZoomTool);
		cornerstoneTools.addToolForElement(element, cornerstoneTools.EraserTool);
		cornerstoneTools.addToolForElement(element, cornerstoneTools.RotateTool);
		cornerstoneTools.addToolForElement(element, cornerstoneTools.ArrowAnnotateTool);
		cornerstoneTools.addToolForElement(element, cornerstoneTools.FreehandRoiTool);
	});
}