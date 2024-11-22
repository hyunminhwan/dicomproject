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

async function downloadSeriesAsZip(imageList) {
	try {
		// 폴더 위치와 파일 이름 분리
		const folderPath = imageList[0].split('/').slice(0, -1).join('/'); // 첫 번째 파일의 폴더 경로
		const fileNames = imageList.map(path => path.split('/').pop()); // 파일 이름들 
		console.log('imageList :', imageList);
		console.log('Folder path:', folderPath);
		console.log('File names:', fileNames);

		// Axios POST 요청으로 폴더 경로와 파일 이름 JSON 객체로 서버에 전달
		const response = await axios.post('/file/download-series', { folderPath, fileNames }, { responseType: 'blob' }); // 서버에서 전송된 ZIP파일 데이터를 Blob 형식으로 받기

		// Blob 데이터를 링크로 변환해 다운받을 수 있도록 설정
		const blob = new Blob([response.data], { type: 'application/zip' });
		const link = document.createElement('a'); // 링크 생성
		link.href = window.URL.createObjectURL(blob); // 링크에 Blob URL 생성
		link.download = 'series_images.zip';
		link.click();
		
		window.URL.revokeObjectURL(link.href); // Blob URL 해제(자원 누수 방지 = 다 썼으니 지운 것!)
		console.log('시리즈 다운로드 완료');
	} catch(error) {
		console.error('시리즈 다운로드 실패: ', error);
		alert('다운로드 실패');
	}
}