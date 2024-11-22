function confirmDownloadType() {
	const container = document.createElement('div');
	container.id = 'confirm-download-modal';
	container.classList.add('modal');
	
	const title = document.createElement('h3');
	title.textContent = '다운로드 유형 선택';
	container.appendChild(title);
	
	const currentBtn = document.createElement('button');
	currentBtn.textContent = '현재 페이지';
	container.appendChild(currentBtn);

	const seriesBtn = document.createElement('button');
	seriesBtn.textContent = '시리즈';
	container.appendChild(seriesBtn);

	const cancelBtn = document.createElement('button');
	cancelBtn.id = 'cancel';
	cancelBtn.textContent = '취소';
	container.appendChild(cancelBtn);
	
	document.body.appendChild(container);
	
	return new Promise((resolve) => {
	    currentBtn.addEventListener('click', () => {
	        resolve('current');
	        document.body.removeChild(container);
	    });

	    seriesBtn.addEventListener('click', () => {
	        resolve('series');
	        document.body.removeChild(container);
	    });

	    cancelBtn.addEventListener('click', () => {
	        resolve(null);
	        document.body.removeChild(container);
	    });
	});
	
}





















