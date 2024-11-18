async function downloadDicomAsJpg(imageList, currentIndex) {
	const dicomPath = imageList[currentIndex];
	
	if ( dicomPath ) {
		// 파일명 추출
		const canvas = document.querySelector('#dicomViewer canvas');
		if ( canvas ) {
			const fileName = dicomPath.split('/').pop().replace('.dcm', '.jpg');
			// Canvas에서 JPG로 다운로드
			const link = document.createElement('a');
			link.href = canvas.toDataURL('image/jpg');
			link.download = fileName;
			link.click();
			console.log('fileName :', fileName);
		} else {
			console.error('Canvas를 찾을 수 없습니다.');
		}
	} else {
		console.error("유효한 DICOM 경로가 없습니다.");
	}
}