// invert(흑백전환) 버튼 이벤트 함수
function invert(dicomElement) {
	const viewport = cornerstone.getViewport(dicomElement);
	viewport.invert = !viewport.invert;
	cornerstone.setViewport(dicomElement, viewport);
}