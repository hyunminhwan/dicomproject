function initializeTools() {
	const dicomElement = document.getElementById('dicomViewer');
	cornerstone.enable(dicomElement);
	// cornerstone-tools 초기화 및 외부 라이브러리 연결
	cornerstoneTools.external.cornerstone = cornerstone;
	cornerstoneTools.external.cornerstoneMath = cornerstoneMath;
	cornerstoneTools.external.Hammer = Hammer;
	cornerstoneTools.init();

	document.getElementById('hFlip').addEventListener('click', function() {
		flipHorizontal(dicomElement);
	});

	document.getElementById('vFlip').addEventListener('click', function () {
		flipVertical(dicomElement);
	});

	document.getElementById('lRotate').addEventListener('click', function () {
		rotateLeft(dicomElement);
	});

	document.getElementById('rRotate').addEventListener('click', function () {
	    rotateRight(dicomElement);
	});

	document.getElementById('zoomIn').addEventListener('click', function () {
	    zoomIn(dicomElement);
	});

	document.getElementById('zoomOut').addEventListener('click', function () {
	    zoomOut(dicomElement);
	});

	document.getElementById('scrollZoom').addEventListener('click', function () {
	    enableScrollZoom(dicomElement);
	});

	document.getElementById('drag').addEventListener('click', function () {
	    enableDrag(dicomElement);
	});

	document.getElementById('windowLevel').addEventListener('click', function () {
	    //enableWindowLevel(dicomElement)
		enableWwwcTool(dicomElement);
	});
		
	document.getElementById('invert').addEventListener('click', function() {
		invert(dicomElement);
	});
		
	document.getElementById('reset').addEventListener('click', function () {
	    resetImage(dicomElement);
	});

	document.getElementById('playClip').addEventListener('click', function () {
		playClipControll(dicomElement);
	});
	
	document.getElementById('length').addEventListener('click', function() {
		enableLength(dicomElement);
	})

	document.getElementById('eraser').addEventListener('click', function() {
		enableEraser(dicomElement);
	});
	document.getElementById('angle').addEventListener('click', function() {
		enableAngle(dicomElement);
	});
	document.getElementById('magnify').addEventListener('click', function() {
		enableMagnify(dicomElement);
	});
	

}
