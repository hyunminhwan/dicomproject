function initializeTools() {
	const dicomElement = document.getElementById('dicomViewer');
	const viewerContainer = document.querySelector('.viewer-container');
	cornerstone.enable(dicomElement);
	// cornerstone-tools 초기화 및 외부 라이브러리 연결
	cornerstoneTools.external.cornerstone = cornerstone;
	cornerstoneTools.external.cornerstoneMath = cornerstoneMath;
	cornerstoneTools.external.Hammer = Hammer;
	cornerstoneTools.init();

	document.getElementById('hFlip').addEventListener('click', function() {
		if(viewerContainer && viewerContainer.style.display !== 'none' && dicomElement) flipHorizontal(dicomElement);
	});

	document.getElementById('vFlip').addEventListener('click', function () {
		if(viewerContainer && viewerContainer.style.display !== 'none' && dicomElement) flipVertical(dicomElement);
	});

	document.getElementById('lRotate').addEventListener('click', function () {
		if(viewerContainer && viewerContainer.style.display !== 'none' && dicomElement) rotateLeft(dicomElement);
	});

	document.getElementById('rRotate').addEventListener('click', function () {
	    if(viewerContainer && viewerContainer.style.display !== 'none' && dicomElement) rotateRight(dicomElement);
	});

	document.getElementById('zoomIn').addEventListener('click', function () {
	    if(viewerContainer && viewerContainer.style.display !== 'none' && dicomElement) zoomIn(dicomElement);
	});

	document.getElementById('zoomOut').addEventListener('click', function () {
	    if(viewerContainer && viewerContainer.style.display !== 'none' && dicomElement) zoomOut(dicomElement);
	});
	
	document.getElementById('scrollRoof').addEventListener('click', function () {
	    if(viewerContainer && viewerContainer.style.display !== 'none' && dicomElement) enableRotate(dicomElement);
	});

	document.getElementById('scrollZoom').addEventListener('click', function () {
	    if(viewerContainer && viewerContainer.style.display !== 'none' && dicomElement) enableScrollZoom(dicomElement);
	});

	document.getElementById('drag').addEventListener('click', function () {
	    if(viewerContainer && viewerContainer.style.display !== 'none' && dicomElement) enableDrag(dicomElement);
	});

	document.getElementById('windowLevel').addEventListener('click', function () {
		if(viewerContainer && viewerContainer.style.display !== 'none' && dicomElement) enableWwwcTool(dicomElement);
	});
		
	document.getElementById('invert').addEventListener('click', function() {
		if(viewerContainer && viewerContainer.style.display !== 'none' && dicomElement) invert(dicomElement);
	});
		
	document.getElementById('reset').addEventListener('click', function () {
	    if(viewerContainer && viewerContainer.style.display !== 'none' && dicomElement) resetImage(dicomElement);
	});

	document.getElementById('playClip').addEventListener('click', function () {
		if(viewerContainer && viewerContainer.style.display !== 'none' && dicomElement) playClipControll(dicomElement);
	});

	document.getElementById('magnify').addEventListener('click', function() {
		if(viewerContainer && viewerContainer.style.display !== 'none' && dicomElement) enableMagnify(dicomElement);
	});
	
	document.getElementById('compare').addEventListener('click', function() {
			gridController();
			seriesAllDataLoad(dicomElement);
	});
	
	document.getElementById('download').addEventListener('click', function() {
		
	});
	
	
	
	//주석 도구
	document.getElementById('annotateBtn')	.addEventListener('click', function() {
		if(viewerContainer && viewerContainer.style.display !== 'none' && dicomElement) annoDropControll(dicomElement);    
    });
	document.getElementById('length').addEventListener('click', function() {
		if(viewerContainer && viewerContainer.style.display !== 'none' && dicomElement) enableLength(dicomElement);
	})
	document.getElementById('angle').addEventListener('click', function() {
		if(viewerContainer && viewerContainer.style.display !== 'none' && dicomElement) enableAngle(dicomElement);
	});
	document.getElementById('arrow').addEventListener('click', function() {
		if(viewerContainer && viewerContainer.style.display !== 'none' && dicomElement) enableArrow(dicomElement);
	});
	document.getElementById('freeHand').addEventListener('click', function() {
		if(viewerContainer && viewerContainer.style.display !== 'none' && dicomElement) enableFreeHand(dicomElement);
	});
	document.getElementById('eraser').addEventListener('click', function() {
		if(viewerContainer && viewerContainer.style.display !== 'none' && dicomElement) enableEraser(dicomElement);
	});
	
}
