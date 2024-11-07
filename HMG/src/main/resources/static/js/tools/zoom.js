// zoomIn 버튼 이벤트 함수
function zoomIn(dicomElement) {
	const viewport = cornerstone.getViewport(dicomElement);
	viewport.scale += 0.25;
	cornerstone.setViewport(dicomElement, viewport);
}

// zoomOut 버튼 이벤트 함수
function zoomOut(dicomElement) {
	const viewport = cornerstone.getViewport(dicomElement);
	viewport.scale -= 0.25;
	cornerstone.setViewport(dicomElement, viewport);	
}